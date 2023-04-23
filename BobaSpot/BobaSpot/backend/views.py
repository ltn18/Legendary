import json
from django.shortcuts import render
from django.http import JsonResponse
from backend.auth import JWTAuthentication
from backend.models import CustomUser, BobaShop, Drink, Customer
from django.db.models import Avg
from backend.serializers import CustomUserSerializer, BobaShopSerializer, DrinkSerializer, ReviewsSerializer, CustomerSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_jwt.settings import api_settings
import base64

jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER

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
            body = {'token': user_serializer.data['token']}
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

class BobaShopView(APIView):
    def put(self, request, format=None):
        permission_classes = (IsAuthenticated,)
        authentication_classes = (JWTAuthentication,)
        shop_info = request.data
        if shop_info is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        try:
            shop = BobaShop.objects.get(id=shop_info['id'])
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    
        for key, value in shop_info.items():
            if hasattr(shop, key):
                setattr(shop, key, value)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        shop.save()
        return Response(status=status.HTTP_200_OK)
    
    def get(self, request, format=None):
        permission_classes = (IsAuthenticated,)
        authentication_classes = (JWTAuthentication,)
        shop_info = request.query_params
        if shop_info is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            shop = BobaShop.objects.get(id=shop_info['id'])
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        serializer_class = BobaShopSerializer(shop)
        serialized_data =  {'data': serializer_class.data}
        drinks_serializer = DrinkSerializer(shop.drink_set, many=True).data
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
        return Response(serialized_data, status=status.HTTP_200_OK)
