# Generated by Django 5.1.1 on 2024-09-20 06:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ProductOrders', '0008_alter_productorder_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='supplier',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='product',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
    ]
