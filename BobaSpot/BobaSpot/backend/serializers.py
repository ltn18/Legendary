from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from backend.models import CustomUser, BobaShop, Drink, Reviews, Customer

jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'hashpass', 'image_url', 'first_name', 'last_name', 'is_shop_owner']
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        payload = {'username': instance.username, 'hashpass': instance.hashpass}
        token = jwt_encode_handler(payload)
        representation['token'] = token
        return representation
    
class BobaShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = BobaShop
        fields = ['id', 'username', 'hashpass', 'image_url', 'shop_name', 'longitude', 'latitude', 'telephone', 'address', 'opening_hour', 'closing_hour', 'rating', 'ad_image_url']
        
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'username', 'hashpass', 'image_url', 'first_name', 'last_name']
class DrinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drink
        fields = ['boba_shop', 'drink_name', 'description', 'price', 'type', 'image_url', 'rating']

class ReviewsSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all(), many=False)
    class Meta:
        model = Reviews
        fields = ['review_id', 'user', 'drink', 'text', 'rating', 'image_url', 'review_top_id']
