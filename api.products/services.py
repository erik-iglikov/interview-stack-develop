from api.models import Product


def get_active_products():
    return Product.select().where(Product.ProductStatus == 'Active')
