---
id: dependencies
title: Dependencies
---

We depend on each other's code and components so we don't have to re-implement code. Bit implements a set of features for a mostly hands-off work for component dependency management.

This topic describes how to add local components and npm packages as dependencies for React components.

:::note What are Dependencies

A component dependencies is a list of all external code imported to a component. This can be either npm packages or other Bit components implemented in the same workspace.  
The major difference between them is that npm packages are listed in the workspace dependency manifest/policy and components are sources locally. However, given that components are available as local `node_modules`, the same general workflow and rules described in this topic applied.

:::

---

## Prerequisites

To create a Bit component, verify you met the following:

1. [Install Bit CLI.](/getting-started/installing-bit)
1. [Create a Bit workspace](/getting-started/initializing-workspace) on a fresh Git repository.
1. [Create a component](/bit-components/component-overview) with a [composition.](/bit-components/component-compositions)

---

## Manage Component Dependencies

Each Bit component has its own dependencies. It is managed by Bit according to the `import` statements in your code and the installed dependencies in your workspace.

### Install dependency on workspace

To install a dependency for your workspace, use the `install` command:

```sh
bit install <TODO>
```

Bit installs `<TODO>` as a dependency to your workspace and adds it to the dependency policy in your `workspace.json`:

```js {6} title="workspace.jsonc"
...
"teambit.dependencies/dependency-resolver": {
    "packageManager": "teambit.dependencies/pnpm",
    "policy": {
      "dependencies": {
        "<TODO>": "2.3.1"
      }
    }
}
...
```

:::info Dependency is only installed

`<TODO>` is installed for the workspace but is not added as a dependency to any component.

:::

### Adding dependency for component

To add `<TODO>` as a dependency, let's first create a component

```sh
bit create react-component image
```

Run the following command to see that `<TODO>` is not a dependency for `image`

```sh
bit show image
```

Bit automates dependency management by finding all `import` statements in your code and resolving them to the installed dependency in your workspace. To add `<TODO>` as a package dependency, build `image` as follows:

```typescript {2,16} title="image.tsx"
import React from 'react';
import TODO from '<TODO>';
import styles from './img.module.scss';

```

:::tip See package dependencies in the UI and CLI

To see all component dependencies, including `<TODO>` in start the local dev server:

```sh
bit start
```

Then head over your component, and open the code view. On the right side-panel you can see all dependencies.

To view component dependencies from the terminal run the `show` command:

```sh
bit show image
```

:::

### Remove dependency from a component

Similar to how we add a dependency, to remove a dependency we can refactor the component and omit the `import` statement for `<TODO>`.

```typescript
import React from 'react';
// import TODO from '<TODO>';
import styles from './img.module.scss';
```

---

## Change Dependency Type

In the same project a dependency can be a runtime dependency for one component and a dev-dependency to another at the same time. This means that defining a dependency type is on a per-component basis. To simplify this flow, Bit determine the dependency type according to the file importing that dependency.

### Move to a `devDependency`

For a dependency be a `devDependency` all we need is to ensure it is required **only** by the component's **dev files**:

* `*.docs.*` - holding documentation for components.
* `*.specs.*` or `*.tests.*` - holding the tests and specs of a component.
* `*.compositions.*` - holding the instructions on simulate the component in different situations.

`devDependencies` is the "weakest" type of dependency, as if the same dependency appears for a dev file and the component's implementation, moves it to the list of `dependencies`.

:::info Setting your own dev file patterns

If you use different naming schemes for your dev files you can configure your components to follow your rules. [Learn more.](https://todo)

:::

### Move to `peerDependency`

While the decision between `dependency` and `devDependency` is contextual and in most cases driven by when and where a dependency is used. `peerDependencies` is a way to [express compatibility with a host tool or library](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#peerdependencies) (for example - React, Angular or Vue, for example).

Most of the component's `peerDependencies` are defined as part of the [Component Development Environment](https://TODO), to standardize their versioning.  
If in your workspace you are required to set a dependency as a peer dependency, you need to apply it as such in the `workspace.jsonc`, as part of the dependency policy:

```js {6} title="workspace.jsonc"
...
"teambit.dependencies/dependency-resolver": {
    "packageManager": "teambit.dependencies/pnpm",
    "policy": {
      "peerDependencies": {
        "<TODO>": "2.3.1"
      }
    }
}
...
```

When you set a dependency as `peerDependency` Bit forces this config on all components importing that component, disregarding how they import it.

---

## Change Package Dependency Version

Bit decides on a dependency version according to how it is installed in your `node_modules` directory. To change/update a version for a component dependency you need to update your workspace so Bit picks up this change for your component. This makes the process of updating versions similar to how you do this for your entire project, as Bit picks up these changes.

---

## Workspace Policy and Component Dependencies

The `workspace.jsonc` file defines dependencies for the entire workspace as a centralized, easy to manage, place to set all dependencies. Bit then uses how dependencies are installed and resolved to build a dependency graph for components. This means that the workspace acts more like a policy that defines the rules for how Bit should decide on dependencies. This is unlike using `package.json` where what's written there drives the entire dependency graph for your project.

### Setting several policies

By using a policy to drive dependency definition, knowing each component may have its own set of different dependencies, we can even assign different versions of dependencies to components in the same project.  
To do so, add a `variant` configuration to your workspace and set a different dependency policy there:

```js {5,13} title="workspace.json"
{
  "teambit.dependencies/dependency-resolver": {
    "policy": {
      "dependencies": {
        "<TODO>": "2.0.0"
      }
    }
  },
  "teambit.workspace/variants": {
    "{react-ui/*}": {
      "teambit.dependencies/dependency-resolver": {
        "policy": {
          "<TODO>": "1.0.0"
        }
      }
    }
  }
}
```

When configuring this and running `bit install`, Bit may create additional `node_modules` directories across your workspace, making sure node will resolve dependencies to their correct version.

### Using policies to force dependencies

When setting a dependency policy for the entire workspace Bit only adds these dependencies for components that actually import them. If you need to add a dependency for a component that does not specifically import it you need to set a policy in a variant:

```js {6} title="workspace.json"
{
  "teambit.workspace/variants": {
    "{react-ui/*}": {
      "teambit.dependencies/dependency-resolver": {
        "policy": {
          "lodash.zip": "1.0.0"
        }
      }
    }
  }
}
```

---

## Using `package.json` for Dependencies

You can use `package.json` in your project. When running `install` and building the dependency policy Bit will propagate from `workspace.jsonc` to `package.json`, so all dependencies defined there will be installed as well.  
You may also decide no to use `bit install` at all. However in this case you loose the ability to define specific dependency policy for sub-set of components.

---

## Summary

* Dependencies can be npm packages or other components.
* Dependency management is semi-automated and driven by how you build components.
* You can manually control dependencies as needed.

---

## Next Steps

* For more information on dependency policy, see [dependency resolver aspect.](/aspects/dependency-resolver)
* For more about workspace configuration, see [workspace configuration.](https://todo)
* For more about component configuration, see [component configuration.](https://todo)

---

## FAQ

### can i control the automated dep-resolution?

### can i manually set type of dependency (dev/runtime)

### can i add a dependency without importing it

### can different components in the same workspace depend on different versions of the same component
