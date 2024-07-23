from django.db import models
from backend.settings import AUTH_USER_MODEL

class Vendor(models.Model):
    user = models.ForeignKey(AUTH_USER_MODEL,on_delete=models.CASCADE)
    address = models.TextField(null=True,blank=True)

    def __str__(self):
        return f"{self.user.email}"

class ProductCategory(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(null=True,blank=True)
    category_image = models.ImageField(upload_to='category/image',default='no-image.png')

    def __str__(self):
        return f"{self.title}"

class Customer(models.Model):
    user = models.ForeignKey(AUTH_USER_MODEL,on_delete=models.CASCADE)
    mobile = models.PositiveBigIntegerField()

    def __str__(self):
        return f"{self.user.email}"

    
class Product(models.Model):
    category = models.ForeignKey(ProductCategory,on_delete=models.SET_NULL,null=True,related_name="category_product")
    customer = models.ForeignKey(Customer,on_delete=models.SET_NULL,null=True,related_name='product_customer')
    vendor = models.ForeignKey(Vendor,on_delete=models.SET_NULL,null=True,related_name="product_vendor")
    title = models.CharField(max_length=200)
    description = models.TextField(null=True,blank=True)
    image = models.ImageField(upload_to='product/image',default='no-image.png')
    tags = models.TextField(null=True,blank=True,default='')
    price = models.FloatField()  

    def __str__(self):
        return f"{self.title}"
    
    def tags_data(self):
        if self.tags:
            tag_list = self.tags.split(",")
            return tag_list
        else:
            return []

class CustomerAddress(models.Model):
    customer = models.ForeignKey(Customer,on_delete=models.CASCADE,related_name="customer_address")
    address = models.TextField()
    default_address = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.address}"

class Order(models.Model):
    customer = models.ForeignKey(Customer,on_delete=models.CASCADE,related_name="customer_orders")
    order_time = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.customer}"

class OrderItems(models.Model):
    order = models.ForeignKey(Order,on_delete=models.CASCADE,related_name="order_items")
    product = models.ForeignKey(Product,on_delete=models.CASCADE,related_name="order_products")
    quantity = models.IntegerField(default=1)
    price  = models.DecimalField(max_digits=10,decimal_places=2,default=0)
    
    def __str__(self):
        return f"{self.product.title}"
    
class ProductRating(models.Model):
    customer = models.ForeignKey(Customer,on_delete=models.CASCADE,related_name="ratings_customer")
    product = models.ForeignKey(Product,on_delete=models.CASCADE,related_name="product_ratings")
    rating = models.IntegerField()
    review = models.TextField()
    add_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.rating}-{self.review}"
