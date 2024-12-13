from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import BlocSerializer
from Bloc.models import Bloc

@api_view(['POST'])
def addBloc(request):
    serializer = BlocSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def displayAllBlocs(request):
    blocs = Bloc.objects.all()
    serializer = BlocSerializer(blocs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET', 'PUT'])
def updateBloc(request, id_bloc=None):
    bloc = get_object_or_404(Bloc, id_bloc=id_bloc)
    if request.method == 'PUT':
        serializer = BlocSerializer(instance=bloc, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        serializer = BlocSerializer(bloc)
        return Response(serializer.data)

@api_view(['DELETE', 'GET'])
def deleteBloc(request, id_bloc=None):
    if request.method == 'DELETE':
        try:
            bloc = Bloc.objects.get(id_bloc=id_bloc)
            bloc.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Bloc.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    elif request.method == 'GET':
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
