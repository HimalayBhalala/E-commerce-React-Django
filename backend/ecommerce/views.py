from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView,ListAPIView,CreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from .pagination import (
    HomeProductPagination,
    HomeCategoryProductPagination
)
from rest_framework.decorators import api_view
from .models import (
    Vendor,
    ProductCategory,
    Product,
    Customer,
    Order,
    OrderItems,
    CustomerAddress,
    ProductRating
)
from .serializers import (
    VendorSerializer,
    VendorDetailSerializer,
    ProductCategorySerializer,
    ProductTitleDetailSerializer,
    ProductSerializer,
    ProductDetailSerializer,
    CustomerSerializer,
    CustomerDetailSerializer,
    OrderSerializer,
    OrderDetailSerializer,
    OrderItemSerializer,
    CustomerAddressSerializer,
    ProductRatingSerializer,
    CustomerOrderSerializer
)
import stripe
from django.conf import settings

class VendorAPIView(ListCreateAPIView):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer

class VendorDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Vendor.objects.all()
    serializer_class = VendorDetailSerializer

class ProductCategoryView(ListCreateAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer

class ProductDetailCategoryView(RetrieveUpdateDestroyAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer

class ProductTitleDetailCategoryView(APIView):
    def get(self,*args,**kwargs):
        title = kwargs['title']
        category_id = ProductCategory.objects.get(title=title)
        serializer = ProductTitleDetailSerializer(category_id)
        return Response(serializer.data["category_product"])
    
class RelatedProductView(APIView):
    def get(self,*args,**kwargs):
        product_id = kwargs['pk']
        product = Product.objects.get(id=product_id)
        related_product = Product.objects.filter(category=product.category).exclude(id=product_id)
        serializer = ProductSerializer(related_product,many=True)
        return Response(serializer.data)
    
class ProductTagAPIView(APIView):
    def get(self,*args,**kwargs):
        tags = kwargs['tag_name']
        product_tag = Product.objects.filter(tags__icontains=tags)
        serializer = ProductSerializer(product_tag,many=True)
        return Response(serializer.data)
    
class ProductHomeView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = HomeProductPagination

class ProductCategoryHomeView(ListAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer
    pagination_class = HomeCategoryProductPagination

class ProductAPIView(ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductDetailSerializer

class CustomerAPIView(ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class CustomerDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerDetailSerializer

class CustomerAddressView(viewsets.ModelViewSet):
    queryset = CustomerAddress.objects.all()
    serializer_class = CustomerAddressSerializer

class OrderAPIView(ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class OrderItemAPIView(CreateAPIView):
    queryset = OrderItems.objects.all()
    serializer_class = OrderItemSerializer

class OrderDetailAPIView(ListCreateAPIView):
    serializer_class = OrderDetailSerializer

    def get_queryset(self):
        try:
            order_id = self.kwargs.get("pk")
            order = Order.objects.get(id=order_id)
            order_items = OrderItems.objects.filter(order=order)
            return order_items
        except Order.DoesNotExist:
            return OrderItems.objects.none() 
        except ValueError:
            return OrderItems.objects.none()
        except Exception as e:
            return OrderItems.objects.none()
        
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
class ProductRatingView(viewsets.ModelViewSet):
    queryset = ProductRating.objects.all()
    serializer_class = ProductRatingSerializer

@api_view(["GET"])
def hello(request):
    return Response({"Message":"Hello"})

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse


stripe.api_key = settings.STRIPE_SECRET_KEY
import json

@csrf_exempt
def create_payment_intent(request):
    if request.method == 'POST':
        try:
            print(json.loads(request.body))
            data = json.loads(request.body)
            amount = data['amount'] 
            currency = data['currency'] 

            intent = stripe.PaymentIntent.create(
                amount=amount,
                currency=currency,
            )

            return JsonResponse({
                'clientSecret': intent.client_secret
            })
        except KeyError:
            return JsonResponse({'error': 'Missing required parameters'}, status=400)
        except stripe.error.StripeError as e:
            return JsonResponse({'error': str(e)}, status=500)
        except Exception as e:
            return JsonResponse({'error': 'Internal Server Error'}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
@csrf_exempt
def update_order_status(request,order_id):
    if request.method == "POST":
        status_info = Order.objects.filter(id=order_id).update(order_status=True)
        if status_info:
            data = {
                "order-status":True
            }
        else:
            data = {
                "order_status":False
            }
        return JsonResponse(data)
    