import React from 'react';
import { ProductDescription } from './product-description';

export const BasicProductDescription = () => (
  <ProductDescription
    h3="Component Driven Development"
    headingText="The first component-based version control system"
    paragraph1="git was built for projects. Bit was built for Components. With bit we develop components in isolation so they can easily be used to compose more complex components which can then be used to build pages and apps."
    paragraph2="Component Driven Development means to build from the bottom up. Instead of building thinking in apps we build thinking in components which allows us to build more modular and more scaleable and rusable components."
    linkText="Learn more about Component Driven Development"
  />
);
