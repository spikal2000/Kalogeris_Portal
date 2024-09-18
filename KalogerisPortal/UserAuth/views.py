from django.shortcuts import render, redirect
from django.contrib.auth import login
from .forms import RegisterForm
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST

# Create your views here.

def sign_up(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            # Log the user in or redirect to login page
            return redirect('/dashboard')  # Replace 'login' with your login URL name
    else:
        form = RegisterForm()
    return render(request, 'registration/sign_up.html', {'form': form})