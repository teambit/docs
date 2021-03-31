---
id: workspace
title: Workspace
---

import BitInit from '@site/docs/components/commands/bit-init.md'

While components can be added and managed by a Workspace on an ad-hoc basis, we envisage workspaces as the interface between your code repo and the Bit eco-system. By creating a Bit workspace at the root of your repo file system for instance, you can then manage each component as a separate module - with it's own versioning, build and CI, and much more; all the while keeping the existing file structure of your repo or mono repo (Bit is entirely agnostic to how you organise and track your code). That way Bit works seamlessly with your source control, while providing entirely isolated control over the individual components the repo contains.

Bit Workspaces are focused on composing applications with components. We recommend breaking down your frontend application to its most basic building blocks (buttons, text inputs, etc) and then successively composing pages, data-flows, forms, and applications using your components and APIs they expose. Components can be implemented in React, Angular, Vue, Stencil, and Node.

## Initialize a Workspace

<BitInit />

:::note Initializing a Bit workspace in an existing project
A Bit workspace can be initialized on an empty directory to create a new modular project from scratch.
It can also be initialized on an existing project to modularize it and export its components to a remote scope.
:::

:::note the --harmony option
The `--harmony` option creates a Bit Harmony workspace. Omitting it will create Bit's legacy workspace.
Harmony components and Bit legacy components cannot switch workspace.
:::

## Anatomy of a Workspace

1. **Workspace configurations**
   This is where rules and policies are set for the workspace itself but also for each component managed by it.
   These rules include component dependencies, development environments, default scopes, and so on.

2. **Files-to-component mapping** (the `.bitmap` file). This is where Bit maps multiple files to single units, components. This process happens once a component is tracked by Bit (`bit add path/to/component`). This mapping will also include the following information:

   - The component entry point (usually, the `index.js/ts` file).
   - The component version (if a component has been versioned).
   - Whether this component is [pending to be versioned](/building-with-bit/versioning-components) by the CI.

     <br />

   ```json title="An example .bitmap file"
   {
     "org.extensions/environment/custom-react@0.0.9": {
       "mainFile": "index.ts",
       "rootDir": "cet/environment/react"
     },
     "org.design/base-ui/search-box-with-button@0.0.5": {
       "mainFile": "index.ts",
       "rootDir": "design/base-ui/searchBoxWithButton",
       "exported" false,
       "nextVersion": {
           "version": "0.0.7",
           "message": "add debouncing",
           "username": "John",
           "email": "john@my-mail.com"
       }
     },
     "version": "14.8.9-dev.298"
   }
   ```

3. **Local scope** (the `.bit` or `.git/.bit` directory). This is where versioned or tagged components (either authored or imported) are stored.

4. **Component packages** (located in the `node_modules/@scope-name` directory). This is where the distributable, compiled, code of a component is placed. Components in the workspace refer to each other only via their packages. This is crucial to keeping each component independent and context-agnostic.

5. **Workspace UI**. The workspace UI is a visual real-time representation of the workspace.
   Components managed by the workspace can be views as they are rendered in isolation.
   In addition to that, different aspects of a component, such as its history, documentation and even test logs, can be explored to get a better understanding of it and assist in developing it as and independent building block.

## Dev Server

See the Workspace UI at [localhost:3000](https://localhost:3000)

```bash
bit start
```

## Bit workspace and Git

Make sure to track the following files with your SCM:

- `.bitmap`
- `worksapce.jsonc`

> You should not track the local scope (`.bit` or `.git/bit`) with Git.

## Reset a Bit workspace

```bash
bit init --reset-hard
```

## Configuration

The workspace configuration file (`workspace.jsonc`) is where rules and settings are applied to the workspace itself, and to every component managed by it.

The workspace configuration JSON reflects the way Bit is designed and built - that is, using Bit extension components. Each of these components exposes a workspace configuration API. That means, your "workspace configurations" are set across multiple Bit components.

As you will see, the names of these JSON fields, each representing an component, follow Bit's component name pattern `<scope-owner>.<scope-name>/<component-name>`, for example: `teambit.workspace/variants`.

### Workspace

`teambit.workspace/workspace` receives configurations for the workspace itself, as well as default values for components managed by the workspace.

- **name** - the workspace name. <br/>Example: `"name": "my-workspace"`
- **icon** - the workspace icon (displayed in the workspace UI). <br/>Example: `"icon": "https://path/to/icon.svg"`
- **description** - a description of the workspace. <br/>Example: `"description": "a design system for my organization."`
- **defaultScope** - the default scope to all components (when used with bit.dev, specify both owner and scope name) <br/>Example: `"defaultScope": "my-org"."my-scope-name"`
- **extensions** - component extensions to apply, by default, on all components.
- **defaultDirectory** - the default directory for components. <br/>Example: `"defaultDirectory": "components\ui"`

Example:

```json
"teambit.workspace/workspace": {
  "name": "my-org-design-system",
  "icon": "https://my-org.com/images/icon.svg",
  "defaultScope": "my-org.design-system"
}
```

### Dependency Resolver

`teambit.dependencies/dependency-resolver` receives rules and settings for component dependencies and package management. Dependency policies alter and augment the existing dependency graph that was auto-generated.

Learn more about the `dependency-resolver` [here](/aspects/dependency-resolver).

### Variants

`teambit.workspace/variants` adds elegancy and simplicity to our workspace configurations by enabling a cascading, CSS-like, setting of rules.
Groups of components can be selected to have rules and policies applied on them without affecting the rest of the workspace.

Learn more about the `variants` [here](/aspects/variants).
