---
id: dependency-policies
title: Dependency Policies
---
Dependency policies define the acceptable versions for external libraries and dependencies the workspace allows and `dependency-resolver` uses these policies when installing dependencies. This works in a similar fashion to a packages.json file, except that it is configurable for the entire workspace (and then further configurable for separate component groups).
Whenever you use the `bit install <library>` command, Bit adds the library to the workspace's policy as follows:

```json
{
  "@teambit.dependenciess/dependency-resolver": {
    "policy": {
      "dependencies": {
        "lodash.get": "1.0.0"
      }
    }
  }
}
```

> Bit is a build tool and adds no runtime dependencies to your project.


## Runtime dependencies and Dev dependencies

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

To andle multiple versions of a peer dependecy, [see here](/docs/faq/multiple-peer-dep-versions).

## Set a dependency policy on a limited set of components

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
      "{react-ui/*}": {
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
