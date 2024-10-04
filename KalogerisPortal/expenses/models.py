from django.db import models


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