---
id: overview
title: Overview
---

The Bit Workspace allows development of component-driven systems from independent components. It is like building a component-level Monorepo while getting the development experience of building just a regular app using tools like NodeJS, CRA, Next.JS and others.

The Bit Workspace allows the development and management of [Bit Components](/components/overview). The Workspace includes
and manages an array of Bit Components, each is like an independent repo, connected and versioned with dependencies to other components.

The Bit Workspace is a local development environment for Bit Components. The local workspace gives you a monolithic development experience for building Bit Components and reusing components built by other teams.

Workspaces are used for building and maintaining [Component Libraries](/), [Apps](/), [Modules](/)

## Workspace Anatomy

Bit helps you focus on building components, and as such the workspace has a minimal footprint on the codebase. There are only two files Bit needs to manage components and the workspace.

- `.bitmap` - Mapping of the location of Bit Components in the workspace.
- `workspace.jsonc` - Main file for the Workspace configuration.

## Flexible Directory Structure

A Bit Workspace is a monorepo that supports nesting Bit Components in sub-directories. You can build a highly-nested structure for your workspace, a flat structure, or decide where in your project you want deep nesting and where you don't.

By Default Bit aims to create symmetry between component scoping and name-spacing on the one side, and how components are represented in the workspace UI.

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

This default behavior aims to improve the discovery experience for components in your codebase. The structure is not rigid. You can move components around as needed, or create and sort them in any way you see fit; as above, the bitmap file enables bit to track components wherever they are in your workspace.

## Component as a Directory

Bit requires all of each component's implementation files to be contained in a single directory in your Workspace. This directory includes the component's code, stylings, tests, documentation etc and an `index` barrel file to roll-up exports.

```sh title="Basic component directory"
├── index.ts
├── shopping-cart.composition.tsx
├── shopping-cart.docs.mdx
├── shopping-cart.spec.tsx
└── shopping-cart.tsx
```

> You can keep sub-directories to sort internal files as needed. So you could put `shopping-cart.spec.tsx` in a `tests` folder for instance.

This structure has several benefits:

- Directory structure is easily consumable by placing all the related files together.
- File references become shorter and more read-friendly.
- Easy to move components around in the workspace.
- Simple refactoring workflow, as changes are consolidated to the same place.
- `index` is a single point for consumers and maintainers to start from when doing any operation on the component.

## Build different type of Components in the same Workspace

## Workspace UI

All components in your workspace are rendered and presented on a local development server. To start it run the following command:

```sh
bit start
```

- [Docs](/)
- [Compositions](/)
- [Tests](/)
- [Dependencies](/)

By default Bit generates a local build for the dev server in `public/bit` directory.

## Component Module Links

Bit compiles all components in the workspace, even those which have never been exported, to modules and places the compiled output in the `node_modules` directory.

<div style={{textAlign: 'center'}}>
    <img src="/img/module-link.png" width="240" alt="module link" />
</div>

When you want to `import` one component into another, even in the same workspace, use these module links as absolute `import` statements:

```jsx
import { ShoppingCart } from '@acme/cart.shopping-cart';
```

By using module links in `import` statements you treat all dependencies as regular npm packages (which they are), thereby decoupling the component's implementation from the project's file structure, making the component transferable.

By default, `bit install` links all components tracked in your Workspace.
```bash
bit install
```

To link all components you can use:
```bash
bit link
```

## Dependencies

Bit keeps a dependency graph representing all components in the workspace according to their `import` statements.  
When you make any change to a component, Bit finds all its dependents and runs operations on them recursively. This is to ensure that not only your modified component works and updates as expected, but that all components affected from the change are updated and validated too.

This also helps save time and resources by building (or testing) only affected components.

## Centralized Component Management

A Bit Workspace is the main interface for managing components. Bit uses the configurations and actions carried out in the workspace to manage Components.

### Component Configuration

In an effort to keep the workspace clean of any unwanted configuration files and focus only on code, there's no `package.json` required for each Bit Component. Instead use the workspace to manage a set of configuration rules and policies that Bit then applies on each component.

### Per-component Versioning

A Bit Component has its own versioning history and changelog. The Bit Workspace supports this workflow by only versioning modified components.  
In a similar way to how Bit builds only affected components, it recursively finds all affected components (i.e. dependents), and promotes their `patch` version.

### Dependency Policy

Any component in your workspace can `import` any of the dependencies available in the workspace. Moreover, a package which is a `dependency` for one component may be a `devDependency` for another. Instead of having to manually define dependencies per component, the Workspace calculates dependencies for each component according to its respective list of `import`s. And per dependency, it's dependency type is decided by the file/s requesting it.

The workspace's policy also allows setting different versions of the same dependencies for different components in the same workspace, via the variants section.

## FAQ

### Git and a Bit Workspace

You should use Git, or any other SCM, to share and collaborate on a workspace. To do that, ensure to track changes for both `.bitmap` and `workspace.jsonc` files.

### Where is my `src` or `components` directories?

Bit's default configuration assumes the workspace is for Bit Components. This means the directories in the workspace root should help standardize and sort components. The recommended approach is for sorting components according to their scoping and functionality. While this is the default behavior, you can configure it to fit any workflow or practices.

### Where can I see each component's config?

Rules and policies set for the workspace are applied on its components. To see the specific configuration as applied on a specific component use component-oriented commands like `bit show <component_id>`.