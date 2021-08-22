---
id: tracking-components
title: Tracking Components
---

import { Image } from '@site/src/components/image'
import BitCreate from '@site/docs/components/components/react/bit-create-component-card.md'
import BitTemplates from '@site/docs/components/commands/bit-templates.md'
import NameSpaces from '@site/docs/components/components/namespaces.md'
import BitAdd from '@site/docs/components/components/bit-add.md'

The tracking process translates sets of files into a single component that is semantically understood by Bit. It is the first step in a component's journey to complete independency.

When a component gets tracked, Bit does the following:

- It determines which files should be be included in that component (see the result in the .bitmap file)
- It determines the component ID
- It determines the component entry point and its dependency graph
- It creates a package in the workspace `node_modules` directory
- It renders the component in the Workspace UI

## Using Bit Create

Tracking components is done automatically if you are using `bit create` to create your components.

<BitCreate />

<BitTemplates />

## Pre-existing Components

Components not created with the `bit-create` command will need to be manually added to the workspace using the `bit-add` command.

### Track a single component

<BitAdd />

#### Namespaces

<NameSpaces />

A tracked component should appear in the Workspace UI navigation bar with an "N" to its right, to signify that it is a new component.

<Image src="/img/new_component.png" alt="new component" width="60%" />
<br />

:::note Check for tracking issues
Use the `bit status` command to check for tracking issues.
:::

### Track multiple components

To track multiple components, set the path to the common directory and use the `*` wildcard.

For example:

```bash
bit add path/to/common/path/*
```

### Set an entry point for a component

The default entry point is `index.ts`/`index.js`. To set a different entry point:

```bash
bit add <path to component> --main <entry file>
```

For example

```bash
bit add components/ui/button --main main.js
```

## Untracking components

```bash
bit untrack <component id>
```

## Best Practices

- Start tracking components bottom-up, so all components that are shared by other components are tracked first.
- Plan and arrange components in namespaces according to their functionality, similar to the way you would arrange them in folders in a project.
- Review the package.json in your original projects to ensure proper definition of dependencies.
- If you are using path aliases in your `import` statements, make sure you define Bit's custom paths resolution configuration.

## Adding Components

You can add components to Bit using the `bit add` command. This command will track the component by adding it to your `.bitmap` file. Use `bit add` followed by the components path/directory structure.

```bash
bit add my-scope/ui/my-component
```

Use the `--namespace` flag to specify the namespace of the component.

```bash
bit add my-scope/ui/my-component --namespace ui
```

