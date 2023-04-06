import json
from django.shortcuts import render
from django.http import JsonResponse
from backend.auth import JWTAuthentication
from backend.models import CustomUser
from backend.serializers import CustomUserSerializer
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
        print(request.user)
        print(request.auth)
        return Response(json.dumps(body), status=status.HTTP_200_OK)