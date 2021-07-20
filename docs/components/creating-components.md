---
id: creating-components
title: Creating Components
---

## Creating a Component

The quickest way to create a new component is by using templates. You can also create a component manually and onboard it to Bit.

### Creating a component using templates

To list all available templates, run:

```sh
bit templates
```

For example, to create a component using the `react-component` template:

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