from django.db import models
from Departement.models import Departement

class Unite(models.Model):
    id_unite = models.AutoField(primary_key=True)
    nom_unite = models.CharField(max_length=255)
    id_departement = models.ForeignKey(Departement, on_delete=models.CASCADE)

    def __str__(self):
        return self.nom_unite
