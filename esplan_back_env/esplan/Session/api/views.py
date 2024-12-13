from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import SessionSerializer
from Session.models import Session
from django.shortcuts import get_object_or_404


@api_view(['POST'])
def addSession(request):
    serializer = SessionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def displayall(request):
    session = Session.objects.all()  # Correct usage of model name
    serializer = SessionSerializer(session, many=True)  # Use serializer instance
    return Response(serializer.data, status=status.HTTP_200_OK) 

    
@api_view(['GET', 'PUT'])
def updateSession(request, id_session=None):
    session = get_object_or_404(Session, id_session=id_session)
    if request.method == 'PUT':
        serializer = SessionSerializer(instance=session, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        serializer = SessionSerializer(session)
        return Response(serializer.data)



@api_view(['DELETE', 'GET'])
def deleteSession(request, id_session=None):
    if request.method == 'DELETE':
        try:
            session = Session.objects.get(id_session=id_session)
            session.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Session.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    elif request.method == 'GET':
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)  # Method not allowed for GET requests

