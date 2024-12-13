from rest_framework import serializers
from Module.models import Module
class ModuleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Module
        fields = '__all__'
