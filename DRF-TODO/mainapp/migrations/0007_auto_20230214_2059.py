# Generated by Django 3.2.16 on 2023-02-14 20:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0006_alter_project_employee'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='employee',
        ),
        migrations.AddField(
            model_name='serviceuser',
            name='project',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='mainapp.project'),
        ),
    ]