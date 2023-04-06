import pytest
import json
from django.urls import reverse
from backend import views
from backend.models import CustomUser

@pytest.fixture
def api_client():
    from rest_framework.test import APIClient
    return APIClient()

@pytest.fixture
def test_user(db):
    return CustomUser.objects.create(username='someone', hashpass="b'YQ=='", first_name='N', last_name='M', image_url='I')

@pytest.mark.django_db
def test_unauthorized_request(api_client):
    url = reverse('test-view')
    response = api_client.get(url)
    assert response.status_code == 403
    
@pytest.mark.django_db
def test_log_in(api_client, test_user):
    url = reverse('login-view')
    response = api_client.post(url, {'username':'someone', 'password':'a'}, format='json')
    print(CustomUser.objects.get(username='someone').hashpass)
    assert response.status_code == 200
    
@pytest.mark.django_db
def test_authorized_request(api_client, test_user):
    url = reverse('login-view')
    response = api_client.post(url, {'username':'someone', 'password':'a'}, format='json')
    token = json.loads(response.data)['token']
    api_client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
    url = reverse('test-view')
    response = api_client.get(url)
    assert response.status_code == 200
    assert json.loads(response.data)['message'] == "hello Aiden!"