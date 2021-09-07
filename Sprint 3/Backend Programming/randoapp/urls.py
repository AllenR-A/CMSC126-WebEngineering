from django.urls import path
from . import views

urlpatterns = [
    path('', views.main_view),
    path('about/', views.about_view),
    path('contact/', views.contact_view),
    path('ok/', views.press_ok),
    path('notok/', views.press_notok),
    path('upload/', views.upload),
    path('uploadset/', views.uploadset)
]