---
id: scoping-components
title: Scoping Components
---

import { Image } from '@site/src/components/image'

Scope components according to their business concerns as well as a remote place to store components and enable better component discoverability.

## Scope Name

Component's scope name describes both the business concern for that component as the target remote scope where that component is exported to.  
Good scope names are descriptive. We recommend names to be specific and describe a business concern.

* `base-ui` - all basic UI elements and components for building web-ui.
* `inventory` - set of components relevant for inventory management in an e-commerce app.
* `authentication` - components for managing user authentication and tokens.

### Names on Bit.dev

Scopes hosted on [Bit.dev](https://bit.dev) should be prefixed by their **owner account** and use a `.` as a separator. This is so different organizations on the platform can create similarly named scopes of their own. Following the previous example they can be:

* `acme.base-ui`
* `acme.inventory`
* `acme.authentication`

## Set Component Scope

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

### See Component Scope

There are several options to ensure component scope is set correctly:

1. Run `bit start` and explore the component tree. The top-most level items are scopes.
1. `bit show <component>` to see all information on a component, including scope name.
1. `bit env` shows a table of all components and their applied environment config, including scope name.

## Create a Remote Scope

Remote scopes is where components are exported to. For each scope defined for components in the workspace you should have a remote server hosting a scope to export to.

## Create a Scope on Bit.dev

[Bit.dev](https://bit.dev) is a managed hosting platform for scopes. To create a new remote scope on [Bit.dev](https://bit.dev), [follow these steps](/getting-started/remote-scope).

## Self Hosting a Bit Scope

Bit is an open source tool you can use to host components. To host your own scope [follow these steps](/reference/bit-oss-server).
