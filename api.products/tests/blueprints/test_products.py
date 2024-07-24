from unittest.mock import MagicMock
from api.models import Product


def test_get_products(client, monkeypatch):
    sample_data = [
        Product(ProductID=1, ProductName="Test Product",
                ProductPhotoURL="http://example.com/product.jpg", ProductStatus="Active"),
        Product(ProductID=2, ProductName="Another Product",
                ProductPhotoURL="http://example.com/another.jpg", ProductStatus="Active")
    ]

    mock_service = MagicMock(return_value=sample_data)
    monkeypatch.setattr(
        'api.blueprints.products.get_active_products', mock_service)

    response = client.get('/api/products/')
    json_data = response.get_json()
    print("JSON Data:", json_data)  # Debug output
    assert response.status_code == 200
    assert len(json_data) == len(sample_data)
