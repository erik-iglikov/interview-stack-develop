import React from 'react';
import { Product } from '../interfaces';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <div className='w-48 rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300'>
    <img
      src={product.ProductPhotoURL}
      alt={product.ProductName}
      className='w-full h-32 object-cover'
    />
    <div className='px-6 py-3 pb-3'>
      <div className='font-bold text-lg mb-1'>{product.ProductName}</div>
      <p className='text-gray-700 text-base'>ID: {product.ProductID}</p>
    </div>
  </div>
);

export default ProductCard;
