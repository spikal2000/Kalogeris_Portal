from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('add_suppliers/', views.add_supplier, name='add_suppliers'),
]