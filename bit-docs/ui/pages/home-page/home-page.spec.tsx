import React from 'react';
import { render } from '@testing-library/react';
import { BasicHomePage } from './home-page.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicHomePage />);
  const rendered = getByText('hello from HomePage');
  expect(rendered).toBeTruthy();
});
