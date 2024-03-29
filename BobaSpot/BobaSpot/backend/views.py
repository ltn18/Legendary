import json
from django.shortcuts import render
from django.http import JsonResponse
from backend.auth import JWTAuthentication
from backend.models import CustomUser, BobaShop, Customer, Drink
from django.db.models import Avg
from backend.serializers import CustomUserSerializer, BobaShopSerializer, DrinkSerializer, ReviewsSerializer, CustomerSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_jwt.settings import api_settings
from rest_framework import serializers
from geopy.geocoders import Nominatim
from geopy.distance import geodesic
import requests
import base64
import os
from dotenv import load_dotenv

load_dotenv()

jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER

def index(request):
    return render(request, 'index.html')

class LoginView(APIView):
    
    def __invalid_user_response(self):
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, format=None):
        user_info = request.data
        isShopOwner = request.data['shopowner']
        if (user_info is None):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        user_info['hashpass'] = str(base64.b64encode(user_info['password'].encode("utf-8")))
        user_info.pop('password')
        user_info['is_shop_owner'] = isShopOwner
        
        user_serializer = CustomUserSerializer(data=user_info)
        
        if not isShopOwner:
            serializer = CustomerSerializer(data=user_info)
        else:
            serializer = CustomUserSerializer(data=user_info)
        if serializer.is_valid() and user_serializer.is_valid():
            serializer.save()
            user_serializer = CustomUserSerializer(serializer.instance)
            body = {'token': user_serializer.data['token'], 'isShopOwner': isShopOwner}
            return Response(json.dumps(body), status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, format=None):
        user_info = request.data
        if (user_info is None):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = CustomUser.objects.get(username=user_info['username'])
        except Exception:
            return self.__invalid_user_response()
        
        user_info['hashpass'] = str(base64.b64encode(user_info['password'].encode("utf-8")))
        user_info.pop('password')
        if (user_info['hashpass'] != user.hashpass):
            return self.__invalid_user_response()
        
        payload = {'id': str(user.id), 'username': user.username, 'hashpass': user.hashpass}
        isShopOwner = user.is_shop_owner
        body = {'token': jwt_encode_handler(payload), 'isShopOwner': isShopOwner}
        return Response(json.dumps(body), status=status.HTTP_200_OK)

class UserProfileView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)
    
    def get(self, request, format=None):
        user = request.user
        user_serializer = CustomUserSerializer(user)
        user_info = user_serializer.data
        user_info.pop('hashpass')
        return JsonResponse(user_info)
    
    def put(self, request, format=None):
        user = request.user
        request.data['username'] = user.username
        if not request.data['password']:
            request.data['hashpass'] = user.hashpass
        else:
            request.data['hashpass'] = str(base64.b64encode(request.data['password'].encode("utf-8")))
            request.data.pop('password')
        user_serializer = CustomUserSerializer(user, data = request.data)
        print(user_serializer.instance.username)
        if (user_serializer.is_valid()):
            user_serializer.save()
            return JsonResponse({'token': user_serializer.data['token']})
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

class TestView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)
    
    def get(self, request, format=None):
        body = {'message': "hello Aiden!"}
        return Response(json.dumps(body), status=status.HTTP_200_OK)
    
