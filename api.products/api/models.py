import os
from peewee import Model, IntegerField, CharField
from playhouse.mysql_ext import MariaDBConnectorDatabase

MYSQL_USER = os.getenv('MYSQL_USER')
MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')
MYSQL_HOST = os.getenv('MYSQL_HOST')
MYSQL_PORT = int(os.getenv('MYSQL_PORT', '3306'))

db = MariaDBConnectorDatabase(
    'marz',
    user=MYSQL_USER,
    password=MYSQL_PASSWORD,
    host=MYSQL_HOST,
    port=MYSQL_PORT
)


class Product(Model):
    ProductID = IntegerField(primary_key=True)
    ProductName = CharField(100)
    ProductPhotoURL = CharField(255)
    ProductStatus = CharField(10)

    VALID_STATUSES = ['Active', 'Inactive']

    def save(self, *args, **kwargs):
        if self.ProductStatus not in self.VALID_STATUSES:
            raise ValueError(
                f"Invalid status '{self.ProductStatus}' for product.")
        super(Product, self).save(*args, **kwargs)

    class Meta:
        database = db
        table_name = 'Product'
