import json
from django.shortcuts import render
from django.http import JsonResponse
from backend.auth import JWTAuthentication
from backend.models import CustomUser, BobaShop, Customer, Drink
from django.db.models import Avg
from backend.serializers import CustomUserSerializer, BobaShopSerializer, DrinkSerializer, ReviewsSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_jwt.settings import api_settings
from rest_framework import serializers
import base64
from geopy.geocoders import Nominatim
from geopy.distance import geodesic

jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER

class LoginView(APIView):
    
    def __invalid_user_response(self):
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, format=None):
        user_info = request.data
        if (user_info is None):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        user_info['hashpass'] = str(base64.b64encode(user_info['password'].encode("utf-8")))
        user_info.pop('password')
        
        serializer = CustomUserSerializer(data=user_info)
        if serializer.is_valid():
            serializer.save()
            body = {'token': serializer.data['token']}
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
        body = {'token': jwt_encode_handler(payload)}
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
            if not BobaShop.objects.filter(id=boba_id).exists():
                bobashop = BobaShop(customuser_ptr = shop)
                bobashop.username = shop.username
                bobashop.hashpass = shop.hashpass
                bobashop.save_base(raw=True)
            else:
                bobashop = BobaShop.objects.get(id=boba_id)
            for key, value in request.data.items():
                if hasattr(bobashop, key):
                    setattr(bobashop, key, value)
                else:
                    return Response(status=status.HTTP_400_BAD_REQUEST)
            bobashop.save()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, boba_id, format=None):
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
        top_drink = {'top_drink': drinks_serializer[:5]}
        serialized_data['data'].update(top_drink)
        # retrieve all the reviews in the bobashop
        reviews = []
        for drink in shop.drink_set.all():
            for review in drink.reviews_set.all():
                reviews.append(review)
        reviews_serializer = [ReviewsSerializer(review).data for review in reviews]
        reviews_json = {"reviews": reviews_serializer}
        serialized_data['data'].update(reviews_json)
        return Response(serialized_data['data'], status=status.HTTP_200_OK)   
    
class SearchView(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)
    def calculate_distance(self,origin, destination):
        geolocator = Nominatim(user_agent="backend")
        if not origin:
            return 100
        addr1 = geolocator.geocode(origin)
        lon_1 = addr1.longitude
        lat_1 = addr1.latitude
        addr2 = geolocator.geocode(destination)
        lon_2 = addr2.longitude
        lat_2 = addr2.latitude
        return (geodesic((lat_1, lon_1), (lat_2, lon_2)).miles) 
    def get(self, request, format=None):
        predicates = request.data
        res = BobaShop.objects
        if "shop_name" in predicates:
            res = res.filter(shop_name__icontains=predicates['shop_name'])
        if "drink_name" in predicates:
            res = res.filter(drink__drink_name__icontains=predicates['drink_name'])
        res = res.all()
        for constrain, value in predicates.items():
            if constrain == 'max_price':
                res = [x for x in res if x.average_price <= value]
            elif constrain == 'min_price':
                res = [x for x in res if x.average_price >= value]
            elif constrain == 'min_rating':
                res = [x for x in res if x.rating >= value]
            elif constrain == 'address':
                res = [x for x in res if self.calculate_distance(x.address, value) <= 15]
            elif constrain == 'shop_name' or constrain == 'drink_name':
                continue
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(json.dumps([BobaShopSerializer(r).data for r in res]), status=status.HTTP_200_OK)
