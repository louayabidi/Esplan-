from django.urls import path
from . import views

urlpatterns = [
    path('addModule_niveau/', views.addModule_niveau, name='add_Module_niveau'),
    path('displayall/', views.displayall),
    path('deleteModule_niveau/<int:id_module>/', views.deleteModule_niveau, name='deleteModule_niveau'),
]
