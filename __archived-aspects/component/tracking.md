---
id: tracking
title: Tracking
---

//TODO add to getting started

import { Image } from '@site/src/components/image'

The tracking process translates sets of files into a single component that is semantically understood by Bit. It is the first step in a component's journey to complete independency.

When a component gets tracked, Bit does the following:

- It determines which files should be be included in that component (see the result in the .bitmap file)
- It determines the component ID
- It determines the component entry point and its dependency graph
- It creates a package in the workspace `node_modules` directory
- It renders the component in the Workspace UI

## Tracking components

### Track a single component

```bash
$ bit add <path to component>
```

For example:

```bash
$ bit add components/react/button
```

A tracked component should appear in the Workspace UI navigation bar with an "N" to its right, to signify that it is a new component.

<Image src="/img/new_component.png" alt="new component" width="60%" />
<br />

:::note Check for tracking issues
Use the `bit status` command to check for tracking issues.
:::

#### Add a namespace

Namespaces serve as (abstract) folders that organize components in the Workspace/Remote Scope. In addition to that, namespaces are a way to decouple your components' configurations from the file structure, as they allow you to [handle components using names](/building-with-bit/workspace#selecting-using-a-namespace) that pertain to the function and purpose of a component, instead.

To namespace a component us the `--namespace` or `-n` option.

```bash
$ bit add <path to component> --namespace <name>
```

For example:

```bash
$ bit add components/react/button --namespace react-ui
```

Namespaces also support nesting. For example:

```bash
$ bit add components/react/button --namespace react/ui
```

### Track multiple components

To track multiple components, set the path to the common directory and use the `*` wildcard.

For example:

```bash
$ bit add path/to/common/path/*
```

### Set an entry point for a component

The default entry point is `index.ts`/`index.js`. To set a different entry point:

```bash
$ bit add <path to component> --main <entry file>
```

For example

```bash
$ bit add components/react/button --main main.js
```

## Untracking components

```bash
$ bit untrack <component id>
```

## Best Practices

- Start tracking components bottom-up, so all components that are shared by other components are tracked first.
- Plan and arrange components in namespaces according to their functionality, similar to the way you would arrange them in folders in a project.
- Review the package.json in your original projects to ensure proper definition of dependencies.
- If you are using path aliases in your `import` statements, make sure you define Bit's custom paths resolution configuration.
