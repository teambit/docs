import React from 'react';
import { render } from '@testing-library/react';
import { BasicProductDescription } from './product-description.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicProductDescription />);
  const rendered = getByText('hello from ProductDescription');
  expect(rendered).toBeTruthy();
});
