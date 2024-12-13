from rest_framework import serializers
from Module_niveau.models import Module_niveau
from Niveau.models import Niveau
from Module.models import Module

class Module_niveauSerializer(serializers.ModelSerializer):
    id_module = serializers.PrimaryKeyRelatedField(queryset=Module.objects.all())
    id_niveau = serializers.PrimaryKeyRelatedField(queryset=Niveau.objects.all())

    class Meta:
        model = Module_niveau
        fields = ['id_module', 'id_niveau']
