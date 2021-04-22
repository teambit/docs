---
id: workspace
title: Local Workspace
---

A Bit Workspace gives you a monolithic-like development experience for building components together, while managing each component as an isolated module. This makes your "component workspace" to be a very clean working environment.

## Initialize a Workspace

A Bit workspace can be initialized on an empty directory to create a new workspace. It can also be initialized on an existing project to manage and export its components.

To initialize Bit run the following command:

```sh
bit init --harmony
```

### Sync with Git

Make sure to track the following files with your SCM:

* `.bitmap`
* `workspace.jsonc`

## Component is a Directory

Bit requires all component files in the same directory including component's code, stylings, tests, documentation etc. You can also keep sub-directories as needed. Each component should also have an `index` file to rollup exports.

For example, see the example component:

```sh
bit create react-component shopping-cart
```

```sh
├── index.ts
├── shopping-cart.composition.tsx
├── shopping-cart.docs.mdx
├── shopping-cart.spec.tsx
└── shopping-cart.tsx

0 directories, 5 files
```

This structure has several benefits:

- Directory structure is easily consumable by placing all the related files together.
- File references are becoming shorter and read-friendly.
- Easy to move the component to different directories in the workspace.
- Simple refactoring workflow, as changes are consolidated to the same place.
- `index` is a single point for consumers and maintainers to start from when doing any operation on the component.

### Component dependencies

Bit compiles all components in the workspace to modules and place the compiled output in the `node_modules` directory.

<div style={{textAlign: 'center'}}>
    <img src="/img/module-link.png" width="240" alt="module link" />
</div>

When you want to `import` one component into another, use these module links as absolute `import` statements:

```jsx
import { ShoppingCart } from '@acme/cart.shopping-cart'
```

By not using relative paths for `import` statements you decouple your implementation from the project's file structure, making the component transferable.

#### Generate module links

Bit automatically generates and manages module links. You can manually trigger this action:

```sh
bit link
```

### Build and test affected components

You may maintain many components in the same workpsace. Behind the scenes Bit keeps a dependency graph representing all components in the workspcae, according to their `import` statements. When you make any change to a component, Bit finds all its dependends. Bit uses this graph to build and test only affected components. This helps you save time and resources on building non-affected components.

### Automatic dependents versioning

Bit manages dependencies between Bit components by calculating a complete dependency graph in the workspace. When Bit tags a component, it also tags any other Bit components that exist in the workspace and depend on it (recursively). The dependent components are always tagged with a patch semantic version.

## Component Dev Server

All components in your workspace are rendered and presented on a local development server. To start it run the following command:

```sh
bit start
```

By default Bit generates a local build for the dev server in `public/bit` directory. Whenever you update your configuration you should restart the dev-server.

## Default File-tree Structure

In Bit you get full control on how you want to sort and organize all components in the workspace. You can build a very-nested structure for your workspace, a flat structure, or decide where in your project you want deep nesting and where you don't.  
There are two default behavior Bit sets. You can choose to adopt them or override:

- `src` is not the root directory for components - In Bit you are building independent components. They are not tied to any application, hense they are created outside of `src`.
- The `create` and `import` commands aims to create symmetry between component scoping and name-spacing to how components are sorted in the file-system. This helps dev and discovery experience for functionality in your codebase.

```sh
shopper
├── cart
│   ├── purcahse-summary
│   └── shooping-cart
└── design
    ├── base-ui
    │   ├── button
    │   └── card
    └── theme
        ├── color-pallet
        └── theme-context

10 directories, 0 files
```

## Workspace configuration

`workspace.jsonc` is the main configuration file for your workspace. Use this file to configure any of Bit's core aspects or add your own customized ones.  
While in this file you can set configuration for any aspect, there are some key configurations to control your workspace and development workflow.

### Local dev experience

Control local dev-experience and optimize the workspace to fit your workflow with the [`teambit.workspace/workspace`](https://bit.dev/teambit/workspace/workspace) aspect configuration. It has three key configurations you can set to determine defaults for various outputs and flows:

- `name` - workspace name to be used in the local dev server and terminal outputs.
- `defaultDirectory` - directory for all newly created and imported components.
- `defaultScope` - sets default scoping for components.

### Dependency resolution

Bit spares us the tedious work of managing dependencies per component. Instead it implements the [`teambit.dependencies/dependency-resolver`](aspects/dependency-resolver) which allows to define a dependency policy for the workspace itself, which will then be used to set dependencies for all components.

This means that to add a dependency you should use the `install` command, which will add a dependency to the policy and install it to `node_modules`.

```sh
bit install lodash
```

Bit uses parse each component's code to find `import` and `require` statements. It then finds which module is required (another component or an external pacakge). Bit then uses file-name patterns to decide if the file importing the module is a dev-file, according to it - is that module a `dependecy` or a `devDependency`.

> If your project has a `package.json` file both the `install` command and Bit's dependency definition process will propagate to it and use its contents.

### Centralized component configuration

Bit use a set of cascading configuration rules and policies to manage a centralize location for configuration. Similar to how CSS-selectors work you can define configurations on components according to their location in the workspace directory tree or namespace structure.

This way, instead of managing `package.json` per-component, you can apply different rules and policies which Bit will then calculate and define configuration for each component.

These rules are defined by [`teambit.workspace/variants`](aspects/variants) aspect.

```jsx
{
  "teambit.workspace/variants": {
    "design/theme": {
      "defaultScope": "acme.theme",
    },
    "cart": {
      "defaultScope": "acme.cart",
      "teambit.react/react": {}
    }
  }
}
```

You can see each component's configuration with the `show` command:

```sh
bit show shopping-cart
```

## Vendor Components

A fundamental feature of a Bit workspace is the ability to vendor components. This means you can use a single command, and instead of adding a component as a dependency, you import that component's implementation to your workspace, as-if you are its author.

```sh
bit import teambit.documenter/button
```

> Components you `import` will be visible on the local dev server.

You can do local modifications to it, commit to your Git repository and work with it as if it is yours, even to the point of exporting a new version for that component.

If you need to eject it from your workspace and turn the component to a dependency use the `eject` command:

```sh
bit eject teambit.documenter/button
```

## Component Mapping

The `.bitmap` file maps different sub-directories in your workspace to specific Bit components. This is how Bit gives you flexibility to organize the workspace to your liking. It helps decoupling the Bit component name from its location on the file system.

### Add new components

You can either manually create a directory and contents to be tracked as a component using the `add` command, or use any of the templates with the `create` command. When you add a new component, Bit adds a new entry to the `.bitmap` file.

```sh
bit create react-component shopping-cart
```

### Remove components

You can remove a component from your local workspace with the `remove` command. This will also remove it from the `.bitmap` file.

```sh
bit remove shopping-cart
```

### Move components

As the component-name is decoupled from a specific location in the workspace you can use the `move` command and Bit will move the component's directory to a new location and update `.bitmap`

```sh
bit move shopping-cart some/other/path/
```

As components always use absolute `import` statements, there's no code-refactoring needed after component is moved.
