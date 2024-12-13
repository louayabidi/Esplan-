from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from Niveau.models import Niveau
from .serializers import NiveauSerializer

@api_view(['POST'])
def addNiveau(request):
    serializer = NiveauSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def displayallNiveaux(request):
    niveaux = Niveau.objects.all()
    serializer = NiveauSerializer(niveaux, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET', 'PUT'])
def updateNiveau(request, id):
    niveau = get_object_or_404(Niveau, id_niveau=id)
    if request.method == 'PUT':
        serializer = NiveauSerializer(instance=niveau, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        serializer = NiveauSerializer(niveau)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['DELETE', 'GET'])
def deleteNiveau(request, id):
    niveau = get_object_or_404(Niveau, id_niveau=id)
    if request.method == 'DELETE':
        niveau.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'GET':
        serializer = NiveauSerializer(niveau)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def niveau_list(request):
    niveaux = Niveau.objects.all()
    serializer = NiveauSerializer(niveaux, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getNiveau(request, id):
    niveau = get_object_or_404(Niveau, id_niveau=id)
    serializer = NiveauSerializer(niveau)
    return Response(serializer.data, status=status.HTTP_200_OK)

    