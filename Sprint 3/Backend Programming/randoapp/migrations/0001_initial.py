# Generated by Django 3.2.7 on 2021-09-07 04:10

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Status',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='uploaded_image/')),
                ('ok', models.PositiveIntegerField()),
                ('notok', models.PositiveIntegerField()),
                ('uploadState', models.BooleanField()),
                ('timeLeft', models.DateTimeField()),
            ],
        ),
    ]
