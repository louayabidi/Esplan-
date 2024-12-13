from django.urls import path
from . import views

urlpatterns = [
    path('addSession/', views.addSession, name='add_session'),
    path('displayall/', views.displayall),
    path('updateSession/<int:id_session>/', views.updateSession,name='updateSession'),
    path('deleteSession/<int:id_session>/', views.deleteSession, name='deleteSession'),
]
