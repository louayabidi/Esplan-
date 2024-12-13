from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from Contrainte.models import Contrainte
from .serializers import ContrainteSerializer

@api_view(['POST'])
def addContrainte(request):
    if request.method == 'POST':
        serializer = ContrainteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def ContrainteList(request):
    contraintes = Contrainte.objects.all()
    serializer = ContrainteSerializer(contraintes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
def deleteContrainte(request, id_contrainte):
    try:
        contrainte = Contrainte.objects.get(id_contrainte=id_contrainte)
        contrainte.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Contrainte.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET', 'PUT'])
def updateContrainte(request, id_contrainte):
    contrainte = get_object_or_404(Contrainte, id_contrainte=id_contrainte)
    if request.method == 'PUT':
        serializer = ContrainteSerializer(instance=contrainte, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        serializer = ContrainteSerializer(contrainte)
        return Response(serializer.data)
