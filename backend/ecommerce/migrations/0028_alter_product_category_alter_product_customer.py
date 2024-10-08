# Generated by Django 5.0.6 on 2024-07-31 06:52

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0027_alter_customer_mobile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='category_product', to='ecommerce.productcategory'),
        ),
        migrations.AlterField(
            model_name='product',
            name='customer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='product_customer', to='ecommerce.customer'),
        ),
    ]
