# Generated by Django 3.1.3 on 2023-04-02 01:16

import django.contrib.auth.models
import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_auto_20230401_0305'),
    ]

    operations = [
        migrations.CreateModel(
            name='BobaShop',
            fields=[
                ('customuser_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='backend.customuser')),
                ('shop_name', models.CharField(max_length=50)),
                ('telephone', models.CharField(max_length=50)),
                ('address', models.CharField(max_length=50)),
                ('location', models.CharField(max_length=50)),
                ('rating', models.IntegerField(blank=True, null=True)),
                ('ad_image_url', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=50), blank=True, null=True, size=None)),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('backend.customuser',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Drink',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('drink_name', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=500)),
                ('type', models.CharField(max_length=50)),
                ('image_url', models.CharField(blank=True, max_length=50, null=True)),
                ('boba_shop', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.bobashop')),
            ],
            options={
                'unique_together': {('boba_shop', 'drink_name')},
            },
        ),
    ]
