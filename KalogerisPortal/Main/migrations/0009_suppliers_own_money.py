# Generated by Django 5.1.3 on 2024-11-22 16:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Main', '0008_remove_suppliers_last_balance_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='suppliers',
            name='own_money',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]
