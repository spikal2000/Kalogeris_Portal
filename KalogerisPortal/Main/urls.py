from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('suppliers/', views.supplier_list, name='supplier_list'),
    path('add_suppliers/', views.add_supplier, name='add_suppliers'),
    path('supplier/edit/<int:supplier_id>/', views.edit_supplier, name='edit_supplier'),
]