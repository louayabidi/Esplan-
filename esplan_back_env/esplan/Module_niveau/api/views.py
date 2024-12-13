from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import Module_niveauSerializer
from Module_niveau.models import Module_niveau
from django.shortcuts import get_object_or_404


@api_view(['POST'])
def addModule_niveau(request):
    serializer = Module_niveauSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def displayall(request):
    module = Module_niveau.objects.all()  # Correct usage of model name
    serializer = Module_niveauSerializer(module, many=True)  # Use serializer instance
    return Response(serializer.data, status=status.HTTP_200_OK) 



@api_view(['DELETE', 'GET'])
def deleteModule_niveau(request, id_module=None):
    if request.method == 'DELETE':
        try:
            module = Module_niveau.objects.get(id_module=id_module)
            module.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Module_niveau.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    elif request.method == 'GET':
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)  # Method not allowed for GET requests

