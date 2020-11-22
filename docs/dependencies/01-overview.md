---
id: overview
title: Overview
---

Dependency management for components in a workspace is managed for each component individually using the `@teambit.bit/dependency-resolver` aspect. It handles the component dependency graph, which in turn is split into three main areas:

- Dependency resolution.
- Dependency policies.
- Installation of dependencies in a workspace.

In a Bit workspace you may have tens or even hundreds of components. Manually handling each dependency graph (`package.json`) is a very tedious and time-consuming task. `dependency-resolver` allows a more automated way of doing so by grabbing the dependencies directly from the code, and the configuration you supply to dependency-resolver in workspace.json provides you fine control over how it does this.

## Dependency resolution

`dependency-resolver` parses your component's code and finds all `import` statements to other modules. It then resolves each statement to figure out if it's an external component or a library (i.e. not an internal file from this component) and if so checks the version and creates a dependency graph for the component.  
You can see the resulting `package.json` file in the component's compiled module output (which is created when running `bit compile`) on the workspace root `node_modules`.

> Note, you won't see a package.json file in the component's directory in the workspace, it is only created for the compiled component in `node_modules`  
>
> Read more about this process and component dependencies [here](/docs/component/dependencies).

### Workspace dependency graph

When all import statements of all components in the workspace have been parsed, Bit creates a complete dependency graph for the workspace. The main benefit this provides is Bit's ability to calculate how a modification in one component affects the other components in the workspace.  

A key feature this allows is to mark all dependents of a modified component as modified as well. In this way, Bit helps you understand how a change in a single component  affect the entire workspace - in effect Bit keeps track of component inter-dependencies so that you don't have to. Bit then recompiles, and can even test, all affected components. Additionally, when you upgrade an external library, you get a list of all affected components.

## Dependency policies

Dependency policies define the acceptable versions for external libraries and dependencies the workspace allows and `dependency-resolver` uses these policies when installing dependencies. This works in a similar fashion to a packages.json file, except that it is configurable for the entire workspace (and then further configurable for separate component groups).
Whenever you use the `bit install <library>` command, Bit adds the library to the workspace's policy as follows:

```json
{
  "@teambit/dependency-resolver": {
    "policy": {
      "dependencies": {
        "lodash.get": "1.0.0"
      }
    }
  }
}
```

### Runtime dependencies and Dev dependencies

Bit also knows to add the dependency according to type of usage. When `dependency-resolver` parses an import statement it keeps a note about the file that's using the library. It then uses the file type convention to determine the type of dependency, meaning that when you use a library in a test file for instance, that library will be added as a `devDependency` for the component.

> If the same library is imported by a test file and an implementation file of the same component, it will be applied as a `dependency`.

### Peer dependencies

Peer dependencies are a special type of dependency which only arise when publishing a package which will be consumed in an application - and this is what Bit does for every component, so it is a very relevant concept here. 

Having a peer dependency means that your package needs a dependency that is the same exact dependency as the application installing/consuming your package. This is useful for packages like `react` that need to have a single copy of a package like `react-dom` or `react` itself, which would definitely also be used in the consuming app.
In Bit you set each component to be published so it is likely that some libraries in your component would need to be set as `peerDependencies`. 

To do this, you would remove the dependency from the regular dependencies list and add it instead to the peerDependencies list:

```json
{
  "@teambit/dependency-resolver": {
    "policy": {
      "dependencies": {
        "react": "-"
      },
      "peerDependencies": {
        "react": "+"
      }
    }
  }
}
```

Advanced information: Peer dependencies are handled by the [component environment's runtimes feature](/docs/environment/overview#manage-components-runtime), not by the `dependency-resolver` aspect.

### Set a dependency policy on a limited set of components

By setting the dependency policy under the `variants` field, we make sure to affect only a selected set of components and override any conflicting policies cascading from a more general dependency policy (set on a less specific set of components). To learn how to select components using `variants`, [see here](docs/variants/overview).

The following example demonstrates an overriding of the workspace-level dependency policy by the more specific set of components, selected using their namespace 'react-ui' (all components using the namespace 'react-ui' will use version 1.0.0 of "classnames" instead of version "2.0.0", set as the default for all components in the workspace):

```json
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
    "extensions": {
      "{react-ui}": {
        "classnames": "1.0.0"
      }
    }
  }
}
```


### "Forcibly" add dependencies to a component
When setting dependency policies on a [specific set of components](/docs/dependencies/overview#set-a-dependency-policy-on-a-limited-set-of-components), the specified modules will be registered as dependencies of these selected components. That is true even if the specified modules were not recognized as dependencies in the [dependency resolution process](/docs/dependencies/overview#dependency-resolution).

For example, the following configuration will add `classnames@2.2.6` as a dependency of every component under the `components/react/ui` directory.

```json
{
  "teambit.workspace/variants": {
    "components/react/ui": {
      "teambit.dependencies/dependency-resolver": {
        "policy": {
          "dependencies": {
            "classnames": "2.2.6"
          }
        }
      }
    }
  }
```

In contrast, the following configuration will only set the version of the `classnames` module to `2.2.6` __if__ that module already appears as one of the dependencies of a component.

```json
{
  "teambit.workspace/workspace": {
    "name": "my-workspace",
    "defaultScope": "my-scope"
  },
    "teambit.dependencies/dependency-resolver": {
      "policy": {
        "dependencies": {
          "classnames": "2.2.6"
        }
      }
    }
```
## Dependency installation

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