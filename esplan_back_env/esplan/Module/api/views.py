from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ModuleSerializer
from Module.models import Module
from django.shortcuts import get_object_or_404


@api_view(['POST'])
def addModule(request):
    serializer = ModuleSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def displayall(request):
    module = Module.objects.all()  # Correct usage of model name
    serializer = ModuleSerializer(module, many=True)  # Use serializer instance
    return Response(serializer.data, status=status.HTTP_200_OK) 

    
@api_view(['GET', 'PUT'])
def updateModule(request, id_module=None):
    module = get_object_or_404(Module, id_module=id_module)
    if request.method == 'PUT':
        serializer = ModuleSerializer(instance=module, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        serializer = ModuleSerializer(module)
        return Response(serializer.data)



@api_view(['DELETE', 'GET'])
def deleteModule(request, id_module=None):
    if request.method == 'DELETE':
        try:
            module = Module.objects.get(id_module=id_module)
            module.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Module.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    elif request.method == 'GET':
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)  # Method not allowed for GET requests

