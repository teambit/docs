---
id: dependency-policies
title: Dependency Policies
---

Dependency policies define the version and dependency type of each package used by components in the workspace.

Whenever you use the `bbit install <package>` command, Bit adds the latest version of that package, like so:

```json
// Inside the 'workspace.jsonc' configuration file.
{
  "@teambit.dependencies/dependency-resolver": {
    "policy": {
      "dependencies": {
        "lodash": "4.17.0"
      }
    }
  }
}
```

Auto-generated policies (like the one seen above) can be manually modified, much like a `package.json`.

## Applying policies on all relevant components

A dependency policy set at the root level of the workspace configuration JSON will affect _all_ components that have the configured package as their dependency (i.e., components that have this module listed in their [generated dependency graph](/docs/dependencies/dependency-resolution)). Components that do not have this package as a dependency will not be affected.

For example:

```json
// Every component that has 'lodash' as a dependency will use version '3.0.0' of it.
// This policy will not affect any component that does not have 'lodash' as its dependency.
{
  "$schema": "https://static.bit.dev/teambit/schemas/schema.json",

  "teambit.workspace/workspace": {
    "name": "my-workspace-name",
    "icon": "https://static.bit.dev/bit-logo.svg",
    "defaultScope": "my-scope"
  },
  "teambit.dependencies/dependency-resolver": {
    "policy": {
      "dependencies": {
        "lodash": "3.0.0"
      }
    }
  }
}
```

## Applying policies on a selected group of components

Dependency policies can be applied on a specific group of components. This is done using the [`@teambit.workspace/variants`](/docs/workspace/cascading-rules) configuration API.

For example, to set the `1.0.0` version of `classnames` as a dependency of all components located inside the `./components/react` directory (or any of its sub-directories):

```json
{
  "teambit.workspace/variants": {
    "teambit.dependencies/dependency-resolver": {
      "policy": {
        "components/react": {
          "classnames": "1.0.0"
        }
      }
    }
  }
}
```

> To learn how to select components using `@teambit.workspace/variants`, [see here](docs/variants/overview).

### Overriding cascading policies

Policies set on a specific group of components will override any conflicting policies that have cascaded from more general configurations.

For example, the following configuration will set `classnames` version `1.0.0` on all component using the `react-ui` namespace. This policy will override the workspace-level policy that uses version `2.0.0` of that same package.

```json
// All components using the namespace 'react-ui' will use version 1.0.0 of "classnames"
// instead of version "2.0.0", set as the default for all components in the workspace
{
  "teambit.workspace/workspace": {
    "name": "my-workspace"
  },
  "teambit.dependencies/dependency-resolver": {
    "policy": {
      "dependencies": {
        "classnames": "2.0.0"
      }
    }
  },
  "teambit.workspace/variants": {
    "teambit.dependencies/dependency-resolver": {
      "policy": {
        "{react-ui/*}": {
          "classnames": "1.0.0"
        }
      }
    }
  }
}
```

### "Forcibly" add dependencies to a component

Dependency policies applied on a selected group of components will "forcibly" add the listed packages to any [selected] component that does not have them [listed already as a dependency](/docs/dependencies/dependency-resolution). This can be useful when a component depends on another module but has no `import`/`require` statement to require that dependency in any of its files (for example, in a Webpack configuration file).

> To understand why `import`/`require` statements are necessary to determine the component dependencies, [see here](/docs/dependencies/dependency-resolution).

## Dependency types

### Dev dependencies

A dependency policy config can only have `dependencies` and `peerDependencies`. A dependency used as a dev dependency is configured under `dependencies` but will be considered as a dev dependency by the [Dependency Resolver](docs/dependencies/dependency-resolution).

The [Dependency Resolver](docs/dependencies/dependency-resolution) looks at the [type of file](/docs/dependencies/dependency-policies#determining-the-file-pattern-of-a-development-file) expressing the `import`/`require` statement to determine whether a dependency is used by a component for runtime (`dependencies`) or for development (`devDependencies`).

For example, let's say a 'Button' React component has a test file, `button.spec.tsx`, that uses the `react-test-renderer` package. This will generate the following policy:

```json
// workspace.jsonc
{
  "@teambit.dependencies/dependency-resolver": {
    "policy": {
      "dependencies": {
        "react-test-renderer": "17.0.1"
      }
    }
  }
}
```

Even though the `react-test-renderer` is not explicitly configured as a dev dependency, it will be considered as such by the [Dependency Resolver](docs/dependencies/dependency-resolution). One example of that can be seen in the `package.json` file generated for that 'Button' component:

```json
// ./node_modules/@my-org/button

{
  "name": "@my-org/button",
  "main": "dist/index.js",
  "componentId": {
    "name": "button",
    "version": "0.0.1"
  },
  "devDependencies": {
    "react-test-renderer": "17.0.1"
  },
  "peerDependencies": {
    "react": "^16.13.1",
    "react-dom": "^16.13.1"
  },
  "types": "index.ts",
  "private": false
}
```

#### Determining the file pattern of a development file

The name patterns of development files (i.e, files that should be considered as development files by the Dependency Resolver) can be configured as follow:

```json
{
  "teambit.dependencies/dependency-resolver": {
    "devFilePatterns": [".spec.ts"]
  }
}
```

The above example will set the dependency resolver to consider any dependency used by files ending with the `.spec.ts` extension, as a dev dependency.

### Peer dependencies

Setting a package as a peer dependency ensures the package manager installs only a single version of that package. If that is not possible, if there is no single “agreed upon” version for all components in the workspace then an error will be thrown.

This can be crucial when different components communicate with each other using shared objects that are instantiated by an installed package (the dependency). If different versions of the same package create different object instances then the “means of communication” is broken. There is no single object to address, no single source of truth. This can turn out to be critical when working with modules that are used as “plugins” of another module (for example, Babel), or when working with components that are coordinated in runtime using a shared library (for example, React).

To set a package as a peer dependency, place it under the `peerDependencies` entry, like so:

```json
{
  "teambit.bit/dependency-resolver": {
    "policy": {
      "dependencies": {},
      "peerDependencies": {
        "react": "^16.13.1",
        "react-dom": "^16.13.1",
      }
    }
}
```

> Peer dependencies are usually used in the context of a single "hosting code". That could be an application or a single component library. Bit may generate multiple "hosts", one for each environment being used, to run components of different types. That could translate into multiple versions of the same peer dependency, one for each environment. To manage multiple versions of a peer dependency [see here](/docs/faq/multiple-peer-dep-versions).
