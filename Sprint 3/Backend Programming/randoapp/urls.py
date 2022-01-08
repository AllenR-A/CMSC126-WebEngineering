from django.urls import path
from django.views.generic.base import TemplateView
from . import views
from django.contrib.auth import views as authv

urlpatterns = [
    path('', views.main_view),
    #path('logouttohome/', views.logouttohome),
    path('about/', views.about_view),
    path('contact/', views.contact_view),
    path('ok/', views.press_ok),
    path('notok/', views.press_notok),
    path('upload/', views.upload),
    path('uploadset/', views.uploadset),
    path('signup/', views.signup),
    path('logout/', views.logout_view),
    path('login/', views.login_view)
]