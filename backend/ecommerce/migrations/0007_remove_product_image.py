# Generated by Django 5.0.6 on 2024-07-16 05:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0006_alter_product_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='image',
        ),
    ]
