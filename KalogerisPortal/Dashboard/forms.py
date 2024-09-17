from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from ProductOrders.models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'description', 'image']