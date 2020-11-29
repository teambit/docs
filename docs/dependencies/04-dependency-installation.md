---
id: dependency-installation
title: Dependency Installation
---
In most cases dependencies are installed to the root `node_modules` directory. This way all components in the workspace use the same dependency when they import a library or a module.

### Dependency Variants

If required, you can define nested policies using [variants](/docs/workspace/variants) and define different versions for the same library to be used by different sets of components - for instance if different components require different versions of the same library. You do this by adding a nested `dependency_resolver` under the variants section in the workspace.json - dependencies set here are merged with the workspace dependency, with the more specific 'variants' policy having precedence. 

When `dependency_resolver` sees a variants dependency, it creates a new `node_modules` directory in the part of your workspace directory tree defined in the variant (in the example below, in both the components/ui and components/helpers folders), according to your configuration.

```json
{
  "@teambit.core/variants": {
    "components/ui": {
      "@teambit/dependency-resolver": {
        "policy": {
          "dependencies": {
            "lodash.get": "1.0.0"
          }
        }
      }
    },
    "components/helpers": {
      "@teambit/dependency-resolver": {
        "policy": {
          "dependencies": {
            "lodash.get": "2.0.0"
          }
        }
      }
    }
  }
}
```

In this example, components in `component/ui` directory will use `lodash.get@1.0.0` and components in `compoennts/helpers` use `lodash.get@2.0.0`.

### Install all workspace dependencies

When installing all dependencies for the workspace, Bit takes into account each component's dependency graph and aggregates them to form a graph for the entire workspace. It then uses a package manager to handle installation.

```sh
$ bit install
```

### Supported package managers

To install javascript libraries, Bit uses existing package managers. The `dependency-resolver` extension is used to configure which package manager to apply for the workspace.  

At the moment Bit only supports [PNPM](https://pnpm.js.org). PNPM is the only option that solves the NPM doppelgangers problem and phantom dependencies. In a complex monorepo, these issues can sometimes cause a lot of trouble, so PNPM has an important advantage with Bit, though newer versions of npm and Yarn should soon solve the issue too.