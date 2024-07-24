import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor } from '@testing-library/react';
import ProductsPage from './ProductsPage';
import { MemoryRouter } from 'react-router-dom';

describe('ProductsPage', () => {
  const handlers = [
    rest.get('/api/products', (req, res, ctx) => {
      return res(
        ctx.json([
          {
            ProductID: 1,
            ProductName: 'Widget',
            ProductPhotoURL: 'https://via.placeholder.com/300x300?text=Widget',
            Status: 'Active',
          },
          {
            ProductID: 2,
            ProductName: 'Gadget',
            ProductPhotoURL: 'https://via.placeholder.com/300x300?text=Gadget',
            Status: 'Active',
          },
        ])
      );
    }),
  ];

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('displays products after fetching', async () => {
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );
    await waitFor(() => {
      const productCards = screen.getAllByText(/Widget|Gadget/i);
      expect(productCards).toHaveLength(2); // Assuming there are 2 products fetched
    });
  });

  it('displays error message on fetch failure', async () => {
    server.use(
      rest.get('/api/products', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Failed to load products' }));
      })
    );

    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Failed to load products. Please try again.')).toBeInTheDocument();
    });
  });
});
