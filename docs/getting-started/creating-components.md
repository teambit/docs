---
id: creating-components
title: Creating Components
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

---

## From Ran

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Image } from '@site/src/components/image'
import componentImg from './component.png';

In Bit, you create Components and compose them together through [Dependencies](dependencies/overview). Components can be created in different types, which are set by the configured Env. Env automate the development environment for a specific type of [Component](/components/overview). Officially supported [Envs](/envs/overview) available for creating components are Node, React, Angular, Lit and Aspect.

Our official envs come built-in with a set of pre-configured templates to make the process of creating components repeatable, easy and directing towards best practices. To view available templates use the `bit templates` command.

```bash
bit templates
```

:::note
Templates are shown from all Envs configured in your Workspace.
:::

Creating your first React Component is as simple as using the `bit create` command which is powered by the Component Generator. By default, components are created in the `defaultScope` defined in the Workspace Configuration, to specify a different scope use the `--scope` flag.

Official Workspace templates come with pre-configured [workspace.json](/workspace/workspace-configuration) which sets components created that include either the `ui` or `pages` namespace to be associated to the React env, Default env is the Node env. `envs` and `extensions` namespaces are expected to include Bit Aspects associated by default with the Aspect env.

```json
  "teambit.workspace/variants": {
    "{ui/**}, {pages/**}": {
      "teambit.react/react": {}
    },
    "{envs/**}, {extensions/**}": {
      "teambit.harmony/aspect": {}
    }
  }
```

In the above example, [Variants](/workspace/variants) are used to "select" components by their namespace and configure them with the React Env.

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

  </TabItem>
  <TabItem value="Node">

```bash
bit create node my-welcome
```

  </TabItem>
</Tabs>

Components created with the `ui` namespace are automatically set to the React env.

That's it! Your first React component is created. Bit has created a new [Component Directory](/workspace/component-directory) in the Workspace. You should think of every component created in Bit as an independent module which might be used from anywhere.

<Tabs
groupId="frameworks"
defaultValue="React"
values={[
{label: 'React', value: 'React'},
{label: 'Node', value: 'Node'},
]}>
<TabItem value="React">

```bash
└── ui/my-welcome # Component directory
    ├── index.ts # Main component file.
    ├── my-welcome.tsx # Test file of the component.
    ├── my-welcome.composition.tsx # Compositions for simulating the component in different states.
    └── my-welcome.docs.mdx # Docs file for the component.
```

  </TabItem>
  <TabItem value="Node">

```bash
└── my-welcome
    ├── index.ts # Main component file.
    ├── my-welcome.ts # Test file of the component.
    └── my-welcome.docs.md # Docs file for the component.
```

  </TabItem>
</Tabs>

As seen above, the created component has few different files generated by default.

- `index.ts` / [Component main file](/components/main-file), exposing the component API.
- `my-welcome.tsx` / Implantation of the React component. You can add as many files as required for your Component to operate.
- `my-welcome.spec.tsx` / Tests file for the Component.
- `my-welcome.compositions.tsx` / Compositions file helping to simulate and visualize the component in different states.
- `my-welcome.docs.md` / Docs file. A markdown file for documenting the component.

You can choose to not include tests files, docs files or even the composition files, however we highly recommend in including all of these as it encourages best practices and makes it easier for other developers to understand and trust your component.

To check which envs are configured on your components you can use the `bit env` command or check the icon on its left on the UI.

```bash
$ bit env
┌───────────────────────────────────────┬───────────────────────────────────────┐
│ component                             │ env                                   │
├───────────────────────────────────────┼───────────────────────────────────────┤
│ company.scope/templates/ui/text       │ teambit.bit/react                     │
├───────────────────────────────────────┼───────────────────────────────────────┤
│ company.scope/ui/my-welcome           │ teambit.bit/react                     │
└───────────────────────────────────────┴───────────────────────────────────────┘
```

Since we created this component under the `ui` namespace, the newly component created is configured to use the React Env. The React env is the official Env for development of React Components. It comes baked with best practices from the React community and makes it easy and repeatable to create and maintain React components. By default, the React Env is configured to use TypeScript for compiling, ESLint for linting, Jest for testing and a contains a basic build pipeline.

To examine what is the composition of a specific Env including the tools used and their configuration, use the `bit env [id]` command.

```bash
$ bit env ui/my-welcome

Environment: teambit.react/react
teambit.compilation/compiler

configured compiler: teambit.typescript/typescript (TypeScript @ 4.3.5)
compiler config:
{
  ... // tsconfig properties
}


teambit.defender/tester

configured tester: teambit.defender/jest (Jest @ 26.6.3)
tester config:

module.exports = {
  ... // jest configuration
};

teambit.pipelines/builder

total 6 tasks are configured to be executed in the following order
1. teambit.harmony/aspect:CoreExporter
2. teambit.compilation/compiler:TSCompiler
3. teambit.defender/tester:TestComponents
4. teambit.pkg/pkg:PreparePackages
5. teambit.pkg/pkg:PublishDryRun
6. teambit.preview/preview:GeneratePreview
```

Checking in for the Workspace Status would now indicate there is a `new` Component in the Workspace and it has no issues.

```bash
$ bit status
new components
(use "bit tag --all [version]" to lock a version with all your changes)

     > templates/envs/my-react ... ok
     > templates/pages/welcome ... ok
     > templates/ui/card ... ok
     > templates/ui/heading ... ok
     > templates/ui/text ... ok
     > ui/my-welcome ... ok
```

You can inspect the component to see how Bit how it is configured, obtain access to the component metadata and its configuration using the `bit show` command.

```bash
$ bit show ui/my-welcome
┌───────────────────┬────────────────────────────────────────────────────────────────┐
│ id                │ bitorg.experience/ui/my-welcome                                │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ scope             │ bitorg.experience                                              │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ name              │ ui/my-welcome                                                  │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ env               │ bitorg.experience/templates/envs/my-react                      │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ package name      │ @bitorg/experience.ui.my-welcome                               │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ main file         │ index.ts                                                       │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ files             │ index.ts                                                       │
│                   │ my-welcome.composition.tsx                                     │
│                   │ my-welcome.docs.mdx                                            │
│                   │ my-welcome.spec.tsx                                            │
│                   │ my-welcome.tsx                                                 │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ dev files         │ my-welcome.spec.tsx (teambit.defender/tester)                  │
│                   │ my-welcome.composition.tsx (teambit.compositions/compositions) │
│                   │ my-welcome.docs.mdx (teambit.docs/docs)                        │
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

Component can be now viewed from the Component UI by clicking the newly created component in the UI sidebar. It is where Docs can be previewed, Compositions can be developed to simulate and visualize different states of the component and examine the component dependencies, configuration and history visually.

<Image src={componentImg} />

### Adding Styles to your Component

We have not included any styles in our component templates. This is simply because there are many ways to add styling to your project. You can of course use CSS, any SASS, Less and other CSS-preprocessors and CSS-in-JS frameworks. React Env comes with support for scss and less modules.

If you want to add styles to your component you can do so by adding a `my-component.styles.scss` file to your component folder and importing it in the component file.

```ts
import styles from './my-component.module.scss';
```

You can also create your own component templates with your preferred styling using our [component generator](/).

:::tip Custom Environments
You can also create your own [custom environments](/) for your components by extending the available environments. This allows you to override configs, apply themes to all your compositions and more.
:::
