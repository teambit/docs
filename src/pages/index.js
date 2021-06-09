import React from 'react';
import Layout from '@theme/Layout';

import { Hero } from '@learn-bit-react/bit-docs.ui.hero';

function Hello() {
  return (
    <Layout title="Hello">
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
      </div>
    </Layout>
  );
}

export default Hello;
