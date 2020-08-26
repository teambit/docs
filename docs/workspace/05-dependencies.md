---
id: dependencies
title: Dependencies
---

Dependency management for components in a workspace is managed for each component individually using the `@teambit.bit/dependency-resolver` aspect. It handles the component dependency graph, which in turn is split into three main areas:

- Dependency resolution.
- Dependency policies.
- Installation of dependencies in a workspace.

In a Bit workspace you may have up to hundreds of components. Manually handling each dependency graph (`package.json`) is a very tedious and time consuming task. `dependency-resolver` allows a more automated way of doing so.

## Dependency resolution

`dpendency-resolver` parses your component's code and finds all `import` statements to other modules. It then resolves each statement to figure out if it's for another component or a library. It checks the version as well, and creates a dependency graph for the component.  
You can see the result `package.json` file in the component's module directory on the workspace root `node_modules`.

> Read more about this process and component dependencies [here](/docs/component/dependencies).

### Workspace dependency graph

When all import statements parsed, Bit create a complete dependency graph for the workspace. The main benefit you get from it is Bit's ability to calculate how a modified component affects other components in the workspace.  
A key feature this allows is to mark all dependents of a modified components, as modified as well. This helps you understand how a single change can affect the entire workspace as Bit rebuild and can even test all affected components. Additionally, when you upgrade an external library, you get a list of all affected components.

## Dependency policies

Dependency policies define the acceptable versions for external libraries and dependencies the workspace allows. `dependency-resolver` uses these policies when installing dependencies.  
Whenever you use the `bit install <library>` command, Bit adds the library to the workspace' policy as follows:

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

### Runtime and Dev dependencies

A library may be a dependency for one component but a dev-dependency for another. When `dependency-resolver` parses an import statement it keeps a not about the file that use the library. It then uses the file type convention to determine the type of dependency. Meaning that when you use a library in a test file, that library will be a `devDependency` for the component.

> If the same library is imported by a test file and an implementation file, it will be applied as a `dependency`.

### Peer dependencies

Peer dependencies are a special type of dependency that would only ever come up if you were publishing your own package. Having a peer dependency means that your package needs a dependency that is the same exact dependency as the person installing your package. This is useful for packages like `react` that need to have a single copy of `react-dom` that is also used by the person installing it.
In Bit you set each component to be published. This means that some libraries should be set as `peerDependencies`. This is handled by the [component environment's runtimes feature](/docs/environment/overview#manage-components-runtime), not by the `dependency-resolver` aspect.

## Dependency installation

In most cases dependencies are installed to the root `node_modules` directory. This way all components use the same dependency when they import a library or a module.

### Multiple library versions

If required, you can defined nested policies using [variants](/docs/workspace/variants) and define different versions for the same library to be used by different sets of components. It does it by creating `node_modules` directories in deeper parts of your workspace directory tree, according to your configuration.

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

To install javascript libraries, Bit uses existing package managers. The `dependency-resolver` extension configures which package manager to apply for the workspace.  
At the moment Bit only supports [PNPM](https://pnpm.js.org). PNPM is the only option that solves the NPM doppelgangers problem and phantom dependencies. In a complex monorepo, this issues sometimes cause a lot of trouble, so PNPM has an important advantage in this regard.
