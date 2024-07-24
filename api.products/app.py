from flask import Flask
from api.models import db
from api.blueprints.products import products_blueprint

app = Flask(__name__)

app.register_blueprint(products_blueprint, url_prefix='/api/products')


@app.before_request
def before_request():
    db.connect()


@app.after_request
def after_request(response):
    db.close()
    return response


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
