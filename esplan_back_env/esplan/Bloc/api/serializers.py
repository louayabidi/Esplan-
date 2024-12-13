from rest_framework import serializers
from Bloc.models import Bloc

class BlocSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bloc
        fields = '__all__'
