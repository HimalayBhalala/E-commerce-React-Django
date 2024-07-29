# Generated by Django 5.0.6 on 2024-07-29 05:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0021_product_usd_price_alter_product_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='price',
            field=models.FloatField(default=0, max_length=10),
        ),
        migrations.AlterField(
            model_name='product',
            name='usd_price',
            field=models.FloatField(default=83, max_length=10),
        ),
    ]
