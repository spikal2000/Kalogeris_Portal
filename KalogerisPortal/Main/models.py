from django.db import models
from expenses.models import Expense
from django.utils import timezone

# Create your models here.
class Branch(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.name
    

class Employee(models.Model):
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    totalSalary = models.DecimalField(max_digits=10, decimal_places=2)
    date_of_joining = models.DateField()
    IBAN = models.CharField(max_length=100)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    
    def __str__(self) -> str:
        return self.name
    
    

class Suppliers(models.Model):
    name = models.CharField(max_length=100)
    IBAN = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    PID = models.CharField(max_length=100, blank=True, null=True)
    own_money = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    
    def __str__(self) -> str:
        return self.name
    
class SupplierPaymentEntry(models.Model):
    supplier = models.ForeignKey(Suppliers, on_delete=models.CASCADE, related_name='payment_entries')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    entry_date = models.DateField(default=timezone.now)
    description = models.TextField(blank=True, null=True)
    
    def save(self, *args, **kwargs):
        # Update supplier's own_money when entry is created
        self.supplier.own_money -= self.amount
        self.supplier.save()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Entry for {self.supplier.name} - {self.amount}"

    
