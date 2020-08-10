---
id: dependency-resolution
title: Dependency Resolution
---

The workspace is responsible to managing the entire dependency graph of the project and its components. It does it by managing a dependency graph for each component and combining them to a large workspace-wide graph. So adding, updating and removing dependencies should be done with Bit.

### Setting a package manager

Bit proxy most of the heavy lifting to your package manager of choice. We recommend on using pnpm.

```json
// TODO - dependency resolver snippet
```

### install a dependency

To add a package to the workspace use the `bit install` command. Bit then sets the package to the workspace dependency policy and install the component with the configured package manager.

```sh
$ bit install lodash.get
```

### Dependency policies

With Bit you don't install a dependency which is than added to the entire project. Instead you set policies to be applied for components. For example, instead of adding a specific package as a dependency, you annotate that when a dependency is required by a component, which version to satisfy.

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

