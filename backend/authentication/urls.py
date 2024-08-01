from django.urls import path
from . import views

urlpatterns = [
    path('customer/register/',views.CustomerRegistrationView.as_view(),name="customer-registration"),
    path('customer/profile/<int:customer_id>/',views.CustomerProfileView.as_view(),name='customer-profile'),
    path('login/', views.CustomerLoginAPIView.as_view(), name='customer-login'),
    path('customer/', views.GetCustomerAPIView.as_view(), name='get-customer'),
]
