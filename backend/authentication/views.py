from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from ecommerce.models import Customer
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import (
    CreateUserSerializer,
    CustomerSerializer,
    LoginSerializer,
    CustomerRegistrationSerializer,
    GetCustomerProfileSerilaizer
)

class CustomerRegistrationView(APIView):
    def post(self, request):
        serializer = CreateUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            mobile = request.data.get('mobile')
            if not mobile:
                return Response({"message":"Mobile number field is required"},status=status.HTTP_400_BAD_REQUEST)
            customer = Customer.objects.create(user=user,mobile=mobile)
            customer_serializer = CustomerRegistrationSerializer(customer)
            
            token = RefreshToken.for_user(user)

            response_data = {
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'mobile' : customer_serializer.data.get('mobile')
                },
                'token':{
                    'access_token': str(token.access_token),
                    'refresh_token':str(token),
                }
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomerLoginAPIView(APIView):

    def post(self, request):
        serializer = LoginSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.validated_data['user']

            token = RefreshToken.for_user(user)

            try:
                customer = Customer.objects.get(user=user)
                customer_serializer = CustomerSerializer(customer)
                customer_data = customer_serializer.data
            except Customer.DoesNotExist:
                return Response({"message":"Customer is not found"})

            response_data = {
                'access_token': str(token.access_token),
                'refresh_token':str(token),
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                },
                'customer': customer_data
            }
            return Response(response_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

class GetCustomerAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            customer = Customer.objects.get(user=request.user)
            serializer = CustomerSerializer(customer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Customer.DoesNotExist:
            return Response({"message": "Customer not found"}, status=status.HTTP_404_NOT_FOUND)


class CustomerProfileView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request,*args, **kwargs):
        customer_id = self.kwargs['customer_id']
        customer = Customer.objects.get(id=customer_id)
        serializer = GetCustomerProfileSerilaizer(customer)
        return Response({"data":serializer.data})