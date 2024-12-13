# Generated by Django 4.2.5 on 2024-11-06 06:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Session', '0001_initial'),
        ('Module', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Examen',
            fields=[
                ('id_examen', models.AutoField(primary_key=True, serialize=False)),
                ('nom_examen', models.CharField(max_length=255)),
                ('duree_examen', models.IntegerField()),
                ('type_examen', models.CharField(max_length=255)),
                ('nbrclasse', models.IntegerField()),
                ('id_module', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Module.module')),
                ('id_session', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Session.session')),
            ],
        ),
    ]