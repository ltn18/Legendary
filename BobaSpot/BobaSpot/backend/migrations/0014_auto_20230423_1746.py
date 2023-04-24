# Generated by Django 3.2 on 2023-04-23 17:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0013_auto_20230422_0130'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='is_shop_owner',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='drink',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]