# Generated by Django 5.0.6 on 2024-07-09 10:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0002_customeraddress'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductRating',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.IntegerField()),
                ('review', models.TextField()),
                ('add_time', models.DateTimeField(auto_now_add=True)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ratings_customer', to='ecommerce.customer')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_ratings', to='ecommerce.product')),
            ],
        ),
    ]
