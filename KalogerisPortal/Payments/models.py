from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import User

# Create your models here.
class Payments(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    supplier = models.ForeignKey('Main.Suppliers', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
     
    
    def __str__(self):
        return f"{self.user.username} - {self.supplier.name} - {self.id} - {self.amount} "

