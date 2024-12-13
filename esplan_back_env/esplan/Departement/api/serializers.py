from rest_framework import serializers
from Departement.models import Departement
from Unite.models import Unite

class DepartementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departement
        fields = '__all__'




class UniteSerializer(serializers.ModelSerializer):
    nom_departement = serializers.CharField(source='id_departement.nom_departement', read_only=True)

    class Meta:
        model = Unite
        fields = ['id_unite', 'nom_unite', 'id_departement', 'nom_departement']