# Generated by Django 5.0.6 on 2024-07-19 10:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0016_remove_product_customer'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='customer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='product_customer', to='ecommerce.customer'),
        ),
    ]
