from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required, permission_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .models import Product, ProductOrder, OrderItem
from .forms import ProductForm
import json
from django.utils import timezone
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Q
from django.db.models import Case, When, Value, IntegerField
from datetime import datetime


@login_required(login_url='login')
def product_list(request):
    products = Product.objects.all().select_related('supplier')
    context = {
        'products': products,
        'is_superuser': request.user.is_superuser
    }
    return render(request, 'ProductOrders/products.html', context)

@login_required(login_url='login')
@require_POST
@csrf_exempt
def place_order(request):
    data = json.loads(request.body)
    
    order = ProductOrder.objects.create(
        user_id=request.user,
        branch=data['branch'],
        status='pending'
    )
    
    for product_id, item_data in data['cart'].items():
        product = Product.objects.get(id=product_id)
        OrderItem.objects.create(
            order_id=order,
            product_id=product,
            quantity=item_data['quantity']
        )
    
    return JsonResponse({'success': True, 'order_id': order.id})



@login_required(login_url='login')
@permission_required('ProductOrders.add_product', login_url='index')
def add_product(request):
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('ProductsOrders')
    else:
        form = ProductForm()
    return render(request, 'ProductOrders/add_product.html', {'form': form})



def order_list(request):
    return render(request, 'ProductOrders/order_list.html')

def get_orders(request):
    status_filter = request.GET.get('status', '')
    date_filter = request.GET.get('date', '')

    orders = ProductOrder.objects.all()

    if status_filter:
        orders = orders.filter(status=status_filter)

    if date_filter:
        filter_date = datetime.strptime(date_filter, '%Y-%m-%d').date()
        orders = orders.filter(
            created_at__date=filter_date
        )

    # Ordering: Active orders first, then cancelled/completed
    orders = orders.annotate(
        order_priority=Case(
            When(status__in=['cancelled', 'delivered'], then=Value(1)),
            default=Value(0),
            output_field=IntegerField(),
        )
    ).order_by('order_priority', '-created_at')

    orders_data = []
    for order in orders:
        items = [f"{item.product_id.name} (x{item.quantity})" for item in order.items.all()]
        orders_data.append({
            'id': order.id,
            'user': order.user_id.username,
            'branch': order.branch,
            'status': order.status,
            'created_at': timezone.localtime(order.created_at).strftime("%Y-%m-%d"),  # Changed this line
            'created_time': timezone.localtime(order.created_at).strftime("%H:%M:%S"),  # Added this line
            'items': items,
        })
    return JsonResponse({'orders': orders_data}, encoder=DjangoJSONEncoder)


@require_POST
@csrf_exempt
def update_order_status(request):
    data = json.loads(request.body)
    order_id = data.get('order_id')
    new_status = data.get('status')
    
    order = get_object_or_404(ProductOrder, id=order_id)
    order.status = new_status
    order.save()
    
    return JsonResponse({'success': True})

def get_order_details(request):
    order_id = request.GET.get('order_id')
    order = get_object_or_404(ProductOrder, id=order_id)
    items = [{
        'id': item.id,
        'product_name': item.product_id.name,
        'quantity': item.quantity,
        'is_ready': item.is_ready
    } for item in order.items.all()]
    
    order_data = {
        'id': order.id,
        'user': order.user_id.username,
        'branch': order.branch,
        'status': order.status,
        'created_at': timezone.localtime(order.created_at).strftime("%Y-%m-%d %H:%M:%S"),
        'items': items,
    }
    
    return JsonResponse(order_data)

@require_POST
@csrf_exempt
def update_item_status(request):
    data = json.loads(request.body)
    item_id = data.get('item_id')
    is_ready = data.get('is_ready')
    
    try:
        item = OrderItem.objects.get(id=item_id)
        item.is_ready = is_ready
        item.save()

        # Get the associated order
        order = item.order_id

        # Check if all items in the order are ready
        all_items_ready = not OrderItem.objects.filter(order_id=order, is_ready=False).exists()

        # If all items are ready and the order is not already in a final state, set it to ready_for_delivery
        if all_items_ready and order.status in ['pending', 'processing']:
            order.status = 'ready_for_delivery'
            order.save()

        return JsonResponse({
            'success': True, 
            'order_status': order.status,
            'all_items_ready': all_items_ready
        })
    except OrderItem.DoesNotExist:
        return JsonResponse({'success': False, 'error': 'Item not found'}, status=404)
    


@login_required(login_url='login')
@permission_required('ProductOrders.change_product', login_url='index')
def edit_product(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES, instance=product)
        if form.is_valid():
            form.save()
            return redirect('ProductsOrders')
    else:
        form = ProductForm(request.POST or None, request.FILES or None, instance=product)
    return render(request, 'ProductOrders/edit_product.html', {'form': form, 'product': product})