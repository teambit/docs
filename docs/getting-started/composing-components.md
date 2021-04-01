---
id: composing-components
title: Composing Components
---

import BitTemplates from '@site/docs/components/commands/bit-templates.md'
import NameSpaces from '@site/docs/components/components/namespaces.md'
import TestDependencies from '@site/docs/components/components/react/test-dependencies.md'
import BitCreateCardComponent from '@site/docs/components/components/react/bit-create-component-card.md'
import CardExample from '@site/docs/components/examples/react/card.md'
import Styles from '@site/docs/components/components/styles.md'
import BitShow from '@site/docs/components/components/bit-show.md'

You can compose components together from other components in your workspace or from components in the cloud.

## Creating Components with Bit Create

To create other components you can use `bit create react-component` followed by your component name and the namespace for that component.

<BitCreateCardComponent />

<Styles />

### Namespaces

<NameSpaces />

## Install Dependencies

<TestDependencies />

## Show Component

<BitShow />

## Composing Components

When importing a component into another component Bit doesn't allow for relative require/import statements, as this couples your component to a specific directory structure, instead you use the component's package name. In the workspace UI you will see the package name for your component which you can copy to import it.

<CardExample />

### Your Component in the Workspace

In your workspace UI you will now see your card component rendered with the button component inside it.

### Component Module Links

Bit creates a module for each component in the workspace. These modules are linked in the node_modules directory and contains it's build output and auto-generated package.json. To see this in your workspace, browse the `node_modules/@my-scope/ui.button` directory.

To import a component as a dependency you must use the module link. This way your component is not coupled to a specific directory structure in the workspace, which makes them transferable between workspaces.

#### Generating module links

To regenerate module-links for components run the `bit link` command.

## Creating multiple components

You can create multiple components by adding more component names after the command command.

```bash
bit create react-component ui/component1 ui/component2 design/component1
```

## Component Templates

<BitTemplates />

## What's Next?

It's time to create a [Remote Scope](remote-scope) so you can see you component on the [Bit.dev](https://bit.dev) cloud and then export it and import it into another application.

Learn more about [tracking components](/building-with-bit/tracking-components) and [removing components](building-with-bit/removing-components)
