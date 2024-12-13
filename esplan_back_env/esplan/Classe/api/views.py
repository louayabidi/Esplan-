from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from Classe.models import Classe
from .serializers import ClasseSerializer

@api_view(['POST'])
def addClasse(request):
    serializer = ClasseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def displayAllClasses(request):
    classes = Classe.objects.all()
    serializer = ClasseSerializer(classes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET', 'PUT'])
def updateClasse(request, id): 
    classe = get_object_or_404(Classe, id_classe=id)
    if request.method == 'PUT':
        serializer = ClasseSerializer(instance=classe, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        serializer = ClasseSerializer(classe)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['DELETE', 'GET'])
def deleteClasse(request, id):
    classe = get_object_or_404(Classe, id_classe =id)
    if request.method == 'DELETE':
        classe.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'GET':
        serializer = ClasseSerializer(classe)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def classe_list(request):
    classes = Classe.objects.all()
    serializer = ClasseSerializer(classes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getClasse(request, id):
    classe = get_object_or_404(Classe, id_classe=id)
    serializer = ClasseSerializer(classe)
    return Response(serializer.data, status=status.HTTP_200_OK)
