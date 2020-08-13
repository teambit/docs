---
id: dependencies
title: Dependencies
---

Even though each component in your workspace is its own module, Bit does not require you to keep a `package.json` file for each component and manually define its dependencies. Instead Bit determines each component's Dependencies using the version policies imposed by the workspace combined with specific `import` statements in each component. Dependencies can be either external packages or other components implemented in the workspace.

## Supported package mangers

To install javascript libraries Bit uses existing package managers. The `dependnecy-resolver` extension configures which package manager to use for the workspace.

> **Only pnpm is supported**
>
> When more are integrated - add considerations to each pm.

## Add a dependency

To add a package to the workspace use the `bit install` command. Bit then sets the package to the workspace dependency policy and install the library with the configured package manager.

```sh
$ bit install lodash.get
```

> **Not yet implemented**
>
> Sadly at the moment we are required to manually edit the 'policy' and run `bit install`.

## Dependency policies

With Bit you set policies to be applied for components. For example, instead of adding a specific package as a dependency, you annotate that when a library is required by a component, `dependency-resolver` would use it's policy to determine it's version.

Policies are managed as part of the `dependency-resolver` extension as follows:

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

When using this policy Bit does not add the dependency for each component. Instead only if a component imports the package, the version policy is applied.

### Runtime, Dev and Peer dependencies

Some libraries may be runtime dependencies for components but required as dev-dependencies for others. This pretty much depends in which of the component files the library was required. `dependency-resolver` understands this, and by design applies the dependency type according to how you import it in each component.  
For example, a `*.specs.ts` or `*.docs.tsx` file that requires `lodash.get` will get the library as a `devDependency`, while another component may require the same library by it's main implementation file - so `dependnecy-resolver` would apply it as a `dependnecy`.

However, `peerDependencies` are still supported by the `policy`, so when a library is configured as such, it will be a `peerDependency` for any component that might require it.

> If the same library is imported by a test file and an implementation file, it will be applied as a `dependency`.

## Dependency installation

By default all dependencies are installed to the root `node_modules` directory. This way it makes sure all components use the same exact dependency when they import a library or a module. However, in some cases where there might be collisions, Bit may create additional `node_modules` directories deeper in the workspace hierarchy. So it can have multiple versions of the same library, in case a component(s) specifically requires a different version of a library.

### Install all workspace dependencies

When installing all dependencies for the workspace Bit takes into account each component's dependency graph and aggregates them together to form a graph for the entire workspace. It then communicates this graph to the pre-configured package manager for installation.

To install all dependencies:

```sh
$ bit install
```

### Update workspace dependencies and policies

> **Note yet implemented
>
> need to update once available with a simple command.

## Workspace dependency resolution

To remove the need of managing a `package.json` for each component Bit parses your component's code and finds all `import` statements. It then takes this as an input and combines with the workspace policies and all workspace components to calculate which version of library or component is required to create the dependency graph. This data is then stored as part of the component itself.

> Read more about this process and component dependencies [here](TODO).

### Affected components

As Bit calculates the dependency graph of each component, a side-effect of it is the ability to know which components in your workspace are affected by a code modification of a component. This means that you get a "splash-zone" like affect on each change of a component.  
Bit uses this behavior to mark all affected components as modified as well, due to changes of their dependencies. This helps you understand how a single change can affect the entire workspace as Bit rebuild and can even test all affected components.
