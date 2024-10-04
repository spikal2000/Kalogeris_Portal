from django.shortcuts import render, redirect
from .models import Expense
from .forms import add_expense
from django.contrib import messages
from django.views.decorators.http import require_POST
from django.db.models import Case, When, Value, IntegerField
from django.contrib.auth.decorators import login_required, user_passes_test
from django.shortcuts import get_object_or_404
from django.core.exceptions import PermissionDenied

def superuser_required(view_func):
    decorated_view_func = user_passes_test(lambda user: user.is_superuser, login_url='login')(view_func)
    return login_required(login_url='login')(decorated_view_func)


@login_required(login_url='login')
def view_expenses(request):
    expenses = Expense.objects.annotate(
        sort_order=Case(
            When(paid=False, then=Value(0)),
            default=Value(1),
            output_field=IntegerField(),
        )
    ).order_by('sort_order', '-date')
    return render(request, 'expenses/view_expenses.html', {'expenses': expenses})


#add expenses
@login_required(login_url='login')
def add_expenses(request):
    if request.method == 'POST':
        form = add_expense(request.POST)
        if form.is_valid():
            expense = form.save(commit=False)
            expense.user = request.user
            expense.save()
            messages.success(request, 'Expense added successfully!')
            return redirect('expenses')
    else:
        form = add_expense()
    return render(request, 'expenses/add_epxense.html', {'form': form})


@login_required(login_url='login')
@superuser_required
def mark_as_paid(request, expense_id):
    try:
        expense = Expense.objects.get(id=expense_id)
        expense.paid = True
        expense.save()
        return redirect('expenses')
    except Expense.DoesNotExist:
        return redirect('expenses')
    

@login_required(login_url='login')
@superuser_required
def delete_expense(request, expense_id):
    expense = get_object_or_404(Expense, id=expense_id)
    if request.user.is_superuser or expense.user == request.user:
        if request.method == 'POST':
            expense.delete()
            messages.success(request, 'Expense deleted successfully!')
            return redirect('expenses')
        return render(request, 'expenses/confirm_delete.html', {'expense': expense})
    else:
        raise PermissionDenied
        
