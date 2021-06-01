---
id: what-are-components
title: Overview
---

Components are the building blocks of modern web architectures. Encapsulated and composable components let developers build more robust software applications quickly.

A Bit component a set of files, configuration and dependencies, implementing a reusable piece of code, such as:

* A React, Vue or Angular component.
* Shared stylesheet (e.g., CSS, SCSS).
* Client library or a utility.
* Middlewares, modules and providers.
* Shared types and Backend for Frontend components.

This topic describes how to create and configure a Bit component with React.

:::note deciding what should be a component

The exact boundaries of the component are a design decision, we urge you to think about how a component will be consumed and composed in different situations and provide a solid dev-experience for consumers (see - [thinking in components](/component-architecture/thinking-in-components)).

:::

---

## Prerequisites

To create a Bit component, verify you met the following:

1. [Install Bit CLI.](TODO)
1. [Create a Bit workspace](TODO) on a fresh Git repository.

:::tip Onboarding pre-existing components

To onboard components from a pre-existing project refer to [this guide](TODO).

:::

---

## Creating a Component

The quickest way to create a new component is by using templates. You can also create a component manually and onboard it to Bit.

### Creating a component using templates

From the CLI run the command:

```sh
bit create react-component ui/card
```

This command creates the following:

* A folder named after the component.
* An index file to rollout all exports, `index.ts`.
* A component file, `<component-name>.tsx`.
* A testing specification file, `<component-name>.specs.ts`.
* A simulations file, `<component-name>.compositions.tsx`.
* A documentation file, `<component-name>.docs.mdx`.

:::tip customize component templates

You can create your own component templates. For more information, [see here](TODO).

:::

### Creating a component manually

To create a component manually:

1. Create a directory for your component.
1. Create `index.ts` and a component file.
1. run `bit add <path to component>`

:::tip onboarding pre-existing components

If you start using Bit from a pre-existing project and want to onboard components, use this flow to have Bit track and manage components.

:::

### Component contained in a directory

Bit requires all of each component's implementation files to be contained in a single directory. This includes the component's code, stylings, tests, documentation etc and an `index` barrel file to roll-up exports.

```sh title="Basic component directory"
├── index.ts
├── shopping-cart.composition.tsx
├── shopping-cart.docs.mdx
├── shopping-cart.spec.tsx
└── shopping-cart.tsx
```

This structure has several benefits:

* Directory structure is easily consumable by placing all the related files together.
* File references become shorter and more read-friendly.
* Easy to move components around in the workspace.
* Simple refactoring workflow, as changes are consolidated to the same place.
* `index` is a single point for consumers and maintainers to start from when doing any operation on the component.

:::tip Use sub-directories for complex components

You can keep sub-directories to sort internal files as needed. So you could put `shopping-cart.tsx` in a `tests` folder for instance.

:::

---

## Bit Components are modules

Bit components differs, but complement JavaScript (ES2015) modules. For each component Bit creates a module in `node_modules` for other components to use.

<div style={{textAlign: 'center'}}>
    <img src="/img/module-link.png" width="240" alt="module link" />
</div>

When you want to `import` one component into another, even in the same workspace, use these module links as absolute `import` statements:

```jsx
import { ShoppingCart } from '@acme/cart.shopping-cart';
```

:::info Decouple components from directory structure

By using absolute paths and module links in `import` statements (as opposed to using relative paths) you decouple component's implementation from the project's file structure, making the component transferable.

:::

---

## Inspecting Components

There are two ways to browse information on components. Using the local dev server in your workspace, or using the CLI.

### Inspecting with the workspace UI

All components in the workspace are represented in the workspace UI, as part of Bit's dev-server. Run it with the following command:

```sh
bit start
```

Use the dev-server to see all components, get detailed information on them, see how they are rendered in isolation, test results, etc.

:::tip Getting the most out of the workspace ui

The workspace UI is a core dev tool for component driven development. For more information on it's contents and how to use it [click here](TODO).

:::

### Inspecting with the CLI

The `show` command displays a component's essential information. For example, its dependencies, files and even documentation.

```sh
bit show ui/card
```

:::tip get more from the show command

Use `bit show --help` or `bit show -h` to get a list of available options for this command.

:::

---

## Summary

* Create or track components with the `create` and `add` commands.
* Components are isolated modules in your codebase, where each component is encapsulated in a directory.
* Get information on component with the local dev server or the CLI.

---

## Next Steps

* For component configuration, see [configuring components](TODO).
* For scoping and naming components, see [scoping components](TODO).
* For component dependency management, see [component dependencies](TODO).
* For managing components in a workspace, see [component monorepo](TODO).
* For leaning about versioning, hosting and reusing of components, see [hosting components](TODO).

---

## FAQ

### Are Bit Components the same as npm packages?

The main difference between Bit Components and npm Packages is that Bit focuses on a component based workflow, where the implementation is a first class citizen, where npm packages concern about the compiled outputs. This key difference has the following implications:

* Bit Components produce an _npm package_ as part of their build and keep it as a **version artifact**. Consumers can use package managers (npm, yarn and pnpm) to install components.
* Vendor component with the `bit import` and use it as a core component in your codebase (think about - `git clone` + `npm link` automated, inside the consuming codebase).
* A Component version is 100% immutable, as all dependencies are calculated and locked during build time, removing "dependency hell" when depending on components.
