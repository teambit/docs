---
id: component-id
title: Component ID
---

import { Image } from '@site/src/components/image'

Component ID in Bit is designed to empower organization and autonomy of component development.
The component's ID is the concatenation of the component's name, scope name, and namespaces -  all separated by `/`. 

Component IDs are unique. They are used as the interface between the component files, in your working directory, and Bit.
They are essential to treating multiple files as a discrete unit, a component.

```sh title="Component ID structure"
<scope name>/<namespaces>/<component name>
```

* Scope name - describing the domain or high-level concern of a component. **Required**.
* Component name - describing the component's immediate or concrete concern. **Required**.
* Namespaces - a set of names used as virtual directories to sort scoped components. **Optional**.

### Scope name

A scope describes an overarching business concern in your product, system or company. Good scope names are descriptive:

* `base-ui` - all basic UI elements and components for building web-ui.
* `inventory` - set of components relevant for inventory management in an e-commerce app.
* `authentication` - components for managing user authentication and tokens.

Set scope name for components by configuring `workspace.jsonc`:

```jsonc {4} title="workspace.jsonc"
{
  "teambit.workspace/workspace": {
    "name": "ACME's Inventory Workspace",
    "defaultScope": "acme.inventory"
  }
}
```

:::tip Pre-fix scopes with the `.` separator

Scopes can be pre-fixed with an owner name (usually, an organization or sub-organization name).

:::

### Component Name

The component's name describe the concrete responsibility of a component. Decide on a name for each component when generating a component:

```sh
bit create react-component stock-table
```

The component ID will be:

```sh
acme.inventory/stock-table
```

### Sub-categories with namespaces

Sort components in different sub-categories in the same scope using namespaces. You can have either none or many nested namespaces.

When generating components use `/` to add namespaces:

```sh
bit create react-component forms/add-product
```

The component ID will be:

```sh
acme.inventory/forms/add-product
```

---

## Get Component ID

There are several options to ensure component ID is set correctly:

1. Run `bit start` and explore the component tree. It is logically structured according to component IDs.
1. `bit show <component>` to see all information on a component.
1. `bit env` shows a table of all components and their applied environment config, including scope name.

The above flows will also print the component module name for using your component as a module by apps or other components.

### Component Module Name

All components in a workspace are available for consumption as node modules. Bit does it by creating a module for each component in `node_modules` according to it's component ID. However, as Bit heavily utilizes scoping and namespaces, it needs to transform component IDs to module names Node can resolve.

Let's take the following component ID as an example:

```sh title="Component ID with an organization pre-fix"
acme.inventory/forms/add-product
```

Bit will generate:

```sh title="Organization prefix transforms to npm scope, name is separated by ."
@acme/inventory.forms.add-product
```

Use the result module name in all your `import * from ...` statements.

:::tip Generate module links

Bit generates module links in `node_module` dir for all components by default. To trigger this action run `bit link`.

:::

---
