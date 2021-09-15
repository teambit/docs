---
title: Dependencies
id: use-dependencies
---

import { Image } from '@site/src/components/image';
import depImg from './deps.png';
import depGraphImg from './dep-graph.png';
import devDepGraphImg from './dev-dep-graph.png';

Dependencies are our way of building with other people's code. Component may depend on other components form the same workspace or external libraries.

## Depending on Local Component

Components from the same workspace can be imported using an absolute `import` statement. By using absolute paths (as opposed to using relative paths) you decouple component's implementation from the project's file structure.

```sh title="Adding dependency to another component with import statement"
import { Heading } from '@company/scope.ui.heading';
```

To see that your component has a new dependency, go to the component's **Dependencies** tab.

<Image src={depImg} />

You can also use the terminal:

```bash
bit show ui/my-welcome
```

```bash {8} title="See dependencies in the terminal"
┌───────────────────┬────────────────────────────────────────────────────────────────┐
│ id                │ bitorg.experience/ui/my-welcome                                │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ ...               | ...                                                            │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ extensions        │ teambit.react/react                                            │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ dependencies      │ @bitorg/experience.templates.ui.heading@latest- (component)    │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ dev dependencies  │ ...                                                            │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ peer dependencies │ ...                                                            │
└───────────────────┴────────────────────────────────────────────────────────────────┘
```

:::warning Limits on component dependencies

- Component may not use relative import statements to other components.
- Component may not depend on internal files of other components.

:::

## Install External Dependencies

Use `install` to add [external dependencies](/dependencies/external-dependencies) to your workspace.

```bash
bit install @teambit/base-ui.button
```

Bit will install all these dependencies to the workspace's `node_modules` directory to be `import`ed by any component.

```js title="Workspace.jsonc with dependency"
"teambit.dependencies/dependency-resolver": {
    "packageManager": "teambit.dependencies/pnpm",
    "policy": {
      "dependencies": {
        "@teambit/base-ui.button": "2.3.1"
      }
    }
}
```

`@teambit/base-ui.button` is installed for the workspace but is not added as a dependency to any component. To add it as a dependency for a component, edit that component and add an `import` statement.

```js title="Add dependency to component with import statement"
import { Button } from '@teambit/base-ui.button';
```

## Remove Dependency

Removing a dependency is as simple as removing the corresponding `import`/`require` statements from the Component's Source Code

```js title="Removing dependency by commenting out import statement"
import React from 'react';
// @teambit/base-ui.button;
```

## Dependency Types

In the same workspace a dependency can be a runtime dependency for one component and a dev-dependency for another another. This means that defining a dependency type is done on a per-component basis. To simplify this flow, Bit determine the dependency type according to the file importing that dependency.

### `devDependencies`

For a dependency be a `devDependency` all you need is to ensure it is required only by the component's [Dev Files](/components/dev-files). The default dev-files are:

- `*.docs.*` - holding documentation for components.
- `*.specs.*` or `*.tests.*` - holding the tests and specs of a component.
- `*.compositions.*` - holding the instructions on simulate the component in different situations.

Bit does not support `devDependency` as a policy.

### `peerDependencies`

While the decision between `dependency` and `devDependency` is driven by where a dependency is used. `peerDependencies` is a way to [express compatibility with a host tool or library](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#peerdependencies) (for example - React, Angular or Vue, for example).

Most of the component's `peerDependencies` are defined as part of the [Component Development Environment](https://TODO), to standardize their versioning.  
If in your workspace you are required to set a dependency as a peer dependency, you need to apply it as such in the `workspace.jsonc`, as part of the dependency policy:

```js title="Workspace.jsonc with peer dependency"
"teambit.dependencies/dependency-resolver": {
    "packageManager": "teambit.dependencies/pnpm",
    "policy": {
      "peerDependencies": {
        "@teambit/base-ui.button": "2.3.1"
      }
    }
}
```

When you set a dependency as peerDependency Bit forces this config on all components importing that component, disregarding how they import it.

To learn more about peer dependencies, please read the [Peer Dependencies](/dependencies/overview#peer-dependencies) section of the docs.

## Automated Dependency Definition

Bit calculates component dependencies by running static code analysis and resolving dependencies for each component. From this output, Bit automates per-component `package.json` file.

### Manual Overrides

While Bit tries to automate as much of the work around dependency management, there are still cases where you need to take control and manage dependencies (or some of them). Learn more about it [here](/dependencies/overview#dependency-policies).
