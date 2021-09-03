---
id: manage-dependencies
title: Manage Dependencies
---

## Automated Dependency Management

We depend on each other's code and components so we don't have to re-implement code. With Bit we can install components and npm packages as dependencies.

Each Bit component has its own dependency graph. This graph is managed by Bit according to the dependencies available in the workspace. In the `workspace.jsonc` file you control a single dependency policy. Components may `import` any of the dependencies listed in that policy. Bit automates per-component dependencies according to their `import` statements. The result is a centralized control over component dependencies. The workspace provides the possible libraries, and components can choose which libraries to depend on. Because we have a central location for all dependencies you don't have to manually manage a `package.json` per component.

### Install a Dependency in your workspace

To install a dependency in your workspace, use the `bit install` command:

```sh
bit install classnames
```

Bit installs `classnames` as a dependency to your workspace and automatically adds it to the dependency policy in your `workspace.jsonc` file:

```js {6} title="workspace.jsonc"
...
"teambit.dependencies/dependency-resolver": {
    "packageManager": "teambit.dependencies/pnpm",
    "policy": {
      "dependencies": {
        "classnames": "2.3.1"
      }
    }
}
...
```

`classnames` is installed in the workspace but is not added as a dependency to any component.

### Adding a Dependency to a Component

Bit automates dependency management by finding all `import` statements in your code and resolving them to the installed dependency in your workspace. To add `classnames` as a dependency:

```js title="my-component.tsx"
import classnames from 'classnames';
```

## Viewing Component Dependencies

To view component dependencies run the `bit show` command followed by the component id:

```sh
bit show <component-id>
```

## Change a Dependency Type

In the same project a dependency can be a runtime dependency for one component and a dev-dependency to another. This means that defining a dependency type is on a per-component basis. To simplify this flow, Bit determines the dependency type according to the file importing that dependency.

### Change a Dependency to be a `devDependency`

The decision between `dependency` and `devDependency` is contextual and in most cases driven by when and where a dependency is used. For a dependency be a `devDependency` all we need is to ensure it is required **only** by the component's **dev files**:

- `*.docs.*` - documentation for components.
- `*.specs.*` or `*.tests.*` - tests/specs of a component.
- `*.compositions.*` - visualize the component in different contexts.

:::note
`devDependencies` is the "weakest" type of dependency. If the same dependency appears for a dev file as well as the component's main file it then moves it to the list of `dependencies`.
:::

### Change a Dependency to be a `peerDependency`

`peerDependencies` is a way to [express compatibility with a host tool or library](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#peerdependencies), for example - React, Angular or Vue.

Most of the component's `peerDependencies` are defined as part of the [Component Development Environment](/) to standardize their versioning.  
If in your workspace you are required to set a dependency as a peer dependency, you need to apply it as part of the dependency policy in the `workspace.jsonc`, :

```js {6} title="workspace.jsonc"
...
"teambit.dependencies/dependency-resolver": {
    "packageManager": "teambit.dependencies/pnpm",
    "policy": {
      "peerDependencies": {
        "classnames": "2.3.1"
      }
    }
}
...
```

:::note
When you set a dependency as `peerDependency` Bit forces this config on all components importing that library/component, disregarding how they import it.
:::

## Change a Package Dependency Version

Bit decides on a dependency version according to how it is installed in your `node_modules` directory. To change/update a version for a component dependency you need to update your workspace so Bit picks up this change for your component. You can update the versions in your workspace by running the `bit install` command.

```bash
bit install
```

## Workspace Policy and Component Dependencies

The `workspace.jsonc` file defines dependencies for the entire workspace as a centralized, easy to manage, place to set all dependencies. Bit then uses how dependencies are installed and resolved to build a dependency graph for components. This means that the workspace acts more like a policy that defines the rules for how Bit should decide on dependencies. This is unlike using a `package.json` where what's written there drives the entire dependency graph for your project.

### Setting Several Policies

By using a policy to drive dependency definition, knowing each component may have its own set of different dependencies, we can even assign different versions of dependencies to components in the same project.

To do so, add a `variant` configuration to your workspace and set a different dependency policy there:

```js {5,13} title="workspace.json"
{
  "teambit.dependencies/dependency-resolver": {
    "policy": {
      "dependencies": {
        "classnames": "2.0.0"
      }
    }
  },
  "teambit.workspace/variants": {
    "{ui/*}": {
      "teambit.dependencies/dependency-resolver": {
        "policy": {
          "classnames": "1.0.0"
        }
      }
    }
  }
}
```

When configuring this and running `bit install`, Bit may create additional `node_modules` directories across your workspace, making sure node will resolve dependencies to their correct version.

### Using Policies to Force Dependencies

When setting a dependency policy for the entire workspace Bit only adds these dependencies for components that actually import them. If you want to add a dependency for a component that does not specifically import it you will need to set a policy in the variants section of the `workspace.jsonc` file:

```js {6} title="workspace.jsonc"
{
  "teambit.workspace/variants": {
    "{ui/*}": {
      "teambit.dependencies/dependency-resolver": {
        "policy": {
          "lodash.zip": "1.0.0"
        }
      }
    }
  }
}
```

## Using a `package.json` for Dependencies

You can also use a `package.json` in your project. When running `bit install` and building the dependency policy Bit will propagate from `workspace.jsonc` to `package.json`, so all dependencies defined there will be installed as well. You may also decide not to use `bit install` at all. However in this case you lose the ability to define specific dependency policies for sub-sets of components.
