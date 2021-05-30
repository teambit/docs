---
id: scoping-components
title: Scoping Components
---

import { Image } from '@site/src/components/image'

Scope components according to their business concerns as well as a remote place to store components and enable better component discoverability.

## Component Scope

A component's scope describes its business concern. Good scope names are descriptive.  
We recommend names to be specific to the topic handled by components:

* `base-ui` - all basic UI elements and components for building web-ui.
* `inventory` - set of components relevant for inventory management in an e-commerce app.
* `authentication` - components for managing user authentication and tokens.

:::tip Component Scope and Target Remote

Component Scope name is used to determine the target remote Bit scope for exporting components. When defining scopes for components its important to also create remote scopes of the same names. [Lean more](#create-a-remote-scope)
:::

### Set Component Scope

Component's scope is defined as part of your workspace configuration. Set a default scope for all components by configuring the `teambit.workspace/workspace` aspect's `defaultScope` property:

```jsonc {4}
{
  "teambit.workspace/workspace": {
    "name": "ACME's Inventory Workspace",
    "defaultScope": "acme.inventory"
  },
```

A single workspace can export components to multiple scopes. To achieve that, use [@teambit.workspace/variants](/aspects/variants) aspect.

```json {4,7}
{
  "teambit.workspace/variants": {
    "...": {
      "defaultScope": "acme.authentication"
    },
    "...": {
      "defaultScope": "acme.base-ui"
    },
  }
}
```

:::tip Scope owners in Bit.dev

Scopes hosted on [Bit.dev](https://bit.dev) should be prefixed by their **owner account** and use a `.` as a separator. This is so different organizations on the platform can create similarly named scopes of their own. For example:

* `acme.base-ui`
* `acme.inventory`
* `acme.authentication`
:::

### See Component Scope

There are several options to ensure component scope is set correctly:

1. Run `bit start` and explore the component tree. The top-most level items are scopes.
1. `bit show <component>` to see all information on a component, including scope name.
1. `bit env` shows a table of all components and their applied environment config, including scope name.

## Component Module Name

Scope is the prefix for component IDs. Everything that comes before the first `/` is the component's scope.

```sh
checkout/ui/purchase-summary
```

In this example:

* `checkout` - scope.
* `ui` - namespace inside the scope.
* `purchase-summary` - component name.

When translating this to a component module name (for `import * from ....`) Bit does the following:

* The `acme` part of the component ID translates to an [npm scope](https://docs.npmjs.com/cli/v7/using-npm/scope).
* As npm only support 1 level of nesting components, all `/` becomes `.`.

```sh title="module name for component"
@checkout/ui.purchase-summary
```

:::tip Scopes with the `.` separator

If your scope name has `.` as a separator (similar to [scopes on Bit.dev](TODO)) Bit splits it to two, and takes the first part (`{owner}`) and set as the npm scope. The second part becomes added as a namespace.

```sh title="Module name with {owner}"
acme.checkout/ui/purchase-summary => @acme/checkout.ui.purchase-summary
```

:::

## Component Scope and Workspace Structure

Bit's default behavior for structuring a [workspace](/essentials/workspace) is sort components in directories according to their respected scopes. This is to make the workspace easier to navigate by creating symmetry between the logical structure of components and their physical location.

When creating new components you can define the component's scope with the following syntax:

```sh
bit create react-component ui/purchase-summary --scope checkout
```

Bit will create the component in the following directory:

```sh
.
└── checkout
    └── ui
        └── purchase-summary
```
