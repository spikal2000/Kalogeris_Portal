from django.db import models
from expenses.models import Expense

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
    ownMoney = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    last_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    def __str__(self) -> str:
        return self.name
    
    def add_expense(self, amount):
        """Helper method to safely add an expense"""
        self.ownMoney = (self.ownMoney or 0) + amount
        self.save()
    
    def subtract_payment(self, amount):
        """Helper method to safely subtract a payment"""
        self.ownMoney = max(0, (self.ownMoney or 0) - amount)
        self.save()
