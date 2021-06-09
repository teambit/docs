import React from 'react';
import { render } from '@testing-library/react';
import {
  Primary,
  Secondary,
  Tertiary,
  Complimentary,
  Text
} from './colors.composition';

it('renders the primary color', () => {
  const { getByTestId } = render(<Primary />);
  const primary = getByTestId('primary');
  expect(primary).toBeTruthy();
});

it('renders the secondary color', () => {
  const { getByTestId } = render(<Secondary />);
  const secondary = getByTestId('secondary');
  expect(secondary).toBeTruthy();
});

it('renders the tertiary color', () => {
  const { getByTestId } = render(<Tertiary />);
  const tertiary = getByTestId('tertiary');
  expect(tertiary).toBeTruthy();
});

it('renders the complimentary color', () => {
  const { getByTestId } = render(<Complimentary />);
  const complimentary = getByTestId('complimentary');
  expect(complimentary).toBeTruthy();
});

it('renders the text color', () => {
  const { getByTestId } = render(<Text />);
  const text = getByTestId('text');
  expect(text).toBeTruthy();
});
