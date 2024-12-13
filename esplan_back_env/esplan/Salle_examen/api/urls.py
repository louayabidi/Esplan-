from django.urls import path
from . import views

urlpatterns = [
    path('addSalle_examen/', views.addSalle_examen, name='add_Salle_examen'),
    path('displayall/', views.displayall),
    path('deleteSalle_examen/<int:id_salle>/', views.deleteSalle_examen, name='deleteSalle_examen'),
    path('affectation_examens_salles/', views.generate_affectation, name='affectation_examens_salles'),
    path('updateSalle_examen/<int:id_salle>/<int:id_examen>/', views.updateSalle_examen, name='update-salle-examen'),
   

]
