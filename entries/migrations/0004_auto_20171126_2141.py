# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-26 21:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('entries', '0003_auto_20171120_1002'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entry',
            name='frequency',
            field=models.SmallIntegerField(choices=[('One-Off', 'One-Off'), ('Weekly', 'Weekly'), ('Fortnightly', 'Fortnightly'), ('Monthly', 'Monthly'), ('Quarterly', 'Quarterly'), ('Half-Yearly', 'Half-Yearly'), ('Yearly', 'Yearly')]),
        ),
    ]
