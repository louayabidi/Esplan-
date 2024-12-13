from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ModnivSerializer 
from modniv.models import Modniv 
from django.shortcuts import get_object_or_404

@api_view(['POST'])
def addModniv(request):
    serializer = ModnivSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def displayAllModniv(request):
    modniv = Modniv.objects.all()  # Updated to use Modniv
    serializer = ModnivSerializer(modniv, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET', 'PUT'])
def updateModniv(request, idmn=None):
    modniv = get_object_or_404(Modniv, idmn=idmn)  # Updated to use Modniv
    if request.method == 'PUT':
        serializer = ModnivSerializer(instance=modniv, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        serializer = ModnivSerializer(modniv)
        return Response(serializer.data)

@api_view(['DELETE'])
def deleteModniv(request, idmn=None):
    if request.method == 'DELETE':
        try:
            modniv = Modniv.objects.get(idmn=idmn)  # Updated to use Modniv
            modniv.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Modniv.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
