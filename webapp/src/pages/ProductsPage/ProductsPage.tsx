import { useState, useEffect } from 'react';
import axios from 'axios';
import PageWrapper from '../PageWrapper';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Product } from '../../components/interfaces';
import Spinner from '../../components/Spinner/Spinner';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get<Product[]>('/api/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again.');
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <>
        <h1 className='text-3xl font-bold text-white'>Products Page</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 p-4'>
          {loading ? (
            <div className='col-span-full flex justify-center items-center'>
              <Spinner />
            </div>
          ) : error ? (
            <div className='col-span-full text-center text-lg text-gray-500'>{error}</div>
          ) : products.length > 0 ? (
            products.map((product) => <ProductCard key={product.ProductID} product={product} />)
          ) : (
            <div className='col-span-full text-center text-lg text-gray-500'>
              No products found.
            </div>
          )}
        </div>
      </>
    </PageWrapper>
  );
};

export default ProductsPage;
