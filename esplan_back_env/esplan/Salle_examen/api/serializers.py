from rest_framework import serializers
from Salle_examen.models import Salle_examen
from Salle.models import Salle
from Examen.models import Examen

class Salle_examenSerializer(serializers.ModelSerializer):
    id_salle = serializers.PrimaryKeyRelatedField(queryset=Salle.objects.all())
    id_examen = serializers.PrimaryKeyRelatedField(queryset=Examen.objects.all())
    class Meta:
        model = Salle_examen
        fields = '__all__'
