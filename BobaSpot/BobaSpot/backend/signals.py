from geopy.geocoders import Nominatim
from geopy.distance import geodesic
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from backend.models import BobaShop

@receiver(pre_save, sender=BobaShop)
def on_change(sender, instance: BobaShop, **kwargs):
    if instance.id is None:
        pass
    else:
        geolocator = Nominatim(user_agent="backend") 
        addr1 = geolocator.geocode(instance.address)
        instance.longitude = addr1.longitude
        instance.latitude = addr1.latitude
        pass