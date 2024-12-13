from django.urls import path
from . import views

urlpatterns = [
    path('addModule/', views.addModule, name='add_module'),
    path('displayall/', views.displayall),
    path('updateModule/<int:id_module>/', views.updateModule,name='updateModule'),
    path('deleteModule/<int:id_module>/', views.deleteModule, name='deleteModule'),
]
