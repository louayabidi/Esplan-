from rest_framework import serializers
from Surveillance.models import Surveillance
from Salle_examen.models import Salle_examen
from Examen.models import Examen

class SurveillanceSerializer(serializers.ModelSerializer):
    nom_examen = serializers.SerializerMethodField()

    class Meta:
        model = Surveillance
        fields = ['id_surveillance', 'date_surveillance', 'id_salle', 'user_id', 'nom_examen']

    def get_nom_examen(self, obj):
        salle_examen = Salle_examen.objects.filter(id_salle=obj.id_salle, date_salle=obj.date_surveillance).first()
        return salle_examen.id_examen.nom_examen if salle_examen and salle_examen.id_examen else None

    def update(self, instance, validated_data):
        # Allow only the 'user_id' field to be updated
        instance.user_id = validated_data.get('user_id', instance.user_id)
        instance.save()
        return instance