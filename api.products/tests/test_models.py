import unittest
from peewee import SqliteDatabase, Model, IntegerField, CharField

db = SqliteDatabase(':memory:')


class BaseModel(Model):
    class Meta:
        database = db


class Product(BaseModel):
    ProductID = IntegerField(primary_key=True)
    ProductName = CharField(100)
    ProductPhotoURL = CharField(255)
    ProductStatus = CharField(10)

    class Meta:
        table_name = 'Product'


class TestProductModel(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        db.connect()
        db.create_tables([Product], safe=True)

    @classmethod
    def tearDownClass(cls):
        db.drop_tables([Product])
        db.close()

    def test_product_creation(self):
        product = Product.create(
            ProductID=1,
            ProductName="Test Product",
            ProductPhotoURL="http://example.com/product.jpg",
            ProductStatus="Active"
        )
        self.assertEqual(Product.select().count(), 1)
        self.assertEqual(product.ProductName, "Test Product")


if __name__ == '__main__':
    unittest.main()
