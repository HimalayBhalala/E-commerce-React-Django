from django.urls import path
from . import views

urlpatterns = [
    path("vendors/",views.VendorAPIView.as_view(),name="vendor-lc"),
    path("vendor/<int:pk>/",views.VendorDetailAPIView.as_view(),name="vendor-rud"),
    path("home/products/",views.ProductHomeView.as_view(),name='home-product'),
    path("home/categories/",views.ProductCategoryHomeView.as_view(),name='home-product-category'),
    path("home/popular/products/",views.PopularProductView.as_view(),name='popular-product'),
    path("products/",views.ProductAPIView.as_view(),name="product-lc"),
    path("product/<int:pk>/",views.ProductDetailAPIView.as_view(),name="product-rud"),
    path("product/related/<int:pk>/",views.RelatedProductView.as_view(),name="related-product"),
    path("product/tag/<str:tag_name>/",views.ProductTagAPIView.as_view(),name="product-tag"),
    path("categories/",views.ProductCategoryView.as_view(),name="product-categories"),
    path("category/<int:pk>/",views.ProductDetailCategoryView.as_view(),name="product-detail-categories"),
    path("category/title/<str:title>/",views.ProductTitleDetailCategoryView.as_view(),name="product-title-detail-categories"),
    path("customers/",views.CustomerAPIView.as_view(),name="customer-lc"),
    path("customer/<int:pk>/",views.CustomerDetailAPIView.as_view(),name="customer-rud"),
    path("orders/",views.OrderAPIView.as_view(),name="order-lc"),
    path("orderitems/",views.OrderItemAPIView.as_view(),name='order-item'),
    path("order/<int:pk>/",views.OrderDetailAPIView.as_view(),name="order-l"),
    path("<int:customer_id>/orderitems/",views.GetCustomerOrder.as_view(),name='customer-order'),
    path('add-payment/', views.create_payment_intent, name='create-payment-intent'),
    path('update-order-status/<int:order_id>/',views.update_order_status, name='update-order-status'),
    path('count_product_download/<int:product_id>/',views.count_product_download,name='count-product-download'),
    path('wish-list/<int:customer_id>/',views.GetProductWishList.as_view(),name="product-wishlist"),
    path('product-wishlist/<int:customer_id>/<int:product_id>/',views.AddProductInWishList.as_view(),name="add-product-wishlist"),
    path('customer-product-count/<int:customer_id>/',views.GetCustomerProductCount.as_view(),name='customer-product-count'),
    path('total-order/<int:customer_id>/',views.GetTotalOrder.as_view(),name='get-total-order'),
    path('customer/search/',views.GetSearchingProduct.as_view(),name='get-search-product'),
    path('<int:customer_id>/orderitems/<str:date>/',views.getOrderProductDetail.as_view(),name='order-detail')
]
