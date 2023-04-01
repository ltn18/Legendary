import jwt

from backend.models import CustomUser
from rest_framework import authentication, exceptions
from rest_framework_jwt.authentication import BaseJSONWebTokenAuthentication
from rest_framework_jwt.settings import api_settings

jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
jwt_get_username_from_payload = api_settings.JWT_PAYLOAD_GET_USERNAME_HANDLER

class JWTAuthentication(BaseJSONWebTokenAuthentication):
    """
    Simple JWT based authentication.
    Clients should authenticate by passing the API Key in the "Authorization"
    HTTP header, prepended with the string "Bearer ".  For example:
    Authorization: Bearer <jwt_token>
    """
    
    def get_jwt_value(self, request):
        auth = authentication.get_authorization_header(request).split()
        if not auth or auth[0].lower().decode() != api_settings.JWT_AUTH_HEADER_PREFIX.lower():
            return None
        if len(auth) == 1:
            msg = ('No provided credentials')
            raise exceptions.AuthenticationFailed(msg)
        elif len(auth) > 2:
            msg = ('Too much authorization information')
            raise exceptions.AuthenticationFailed(msg)
        try:
            token = auth[1]
        except UnicodeError:
            msg = ('Credentials have invalid characters')
            raise exceptions.AuthenticationFailed(msg)
        return token
    
    def authenticate(self, request):
        jwt_value = self.get_jwt_value(request)
        if jwt_value is None:
            return None
        try:
            payload = jwt_decode_handler(jwt_value)
        except jwt.ExpiredSignature:
            msg = ('Token has expired')
            raise exceptions.AuthenticationFailed(msg)
        except jwt.DecodeError:
            msg = ('Error decoding token')
            raise exceptions.AuthenticationFailed(msg)
        except jwt.InvalidTokenError:
            raise exceptions.AuthenticationFailed()
        user = self.authenticate_credentials(payload)
        return (user, jwt_value)
    
    def authenticate_credentials(self, payload):
        username = jwt_get_username_from_payload(payload)
        
        if not username:
            msg = ('Invalid payload')
            raise exceptions.AuthenticationFailed(msg)
        try:
            user = CustomUser.objects.get(username=payload['username'])
        except Exception:
            msg = ('Invalid token. No existing user matches the token.')
            raise exceptions.AuthenticationFailed(msg)
        return user