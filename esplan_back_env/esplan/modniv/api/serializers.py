from rest_framework import serializers
from modniv.models import Modniv # Ensure this is the correct model import
from Niveau.models import Niveau
from Module.models import Module

class ModnivSerializer(serializers.ModelSerializer):
    idmn = serializers.IntegerField(read_only=True)  # Ensure this matches your model field
    id_module = serializers.PrimaryKeyRelatedField(queryset=Module.objects.all())
    id_niveau = serializers.PrimaryKeyRelatedField(queryset=Niveau.objects.all())

    class Meta:
        model = Modniv  # Updated to use the correct model name
        fields = ['idmn', 'id_module', 'id_niveau']

