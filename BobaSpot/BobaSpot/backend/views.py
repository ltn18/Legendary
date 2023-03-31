from django.shortcuts import render
from backend.models import CustomUser
from backend.serializers import CustomUserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import base64

class LoginView(APIView):
    # customize this one to hashing the password
    def put(self, request, format=None):
        user_info = request.data
        if (user_info is None):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        user_info['hashpass'] = str(base64.b64encode(user_info['password'].encode("utf-8")))
        user_info.pop('password')
        
        serializer = CustomUserSerializer(data=user_info)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
