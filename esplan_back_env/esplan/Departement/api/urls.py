from django.urls import path
'''from .views import DepartementList
'''
from . import views


urlpatterns = [
   
path('addDep/', views.addDep, name='add_Dep'),
path('departements/', views.DepartementList),
path('deleteDep/<int:id_departement>/', views.deleteDep, name='deleteDep'),
path('updateDep/<int:id_departement>/', views.updateDep,name='updateDep'),



]

