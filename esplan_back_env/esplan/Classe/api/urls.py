from django.urls import path
from .import views

urlpatterns = [
    path('addClasse/', views.addClasse, name='add_classe'),
    path('displayAllClasses/', views.displayAllClasses, name='display_all_classes'),
    path('updateClasse/<int:id>/', views.updateClasse, name='update_classe'),
    path('deleteClasse/<int:id>/', views.deleteClasse, name='delete_classe'),
    path('classe_list/', views.classe_list, name='classe_list'),
    path('getClasse/<int:id>/', views.getClasse, name='get_classe'),
]
