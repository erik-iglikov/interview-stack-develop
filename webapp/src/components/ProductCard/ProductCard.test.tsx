import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';

describe('ProductCard', () => {
  const product = {
    ProductID: 1,
    ProductName: 'Widget',
    ProductPhotoURL: 'https://via.placeholder.com/300x300?text=Widget',
  };

  it('renders product information', () => {
    render(<ProductCard product={product} />);

    const productName = screen.getByText('Widget');
    const productID = screen.getByText('ID: 1');
    const productImage = screen.getByRole('img', { name: 'Widget' });

    expect(productName).toBeInTheDocument();
    expect(productID).toBeInTheDocument();
    expect(productImage).toHaveAttribute('src', 'https://via.placeholder.com/300x300?text=Widget');
  });
});
