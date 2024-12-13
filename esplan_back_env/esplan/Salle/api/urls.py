from django.urls import path
from . import views

urlpatterns = [
    path('addSalle/', views.addSalle, name='addSalle'),
    path('displayAllS',  views.displayAllSalles, name='displayAllSalles'),
    path('updateSalle/<int:id_salle>/',  views.updateSalle, name='updateSalle'),
    path('deleteSalle/<int:id_salle>/',  views.deleteSalle, name='deleteSalle'),
     path('<int:id_salle>/', views.getOneById, name='getOneById'),
    path('<int:id_salle>/', views.getOneById, name='getOneById'),
    path('examen/<int:id_salle>/', views.getExamenById, name='getExamenById'),
    path('getsallebyid/<int:id_salle>/', views.getsallebyid, name='getsallebyid'),
]