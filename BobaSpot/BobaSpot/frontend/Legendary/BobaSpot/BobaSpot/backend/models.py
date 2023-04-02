<<<<<<< HEAD
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True)
    username = models.CharField(max_length = 50, unique = True)
    hashpass = models.CharField(max_length = 500, unique = True)
    image_url = models.CharField(max_length = 50, blank = True, null = True)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['hashpass']
    def __str__(self):
        return "{}".format(self.username)
=======
from django.db import models

# Create your models here.
>>>>>>> main