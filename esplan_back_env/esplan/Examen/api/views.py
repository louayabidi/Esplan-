from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ExamenSerializer
from Examen.models import Examen
from django.shortcuts import get_object_or_404


@api_view(['POST'])
def addExamen(request):
    serializer = ExamenSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def displayall(request):
    examen = Examen.objects.all()  # Correct usage of model name
    serializer = ExamenSerializer(examen, many=True)  # Use serializer instance
    return Response(serializer.data, status=status.HTTP_200_OK) 

    
@api_view(['GET', 'PUT'])
def updateExamen(request, id_examen=None):
    examen = get_object_or_404(Examen, id_examen=id_examen)
    if request.method == 'PUT':
        serializer = ExamenSerializer(instance=examen, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        serializer = ExamenSerializer(examen)
        return Response(serializer.data)



@api_view(['DELETE', 'GET'])
def deleteExamen(request, id_examen=None):
    if request.method == 'DELETE':
        try:
            examen = Examen.objects.get(id_examen=id_examen)
            examen.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Examen.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    elif request.method == 'GET':
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)  # Method not allowed for GET requests


@api_view(['GET'])
def get_examen_by_id(request, id_examen):
    examen = get_object_or_404(Examen, pk=id_examen)
    serializer = ExamenSerializer(examen)
    return Response({'nom_examen': serializer.data['nom']})