---
id: workspace
title: Workspace
---

Consider this project directory structure:

```sh
$ tree my-web-app
.
├── components
│   ├── app
│   ├── ui-primitives
│   │   ├── button
│   │   ├── table
│   │   ├── logo
│   │   └── title
│   ├── pages
│   │   ├── homepage
│   │   └── about
├── extensions
│   └── react
├── readme.md
└── workspace.jsonc
```

No configuration or complicated folder structures, only a set of neatly organized components.

This is a **Bit Workspace**, it focused around composing applications with components. We recommend breaking down you frontend application to its building blocks and composing pages, data-flows, forms and applications using APIs. Bit supports React, Angular, Vue and Stencil components, and can be extended to include more frameworks.

Workspace produces a set of individual components, each has it's own configuration, dependency graph and versioning. Bit manages the relationships between the components as if the workspace was a monorepo where each component is a separate project.

## Setting up a new workspace

You can set up a new workspace using a template:

```sh
$ bit new @teambit.environments/react
```

To manage components in the workspace, Bit creates a set of two files:

- `worksapce.json` file to hold all configuration for the workspace and components.
- `.bitmap` file that tracks the components to be managed by Bit in the workspace.

It's important to keep both files tracked by your code repository.

## Workspace configuration

The `workspace.json` file defines a set of configuration that control the entire process of managing components using a set of Extensions (plugins). Each extension is responsible on a specific set of tasks. This means that when configuring a workspace you essentially choose which set of extensions Bit should use for managing your project.

Use the `@teambit.core/workspace` extension to set default policy for configuring all components in the project.

```json
{
    "@teambit.core/workspace": {
        "scope": "acme.base-ui",
        "directory": "components",
        "extensions": {
            "@teambit.environments/react": {
                "typescript": "<version>"
            }
        }
    }
}
```

- Defines the scope of all components as the `base-ui` for `acme`.
- Sets `components` as the default directory for newly created components.
- Sets `react` as a default extension for all components and apply `typescipt` support.

## Dependency management

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

## Differentiate configuration per directory

As projects grow so does the complexity of its components and structure. If you find yourself wanting to define a different set of configuration according to to the directory structure of your project, use the  `@teambit.core/variants` extension. Each `variant` is a directory (or comma separated list of directories) to which you can set a specific configuration.

```json
{
    "@teambit.core/variants": {
        "components/generics-ui": {
            "extensions": {
                "@teambit.environments/stencil": {}
            }
        }
    }
}
```

### Configuration propagation

By default, when you use `@teambit.core/variants` it propagate to the default values set by `@teambit.core/workspace`.

By default, Bit finds the most specific `variant` that should be applied for a component. It is then propagate up the variants tree and is merged with the configurations found. You can use `"propagate": false` option to change this default behavior.

### Exclude component from applied configuration

Inside each `variant` you may specify a pattern or an array of patterns that will define the components that are excluded from the variant. E.g. this variant is applied on all components, except for those that are under the bar namespace.

```json
{
    "@teambit.core/variants": {
        "components/generics-ui": {
            "extensions": {
                "@teambit.environments/stencil": {}
            },
            "exclude": "bar/*"
        }
    }
}
```
