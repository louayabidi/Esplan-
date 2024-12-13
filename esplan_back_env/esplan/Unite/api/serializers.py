from rest_framework import serializers
from Unite.models import Unite


class UniteSerializer(serializers.ModelSerializer):
    nom_departement = serializers.CharField(source='id_departement.nom_departement', read_only=True)

    class Meta:
        model = Unite
        fields = ['id_unite', 'nom_unite', 'id_departement', 'nom_departement']