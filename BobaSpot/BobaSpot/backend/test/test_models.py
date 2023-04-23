import pytest

from backend.models import CustomUser

@pytest.mark.django_db
def test_create_user():
    user = CustomUser(username='test', hashpass='testt', first_name='test', last_name='test', image_url='test')
    user.save()
    assert CustomUser.objects.get(username='test').hashpass == 'testt'