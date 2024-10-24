from django.db import models
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

#Expenses
class Expense(models.Model):
    supplier = models.ForeignKey('Main.Suppliers', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    paid = models.BooleanField(default=False)
    branch = models.ForeignKey('Main.Branch', on_delete=models.CASCADE)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    

    def __str__(self):
        return self.name
    

@receiver(post_save, sender=Expense)
@receiver(post_delete, sender=Expense)
def update_supplier_own_money(sender, instance, **kwargs):
    supplier = instance.supplier
    
    # Get all unpaid expenses for this supplier
    unpaid_expenses = Expense.objects.filter(supplier=supplier, paid=False)
    unpaid_sum = unpaid_expenses.aggregate(models.Sum('amount'))['amount__sum'] or 0
    
    if kwargs.get('created', False):  # If this is a new expense being created
        if not instance.paid:  # If the new expense is unpaid
            if supplier.last_balance > 0:
                # If there's a last balance, add new expense to last_balance + ownMoney
                supplier.ownMoney = supplier.last_balance + instance.amount
            else:
                # If no last balance, set the expense amount as the new ownMoney
                supplier.ownMoney = instance.amount
            # Update last_balance with the new total
            supplier.last_balance = supplier.ownMoney
            
    elif instance.paid:  # If an existing expense is being marked as paid
        if supplier.last_balance > 0:
            # If paying an expense and there's a last balance, subtract from it
            supplier.last_balance = max(0, supplier.last_balance - instance.amount)
            supplier.ownMoney = supplier.last_balance
        else:
            # If no last balance, just subtract from ownMoney
            supplier.ownMoney = max(0, supplier.ownMoney - instance.amount)
            
    elif kwargs.get('signal', None) == post_delete:  # If an expense is being deleted
        if supplier.last_balance > 0:
            # If there's a last balance and we're deleting an expense,
            # subtract it from last_balance
            supplier.last_balance = max(0, supplier.last_balance - instance.amount)
            supplier.ownMoney = supplier.last_balance
        else:
            # If no last balance, recalculate from remaining unpaid expenses
            supplier.ownMoney = unpaid_sum
    
    supplier.save()