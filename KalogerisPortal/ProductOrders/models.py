from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Product(models.Model):

    UOM_CHOICES = [
        ('kg', 'kg'),
        ('τεμ', 'τεμ'),
        ('Παλέτα', 'Παλέτα'),
        ('Κιβώτιο', 'Κιβώτιο'),
    ]

    CATEGORY_CHOICES = [
        ('Άρτος', 'Άρτος'),
        ('Γλυκά', 'Γλυκά'),
        ('Καβά', 'Καβά'),
        ('Καφές & Ροφήματα', 'Καφές & Ροφήματα'),
        ('Κουλούρια/Μπισκότα', 'Κουλούρια/Μπισκότα'),
        ('Κριτσίνια', 'Κριτσίνια'),
        ('Σάντουιτς', 'Σάντουιτς'),
        ('Τυροπιτιέρα', 'Τυροπιτιέρα'),
        ('Αναλώσιμα', 'Αναλώσιμα'),
    ]


    name = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    uom = models.CharField(max_length=50, choices=UOM_CHOICES)  # Unit of Measurement
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.name 
    

class ProductOrder(models.Model):

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('ready_for_delivery', 'Ready for Delivery'),  # New status
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]
    #fk user 
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    branch = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    delivered_at = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Order {self.id} - {self.status}"

class OrderItem(models.Model):
    order_id = models.ForeignKey(ProductOrder, related_name='items', on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    is_ready = models.BooleanField(default=False)
    
    def __str__(self):
            return f"{self.quantity} of {self.product.name}"