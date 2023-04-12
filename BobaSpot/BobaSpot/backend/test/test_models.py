import pytest

from backend.models import CustomUser, BobaShop, Customer, Drink, Reviews

@pytest.mark.django_db
def test_create_user():
    user = CustomUser(username='test', hashpass='testt', first_name='test', last_name='test', image_url='test')
    user.save()
    assert CustomUser.objects.get(username='test').hashpass == 'testt'
    
@pytest.mark.django_db
def test_create_bobashop():
    shop = BobaShop(username='aiden', hashpass='hay', shop_name= "trum", image_url='test')
    shop.save()
    assert BobaShop.objects.get(username='aiden').hashpass == 'hay'
    
@pytest.mark.django_db
def test_create_customer():
    customer = Customer(username='test', hashpass='testt', first_name='test', last_name='test', image_url='test')
    customer.save()
    assert Customer.objects.get(username='test').hashpass == 'testt'
    
@pytest.mark.django_db
def test_create_drink():
    shop = BobaShop(username='aiden', hashpass='hay', shop_name= "trum", image_url='test')
    drink = Drink(boba_shop=shop, drink_name='milkshake')
    shop.save()
    drink.save()
    assert (drink in shop.drink_set.all()) == True

@pytest.mark.django_db
def test_create_review():
    customer = Customer(username='test', hashpass='testt', first_name='test', last_name='test', image_url='test')
    shop = BobaShop(username='aiden', hashpass='hay', shop_name= "trum", image_url='test')
    drink = Drink(boba_shop=shop, drink_name='milkshake')
    review = Reviews(text="ngon vai lon", user = customer, drink = drink)
    customer.save()
    shop.save()
    drink.save()
    review.save()
    assert (review in drink.reviews_set.all()) == True
    assert (review in customer.reviews_set.all()) == True