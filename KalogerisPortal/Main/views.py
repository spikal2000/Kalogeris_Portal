from django.shortcuts import render, redirect
from .forms import SupplierForm
from django.contrib.auth.decorators import login_required, permission_required

# Create your views here.
def index(request):
    return render(request, 'main/index.html')

@login_required(login_url='login')
@permission_required('Main.add_supplier', raise_exception=True)
def add_supplier(request):
    if request.method == 'POST':
        form = SupplierForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/dashboard')
    else:
        form = SupplierForm()

    return render(request, 'main/add_Supplier.html', {'form': form})