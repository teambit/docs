---
id: component-compositions
title: Compositions
---

Compositions are the main dev tool for building with components. They provide a dedicated dev-server per each component where you can create fully featured apps with support for state management, theming and routing. Compositions act like consuming applications that compose and simulate components in various use cases.

This topic describes how to use compositions for a Bit component with React.

## Video Guide

<iframe width="560" height="315" src="https://www.youtube.com/embed/so8CcUzTrn4?rel=0" title="How to Render your Component" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

## Prerequisites

To use compositions, verify you met the following:

1. [Install Bit CLI.](https://TODO)
1. [Create a Bit workspace](https://TODO) on a fresh Git repository.
1. [Create a component.](https://TODO)

---

## Create Compositions

Add compositions to a component by creating a file in the component's directory, using the `*.compositions.*` pattern.

```bash {3}
└── ui/link
    ├── index.tsx
    ├── link.composition.tsx
    └── link.tsx
```

:::tip Component templates support for compositions

All available component templates support compositions out of the box. Use `bit create` to get started quickly.

:::

:::info react-fast-refresh

Bit uses Fast Refresh. It gives the best performance for hot module reload and feedback on edits made to your components.

:::

### Add simple composition

Compositions are just name `const`s exported by the composition file.  
A basic composition may look something like this:

```js
import React from 'react';
import { Link } from './link';

export const BasicLink = () => {
  return <Link href="/homepage">homepage</Link>;
};
```

### View compositions

Bit runs a dev server for components that shows all component compositions.  
Run the dev server and browse components to see their compositions.

```sh
bit start
```

### Use other components in composition

In compositions you can `import` as many components as needed and build more complex simulations for your component.

```js
import React from 'react';
import { Header } from '@acme/base-ui.header';
import { Footer } from '@acme/base-ui.footer';
import { Link } from './link';

/**
 * Compose header with links
 */
export const HeaderLinks = () => {
  return <Header>
          <Link href="/homepage">homepage</Link>
          <Link href="/about">about</Link>
          <Link href="/contact">contact</Link>
        </Header>;
};

/**
 * Compose footer with links
 */
export const FooterLinks = () => {
  return <Footer>
          <Link href="/homepage">homepage</Link>
          <Link href="/about">about</Link>
          <Link href="/contact">contact</Link>
        </Footer>;
};
```

### Explore and understand a composition

To understand complex compositions...

TODO

component highlighter

TODO

### Sort compositions in many files

Compositions are not limited to a single file. A component may have several files with the `*.composition.*` pattern.

```bash {3}
└── ui/link
    ├── index.tsx
    ├── basic-links.composition.tsx
    ├── advanced-links.composition.tsx
    └── link.tsx
```

## Control Composition Rendering

Bit render compositions with their own dedicated dev server configuration, separated from the workspace UI.

MAJOR TODO HERE

---

## Summary

* Use compositions to create simulations of your components.
* Compositions rendered as isolated apps with their own webpack configuration.
* Use compositions as a drive for integration testing.

---

## Next Steps

* For component configuration, see [configuring components](https://TODO).
* For component development environment, see [component development environment](https://TODO).
* For isolated testing, see [testing components](https://TODO).

---

## FAQ

### Compositions & storybook

TODO
