from django import forms
from django.contrib.auth.models import User
from .models import Suppliers, SupplierPaymentEntry



class SupplierForm(forms.ModelForm):
    class Meta:
        model = Suppliers
        fields = ['name', 'IBAN', 'description', 'PID', 'own_money']
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'IBAN': forms.TextInput(attrs={'class': 'form-control'}),
            'description': forms.Textarea(attrs={'class': 'form-control'}),
            'PID': forms.TextInput(attrs={'class': 'form-control'}),
            'own_money': forms.NumberInput(attrs={'class': 'form-control', 'step': '0.01'}),
        }


class SupplierPaymentEntryForm(forms.ModelForm):
    class Meta:
        model = SupplierPaymentEntry
        fields = ['supplier', 'amount', 'entry_date', 'description']
        widgets = {
            'entry_date': forms.DateInput(attrs={'type': 'date'}),
            'description': forms.Textarea(attrs={'rows': 3}),
        }