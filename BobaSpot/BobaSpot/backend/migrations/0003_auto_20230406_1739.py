# Generated by Django 3.1.3 on 2023-04-06 17:39

import django.contrib.auth.models
import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion
import uuid


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
                ('opening_hour', models.TimeField(blank=True)),
                ('closing_hour', models.TimeField(blank=True)),
                ('rating', models.IntegerField(blank=True, null=True)),
                ('ad_image_url', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=100), blank=True, null=True, size=None)),
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
            name='Customer',
            fields=[
                ('customuser_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='backend.customuser')),
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
                ('image_url', models.CharField(blank=True, max_length=100, null=True)),
                ('boba_shop', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.bobashop')),
            ],
            options={
                'unique_together': {('boba_shop', 'drink_name')},
            },
        ),
        migrations.AlterField(
            model_name='customuser',
            name='image_url',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.CreateModel(
            name='Reviews',
            fields=[
                ('review_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('text', models.CharField(max_length=500)),
                ('rating', models.IntegerField(blank=True, null=True)),
                ('image_url', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=100), blank=True, null=True, size=None)),
                ('drink', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='backend.drink')),
                ('review_top_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='backend.reviews')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='backend.customer')),
            ],
        ),
    ]
