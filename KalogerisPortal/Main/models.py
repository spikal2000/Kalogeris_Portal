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
    date_of_joining = models.DateField()
    user_id = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    
