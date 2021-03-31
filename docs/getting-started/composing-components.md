---
id: composing-components
title: Composing Components
---

import BitTemplates from '@site/docs/components/commands/bit-templates.md'

You can compose components together from other components in your workspace or from components in the cloud.

## Creating Components with Bit Create

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

## Install Dependencies

As we had added a test file that includes dependencies for Testing Library and Chai we will need to install them:

```sh
bit install @testing-library/react chai
```

## Composing Components

When importing a component into another component Bit doesn't allow for relative require/import statements, as this couples your component to a specific directory structure, instead you use the component's package name. In the workspace UI you will see the package name for your component which you can copy to import it.

```jsx {2} title="card.tsx"
import React from 'react'
import { Button } from '@my-scope/ui.button'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = ({ children, ...rest }: CardProps) => {
  return (
    <div {...rest}>
      <Button>Click here</Button>
    </div>
  )
}
```

### Your Component in the Workspace

In your workspace UI you will now see your card component rendered with the button component inside it.

### Understanding Component Module Links

Bit creates a module for each component in the workspace. These modules are linked in the node_modules directory and contains it's build output and auto-generated package.json. To see this in your workspace, browse the `node_modules/@my-scope/ui.button` directory.

To import a component as a dependency you must use the module link. This way your component is not coupled to a specific directory structure in the workspace, which makes them transferable between workspaces.

#### Generating module links

To regenerate module-links for components run the `bit link` command.

## Creating multiple components

You can create multiple components by adding more component names after the command command.

```bash
bit create react-component component1 component2 --namespace design
```

<BitTemplates />

## What's Next?

It's time to create a [Remote Scope](remote-scope) so you can see you component on the [Bit.dev](https://bit.dev) cloud and then export it and import it into another application.

Learn more about [tracking components](/building-with-bit/tracking-components) and [removing components](building-with-bit/removing-components)
