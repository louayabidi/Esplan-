"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls), 
    path('api/', include('Users.api.urls')),
    path('users/', include('Users.api.urls')), 
    path('session/', include('Session.api.urls')), 
    path('module/', include('Module.api.urls')), 
    path('examen/', include('Examen.api.urls')), 
    path('departement/', include('Departement.api.urls')),
    path('unite/', include('Unite.api.urls')),
    path('Contrainte/', include('Contrainte.api.urls')),
    path('Niveau/', include('Niveau.api.urls') ),
    path('Classe/', include('Classe.api.urls') ),
    path('bloc/', include('Bloc.api.urls') ),
    path('salle/', include('Salle.api.urls') ),
    path('modniv/', include('modniv.api.urls') ),
    path('Salle_examen/', include('Salle_examen.api.urls') ),
    path('Surveillance/', include('Surveillance.api.urls') ),



]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
