from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid

# Create your models here.
class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length = 50, unique = True)
    hashpass = models.CharField(max_length = 500)
    image_url = models.CharField(max_length = 50, blank = True, null = True)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['hashpass']
    def __str__(self):
        return "{}".format(self.username)
