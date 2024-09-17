from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('', views.product_list, name='ProductsOrders'),
    path('place-order/', views.place_order, name='place_order'),
    path('add-product/', views.add_product, name='add_product'),
    path('orders/', views.order_list, name='order_list'),
    path('get-orders/', views.get_orders, name='get_orders'),
    path('update-order-status/', views.update_order_status, name='update_order_status'),
    path('get-order-details/', views.get_order_details, name='get_order_details'),
    path('update-item-status/', views.update_item_status, name='update_item_status'),
]

