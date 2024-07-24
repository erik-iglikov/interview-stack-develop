from flask import Blueprint, jsonify
from api.schemas import ProductSchema
from services import get_active_products

products_blueprint = Blueprint('products', __name__)


@products_blueprint.route('/', methods=['GET'])
def get_products():
    active_products = get_active_products()
    product_schema = ProductSchema(many=True)
    result = product_schema.dump(list(active_products))
    return jsonify(result)
