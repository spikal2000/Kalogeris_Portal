from django.urls import path, include
from . import views



urlpatterns = [
    path('', include('django.contrib.auth.urls')),
    path('sign-up', views.sign_up, name='sign_up'),
    path('users', views.user_list, name='user_list'),
    path('user/<int:user_id>', views.view_user, name='view_user'),
    path('user/<int:user_id>/edit', views.edit_user, name='edit_user'),
]