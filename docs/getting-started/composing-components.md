---
id: composing-components
title: Composing Components
---

You can compose components together from other components in your workspace or from components in the cloud.

## Create more Components

To create other components you can use `bit create react-component` followed by your component name and if you want it to appear in a specific folder then add the `--namespace` flag followed by the folder name.

```bash
bit create react-component card --namespace ui
```

```bash
the following 1 component(s) were created

my-scope/ui/card at my-scope/ui/card
    card.composition.tsx
    card.docs.mdx
    card.spec.tsx
    card.tsx
    index.ts
```

:::note creating multiple components
You can create multiple components by adding more component names after the `create react-component` command.
:::

## Install Dependencies

As we had added a test file that includes dependencies for Testing Library and Chai we will need to install them:

```sh
bit install @testing-library/react chai
```

## Composing Component

We will need to modify the Card component as for now all it does is print out a `<p>` tag. Let's change it to have a div and lets import our Button component inside it.

When importing a component into another component you cannot use a relative path. You must use your componentID. In the workspace UI you will see the package name for your component which you can copy to import it.


```js
import React from 'react';
import { Button } from '@my-scope/ui.button'

export type CardProps = {
  text: string;
};

export const Card = ({ text }: CardProps) => {
  return (
    <div>
      <p>{text}</p>
      <Button text="hello from button" />
    </div>
  )
};
```

In your workspace UI you will now see your card component rendered with the button component inside it.



## What's Next?

It's time to create a [Remote Scope](remote-scope) so you can see you component on the [Bit.dev](https://bit.dev) cloud and then export it and import it into another application.