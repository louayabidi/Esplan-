from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.shortcuts import render
from Surveillance.models import Surveillance
from .serializers import SurveillanceSerializer
from .services import assign_profs_to_surveillance
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse


@api_view(['POST'])
def addSurveillance(request):
    serializer = SurveillanceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def displayAllSurveillances(request):
    surveillances = Surveillance.objects.all()
    serializer = SurveillanceSerializer(surveillances, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET', 'PUT'])
def updateSurveillance(request, id):
    surveillance = get_object_or_404(Surveillance, id_surveillance=id)
    if request.method == 'PUT':
        serializer = SurveillanceSerializer(instance=surveillance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        serializer = SurveillanceSerializer(surveillance)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['DELETE', 'GET'])
def deleteSurveillance(request, id):
    surveillance = get_object_or_404(Surveillance, id_surveillance=id)
    if request.method == 'DELETE':
        surveillance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'GET':
        serializer = SurveillanceSerializer(surveillance)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getSurveillance(request, id):
    surveillance = get_object_or_404(Surveillance, id_surveillance=id)
    serializer = SurveillanceSerializer(surveillance)
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['GET'])
def surveillance_list(request):
    surveillances = Surveillance.objects.all()
    serializer = SurveillanceSerializer(surveillances, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['POST'])
def generateSurveillance(IsAuthenticated):
    assign_profs_to_surveillance()  # Generate surveillance records
    return Response({"message": "Surveillances generated successfully"}, status=200)


@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'csrfToken': request.COOKIES['csrftoken']})