# modniv/models.py
from django.db import models
from Module.models import Module
from Niveau.models import Niveau

class Modniv(models.Model):
    idmn = models.AutoField(primary_key=True)
    id_module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='modniv_modules')
    id_niveau = models.ForeignKey(Niveau, on_delete=models.CASCADE, related_name='modniv_niveaux')

    def __str__(self):
        return f"Modniv: {self.idmn} (Module: {self.id_module}, Niveau: {self.id_niveau})"

