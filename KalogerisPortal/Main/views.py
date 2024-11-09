from django.shortcuts import render, redirect
from .forms import SupplierForm
from django.contrib.auth.decorators import login_required, permission_required
from .models import Suppliers
from django.shortcuts import get_object_or_404

# Create your views here.
def index(request):
    return render(request, 'main/index.html')

def supplier_list(request):
    suppliers = Suppliers.objects.all().order_by('name')
    return render(request, 'main/supplier_list.html', {'suppliers': suppliers})

@login_required(login_url='login')
@permission_required('Main.add_supplier', raise_exception=True)
def add_supplier(request):
    if request.method == 'POST':
        form = SupplierForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/suppliers')
    else:
        form = SupplierForm()

    return render(request, 'main/add_Supplier.html', {'form': form})

@login_required(login_url='login')
def edit_supplier(request, supplier_id):
    supplier = get_object_or_404(Suppliers, pk=supplier_id)
    
    if request.method == 'POST':
        form = SupplierForm(request.POST, instance=supplier)
        if form.is_valid():
            form.save()
            return redirect('supplier_list')
    else:
        form = SupplierForm(instance=supplier)
    
    return render(request, 'main/edit_supplier.html', {
        'form': form,
        'supplier': supplier
    })
