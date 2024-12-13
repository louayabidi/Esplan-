from django.urls import path
from . import views

urlpatterns = [
    path('addContrainte/', views.addContrainte, name='add_contrainte'),
    path('contraintes/', views.ContrainteList, name='contraintes'),
    path('deleteContrainte/<int:id_contrainte>/', views.deleteContrainte, name='delete_contrainte'),
    path('updateContrainte/<int:id_contrainte>/', views.updateContrainte, name='update_contrainte'),
    ]