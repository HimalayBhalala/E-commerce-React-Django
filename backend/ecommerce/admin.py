from django.contrib import admin
from .models import (
    Vendor,
    Product,
    ProductCategory,
    Customer,
    Order,
    OrderItems,
    CustomerAddress,
    ProductRating
)

class VendorAdmin(admin.ModelAdmin):
    list_display = ["id","user","address"]
admin.site.register(Vendor,VendorAdmin)

class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ["id","title","description"]
admin.site.register(ProductCategory,ProductCategoryAdmin)

class ProductAdmin(admin.ModelAdmin):
    list_display = ["id","title","tags","customer","category","vendor","price","usd_price","downloads"]
    list_editable = ["usd_price","price"]
admin.site.register(Product,ProductAdmin)

class CustomerAdmin(admin.ModelAdmin):
    list_display = ["id","user","mobile"]
admin.site.register(Customer,CustomerAdmin)

class OrderAdmin(admin.ModelAdmin):
    list_display = ["id","customer","order_time","order_status"]
admin.site.register(Order,OrderAdmin)

class OrderItemAdmin(admin.ModelAdmin):
    list_display = ["id","order","product"]
admin.site.register(OrderItems,OrderItemAdmin)

class CustomerAddressAdmin(admin.ModelAdmin):
    list_display = ["id","customer","address","default_address"]
admin.site.register(CustomerAddress,CustomerAddressAdmin)

class ProductRatingAdmin(admin.ModelAdmin):
    list_display = ["id","customer","product","rating","review","add_time"]
admin.site.register(ProductRating,ProductRatingAdmin)