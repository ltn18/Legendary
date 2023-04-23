# Generated by Django 3.1.3 on 2023-04-21 23:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0010_auto_20230409_1858'),
    ]

    operations = [
        migrations.AddField(
            model_name='bobashop',
            name='latitude',
            field=models.DecimalField(decimal_places=10, default=0, max_digits=19),
        ),
        migrations.AddField(
            model_name='bobashop',
            name='longtitude',
            field=models.DecimalField(decimal_places=10, default=0, max_digits=19),
        ),
        migrations.AlterField(
            model_name='drink',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]