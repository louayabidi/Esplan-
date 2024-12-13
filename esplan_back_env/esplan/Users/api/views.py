from django.core.mail import send_mail
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password
from rest_framework.decorators import api_view
from Users.models import AppUser
from django.shortcuts import get_object_or_404
from django.contrib.auth.tokens import default_token_generator
from rest_framework.permissions import AllowAny
from .serializers import ResetPasswordSerializer
from django.contrib.auth import update_session_auth_hash

class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)
	##
	def post(self, request):
		data = request.data
		assert validate_email(data)
		assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user)
			return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	##
	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)


@api_view(['GET'])
def displayall(request):
    users = AppUser.objects.all()  # Retrieve all users from AppUser model
    serializer = UserSerializer(users, many=True)  # Serialize the users
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET', 'PUT'])
def updateUsers(request, user_id=None):
    user = get_object_or_404(AppUser, user_id=user_id)
    if request.method == 'PUT':
        serializer = UserSerializer(instance=user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)



@api_view(['DELETE'])
def deleteUsers(request, user_id=None):
    try:
        user = AppUser.objects.get(user_id=user_id)
        user.delete()
        return Response({'message': 'User deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except AppUser.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def getonebyid(request, user_id):
    user = get_object_or_404(AppUser, user_id=user_id)
    serializer = UserSerializer(user)
    return Response(serializer.data)

class ForgotPassword(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        email = request.data.get('email')
        try:
            user = AppUser.objects.get(email=email)
        except AppUser.DoesNotExist:
            return Response({'error': 'L\'e-mail n\'existe pas dans notre base de données.'}, status=status.HTTP_404_NOT_FOUND)
        
        # Générer un token pour la réinitialisation du mot de passe
        token = default_token_generator.make_token(user)
        reset_url = f"http://127.0.0.1:3000/#/reset-password/{user.pk}/{token}/"
        
        # Envoyer un e-mail
        send_mail(
            subject='Réinitialisation de mot de passe',
            message=f'Cliquez sur le lien pour réinitialiser votre mot de passe : {reset_url}',
            from_email='noreply@myapp.com',
            recipient_list=[email],
        )
        
        return Response({'message': 'Un e-mail de réinitialisation de mot de passe a été envoyé.'}, status=status.HTTP_200_OK)




class ResetPassword(APIView):
    permission_classes = [AllowAny]

    def post(self, request, user_id, token):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            new_password = serializer.validated_data.get('new_password')

            try:
                user = get_user_model().objects.get(user_id=user_id)
            except get_user_model().DoesNotExist:
                return Response({'error': 'Utilisateur non trouvé.'}, status=status.HTTP_404_NOT_FOUND)

            if not default_token_generator.check_token(user, token):
                return Response({'error': 'Token invalide.'}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(new_password)
            user.save()
            update_session_auth_hash(request, user)  # Important pour mettre à jour la session

            return Response({'message': 'Mot de passe réinitialisé avec succès.'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
