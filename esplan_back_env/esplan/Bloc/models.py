from django.db import models

class Bloc(models.Model):
    id_bloc = models.AutoField(primary_key=True)
    nom_bloc = models.CharField(max_length=255)
    nbretage = models.IntegerField()

    def __str__(self):
        return self.nom_bloc
