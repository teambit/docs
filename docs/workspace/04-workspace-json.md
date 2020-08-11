---
id: workspace-json
title: Workspace Configuration
---

The `workspace.json` file defines a set of configuration that control the entire process of managing components using a set of Extensions (plugins). Each extension is responsible for a specific task and managed as a component.

## Base configurations

A basic `workspace.json` may look like this:

```json
{
    "@teambit.core/workspace": {
        "name": "my-application",
        "description": "lorem ipsum",
        "defaultScope": "acme.base-ui",
        "defaultDirectory": "components",
    },
    "@teambit/dependency-resolver": {
        "packageManager": "@teambit/pnpm",
        "policy": {
            "dependencies": {
                "@types/classnames": "^2.2.10",
                "classnames": "^2.2.6",
                "lodash": "^4.17.19",
            }
        }
    },
    "@teambit/variants": {
        "*": {
            "@teambit/envs": {
                "env": "@teambit/react",
                "config": { }
            }
        }
    }
}
```

There are three base extensions composed in this configuration scheme.

### `@teambit.core/workspace`

This is the base extension that defines the basics for the workspace and the web UI. It also supports setting default values for components, like their [scope](TODO) and the default directory for new components.

See the full APIs and configuration for `@teambit.core/workspace` [here](TODO).

### `@teambit/dependency-resolver`

For Bit to parse and define dependencies for components it needs to use the dependency-resolver extension. It defines which package manager to use when installing dependencies as well as policies for dependency-versions. Moreover, this extension is used to parse all `import` statements between components to define their dependency graphs and understand if they are properly isolated. You can read more about how to handle dependencies and dependency resolution in a workspace [here](TODO).

See the full APIs and configuration for `@teambit/dependency-resolver` [here](TODO).

### `@teambit/variants`

Bit lets you keep parallel set of configurations according to the location of components in the workspace directory tree. Variants used to build the entire monorepo with an alternate set of dependencies and configurations. You can read more about how to define and use `variants` to design a workspace for your requirements [here](TODO).

See the full APIs and configuration for `@teambit/variants` [here](TODO).
