from django.urls import path
from . import views

urlpatterns = [
    path('addUnite/', views.addUnite, name='add_unite'),
    path('unites/', views.UniteList),
    path('deleteUnite/<int:id_unite>/', views.deleteUnite, name='delete_unite'),
    path('updateUnite/<int:id_unite>/', views.updateUnite, name='update_unite'),
]
