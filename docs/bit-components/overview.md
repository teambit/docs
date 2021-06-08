---
id: component-overview
title: Component Overview
---

A Bit component a set of files, configuration and dependencies, implementing a reusable and composable functionality, such as:

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

1. [Install Bit CLI.](https://TODO)
1. [Create a Bit workspace](https://TODO) on a fresh Git repository.

:::tip Onboarding pre-existing components

To onboard components from a pre-existing project refer to [this guide](https://TODO).

:::

---

## Creating a Component

The quickest way to create a new component is by using templates. You can also create a component manually and onboard it to Bit.

### Creating a component using templates

From the CLI run the command:

```sh
bit templates
```

Create a component with the `react-component` templates:

```sh
bit create react-component ui/shopping-cart
```

This command creates the following:

* A folder named after the component.
* An index file to rollout all exports, `index.ts`.
* A component file, `<component-name>.tsx`.
* A testing specification file, `<component-name>.specs.ts`.
* A simulations file, `<component-name>.compositions.tsx`.
* A documentation file, `<component-name>.docs.mdx`.

:::tip customize component templates

You can create your own component templates. For more information, [see here](https://TODO).

:::

### Creating a component manually

To create a component manually:

1. Create a directory for your component.
1. Create `index.ts` and a component file.
1. run `bit add <path to component>`

:::tip onboarding pre-existing components

If you start using Bit from a pre-existing project and want to onboard components, use this flow to have Bit track and manage components.

:::

---

## See Components

There are two ways to browse information on components. Using the local dev server in your workspace, or using the CLI.

### Using workspace UI to see components

Each component has its own dev-server. Bit's local workspace UI aggregates all component dev-servers to a single portal. Run it with the following command:

```sh
bit start
```

Use the dev-server to see all components, get detailed information on them, see how they are rendered in isolation, test results, etc.

### Using the CLI to get component details

The `show` command displays a component's essential information. For example, its dependencies, files and even documentation.

```sh
bit show ui/card
```

---

## Building Component

Notice that the `create` command generated a single directory. Bit requires all of each component's implementation files to be contained in a single directory. This includes the component's code, stylings, tests, documentation etc and an `index` barrel file to roll-up exports.

```sh title="Basic component directory"
├── index.ts
├── shopping-cart.composition.tsx
├── shopping-cart.docs.mdx
├── shopping-cart.spec.tsx
└── shopping-cart.tsx
```

Build your component implementation in the `shopping-cart.tsx`.

:::info Benefits of component-directory

* Directory structure is easily consumable by placing all the related files together.
* File references become shorter and more read-friendly.
* Easy to move components around in the workspace.
* Simple refactoring workflow, as changes are consolidated to the same place.
* `index` is a single point for consumers and maintainers to start from when doing any operation on the component.

:::

### Composing in another components

Bit is a tool for component driven development. As such it focuses on composing components together to form functionality. This means creating other components, or apps, that use and compose with other components.

For each component Bit creates a module in `node_modules` for other components to use.

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

:::tip Generate modules

In case you can't find a module to import, run `bit link`.

:::

### Component isolation

Each Bit component is a module. This has several implications on your implementation:

* Component may not use relative import statements to other components.
* Component may depend on other components or npm packages.
* Component is a directory.

This helps with building a more modular codebase where components are imported as modules.

---

## Summary

* Create or track components with the `create` and `add` commands.
* Components are isolated modules in your codebase, where each component is encapsulated in a directory.
* Get information on component with the local dev server or the CLI.

---

## Next Steps

* For component configuration, see [configuring components](https://TODO).
* For scoping and naming components, see [scoping components](https://TODO).
* For component dependency management, see [component dependencies](https://TODO).
* For managing components in a workspace, see [component monorepo](https://TODO).
* For leaning about versioning, hosting and reusing of components, see [hosting components](https://TODO).

---

## FAQ

### Can I add directories in a component dir?

You can keep sub-directories to sort internal files as needed. So you could put `shopping-cart.specs.tsx` in a `tests` folder for instance.

### Can I nest components in one another?

No.

### Can I control component config & tools?

Yes. By now you probably noticed components has a property called **Environment** (or **Env** for short). Environments are a set of tools and their configuration bundled together, similar to [`react-scripts`](https://www.npmjs.com/package/react-scripts). Each component may have a different env configured, allowing a very granular control over component configurations in your project.

Envs implement a programmatic approach for component operations. This replaces the notion of using scripts in a `package.json`, removing the need of keeping many dev-dependencies for tools and a set of local scripts.

### How can I choose not to use TypeScript?

By default Bit sets TypeScript based compilation for components. You can change the component development environment to a different one that does not use TypeScript and build your components with a Babel based compilation.

### How Components differ from packages?

The main difference between Bit Components and npm Packages is that Bit focuses on a component based workflow, where the implementation is a first class citizen, where npm packages concern about the compiled outputs. This key difference has the following implications:

* Bit Components produce an _npm package_ as part of their build and keep it as a **version artifact**. Consumers can use package managers (npm, yarn and pnpm) to install components.
* Vendor component with the `bit import` and use it as a core component in your codebase (think about - `git clone` + `npm link` automated, inside the consuming codebase).
* A Component version is 100% immutable, as all dependencies are calculated and locked during build time, removing "dependency hell" when depending on components.
