from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UniteSerializer 
from Unite.models import Unite
from Departement.models import Departement
from django.shortcuts import get_object_or_404
from Departement.api.serializers import DepartementSerializer


@api_view(['POST'])
def addUnite(request):
    if request.method == 'POST':
        serializer = UniteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def UniteList(request):
    unites = Unite.objects.all()
    serializer = UniteSerializer(unites, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
def deleteUnite(request, id_unite=None):
    if request.method == 'DELETE':
        try:
            unite = Unite.objects.get(id_unite=id_unite)
            unite.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Unite.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET', 'PUT'])
def updateUnite(request, id_unite=None):
    unite = get_object_or_404(Unite, id_unite=id_unite)
    if request.method == 'PUT':
        serializer = UniteSerializer(instance=unite, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        serializer = UniteSerializer(unite)
        return Response(serializer.data)


@api_view(['GET'])
def DepartementList(request):
    departements = Departement.objects.all()
    serializer = DepartementSerializer(departements, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)