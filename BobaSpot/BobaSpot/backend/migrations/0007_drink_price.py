# Generated by Django 3.1.3 on 2023-04-06 22:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_remove_bobashop_rating'),
    ]

    operations = [
        migrations.AddField(
            model_name='drink',
            name='price',
            field=models.DecimalField(decimal_places=2, default=5.0, max_digits=10),
            preserve_default=False,
        ),
    ]
