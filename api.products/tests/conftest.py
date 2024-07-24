import pytest
from flask import Flask
from api.models import db
from api.blueprints.products import products_blueprint


@pytest.fixture(scope='module')
def app():
    """Create and configure a new app instance for testing."""
    app = Flask(__name__)
    app.config.update({
        'TESTING': True,
        'DATABASE': 'sqlite:///:memory:',
    })

    app.register_blueprint(products_blueprint, url_prefix='/api/products')

    with app.app_context():
        db.connect()
        db.create_tables([])

    yield app

    with app.app_context():
        db.drop_tables([])
        db.close()


@pytest.fixture(scope='module')
def client(app):
    """A test client for the app."""
    return app.test_client()
