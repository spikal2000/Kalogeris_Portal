# Generated by Django 5.1.1 on 2024-09-23 09:10

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Main', '0004_rename_surname_employee_surname_and_more'),
        ('ProductOrders', '0009_product_supplier_alter_product_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='supplier',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='Main.suppliers'),
        ),
    ]
