# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-03 02:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('entries', '0005_auto_20171129_0041'),
    ]

    operations = [
        migrations.AddField(
            model_name='entry',
            name='cashflow_type',
            field=models.CharField(choices=[('Income', 'Income'), ('Expense', 'Expense')], default='Expense', max_length=10),
            preserve_default=False,
        ),
    ]
