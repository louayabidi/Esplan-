from django.urls import path
from . import views

urlpatterns = [
	path('register', views.UserRegister.as_view(), name='register'),
    path('login', views.UserLogin.as_view(), name='login'),
    path('logout', views.UserLogout.as_view(), name='logout'),
    path('user', views.UserView.as_view(), name='user'),
    path('displayall/', views.displayall),
    path('updateusers/<int:user_id>/', views.updateUsers,name='updateUsers'),
    path('deleteusers/<int:user_id>/', views.deleteUsers, name='deleteUsers'),
    path('getonebyid/<int:user_id>/', views.getonebyid, name='getonebyid'),
    path('forgotPassword', views.ForgotPassword.as_view(), name='forgotPassword'),
    path('resetPassword/<int:user_id>/<str:token>/', views.ResetPassword.as_view(), name='resetPassword'),

]
