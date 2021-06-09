import React from 'react';
import { render } from '@testing-library/react';
import { BasicTheme } from './theme.composition';

it('should render something inside it', () => {
  const { getByText } = render(<BasicTheme />);
  const rendered = getByText('Anything can be rendered inside the theme');
  expect(rendered).toBeTruthy();
});
