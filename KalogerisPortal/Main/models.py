from django.db import models

# Create your models here.
class Branch(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.name
    

class Employee(models.Model):
    name = models.CharField(max_length=100)
    Surname = models.CharField(max_length=100)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    totalSalary = models.DecimalField(max_digits=10, decimal_places=2)
    date_of_joining = models.DateField()
    user_id = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    
    def __str__(self) -> str:
        return self.name
    
    

class Suppliers(models.Model):
    name = models.CharField(max_length=100)
    IBAN = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    currentMoney = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    ownMoney = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    def __str__(self) -> str:
        return self.name
    

