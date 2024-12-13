from django.db import models

class Departement(models.Model):
    id_departement = models.AutoField(primary_key=True)
    nom_departement = models.CharField(max_length=255)

    def __str__(self):
        return self.nom_departement
