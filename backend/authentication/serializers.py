from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from rest_framework.exceptions import AuthenticationFailed
from ecommerce.models import Customer

User = get_user_model()

class CreateUserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name", "password", "confirm_password"]
        extra_kwargs = {
            "password": {"write_only": True},
            "id": {"read_only": True},
        }

    def validate(self, data):
        email = data.get("email")
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        password = data.get("password")
        confirm_password = data.get("confirm_password")

        if not email:
            raise serializers.ValidationError("Email must be required")
        if not first_name:
            raise serializers.ValidationError("First name must be required")
        if not last_name:
            raise serializers.ValidationError("Last name must be required")
        if not password:
            raise serializers.ValidationError("Password must be required")
        if password != confirm_password:
            raise serializers.ValidationError("Password and Confirm_password do not match")

        return data

    def create(self, validated_data):
        email = validated_data.get("email")
        first_name = validated_data.get("first_name")
        last_name = validated_data.get("last_name")
        password = validated_data.get("password")

        user = User.objects.create(email=email, first_name=first_name, last_name=last_name, password=password)
        return user



class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=200)
    password = serializers.CharField(max_length=200)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if not email:
            raise serializers.ValidationError('Email must be required')
        if not password:
            raise serializers.ValidationError('Password must be required')

        user = authenticate(request=self.context.get('request'), email=email, password=password)

        if not user:
            raise AuthenticationFailed('Invalid credentials, please try again')

        data['user'] = user
        return data


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'user', 'mobile']

    def to_representation(self, instance):
        """
        Convert user field to user's email in representation
        """
        representation = super().to_representation(instance)
        representation['user'] = instance.user.email
        return representation


class CustomerRegistrationSerializer(serializers.ModelSerializer):
    user = CreateUserSerializer(read_only=True)

    class Meta:
        model = Customer
        fields = ["id", "user","mobile"]
        extra_kwargs = {
            "id": {"read_only": True},
        }

    def to_representation(self, instance):
        representation =  super().to_representation(instance)
        representation['user'] = instance.user
        return representation