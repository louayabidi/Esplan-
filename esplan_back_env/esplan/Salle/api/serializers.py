from rest_framework import serializers
from Salle.models import Salle

class SalleSerializer(serializers.ModelSerializer):
    nom_bloc = serializers.CharField(source='id_bloc.nom_bloc', read_only=True)

    class Meta:
        model = Salle
        fields = ['id_salle', 'nom_salle', 'capacite', 'dispo', 'id_bloc', 'nom_bloc', 'id_examen']