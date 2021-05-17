---
id: workspace
title: Local Workspace
---

The Bit Workspace is a local development environment for Bit Components. The local workspace gives you a monolithic development experience for building Bit Components and reusing components built by other teams.

Create Workspaces for libraries, applications, services, teams or individuals. Manage, share and collaborate on workspaces with Git Repositories.

## Focus on Components

Bit helps you focus on building components, as such the workspace has a minimal footprint on the codebase. There are only two files Bit needs to manage components and the workspace.

- `.bitmap` - Maps the location of Bit Components in the workspace.
- `workspace.jsonc` - Configure dev-workflow and components.

## Flexible Directory Structure

Bit Workspace is a monorepo that support nesting Bit Components in sub-directories. You can build a very-nested structure for your workspace, a flat structure, or decide where in your project you want deep nesting and where you don't.

By Default Bit aims to create symmetry between component scoping and name-spacing to how components are represented in the workspace.

```sh title="Components in workspace sorted according to functionality"
├── cart
│   ├── purchase-summary
│   └── shopping-cart
└── design
    ├── base-ui
    │   ├── button
    │   └── card
    └── theme
        ├── color-pallet
        └── theme-context
```

This default behavior aims to improve the discovery experience for components in your codebase. The structure is not rigid. You can move components around as needed, or create them in any way you see fit.

## Component is a Directory

Bit sorts all component's implementation to a single directory in a Bit Workspace. This directory includes the component's code, stylings, tests, documentation etc and an `index` file to rollup exports.

```sh title="Basic component directory"
├── index.ts
├── shopping-cart.composition.tsx
├── shopping-cart.docs.mdx
├── shopping-cart.spec.tsx
└── shopping-cart.tsx
```

> You can keep sub-directories to sort internal files as needed.

This structure has several benefits:

- Directory structure is easily consumable by placing all the related files together.
- File references are becoming shorter and read-friendly.
- Easy to move the component to different directories in the workspace.
- Simple refactoring workflow, as changes are consolidated to the same place.
- `index` is a single point for consumers and maintainers to start from when doing any operation on the component.

## Component Dev Server

All components in your workspace are rendered and presented on a local development server. To start it run the following command:

```sh
bit start
```

By default Bit generates a local build for the dev server in `public/bit` directory.

## Component Module Links

Bit compiles all components in the workspace to modules and place the compiled output in the `node_modules` directory.

<div style={{textAlign: 'center'}}>
    <img src="/img/module-link.png" width="240" alt="module link" />
</div>

When you want to `import` one component into another, use these module links as absolute `import` statements:

```jsx
import { ShoppingCart } from '@acme/cart.shopping-cart';
```

By using module links in `import` statements you decouple the component's implementation from the project's file structure, making the component transferable.

## Build Affected Components

Bit keeps a dependency graph representing all components in the workspace according to their `import` statements.  
When you make any change to a component, Bit finds all its dependents and run operations on them recursively. This to ensure that not only your modified component is working as expected, but all components affected from the change are validated.

This helps to ave time and resources by building (or testing) only affected components.

## Centralized Component Management

Bit Workspace is the main interface for managing components. Bit uses the configurations and actions done in the workspace to manage Components.

### Component Configuration

In an effort to keep the workspace clean of any unwanted configuration files and focus only on code, there's no `package.json` required for each Bit Component. Instead use the workspace to manage a set of configuration rules and policies that Bit then applies on each component.

### Per-component Versioning

A Bit Component has its own versioning history and changelog. Bit Workspace supports this workflow by only versioning modified components.  
In a similar way to how Bit builds only affected components, it recursively finds all affected components, and promote their `patch` version.

### Dependency Policy

Each component may `import` some of the dependencies available in the workspace. Moreover, a package which is a `dependency` for one component may be a `devDependency` for another. Instead of having to manually define dependencies like that, the Workspace calculates dependencies per component according to its respected list of `import`s. And per dependency, it's type is decided by the file requesting it.

The workspace's policy also allows setting different versions of the same dependencies for different components in the same workspace.

## FAQ

### Git and a Bit Workspace

You should use Git, or any other SCM to share and collaborate on a workspace. To do that, ensure to track changes for both `.bitmap` and `workspace.jsonc` files.

### Where is my `src` or `components` directories?

Bit's default configuration assumes the workspace is for Bit Components. This means the directories in the workspace root should help standardize and sort components. The recommended approach is for sorting components according to their scoping and functionality. While this is the default behavior, you can configure it to fit any workflow or practices.

### Where can I see each component's config?

Rules and policies set for the workspace applied on specific components. To see the specific configuration as applied on a component use component-oriented commands like `bit show`.
