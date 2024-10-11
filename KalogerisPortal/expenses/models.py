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
    from Main.models import Suppliers  # Import here to avoid circular import
    supplier = instance.supplier
    unpaid_sum = Expense.objects.filter(supplier=supplier, paid=False).aggregate(models.Sum('amount'))['amount__sum'] or 0
    supplier.ownMoney = unpaid_sum
    supplier.save()