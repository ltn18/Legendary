from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import PermissionsMixin
from django.db.models import Avg

# Create your models here.
class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length = 50, unique = True)
    hashpass = models.CharField(max_length = 500)
    image_url = models.CharField(max_length = 500, blank = True, null = True)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['hashpass']
    def __str__(self):
        return "{}".format(self.username)
    
class BobaShop(CustomUser):
    shop_name = models.CharField(max_length = 50)
    telephone = models.CharField(max_length = 50)
    address = models.CharField(max_length = 500)
    opening_hour = models.TimeField(blank=True, null=True)
    closing_hour = models.TimeField(blank=True, null=True)
    ad_image_url = ArrayField(models.CharField(max_length = 500), blank=True, null=True)
    # drinks = models.ForeignKey(Drink, on_delete=models.CASCADE)
    
    @property
    def rating(self):
        count = 0
        tot_rate = 0
        for drink in self.drink_set.all():
            for review in drink.reviews_set.all():
                if review.rating is not None:
                    tot_rate += review.rating
                    count += 1
        print(0 if count == 0 else round(tot_rate/count, 1))
        return 0 if count == 0 else round(tot_rate/count, 1)
    
    @property
    def average_price(self):
        return round(self.drink_set.aggregate(average_price=Avg('price'))['average_price'],2)
    
    def __str__(self):
        return "{}".format(self.shop_name)
    
class Customer(CustomUser):
    def __str__(self):
        return "{} {}".format(self.first_name, self.last_name)
    
class Drink(models.Model):
    boba_shop = models.ForeignKey(BobaShop, on_delete=models.CASCADE)
    drink_name = models.CharField(max_length = 50)
    description = models.CharField(max_length = 500)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=6.00)
    type = models.CharField(max_length = 50)
    image_url = models.CharField(max_length = 100, blank = True, null = True)
    
    @property
    def rating(self):
        return self.reviews_set.aggregate(average_rating=Avg('rating'))['average_rating']
    
    class Meta:
        unique_together = ('boba_shop', 'drink_name')
    def __str__(self):
        return "{}".format(self.drink_name)
    
class Reviews(models.Model):
    review_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE
    )
    drink = models.ForeignKey(
        Drink,
        on_delete=models.CASCADE
    )
    text = models.CharField(max_length = 1000)
    rating = models.IntegerField(blank=True, null=True)
    image_url = ArrayField(models.CharField(max_length = 100), blank=True, null=True)
    review_top_id = models.ForeignKey('self', on_delete=models.SET_NULL, null=True)
    def __str__(self):
        return "{}".format(self.text)