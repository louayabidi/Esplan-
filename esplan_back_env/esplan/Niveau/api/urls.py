from django.urls import path
from . import views

urlpatterns = [
    path('addNiveau/', views.addNiveau, name='add_Niveau'),
    path('displayallNiveaux/', views.displayallNiveaux, name='display_all_niveaux'),
    path('updateNiveau/<int:id>/', views.updateNiveau, name='updateNiveau'),
    path('deleteNiveau/<int:id>/', views.deleteNiveau, name='deleteNiveau'),
    path('niveau_list/', views.displayallNiveaux, name='niveau_list'),  # Use displayallNiveaux for listing
    path('Niveau/<int:id>/', views.getNiveau, name='getNiveau'),
]
