from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from Salle.models import Salle
from .serializers import SalleSerializer

@api_view(['POST'])
def addSalle(request):
    serializer = SalleSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def displayAllSalles(request):
    salles = Salle.objects.all()
    serializer = SalleSerializer(salles, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET', 'PUT'])
def updateSalle(request, id_salle=None):
    salle = get_object_or_404(Salle, id_salle=id_salle)
    if request.method == 'PUT':
        serializer = SalleSerializer(instance=salle, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        serializer = SalleSerializer(salle)
        return Response(serializer.data)

@api_view(['DELETE', 'GET'])
def deleteSalle(request, id_salle=None):
    if request.method == 'DELETE':
        try:
            salle = Salle.objects.get(id_salle=id_salle)
            salle.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Salle.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    elif request.method == 'GET':
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['GET'])
def getOneById(request, id_salle=None):
    # Récupérer la salle par son id
    salle = get_object_or_404(Salle, id_salle=id_salle)
    
    # Créer un dictionnaire contenant les informations de la salle et le nom de l'examen
    salle_data = {
        'id_salle': salle.id_salle,
        'nom_salle': salle.nom_salle,
        'capacite': salle.capacite,
        'dispo': salle.dispo,
        'id_bloc': salle.id_bloc.id,  # Ou afficher d'autres champs de Bloc si nécessaire
        'nom_examen': salle.get_nom_examen()  # Utilise la méthode pour obtenir le nom de l'examen
    }

    return Response(salle_data, status=status.HTTP_200_OK)



@api_view(['GET'])
def getExamenById(request, id_salle=None):
    # Récupérer la salle par son ID
    salle = get_object_or_404(Salle, id_salle=id_salle)
    
    # Récupérer le nom de l'examen à partir de la méthode de la salle
    nom_examen = salle.get_nom_examen()

    # Retourner uniquement le nom de l'examen
    return Response({'nom_examen': nom_examen}, status=status.HTTP_200_OK)



@api_view(['GET'])
def getsallebyid(request, id_salle):
    user = get_object_or_404(Salle, id_salle=id_salle)
    serializer = SalleSerializer(user)
    return Response(serializer.data)