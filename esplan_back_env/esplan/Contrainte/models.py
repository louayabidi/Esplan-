from django.db import models
from Users.models import AppUser

class Contrainte(models.Model):
    ENCEINTE = 'enceinte'
    CONGE = 'congé'
    CONGE_MALADIE = 'congé de maladie'
    ETAT_SANTE = 'état de santé'

    NOM_CONTRAINTE_CHOICES = [
        (ENCEINTE, 'Enceinte'),
        (CONGE, 'Congé'),
        (CONGE_MALADIE, 'Congé de maladie'),
        (ETAT_SANTE, 'État de santé'),
    ]

    id_contrainte = models.AutoField(primary_key=True)
    nom_contrainte = models.CharField(max_length=255, choices=NOM_CONTRAINTE_CHOICES)
    type_contrainte = models.CharField(max_length=255)
    date_debut_contrainte = models.DateTimeField()
    date_fin_contrainte = models.DateTimeField()
    status_contrainte = models.CharField(max_length=255)
    user_id = models.ForeignKey(AppUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.nom_contrainte
