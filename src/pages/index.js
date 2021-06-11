import React from 'react';
import Layout from '@theme/Layout';
import { Theme } from '@learn-bit-react/bit-docs.themes.theme';
import { Hero } from '@learn-bit-react/bit-docs.ui.hero';
import { ProductDescription } from '@learn-bit-react/bit-docs.ui.product-description';
function Hello() {
  return (
    <Layout title="Hello">
      <Theme>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: '20px',
            margin: '4rem'
          }}>
          <Hero
            src="/img/bit.gif"
            alt="bit"
            text="Bit is a free and distributed version control system for components
          and dependencies. It helps build component driven apps in a simple and
          scalable way."
            headingText="bit is git for Components"
            secondaryLinkText="Watch Tutorial"
            mainLinkText="Go to the Docs"
            mainLinkHref="/getting-started/installing-bit"
            secondaryLinkHref="/tutorials/react/create-and-consume-components"
          />
          <ProductDescription
            h3="Component Driven Development"
            headingText="The first component-based version control system"
            paragraph1="git was built for projects. Bit was built for Components. With bit we develop components in isolation so they can easily be used to compose more complex components which can then be used to build pages and apps."
            paragraph2="Component Driven Development means to build from the bottom up. Instead of building thinking in apps we build thinking in components which allows us to build more modular and more scaleable and rusable components."
            linkText="Learn more about Component Driven Development"
          />
        </div>
      </Theme>
    </Layout>
  );
}

export default Hello;
