from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from Unite.models import Unite
from Surveillance.models import Surveillance
from Salle.models import Salle


UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    id_unite = serializers.PrimaryKeyRelatedField(queryset=Unite.objects.all(), required=False)
    class Meta:
        model = UserModel
        fields = '__all__'
        
    def create(self, validated_data):
        user = UserModel.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password']
        )
        user.username = validated_data['username']
        user.cin = validated_data.get('cin')
        user.quota = validated_data.get('quota')
        user.role = validated_data.get('role')
        user.roleRes = validated_data.get('roleRes')
        user.identifiant = validated_data.get('identifiant')
        if 'id_unite' in validated_data:
            user.id_unite = validated_data['id_unite']
        user.image_user = validated_data.get('image_user')

        user.save()
        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def check_user(self, validated_data):
        user = authenticate(email=validated_data['email'], password=validated_data['password'])
        if not user:
            raise serializers.ValidationError('User not found')
        return user

class UserSerializer(serializers.ModelSerializer):
    image_user = serializers.ImageField(max_length=None, use_url=True)
    id_unite = serializers.PrimaryKeyRelatedField(queryset=Unite.objects.all())

    class Meta:
        model = UserModel
        fields = ('user_id','email', 'username', 'cin', 'role', 'identifiant',  'id_unite','roleRes','image_user','quota')

class ResetPasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(required=True, max_length=128)


class SalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salle
        fields = ['id_salle', 'nom']  # Inclure les champs nécessaires

class SurveillanceSerializer(serializers.ModelSerializer):
    user = UserSerializer(source='user_id', read_only=True)
    salle = UserSerializer(source='id_salle', read_only=True)

    class Meta:
        model = Surveillance
        fields = ['id_surveillance', 'date_surveillance', 'user', 'salle']