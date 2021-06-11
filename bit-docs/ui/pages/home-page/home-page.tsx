import React from 'react';
import { Hero } from '@learn-bit-react/bit-docs.ui.hero';
import { ProductDescription } from '@learn-bit-react/bit-docs.ui.product-description';

export type HomePageProps = {};

export function HomePage() {
  return (
    <>
      <Hero
        src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
        alt="bit"
        text="Bit is a free and distributed version control system for components
          and dependencies. It helps build component driven apps in a simple and
          scalable way."
        headingText="bit is git for Components"
        secondaryLinkText="Watch Tutorial"
        mainLinkText="Go to the Docs"
        mainLinkHref="/"
        secondaryLinkHref="/"
      />
      <ProductDescription
        h3="Component Driven Development"
        headingText="The first component-based version control system"
        paragraph1="git was built for projects. Bit was built for Components. With bit we develop components in isolation so they can easily be used to compose more complex components which can then be used to build pages and apps."
        paragraph2="Component Driven Development means to build from the bottom up. Instead of building thinking in apps we build thinking in components which allows us to build more modular and more scaleable and rusable components."
        linkText="Learn more about Component Driven Development"
      />
    </>
  );
}
