from django.shortcuts import render, redirect
from .models import Payments
from django.contrib import messages
from .forms import add_payments

# Create your views here.
def payments_list(request):
    payments = Payments.objects.all().order_by('created_at').select_related('supplier', 'user')
    return render(request, 'payments/payments_list.html', {'payments': payments})



def add_payment(request):
    # Logic to add a payment
    if request.method == 'POST':
        form = add_payments(request.POST)
        if form.is_valid():
            payment = form.save(commit=False)
            payment.user = request.user
            payment.save()
            messages.success(request, 'Payment added successfully!')
            return redirect('payments_list')
        else:
            form = add_payments()
            messages.error(request, 'Error adding payment. Please check the form.')
            
        return render(request, 'payments/add_payment.html', {'form': form})


    return render(request, 'payments/add_payment.html')