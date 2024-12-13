from rest_framework import serializers
from Contrainte.models import Contrainte

class ContrainteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contrainte
        fields = '__all__'
