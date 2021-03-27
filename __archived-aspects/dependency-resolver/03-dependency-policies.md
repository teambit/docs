---
id: dependency-policies
title: Dependency Policies
---

//TODO use dependency.resolver component


Dependency policies define the version and dependency type of each package used by components in the workspace.

## Auto-registered dependency version and type

Dependency policies define the version and dependency type of each package used by components in the workspace.
When installing a package, the Dependency Resolver registers its version in the dependency configuration (if a version is not specified upon installation,
it will default to the latest one).

```json title="workspace.jsonc"
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

## Apply a policy on all components with the mentioned dependency

A dependency policy configured at the root level of the workspace configuration JSON will affect all components that have that package as their dependency (i.e., components that have this module listed in their generated dependency graph).
**Components that do not have this package as a dependency will not be affected.**

For example:

```json title="Dependency policies at the root-level of the workspace configuration JSON"
// Every component that has 'lodash' as a dependency will use version '3.0.0' of it.
// This policy will not affect any component that does not have 'lodash' as its dependency.

{
  "$schema": "https://static.bit.dev/teambit/schemas/schema.json",
  "teambit.workspace/workspace": {
    // ...
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

## Apply policies on a selected group of components

Dependency policies can be applied on a specific group of components. This is done using the [`@teambit.workspace/variants`](/building-with-bit/workspace) configuration API.

For example, to set the `1.0.0` version of `classnames` as a dependency of all components located inside the `./component/react` directory (or any of its sub-directories):

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

:::info learn how to use the 'variants' extension
To learn how to select components using `@teambit.workspace/variants`, [see here](/building-with-bit/workspace).
:::

## Remove a dependency

Dependency policies can also be used to remove a dependency. That's especially useful when a dependency is not defined with the correct dependency type.
For example, a module can be "moved" from `dependencies` to `peerDependencies` by removing it from `dependencies` and listing it under `peerDependencies`.

```json title="Removing a dependency and setting it as a peer dependency"
"teambit.dependencies/dependency-resolver": {
    "policy": {
      "dependencies": {
        "enzyme": "-"
      },
      "peerDependencies": {
        "enzyme": "^3.11.0"
      }
    }
```

## Override cascading policies

Policies set on a specific group of components will override any conflicting policies that have cascaded from more general configurations.

For example, the following configuration will set `classnames` version `1.0.0` on all components using the `react-ui` namespace.
This policy will override the workspace-level policy that uses version `2.0.0` of that same package.

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

## "Forcibly" add dependencies to a component

Dependency policies applied on a selected group of components will "forcibly" add the listed packages to any [selected] component that does not have them already listed as a dependency.
This can be useful when a component depends on another module but has no `import`/`require` statement to be parsed by the Dependency Resolver (for example, in a Webpack configuration file).

In the below example, classnames@1.0.0 will be "forcibly" added as a dependency to any component using the react-ui namespace.

```json
"teambit.workspace/variants": {
    "teambit.dependencies/dependency-resolver": {
      "policy": {
        "{react-ui/*}": {
          "classnames": "1.0.0"
        }
      }
    }
  }
```

## Set dependency types

### Configure specific dependencies as devDependencies

:::caution
Dependencies can be directly configured as `devDependencies` only by nesting the dependency policies inside [variants](/building-with-bit/workspace).
:::

```json title="Setting a dependency as dev dependency using variants"
{
  "teambit.workspace/variants": {
    "*": {
      "teambit.dependencies/dependency-resolver": {
        "policy": {
          "devDependencies": {
            "react-test-renderer": "17.0.1"
          }
        }
      }
    }
  }
}
```

### Dependencies resolved as dev dependencies by file pattern

Dev dependencies are determined by the type of file that uses the dependency.
If it is a development file (e.g, `doSomething.test.ts`) then the files consumed by it are also considered to be used for development and will therefore be registered as `devDependencies`.
In cases where a module is consumed by both a runtime file and a development file, the module will be considered as a runtime (regular) dependency.

:::info dev dependencies missing from the policies
`devDependencies` that are set by the Dependency Resolver will not be visible in its policies.
To validate a dependency is registered as a dev dependency, use the `bit show <component>` command.
:::

The list of file patterns to be considered as development files is determined by the various Bit extensions.
For example, the `@teambit.react/react` environment lists all `*.spec.tsx` files as dev files.
Any component using that environment will have its .spec.tsx files considered as dev files and all these files' dependencies considered as `devDependencies`.

#### Register file patterns to be considered as dev files

Set the `devFilePatterns` property to add your own list of file extensions to be considered as development files (and to have all their dependencies considered as `devDependencies`):

```json title="At the root-level of the workspace configuration JSON"
{
  "teambit.dependencies/dependency-resolver": {
    "devFilePatterns": [".spec.ts"]
  }
}
```

### Peer dependencies

Setting a package as a peer dependency ensures the package manager installs only a single version of that package.
If that is not possible, if there is no single “agreed upon” version for all components in the workspace then an error will be thrown.

This can be crucial when different components communicate with each other using shared objects that are instantiated by an installed package (the dependency).
If different versions of the same package create different object instances then the “means of communication” is broken. There is no single object to address, no single source of truth.
This can turn out to be critical when working with modules that are used as “plugins” of another module (for example, Babel), or when working with components that are coordinated in runtime using a shared library (for example, React).

To set a package as a peer dependency, place it under the peerDependencies entry, like so:

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

:::info Handling multiple identical peer dependencies
Peer dependencies are usually used in the context of a single "hosting code". That could be an application or a single component library.
Bit may generate multiple "hosts", one for each environment being used, to run components of different types.
That could translate into multiple versions of the same peer dependency, one for each environment.
:::
