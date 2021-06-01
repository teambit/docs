---
id: scoping-components
title: Naming Components
---

import { Image } from '@site/src/components/image'

Component's ID describes the component's business concern in a descriptive form, improving discoverability and understanding the component's purpose. Bit uses three tools to define the full component ID:

* Scope - representing the main business concern of a component. **Required**.
* Name - the name of the component. **Required**.
* Namespaces - a set of virtual directories to sort scoped components. **Optional**.

This topic will walk you through the different ways you can decide on scoping and naming of components.

:::note Scoping by default

Bit adds scoping for components by default as a way of grouping related components together. Scoping is a critical dev-workflow when creating new components. Scoping and naming affects how components are used by others.

:::

---

## Prerequisites

To scope and name components, verify you met the following:

1. [Install Bit CLI.](TODO)
1. [Create a Bit workspace](TODO) on a fresh Git repository.
1. Understand how to [create components](TODO).

:::tip Deciding on Scopes ahead of time

It's recommended to consider how you want to scope your components and plan ahead before creating them. This guide also cover changing names and scope.

:::

---

## Set Component ID

Component ID is a concatenation of scope, namespaces and component name, all separated by `/`. Component IDs are unique.

```sh title="Component ID structure"
<scope name>/<list of namespaces>/<component name>
```

### Scope name

A scope describes an overarching business concern in your product, system of company. Good scope names are descriptive:

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

Bit supports pre-fixing for scopes with an organization name for creating ownership on scopes. Use this to have better control over naming with distributing components across large organizations.

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

---

## Summary

* Bit has several scoping and namespacing features to help group and categories components.
* Component ID is decided when component is created.
* When using templates to create components, Bit creates a symmetry between component logical name and it's physical location.
* You can move components in a workspace without affecting the component ID.
* Component ID transforms to the module name to be `import`ed by other components.

---

## Next Steps

* For managing many components in a workspace, see [managing components](TODO).
* For learning more about workspace configuration, see [workspace configuration](TODO).
* For exporting components according to their scopes, see [hosting components](TODO).

---

## FAQ

### Are there limitations on component ID?

Similar to npm package, Bit Components must be require-able by a node program. Bit must fit the same naming constraints for modules in `node_modules` directory:

* Component name length should be greater than zero
* All the characters in the component name must be lowercase.
* Component name can consist of hyphens
* Component name must not contain any non-url-safe characters (since name ends up being part of a URL)
* Component name should not contain any leading or trailing spaces
* Component name should not contain any of the following characters: ~)('!*
* Component name cannot be the same as a node.js/io.js core module nor a reserved/blacklisted name.
* Component name length cannot exceed 214.

### Can the same workspace have many scopes?

Yes. Bit is a virtual layer on top of your SCM, this means the connection between the two is not a hard link. You can have components configured with different scopes and export components to many scopes from a single workspace.

### Can I decide not to scope components?

No. When using Bit, the scale and granularity of components is very high, the way for Bit to manage configuration, publishing and discovery of components is according to how you scope and name components.

### Why is "scope" handled differently?

Component scope fills two tasks:

1. Component name.
1. Target remote Bit server to export component to.

Bit differentiate between what is a scope and what is a namespace, as scopes has additional functionality around it.
