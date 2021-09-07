# Generated by Django 3.2.7 on 2021-09-07 04:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('randoapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='status',
            name='notok',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='status',
            name='ok',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='status',
            name='timeLeft',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='status',
            name='uploadState',
            field=models.BooleanField(default=False),
        ),
    ]