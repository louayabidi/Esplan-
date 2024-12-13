from django.urls import path
from . import views

urlpatterns = [
    path('add/', views.addModniv, name='add_modniv'),
    path('all/', views.displayAllModniv, name='display_all_modniv'),
    path('update/<int:idmn>/', views.updateModniv, name='update_modniv'),
    path('delete/<int:idmn>/', views.deleteModniv, name='delete_modniv'),
]