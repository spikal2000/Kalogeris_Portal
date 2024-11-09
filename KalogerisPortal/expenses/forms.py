from django import forms
from django.contrib.auth.models import User
from .models import Expense
from Main.models import Suppliers, Branch
from django.apps import apps



#expenses
class add_expense(forms.ModelForm):
    class Meta: 
        model = Expense
        fields = ['supplier', 'amount', 'date', 'paid', 'branch']
        widgets = {
            'supplier': forms.Select(attrs={'class': 'form-control'}),
            'amount': forms.NumberInput(attrs={'class': 'form-control'}),
            'date': forms.DateInput(attrs={'class': 'form-control', 'type': 'date', 'format': '%d-%m-%Y'}),
            'paid': forms.CheckboxInput(attrs={'class': 'form-control'}),
            'branch': forms.Select(attrs={'class': 'form-control'}),
        }

    def __init__(self, *args, **kwargs):
        super(add_expense, self).__init__(*args, **kwargs)
        
        Suppliers = apps.get_model('Main', 'Suppliers')
        Branch = apps.get_model('Main', 'Branch')
        
        self.fields['supplier'].queryset = Suppliers.objects.all()
        self.fields['branch'].queryset = Branch.objects.all()
        