---
id: workspace-json
title: Workspace Configuration
---

A basic `workspace.json` may look like this:

```json
{
  "@teambit/workspace": {
    "name": "my-application",
    "description": "lorem ipsum",
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
      "@teambit/react": {},
      "scope": "acme.base-ui",
    }
  }
}
```

This configuration is composed by different extensions ([aspects](TODO)) of Bit, where each of them handles a set of cross-cutting functions that handle different functionalities of the component monorepo.  
Bit workspace manages a list of join-points each of the composed aspects can register and implement a specific functionality. For example:

- Adding CLI commands.
- Controlling component `package.json`.
- Integrate to the workspace-UI.

Each aspect you compose to the `workspace.json` file can extend and implement different functions for Bit to execute when running commands and flow.

## Base aspects

There are several core aspects that deal with the component monorepo management.

### `@teambit/workspace`

This is the base extension that defines the basics for the workspace and the web UI. It also supports setting default values for components, like their [scope](TODO) and the default directory for new components.

See the full APIs and configuration for `@teambit.core/workspace` [here](TODO).

### `@teambit/dependency-resolver`

For Bit to parse and define dependencies for components, it needs to use the dependency-resolver extension. It defines which package manager to use when installing dependencies as well as policies for dependency-versions. Moreover, this extension is used to parse all `import` statements between components to define their dependency graphs and understand if they are properly isolated. You can read more about how to handle dependencies and dependency resolution in a workspace [here](TODO).

See the full APIs and configuration for `@teambit/dependency-resolver` [here](TODO).

### `@teambit/variants`

Bit lets you keep a parallel set of configurations according to the components' location in the workspace directory tree. Variants used to build the entire monorepo with an alternate set of dependencies and configurations. You can read more about defining and using `variants` to design a workspace for your requirements [here](TODO).

See the full APIs and configuration for `@teambit/variants` [here](TODO).
