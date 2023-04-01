from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from backend.models import CustomUser

jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'hashpass', 'image_url']
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        payload = {'username': instance.username, 'hashpass': instance.hashpass}
        token = jwt_encode_handler(payload)
        representation['token'] = token
        return representation