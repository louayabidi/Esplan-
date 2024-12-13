from django.db import models
from Session.models import Session
from Module.models import Module

class Examen(models.Model):
    id_examen = models.AutoField(primary_key=True)
    nom_examen = models.CharField(max_length=255)
    duree_examen  = models.IntegerField()
    type_examen = models.CharField(max_length=255)
    nbrclasse  = models.IntegerField()
    id_session = models.ForeignKey(Session, on_delete=models.CASCADE)
    id_module = models.ForeignKey(Module, on_delete=models.CASCADE)


    def __str__(self):
        return self.nom_examen


	