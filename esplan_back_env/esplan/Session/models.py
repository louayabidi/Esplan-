from django.db import models

class Session(models.Model):
    id_session = models.AutoField(primary_key=True)
    nom_session = models.CharField(max_length=255)
    type_session = models.CharField(max_length=255)
    date_d = models.DateField(default='2024-01-01') 
    date_f = models.DateField(default='2024-01-02') 
    current_affectation_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.nom_session
