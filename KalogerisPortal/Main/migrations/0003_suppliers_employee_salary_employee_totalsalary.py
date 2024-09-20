# Generated by Django 5.1.1 on 2024-09-20 06:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Main', '0002_remove_employee_date_of_birth'),
    ]

    operations = [
        migrations.CreateModel(
            name='Suppliers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('IBAN', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True, null=True)),
                ('currentMoney', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('ownMoney', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
            ],
        ),
        migrations.AddField(
            model_name='employee',
            name='salary',
            field=models.DecimalField(decimal_places=2, default=1, max_digits=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='employee',
            name='totalSalary',
            field=models.DecimalField(decimal_places=2, default=1, max_digits=10),
            preserve_default=False,
        ),
    ]
