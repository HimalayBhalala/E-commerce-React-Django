from rest_framework import serializers
from .models import (
    Vendor,
    ProductCategory,
    Product,
    Customer,
    Order,
    OrderItems,
    CustomerAddress,
    ProductRating,
    WishList
)

class VendorSerializer(serializers.ModelSerializer):
    product_vendor = serializers.StringRelatedField(many=True,read_only=True)
    class Meta:
        model = Vendor
        fields = ["id","user","address","product_vendor"]

    def __init__(self,*args, **kwargs):
        super(VendorSerializer,self).__init__(*args, **kwargs)
        self.Meta.depth=1

class VendorDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ["id","user","address"]

    def __init__(self,*args,**kwargs):
        super(VendorDetailSerializer,self).__init__(*args, **kwargs)
        self.Meta.depth=1

class ProductSerializer(serializers.ModelSerializer):
    product_ratings = serializers.StringRelatedField(many=True,read_only=True)
    order_products = serializers.StringRelatedField(many=True,read_only=True)
    image = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = ["id","category","image","vendor","customer","title","description","downloads","tags_data","price","usd_price","product_ratings","order_products"]

    def get_image(self, obj):
        image = str(obj.image)
        if image.startswith('http'):
            return image
        else:
            return f"http://127.0.0.1:8000/media/{image}"

    def __init__(self,*args,**kwargs):  
        super(ProductSerializer,self).__init__(*args,**kwargs)
        self.Meta.depth=1

class ProductCategorySerializer(serializers.ModelSerializer):
    category_product = serializers.StringRelatedField(many=True,read_only=True)
    category_image = serializers.SerializerMethodField()
    class Meta:
        model = ProductCategory
        fields = ["id","title","description","category_image","category_product"]

    def get_category_image(self,obj):
        image = str(obj.category_image)
        if image.startswith('http'):
            return image
        else:
            return f"http://127.0.0.1:8000/media/{image}"

    def __init__(self,*args,**kwargs):
        super(ProductCategorySerializer,self).__init__(*args, **kwargs)
        self.Meta.depth=1

class ProductInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id","title","description","image","price","usd_price"]

class ProductTitleDetailSerializer(serializers.ModelSerializer):
    category_product = ProductSerializer(many=True,read_only=True)
    class Meta:
        model = ProductCategory
        fields = ["id","title","description","category_image","category_product"]

    def __init__(self,*args,**kwargs):
        super(ProductTitleDetailSerializer,self).__init__(*args, **kwargs)
        self.Meta.depth=1

class ProductDetailSerializer(serializers.ModelSerializer):
    product_ratings = serializers.StringRelatedField(many=True,read_only=True)
    order_products = serializers.StringRelatedField(many=True,read_only=True)

    class Meta:
        model = Product
        fields = ["id","category","vendor","customer","title","description","customer","price","usd_price","image","downloads","tags_data","product_ratings","order_products"]

    def __init__(self,*args,**kwargs):
        super(ProductDetailSerializer,self).__init__(*args,**kwargs)
        self.Meta.depth=1


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ["id", "customer", "order_time","order_status"]
        read_only_fields = ["id", "order_time","order_status"]

    def create(self, validated_data):
        customer = validated_data.pop('customer', None)
        if customer:
            order = Order.objects.create(customer=customer, **validated_data)
            return order
        else:
            raise serializers.ValidationError("Customer data is required for creating an order")

    def update(self, instance, validated_data):
        instance.customer = validated_data.get('customer', instance.customer)
        instance.save()
        return instance
    
class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItems
        fields = ["id","order","product"]

    def __init__(self,*args,**kwargs):
        super(OrderDetailSerializer,self).__init__(*args,**kwargs)
        self.Meta.depth=1


class CustomerAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerAddress
        fields = ["id","customer","address","default_address"]

    def __init__(self,*args, **kwargs):
        super(CustomerAddressSerializer,self).__init__(*args,**kwargs)
        self.Meta.depth=1

class CustomerProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id","title","price","usd_price"]
    
class CustomerOrderSerializer(serializers.ModelSerializer):
    product = ProductInfoSerializer()
    class Meta:
        model = OrderItems
        fields = ["id","order","product"]

    def __init__(self, instance=None, data=..., **kwargs):
        super(CustomerOrderSerializer,self).__init__(instance, data, **kwargs)
        self.Meta.depth=1

    
class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    class Meta:
        model = OrderItems
        fields = ['order', 'product', 'quantity', 'price']
        extra_kwargs = {
            'order': {'required': True},
        }

class ProductRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductRating
        fields = ["id","customer","rating","review","add_time"]

    def __init__(self,*args,**kwargs):
        super(ProductRatingSerializer,self).__init__(*args, **kwargs)
        self.Meta.depth=1

    def validate(self,data):
        customer = data.get("customer")
        product = data.get("product")

        if ProductRating.objects.filter(customer=customer,product=product).exists():
            raise ValueError("You have aleady added rating")
        return data
    

class WishListSerializer(serializers.ModelSerializer):
    class Meta:
        model = WishList
        fields = ["id","product","customer"]

    def __init__(self, instance=None, data=..., **kwargs):
        super(WishListSerializer,self).__init__(instance, data, **kwargs)
        self.Meta.depth=1

    
class CustomerSerializer(serializers.ModelSerializer):
    customer_orders = OrderSerializer(many=True,read_only=True)
    customer_address = CustomerAddressSerializer(many=True,read_only=True)
    ratings_customer = serializers.StringRelatedField(many=True,read_only=True)
    product_customer = CustomerProductSerializer(many=True,read_only=True)
    customer_wishlist = WishListSerializer(many=True,read_only=True)

    class Meta:
        model = Customer
        fields = ["id","user","mobile","customer_orders","customer_address","product_customer","ratings_customer","customer_wishlist"]

    def __init__(self,*args,**kwargs):
        super(CustomerSerializer,self).__init__(*args,**kwargs)
        self.Meta.depth=1

    def validate_mobile(self, value):
        if len(str(value)) != 10:
            raise serializers.ValidationError("Mobile number must be exactly 10 digits.")
        return value
    

class CustomerDetailSerializer(serializers.ModelSerializer):
    customer_orders = OrderSerializer(many=True,read_only=True)        
    customer_address = CustomerAddressSerializer(many=True,read_only=True)
    ratings_customer = serializers.StringRelatedField(many=True,read_only=True)
    product_customer = CustomerProductSerializer(many=True,read_only=True)
    customer_wishlist = WishListSerializer(many=True,read_only=True)

    class Meta:
        model = Customer
        fields = ["id","user","mobile","customer_orders","product_customer","customer_address","ratings_customer","customer_wishlist"]

    def __init__(self,*args,**kwargs):
        super(CustomerDetailSerializer,self).__init__(*args,**kwargs)
        self.Meta.depth=1

    def validate_mobile(self, value):
        if len(str(value)) != 10:
            raise serializers.ValidationError("Mobile number must be exactly 10 digits.")
        return value
    
class GetTotalOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ["id","customer","order_time","order_status"]

class CustomerProductCountSerializer(serializers.ModelSerializer):
    customer_wishlist = WishListSerializer(many=True,read_only=True)
    order_lists = serializers.SerializerMethodField()
    
    class Meta:
        model = Customer
        fields = ['id',"user","customer_wishlist","order_lists"]

    def get_order_lists(self,obj):
        order = Order.objects.filter(customer=obj)
        serializers = GetTotalOrderSerializer(order,many=True)
        return serializers.data
    