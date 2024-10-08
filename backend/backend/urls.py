from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from ecommerce.views import (
    ProductRatingView
)
from django.urls import re_path
from notification import consumers

route = DefaultRouter()
route.register("product-rating", ProductRatingView, basename='rating')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include("authentication.urls")),
    path('jwt/token/', TokenObtainPairView.as_view(), name="get-token"),
    path('jwt/refresh/', TokenRefreshView.as_view(), name="token-refresh"),
    path('ecommerce/', include("ecommerce.urls")),
]

websocket_urlpatterns = [
    re_path(r'ws/notifications/$', consumers.NotificationConsumer.as_asgi()),
]

urlpatterns += route.urls

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
