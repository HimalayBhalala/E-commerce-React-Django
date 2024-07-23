from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.CustomerRegisterAPIView.as_view(), name='customer-register'),
    path('login/', views.CustomerLoginAPIView.as_view(), name='customer-login'),
    path('customer/', views.GetCustomerAPIView.as_view(), name='get-customer'),
]
