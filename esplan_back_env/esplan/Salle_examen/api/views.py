from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import Salle_examenSerializer
from Salle_examen.models import Salle_examen
from django.shortcuts import get_object_or_404
from .services import affectation_examens_salles
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse

@api_view(['POST'])
def addSalle_examen(request):
    serializer = Salle_examenSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def displayall(request):
    salle = Salle_examen.objects.all()  # Correct usage of model name
    serializer = Salle_examenSerializer(salle, many=True)  # Use serializer instance
    return Response(serializer.data, status=status.HTTP_200_OK) 



@api_view(['DELETE', 'GET'])
def deleteSalle_examen(request, id_salle=None):
    if request.method == 'DELETE':
        try:
            salle = Salle_examen.objects.get(id_salle=id_salle)
            salle.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Salle_examen.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    elif request.method == 'GET':
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)  # Method not allowed for GET requests




@api_view(['GET', 'PUT'])
def updateSalle_examen(request, id_salle=None, id_examen=None):
    salle_examen = get_object_or_404(Salle_examen, id_salle=id_salle, id_examen=id_examen)
    
    if request.method == 'PUT':
        serializer = Salle_examenSerializer(instance=salle_examen, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'GET':
        serializer = Salle_examenSerializer(salle_examen)
        return Response(serializer.data)


@api_view(['POST'])
def generate_affectation(request):
    affectation_examens_salles()  # Generate surveillance records
    return Response({"message": "Affectation generated successfully"}, status=status.HTTP_200_OK)

@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'csrfToken': request.COOKIES['csrftoken']})