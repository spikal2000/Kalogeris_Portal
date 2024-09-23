from django.shortcuts import render, redirect
from .forms import SupplierForm

# Create your views here.
def index(request):
    return render(request, 'main/index.html')


def add_supplier(request):
    if request.method == 'POST':
        form = SupplierForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/dashboard')
    else:
        form = SupplierForm()

    return render(request, 'main/add_Supplier.html', {'form': form})