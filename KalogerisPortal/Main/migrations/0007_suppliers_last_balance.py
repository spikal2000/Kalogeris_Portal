# Generated by Django 5.1.1 on 2024-10-24 11:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Main', '0006_suppliers_pid'),
    ]

    operations = [
        migrations.AddField(
            model_name='suppliers',
            name='last_balance',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]