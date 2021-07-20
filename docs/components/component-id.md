---
id: component-id
title: Component ID
---

import { Image } from '@site/src/components/image'

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

## Change Component ID

:::info Sugar syntax is coming

Renaming components is a manual task. A `rename` functionality is coming.

:::

Update a component ID is a two step process. The first step is to create a new component and ensure it hsa the right ID defined:

```sh
bit create react-component new/component/name --scope acme.scope
```

When you have the right ID:

* Copy the implementation.
* Run `bit dependents <old-component-id>` to get a list of dependent components.
* Refactor all `import {...} from <old-module-name>` to `import {...} from <new-module-name>` for dependent components.

Now your components all use the right component. You can either `deprecate` or `remove` the previous component.

---

## Multiple Scopes in a Workspace

Unlike component name and namespaces, scopes are a part of the workspace configuration. A single workspace can manage multiple scopes for its components. To do that, open `workspace.jsonc` and configure multiple variants, each with a different `defaultScope`.

```json {4,7} title="workspace.json"
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

This way Bit uses variants to control which will be the scope for each component.

:::tip Deciding on variants for scoping

It's recommended to have a set of variants responsible only for component scoping, and try to keep them as shallow as possible without many nested directories.

:::

### Deciding on component scope

Bit still adheres to the `defaultScope` setup in `teambit.workspace/workspace` by default. To tell Bit in which scope a component should be created, use the `--scope` option:

```sh
bit create react-component forms/login --scope authentication
```

Bit then creates the component in a directory according to the scope passed as an argument.

---

## Workspace Component Layout

Bit's default behavior for structuring a components in a workspace is sort them in directories by destructuring the component ID and creating a directory tree. This is to make the workspace easier to navigate by creating symmetry between the logical structure of components and their physical location.

When creating new components you can define the component's scope with the following syntax:

```sh
bit create react-component forms/add-product
```

Bit will create the component in the following directory:

```sh
.
└── inventory
    └── forms
        └── add-product
```

### Move component to a different path

Use the `move` command to move an existing component to a new path.

```sh
bit move inventory/forms/add-product some/new/path
```

:::tip Component Id is decoupled from physical location

The location of a component in your workspace does not determine the component ID. When you move a component this has no effect on the component module name.

:::

### Manually set a component path

You can manually decide on a component path upon creating with the `--path` option. This option supports nested directory structure:

```sh
bit create react-component ui/card --path my/folder
```

### Change component default directory

Your workspace uses a default pattern for managing the component layout. This is managed in `workspace.jsonc` in the `defaultDirectory` property. This property accepts string that supports a basic DSL to structure workspace layout with different parts of the component ID:

* `{scopeId}` - component's full scope (`acme.inventory`).
* `{name}` - namespaces and component name, concat together (`forms/add-product`)
* `{owner}` - scope pre-fix, if available (`acme`).
* `{scope}` - component scope, excluding the pre-fix (`inventory`).

```jsonc {3} title="Default configuration"
{
  "teambit.workspace/workspace": {
    "defaultDirectory": "{scope}/{name}"
  }
}
```

You can change `defaultDirectory` to any form that fit your workflow.
