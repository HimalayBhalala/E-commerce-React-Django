# Generated by Django 5.0.6 on 2024-07-19 04:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0012_product_customer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='customer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cutomer_product', to='ecommerce.customer'),
        ),
    ]
