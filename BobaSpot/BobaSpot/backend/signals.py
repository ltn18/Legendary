from geopy.geocoders import Nominatim
from geopy.distance import geodesic

import requests
import os
from dotenv import load_dotenv

from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from backend.models import BobaShop

load_dotenv()

def extract_lat_long_via_address(address_or_zipcode):
    lat, lng = None, None
    api_key = os.getenv('GOOGLE_API_KEY')
    print(api_key)
    base_url = "https://maps.googleapis.com/maps/api/geocode/json"
    endpoint = f"{base_url}?address={address_or_zipcode}&key={api_key}"
    # see how our endpoint includes our API key? Yes this is yet another reason to restrict the key
    r = requests.get(endpoint)
    if r.status_code not in range(200, 299):
        return None, None
    try:
        '''
        This try block incase any of our inputs are invalid. This is done instead
        of actually writing out handlers for all kinds of responses.
        '''
        results = r.json()['results'][0]
        lat = results['geometry']['location']['lat']
        lng = results['geometry']['location']['lng']
    except:
        pass
    return lat, lng

@receiver(pre_save, sender=BobaShop)
def on_change(sender, instance: BobaShop, **kwargs):
    if instance.id is None:
        pass
    else:
        lat, lon = extract_lat_long_via_address(instance.address)
        # print("addr1" + str(addr1))
        print("instance" + str(instance))
        instance.longitude = lon
        instance.latitude = lat
        pass