# Generated by Django 5.0.6 on 2024-07-16 07:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0009_product_tags'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='tags',
            field=models.TextField(blank=True, default='', null=True),
        ),
    ]
