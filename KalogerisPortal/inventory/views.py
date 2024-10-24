from django.shortcuts import render

# Create your views here.

def view_inventory(request):
    return render(request, 'inventory/view_inventory.html')