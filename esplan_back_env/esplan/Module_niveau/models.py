from django.db import models
from Niveau.models import Niveau
from Module.models import Module

class Module_niveau(models.Model):
    id_niveau = models.ForeignKey(Niveau, on_delete=models.CASCADE)
    id_module = models.ForeignKey(Module, on_delete=models.CASCADE, primary_key=True)

    def __str__(self):
        return f'{self.id_module} - {self.id_niveau}'
