from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required, permission_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .models import Product, ProductOrder, OrderItem
from .forms import ProductForm
import json
from django.utils import timezone

@login_required(login_url='login')
def product_list(request):
    products = Product.objects.all()
    context = {'products': products}
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



@login_required(login_url='login')
def view_orders(request):
    orders = ProductOrder.objects.all().order_by('-created_at')
    product_categories = Product.CATEGORY_CHOICES
    context = {
        'orders': orders,
        'product_categories': product_categories,
    }
    return render(request, 'ProductOrders/order_management.html', context)