import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProductCard from './ProductCard';

export default {
  title: 'Components/ProductCard',
  component: ProductCard,
  argTypes: {
    product: { control: 'object' },
  },
} as ComponentMeta<typeof ProductCard>;

const Template: ComponentStory<typeof ProductCard> = (args) => <ProductCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  product: {
    ProductID: 1,
    ProductName: 'Widget',
    ProductPhotoURL: 'https://via.placeholder.com/300x300?text=Widget',
  },
};

export const LongName = Template.bind({});
LongName.args = {
  product: {
    ProductID: 2,
    ProductName: 'Very Long Product Name That Exceeds The Usual Length',
    ProductPhotoURL: 'https://via.placeholder.com/300x300?text=Hat',
  },
};

export const NoImage = Template.bind({});
NoImage.args = {
  product: {
    ProductID: 3,
    ProductName: 'Gadget',
    ProductPhotoURL: '',
  },
};
