from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid
from django.contrib.postgres.fields import ArrayField

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
    
class BobaShop(CustomUser):
    shop_name = models.CharField(max_length = 50)
    telephone = models.CharField(max_length = 50)
    address = models.CharField(max_length = 50)
    location = models.CharField(max_length = 50)
    rating = models.IntegerField(blank=True, null=True)
    ad_image_url = ArrayField(models.CharField(max_length = 50), blank=True, null=True)
    # drinks = models.ForeignKey(Drink, on_delete=models.CASCADE)
    def __str__(self):
        return "{}".format(self.shop_name)
    
class Drink(models.Model):
    boba_shop = models.ForeignKey(BobaShop, on_delete=models.CASCADE)
    drink_name = models.CharField(max_length = 50)
    description = models.CharField(max_length = 500)
    models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(max_length = 50)
    image_url = models.CharField(max_length = 50, blank = True, null = True)
    # rating = models.IntegerField()
    class Meta:
        unique_together = ('boba_shop', 'drink_name')
    def __str__(self):
        return "{}".format(self.drink_name)