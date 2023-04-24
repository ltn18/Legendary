"""BobaSpot URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
import backend.views as views
from django.views.static import serve
import os
import BobaSpot.settings as settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', views.LoginView.as_view()),
    path('api/test/', views.TestView.as_view()),
    path('api/bobashop/', views.BobaShopView.as_view()),
    path('api/user/', views.UserProfileView.as_view()),
    path('api/reviews/', views.ReviewView.as_view()),

    re_path(r'^(?P<path>.*)$', serve, {
        'document_root': os.path.join(settings.BASE_DIR, 'frontend/build'),
        'path': 'index.html'
    }),
]
