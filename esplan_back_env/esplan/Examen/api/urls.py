from django.urls import path
from . import views

urlpatterns = [
    path('addExamen/', views.addExamen, name='add_examen'),
    path('displayall/', views.displayall),
    path('updateExamen/<int:id_examen>/', views.updateExamen,name='updateExamen'),
    path('deleteExamen/<int:id_examen>/', views.deleteExamen, name='deleteExamen'),
    path('get_examen_by_id/<int:id_examen>/', views.get_examen_by_id),

]
