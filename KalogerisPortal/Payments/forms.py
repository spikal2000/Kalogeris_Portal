from django import forms
from .models import Payments
from django.apps import apps


class add_payments(forms.ModelForm):
    class Meta:
        model = Payments
        fields = ["amount", "supplier"]
        widgets = {
            "amount": forms.NumberInput(attrs={"class": "form-control"}),
            "supplier": forms.Select(attrs={'class': 'form-control'}),
        }

    def __init__(self, *args, **kwargs):
        super(add_payments, self).__init__(*args, **kwargs)

        Suppliers = apps.get_model('Main', 'Suppliers')

        self.fields['supplier'].queryset = Suppliers.objects.all()

