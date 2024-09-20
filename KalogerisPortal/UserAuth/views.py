from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login
from .forms import RegisterForm, UserEditForm
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.contrib.auth.models import User
from Main.models import Employee

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


def user_list(request):
    employees = Employee.objects.all().select_related('user')
    context = {'Employees': employees}
    return render(request, 'UserAuth/view_users.html', context)

def view_user(request, user_id):
    user = get_object_or_404(User, pk=user_id)
    employee = get_object_or_404(Employee, user=user)
    context = {'user': user, 'employee': employee}
    return render(request, 'UserAuth/view_user.html', context)

@login_required
def edit_user(request, user_id):
    user = get_object_or_404(User, pk=user_id)
    if request.method == 'POST':
        form = UserEditForm(request.POST, instance=user)
        if form.is_valid():
            form.save()
            return redirect('user_list')
    else:
        form = UserEditForm(instance=user)
    return render(request, 'UserAuth/edit_user.html', {'form': form, 'user': user})