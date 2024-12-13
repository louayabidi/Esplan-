from django.db import models

class Niveau(models.Model):
    id_niveau = models.AutoField(primary_key=True)
    libelleNiv = models.CharField(max_length=255)
    nbclasseNiv = models.IntegerField()
    specialite = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.libelleNiv

