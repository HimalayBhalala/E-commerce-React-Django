from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView,ListAPIView,CreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets,status
from .pagination import (
    HomeProductPagination,
    HomeCategoryProductPagination,
    PopularProductPagination
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
    ProductRating,
    WishList
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
    CustomerOrderSerializer,
    WishListSerializer,
    CustomerProductCountSerializer,
    GetTotalOrderSerializer
)
import stripe
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

stripe.api_key = settings.STRIPE_SECRET_KEY
import json

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

class PopularProductView(ListAPIView):
    serializer_class = ProductSerializer
    pagination_class = PopularProductPagination

    def get_queryset(self):
        return Product.objects.all().order_by('-downloads')

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

@csrf_exempt
def create_payment_intent(request):
    if request.method == 'POST':
        try:
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

class GetCustomerOrder(APIView):
    def get(self,request,*args,**kwargs):
        customer_id = self.kwargs['customer_id']
        order = Order.objects.filter(customer__id=customer_id)
        order_items = OrderItems.objects.filter(order__in=order)
        serializer = CustomerOrderSerializer(order_items,many=True)
        return Response({"data":serializer.data})

@csrf_exempt
def count_product_download(request, product_id):
    if request.method == "POST":
        product = Product.objects.get(id=product_id)
        totalDownloads = product.downloads
        totalDownloads += 1
        update_result = Product.objects.filter(id=product_id).update(downloads=totalDownloads)
        data = {
            'bool':False,
            'downloads':product.downloads
        }
        if update_result:
            data = {
                'bool':True,
                'downloads':product.downloads
            }
        return JsonResponse(data) 


class GetProductWishList(APIView):
    def get(self,request,*args, **kwargs):
        customer_id = self.kwargs['customer_id']
        wishlist_data = WishList.objects.filter(customer__id=customer_id)
        serializer = WishListSerializer(wishlist_data,many=True)
        return Response({"data":serializer.data})
    
class AddProductInWishList(APIView):
    def post(self,request,*args, **kwargs):
        customer_id = self.kwargs['customer_id']
        product_id = self.kwargs['product_id']

        try:
            customer = Customer.objects.get(id=customer_id)
            product = Product.objects.get(id=product_id)
        except Customer.DoesNotExist:
            return Response({"message":"Customer Does not exist with a given key"},status=status.HTTP_400_BAD_REQUEST)
        except Product.DoesNotExist:
            return Response({"message":"Product does not exist with a given key"},status=status.HTTP_400_BAD_REQUEST)
        
        if WishList.objects.filter(customer=customer,product=product).exists():
            return Response({"message":"Product already exists"},status=status.HTTP_400_BAD_REQUEST)
            
        wishlist_added = WishList.objects.create(customer=customer,product=product)
        if wishlist_added:
            return Response({"message":"Product added in wishlist"},status=status.HTTP_200_OK)
        return Response({"message":"product is not added in wishlist try again"},status=status.HTTP_400_BAD_REQUEST)
    

    def delete(self,request,*args,**kwargs):
        customer_id = self.kwargs['customer_id']
        product_id = self.kwargs['product_id']

        try:
            customer = Customer.objects.get(id=customer_id)
            product = Product.objects.get(id=product_id)
        except Customer.DoesNotExist:
            return Response({"message":"Customer Does not exist with a given key"},status=status.HTTP_400_BAD_REQUEST)
        except Product.DoesNotExist:
            return Response({"message":"Product does not exist with a given key"},status=status.HTTP_400_BAD_REQUEST)
        
        wish_list =  WishList.objects.filter(customer=customer,product=product)
        if wish_list.exists():
            wish_list.delete()
            return Response({"message":"Product deleted Successfully"},status=status.HTTP_204_NO_CONTENT)
        return Response({"message":"product is not exist so deletion is not possible"},status=status.HTTP_400_BAD_REQUEST)
    

class GetCustomerProductCount(APIView):
    def get(self,request,*args,**kwargs):
        customer_id = self.kwargs.get('customer_id')
        customer = Customer.objects.get(id=customer_id)
        serializer = CustomerProductCountSerializer(customer)
        return Response({"data":serializer.data})
    

class GetTotalOrder(APIView):
    def get(self,request,*args,**kwargs):
        customer_id = self.kwargs.get('customer_id')
        customer = Customer.objects.get(id=customer_id)
        order = Order.objects.filter(customer=customer)
        serializer = GetTotalOrderSerializer(order,many=True)
        return Response({"orders":serializer.data})