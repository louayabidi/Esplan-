from django.db import models
from Niveau.models import Niveau

class Classe(models.Model):
    id_classe = models.AutoField(primary_key=True)
    NbEtudiantClasse = models.IntegerField()
    id_niveau = models.ForeignKey(Niveau, on_delete=models.CASCADE)
    libelleClasse = models.CharField(max_length=255)

    def __str__(self):
        return self.nom_classe


