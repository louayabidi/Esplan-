from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from Unite.models import Unite

class AppUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')
        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')
        user = self.create_user(email, password)
        user.is_superuser = True
        user.save()
        return user

class AppUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50)
    cin = models.CharField(max_length=8,unique=True)
    quota = models.IntegerField(blank=True, null=True)
    role = models.CharField(max_length=50)
    identifiant = models.CharField(max_length=50,blank=True, null=True,unique=True)
    roleRes = models.CharField(max_length=50, blank=True, null=True)
    id_unite = models.ForeignKey(Unite,blank=True,null=True, on_delete=models.CASCADE)
    image_user = models.ImageField(upload_to='user_images/', blank=True, null=True)

    is_staff = models.BooleanField(default=False)
 


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = AppUserManager()

    def __str__(self):
        return self.username
