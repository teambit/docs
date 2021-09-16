---
id: create-components
title: Create Components
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Image } from '@site/src/components/image';
import componentImg from './component.png';

Bit centralize your development workflow around components, composing through [dependencies](/dependencies/overview/) with them to build features and apps. A basic component may be a simple module, utility or common, SDK, React component or hook, Angular module, shared style etc.  
Each component is isolated and may have its own build and configuration for compilation, testing, lint, formatting defined in its [component development environment](envs/overview/).  

:::info supported frameworks

Bit officially supports Node, React, Angular, LitHTML.

:::

Bit supports generating components with templates. This make the process of creating components repeatable, easy and directing towards best practices. To see all available templates for your workspace run:

```bash
bit templates
```

The component configuration will be determined according to the component name, according to the [variants](/workspace/variants) aspect in `workspace.jsonc` by defining it's [Component Development Environment](/envs/overview) (**envs**).

```json title="workspace.jsonc template uses variants to set env for components"
"teambit.workspace/variants": {
  "{ui/**}, {pages/**}": { // Finds components with "ui" or "pages" namespace
    "teambit.react/react": {} // Sets these components as React component
  },
  "{envs/**}, {extensions/**}": { // Finds components with "envs" or "extensions" namespace
    "teambit.harmony/aspect": {} // Sets these components as Bit extensions
  }
}
```

Use the [component generator](generator/overview) to create a new component with the `create` command. The command also support namespacing for components when using `/`:

<Tabs
groupId="frameworks"
defaultValue="React"
values={[
{label: 'React', value: 'React'},
{label: 'Node', value: 'Node'},
]}>
<TabItem value="React">

```bash
bit create react ui/my-welcome
```

```bash title="New component created"
the following 1 component(s) were created

company.demo/ui/my-welcome
    location: base-ui/ui/my-welcome
    env:      teambit.react/react
```

  </TabItem>
  <TabItem value="Node">

```bash
bit create node utils/my-welcome
```

```bash title="New component created"
the following 1 component(s) were created

company.demo/utils/my-welcome
    location: base-ui/utils/my-welcome
    env:      teambit.harmony/node
```

  </TabItem>
</Tabs>

That's it! Your first React component is created. You can see the new component in the Workspace UI.

:::tip non-default scope

When creating a component Bit will set it with a scope from the workspace `defaultScope` [config](/workspace/workspace-json). You can override the scope by passing the `--scope` flag.

:::

### Component is a Directory

Bit requires all of each component's implementation files to be contained in a single directory. This includes the component's code, stylings, tests, documentation etc and an index barrel file to roll-up exports.

<Tabs
groupId="frameworks"
defaultValue="React"
values={[
{label: 'React', value: 'React'},
{label: 'Node', value: 'Node'},
]}>
<TabItem value="React">

```bash title="Component directory"
└── ui/my-welcome
    ├── index.ts # Main component file.
    ├── my-welcome.tsx # Implementation of the component.
    ├── my-welcome.spec.tsx # Test file of the component.
    ├── my-welcome.composition.tsx # Compositions for simulating the component in different states.
    └── my-welcome.docs.mdx # Docs file for the component.
```

  </TabItem>
  <TabItem value="Node">

```bash title="Component directory"
└── my-welcome
    ├── index.ts # Main component file.
    ├── my-welcome.ts # Test file of the component.
    └── my-welcome.docs.md # Docs file for the component.
```

  </TabItem>
</Tabs>

The component will be created in a the workspace according to the configured [directory structure](/workspace/directory-structure).

:::info Benefits of component-directory

- Directory structure is easily consumable by placing all the related files together.
- File references become shorter and more read-friendly.
- Easy to move components around in the workspace.
- Simple refactoring workflow, as changes are consolidated to the same place.
- `index` is a single point for consumers and maintainers to start from when doing any operation on the component.

:::

## Get Component Configuration

To check which envs are configured on your components you can use the `bit env` command or check the component's configuration on the workspace UI.

```bash
bit env
```

```sh title="Component Development Environment"
┌───────────────────────────────────────┬───────────────────────────────────────┐
│ component                             │ env                                   │
├───────────────────────────────────────┼───────────────────────────────────────┤
│ company.scope/ui/my-welcome           │ teambit.bit/react                     │
└───────────────────────────────────────┴───────────────────────────────────────┘
```

While the component directory itself does not hold any configuration for your component, Bit still holds per-component configuration. To inspect the component use the `bit show` command.

```bash
bit show ui/my-welcome
```

```bash title="Component metadata"
┌───────────────────┬────────────────────────────────────────────────────────────────┐
│ id                │ bitorg.experience/ui/my-welcome                                │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ scope             │ bitorg.experience                                              │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ name              │ ui/my-welcome                                                  │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ env               │ teambit.react/react                                            │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ package name      │ @bitorg/experience.ui.my-welcome                               │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ main file         │ index.ts                                                       │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ files             │ ...                                                            │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ dev files         │ ...                                                            │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ extensions        │ teambit.react/react                                            │
│                   │ ...                                                            │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ dependencies      │ @bitorg/experience.templates.ui.heading@latest- (component)    │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ dev dependencies  │ @types/node@12.20.4 (package)                                  │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ peer dependencies │ react@^16.8.0 || ^17.0.0------ (package)                       │
└───────────────────┴────────────────────────────────────────────────────────────────┘
```

:::info Built-In Component Development Environment

Bit comes with built in [Component Development Environment](/envs/overview) for [Node](/node/overview), React, Angular, LitHTML and Aspect <!--TODO [React](/react/overview), [Angular](/angular/overview), [LitHTML](/lithtml/overview) and [Aspect](/extending-bit/aspect) -->.

:::

## Browse Components

When you have Bit components in a workspace, you can browse them by running the following command:

```sh
bit start
```

The Workspace UI <!--TODO [Workspace UI](/components/ui) --> is where [Docs](/docs/overview) can be previewed, [Compositions](/compositions/overview) can be developed to simulate and visualize different states of the component and examine the component dependencies, configuration and history visually.

<Image src={componentImg} />

To view all components from the terminal run the following command:

```sh
bit list
```

## Component Modules

Bit creates a module for each component in the workspace. All modules are created in the `node_modules` directory, so you can use them in other components.

TODO SCREENSHOT

:::info module name differs from component name

Bit utilizes scoping and namespaces. These scoping features are then translated to package names. For example the component ID `acme.inventory/forms/add-product` will be transformed to `@acme/inventory.forms.add-product`.

:::

## Component Isolation Status

Bit ensures a component is isolated from other components. Run the [Workspace Status](/workspace/workspace-status) command to ensure all components are `ok` (isolated).

```bash
bit status
```

```bash
new components
(use "bit tag --all [version]" to lock a version with all your changes)

     > templates/envs/my-react ... ok
     > templates/pages/welcome ... ok
     > templates/ui/card ... ok
     > templates/ui/heading ... ok
     > templates/ui/text ... ok
     > ui/my-welcome ... ok
```

:::info why isolation is important

Components are meant to be reused in different projects and apps. Bit's isolation process validates that it has all information and dependencies to reproduce a working runtime environment for each component regardless of the project it will be used in.

:::
