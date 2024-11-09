from django import forms
from django.contrib.auth.models import User
from .models import Suppliers



from django import forms


class SupplierForm(forms.ModelForm):
    class Meta:
        model = Suppliers
        fields = ['name', 'IBAN', 'description', 'PID']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'IBAN': forms.TextInput(attrs={'class': 'form-control'}),
            'description': forms.Textarea(attrs={'class': 'form-control'}),
            'PID': forms.TextInput(attrs={'class': 'form-control'}),
        }