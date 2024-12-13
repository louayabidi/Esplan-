from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import DepartementSerializer
from Departement.models import Departement
from django.shortcuts import render, get_object_or_404


@api_view(['POST'])
def addDep(request):
 if request.method == 'POST':
    serializer = DepartementSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response (serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 


@api_view(['GET'])
def DepartementList(request):
    dep = Departement.objects.all()  # Correct usage of model name
    serializer = DepartementSerializer(dep, many=True)  # Use serializer instance
    return Response(serializer.data, status=status.HTTP_200_OK) 



@api_view(['DELETE', 'GET'])
def deleteDep(request, id_departement=None):
    if request.method == 'DELETE':
        try:
            dep = Departement.objects.get(id_departement=id_departement)
            dep.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Departement.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    elif request.method == 'GET':
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)  # Method not allowed for GET requests
    



@api_view(['GET', 'PUT'])
def updateDep(request, id_departement=None):
    dep = get_object_or_404(Departement, id_departement=id_departement)
    if request.method == 'PUT':
        serializer = DepartementSerializer(instance=dep, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        serializer = DepartementSerializer(dep)
        return Response(serializer.data)