from django.db import models 
from Salle.models import Salle
from Users.models import AppUser


class Surveillance(models.Model):
    id_surveillance = models.AutoField(primary_key=True)
    date_surveillance = models.DateTimeField()
    id_salle = models.ForeignKey(Salle, on_delete=models.CASCADE)
    user_id = models.ForeignKey(AppUser, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.date_surveillance)
