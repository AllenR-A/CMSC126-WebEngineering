# Generated by Django 3.2.7 on 2021-09-07 05:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('randoapp', '0002_auto_20210907_1219'),
    ]

    operations = [
        migrations.AlterField(
            model_name='status',
            name='timeLeft',
            field=models.TextField(null=True),
        ),
    ]