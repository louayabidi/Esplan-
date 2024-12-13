from django.urls import path
from . import views

urlpatterns = [
    path('displayAllBlocs/', views.displayAllBlocs),
    path('addBloc/', views.addBloc, name='addBloc'),
    path('updateBloc/<int:id_bloc>/', views.updateBloc, name='updateBloc'),
    path('deleteBloc/<int:id_bloc>/', views.deleteBloc, name='deleteBloc'),
]
