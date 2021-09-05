---
id: component-id
title: Component ID
---

import { Image } from '@site/src/components/image';
import nestedNamespaces from './images/namespaces_nested.png';
import componentDiagram from './component-id.png'

The Component ID is designed to be a unique, human-readable name that simplifies and help organize components while empowering team autonomy by avoiding cross-team naming conflicts. Every [Component](/components/overview) in Bit is identified and referenced by a Component ID.

Simple example for a Component ID is: 

```
teambit.base-ui/input/button
```

Every ID starts with the Scope Name (`teambit.base-ui`) and continuous to the Component Full Name, which includes the Namespace (`ui`) and its Name (`button`). 

A reference to a specific component version can be achieved by following with the `@` sign referencing the Component version, which might be either a [Semantic Version](/components/tag) or a [Snap Hash](/components/snap).

```
teambit.base-ui/ui/button@1.0.0
```

<Image src={componentDiagram} />

## Scope name

Component ID starts with the Scope Name, which references the Component's [Scope](/scope/overview). Scopes define the common responsibility for a set of Components and help through defining team boundaries and ownership. To learn more on Scopes head over to the [Scope documentation](/scope/overview).

Common example to Scope names might be:

- `design` - Basic and atomic UI components to help drive a consistent UI across all features and apps owned by the Design team.
- `inventory` - e-commerce inventory management feature owned by the Inventory team. 
- `people` - User authentication and management feature owned by the People team.


:::note Scope names in the Bit Cloud
Scopes names in the Bit Cloud include the Scope owner and Scope name as a convention for referencing Scopes.
In the example above, `teambit` refers to the [teambit organization](https://bit.dev/acme) which own the [`base-ui`](https://bit.dev/teambit/base-ui).
:::

Setting the scope name for components can be done by configuring the `defaultScope` property on the Component configuration.

```jsonc {4,8} title="workspace.jsonc"
{
  "teambit.workspace/workspace": {
    "name": "My UI Workspace",
    "defaultScope": "teambit.base-ui" // default scope of all workspace components.
  },
  "teambit.workspace/variants": {
    "design": {
      "defaultScope": "teambit.design" // configure all components under the design directory with the `teambit.design` scope.
    }
  }
}
```

Head over to [Configuring Scopes](/workspace/configuring-scopes) to learn more.

## Component full name

A component's full name serves as a unique identifier of a [Component](/components/overview) in the local workspace.
Most local operations require referencing a component using its full name rather than its ID.
A component's full name is composed of its namespaces (if there are any), and name.

```
<namespaces>/<component name>
```

### Setting a component full name

A component's full name is set when creating a new component using a template.
The below command will create a new component with the name `button` and the namespaces `ui` and `inputs`.

For example:

```bash
bit create react ui/inputs/button
```

When tracking a component manually, a component's full name is determined by the name of its Component Directory. Namespaces can be added using the `--namespace` option.

For example:

```bash
bit add my-scope/button --namespace ui/inputs
```

A component name can be manually set by using the `--id` option (this will override the name received by its Component Directory).

## Component name

A component name describes the concrete responsibility of a component.
It is determined by its Component Directory name, when added manually, or by the given name, when created using a template.

See the ['component full name'](#component-full-name) section, to learn more.

## Namespaces

Namespaces are used to organize components into categories in the Workspace and Remote Scope. They also help in preventing name conflicts in the same scope or workspace, by prefixing a component name with the relevant categories.

Namespaces can form a hierarchal order. For example, the following command creates a component, `button`, with the namespace `ui` and, nested inside it, the namespace `inputs`.

```sh
bit create react ui/inputs/button
```

This will show up in the Workspace UI and Scope UI, like so:

<Image src={nestedNamespaces} />

The hierarchal order formed by namespacing, allows us to select sets of components using semantic structures rather than our concrete (and prone to change) workspace directory structure.

For example, the following configuration will set the React env on all components under the `ui` namespace, regardless or their physical location inside the workspace:

```json title="workspace.jsonc"
{
  "teambit.workspace/variants": {
    "{ui/**}": {
      "teambit.react/react": {}
    }
  }
}
```

## View component IDs

### List all component IDs in the local scope

(i.e, versioned components in the workspace)

```bash
bit list
```

### View the component ID of a specific component

```bash
bit show <component-full-name>
```

## Change a component ID

A component's ID cannot be changed. Instead, deprecate <!--TODO [deprecate](#) --> the current component and create a new one.

It is advisable to exchange links (between the old and the new component) in the components' documentation.