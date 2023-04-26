# Generated by Django 3.2 on 2023-04-24 02:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0015_merge_20230424_0215'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bobashop',
            name='latitude',
            field=models.DecimalField(blank=True, decimal_places=14, default=0, max_digits=19, null=True),
        ),
        migrations.AlterField(
            model_name='bobashop',
            name='longitude',
            field=models.DecimalField(blank=True, decimal_places=14, default=0, max_digits=19, null=True),
        ),
    ]