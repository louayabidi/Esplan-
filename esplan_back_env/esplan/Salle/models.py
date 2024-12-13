from django.db import models
from Bloc.models import Bloc
from Examen.models import Examen

class Salle(models.Model):
    id_salle = models.AutoField(primary_key=True)
    nom_salle = models.CharField(max_length=255)
    capacite = models.IntegerField()
    dispo = models.BooleanField(default=True)
    id_bloc = models.ForeignKey(Bloc, on_delete=models.CASCADE)
    id_examen = models.ForeignKey(Examen,blank=True,null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.nom_salle
