import pytest
from django.urls import reverse
from backend import views
from backend.models import CustomUser

@pytest.fixture
def api_client():
    from rest_framework.test import APIClient
    return APIClient()

@pytest.fixture
def test_user(db):
    return CustomUser.objects.create(username='someone', hashpass="b'Yg=='", first_name='N', last_name='M', image_url='I')

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