# Generated by Django 5.1.1 on 2024-09-15 16:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ProductOrders', '0003_productorder_user_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='category',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
    ]
