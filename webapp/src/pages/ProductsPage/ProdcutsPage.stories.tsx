import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import ProductsPage from './ProductsPage';

export default {
  title: 'Products Page',
  component: ProductsPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof ProductsPage>;

const Template: ComponentStory<typeof ProductsPage> = () => <ProductsPage />;

export const FetchProductsSuccess = Template.bind({});
FetchProductsSuccess.parameters = {
  mockData: [
    {
      url: '/api/products',
      method: 'GET',
      status: 200,
      response: [
        {
          ProductID: 1,
          ProductName: 'Widget',
          ProductPhotoURL: 'https://via.placeholder.com/300x300?text=Widget',
          ProductStatus: 'Active',
        },
        {
          ProductID: 2,
          ProductName: 'Gadget',
          ProductPhotoURL: 'https://via.placeholder.com/300x300?text=Gadget',
          ProductStatus: 'Active',
        },
      ],
    },
  ],
};

export const FetchProductsEmpty = Template.bind({});
FetchProductsEmpty.parameters = {
  mockData: [
    {
      url: '/api/products',
      method: 'GET',
      status: 200,
      response: [], // No products available
    },
  ],
};

export const FetchProductsError = Template.bind({});
FetchProductsError.parameters = {
  mockData: [
    {
      url: '/api/products',
      method: 'GET',
      status: 500,
      response: { message: 'Error fetching products' },
    },
  ],
};
