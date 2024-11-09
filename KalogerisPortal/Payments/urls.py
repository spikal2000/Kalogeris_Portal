from django.urls import path
from . import views


urlpatterns = [
    path('', views.payments_list, name='payments_list'),
    path('add_payment/', views.add_payment, name='add_payment'),
]