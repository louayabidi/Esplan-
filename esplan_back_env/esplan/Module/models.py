from django.db import models

class Module(models.Model):
    id_module = models.AutoField(primary_key=True)
    nom_module = models.CharField(max_length=255)
    duree_module = models.IntegerField()


    def __str__(self):
        return self.nom_module
