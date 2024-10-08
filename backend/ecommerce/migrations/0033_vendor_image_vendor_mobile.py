# Generated by Django 5.0.6 on 2024-08-07 03:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0032_alter_customeraddress_default_address'),
    ]

    operations = [
        migrations.AddField(
            model_name='vendor',
            name='image',
            field=models.ImageField(default='no-image.png', upload_to='seller/image'),
        ),
        migrations.AddField(
            model_name='vendor',
            name='mobile',
            field=models.CharField(max_length=10, null=True),
        ),
    ]
