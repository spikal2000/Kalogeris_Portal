from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required, permission_required

from Dashboard.forms import ProductForm

# Create your views here.
@login_required(login_url='/login')
@permission_required('Dashboard.view_dashboard', login_url='/login',raise_exception=True)
def dashboard(request):
    return render(request, 'dashboard/dashboard.html')