class BobaShopView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)
    def put(self, request, boba_id, format=None):
        shop = request.user
        if shop is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if boba_id == (str)(shop.id):
            print("token ok")
            if not BobaShop.objects.filter(id=boba_id).exists():
                bobashop = BobaShop(customuser_ptr = shop)
                bobashop.username = shop.username
                bobashop.hashpass = shop.hashpass
                bobashop.save_base(raw=True)
            else:
                bobashop = BobaShop.objects.get(id=boba_id)
            for key, value in request.data.items():
                if hasattr(bobashop, key):
                    if value and len(value) > 0:
                        setattr(bobashop, key, value)
                else:
                    return Response(status=status.HTTP_400_BAD_REQUEST)
            bobashop.save()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, boba_id, format=None):
        login = request.user
        print(login)
        try:
            shop = BobaShop.objects.get(id=boba_id)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        serializer_class = BobaShopSerializer(shop)
        serialized_data =  {'data': serializer_class.data}
        drinks_serializer = DrinkSerializer(shop.drink_set, many=True).data
        # for drink_serializer in drinks_serializer:
        #     drink_serializer.pop('boba_shop')
        drinks_serializer.sort(key=lambda x: x['rating'], reverse=True)
        #retrieve top 5 drinks
        top_drink = {'top_drink': drinks_serializer}
        serialized_data['data'].update(top_drink)
        # retrieve all the reviews in the bobashop
        reviews = []
        for drink in shop.drink_set.all():
            for review in drink.reviews_set.all():
                reviews.append(review)
        reviews_serializer = [ReviewsSerializer(review).data for review in reviews]
        for rv_serializer in reviews_serializer:
            cus = Customer.objects.get(id=rv_serializer['user'])
            rv_serializer['customer_name'] = str(cus)
            rv_serializer['drink_name'] = str(Drink.objects.get(pk=rv_serializer['drink']))
            rv_serializer['profile_pic'] = cus.image_url
            rv_serializer.pop('user')
            rv_serializer.pop('review_id')
        reviews_json = {"reviews": reviews_serializer}
        user_login = {"user_picture": login.image_url, "is_shop_owner": login.is_shop_owner}
        serialized_data['data'].update(reviews_json)
        serialized_data['data'].update(user_login)
        return Response(serialized_data['data'], status=status.HTTP_200_OK)   

class ReviewView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)
    
    def get(self, request, format=None):
        user = request.user
        user = Customer.objects.get(id=user.id)
        reviews = []
        for review in user.reviews_set.all():
            reviews.append(review)
        reviews_data = [ReviewsSerializer(review).data for review in reviews]
        for review in reviews_data:
            review['drink'] = Drink.objects.get(pk=review['drink']).drink_name
        reviews_json = {"reviews": reviews_data}
        return JsonResponse(reviews_json)
    
    def put(self, request, format=None):
        user = request.user
        drink_name = request.data['drink_name']
        drink = Drink.objects.get(drink_name=drink_name)
        request.data['user'] = user.pk
        request.data['drink'] = drink.pk
        review_serializer = ReviewsSerializer(data=request.data)
        if (review_serializer.is_valid()):
            review_serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(review_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

    
class SearchView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,) 

    def extract_lat_long_via_address(self,address_or_zipcode):
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

    def calculate_distance(self,origin, lat, lon):
        if not origin.longitude or not origin.latitude:
            return 100
        return (geodesic((origin.latitude, origin.longitude), (lat, lon)).miles) 
    
    def get(self, request, format=None):
        predicates = request.query_params
        res = BobaShop.objects
        if "shop_name" in predicates:
            res = res.filter(shop_name__icontains=predicates['shop_name'])
        if "drink_name" in predicates:
            if len(predicates['drink_name']) > 0:
                res = res.filter(drink__drink_name__icontains=predicates['drink_name'])
        res = res.all()
        for constrain, value in predicates.items():
            if constrain == 'max_price':
                res = [x for x in res if x.average_price <= float(value)]
            elif constrain == 'min_price':
                res = [x for x in res if x.average_price >= float(value)]
            elif constrain == 'min_rating':
                res = [x for x in res if x.rating >= float(value)]
            elif constrain == 'address':
                if len(value) > 0:
                    lat, lon = self.extract_lat_long_via_address(value)
                    if not lat or not lon:
                        return Response("The input is not supported",status=status.HTTP_400_BAD_REQUEST)
                    res = [x for x in res if self.calculate_distance(x, lat, lon) <= 15]
            elif constrain == 'shop_name' or constrain == 'drink_name':
                continue
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(json.dumps([BobaShopSerializer(r).data for r in res]), status=status.HTTP_200_OK)
    
class DrinkView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,) 
    def put(self, request, format=None):
        shop = request.user
        data = request.data
        if shop is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        shop_instance = BobaShop.objects.get(id=shop.id)
        new_drink = Drink(boba_shop=shop_instance)
        for key,value in data.items():
            setattr(new_drink, key, value)
        new_drink.save()
        return Response(status=status.HTTP_200_OK)
