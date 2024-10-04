from django.urls import path
from . import views


urlpatterns = [
     path('', views.view_expenses, name='expenses'),
     path('add_expenses/', views.add_expenses, name='add_expenses'),
     path('mark_as_paid/<int:expense_id>/', views.mark_as_paid, name='mark_as_paid'),
     path('expenses/delete/<int:expense_id>/', views.delete_expense, name='delete_expense'),
]