# Generated by Django 4.2.1 on 2023-11-05 07:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Insects', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fruitfly',
            name='time_stamp',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
