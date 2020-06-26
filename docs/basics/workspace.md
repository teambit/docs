---
id: workspace
title: Workspace
---

Bit makes it easy to split up your code into separate components.

## Workspace features

When adding Bit to a repository it adds additional functionality for developing, managing and publishing of isolated components. The Workspace control all features and workflows that revolve around components.

### Tracking and isolating components

Bit handles each component in a project as a separate module. A workspace with Bit components acts like a monorepo of a multiple components. For Bit to manage a component in your project you need to have the component tracked by Bit. Once tracked, Bit can define its configuration, manage it's dependency graph and so on.

Each tracked component is isolated in the project's `node_modules` directory, mimicking an external-dependency. Other components in the workspace can `import` that module using an absolute path.

### Component policies and configurations

While each component has its own configuration and tools, you can use the workspace to control the components you implement for the project. A workspace gives you an ability to set default rules and per-directory variant settings, so instead of maintaining a configuration per-component - you define a set of rules and policies for them.

### Dependency resolution

Bit takes care of dependency resolution for components in a workspace. Whenever you `import` a module to a component, Bit automatically adds it as a dependency for the specific component. This happens for both package dependencies and other components implemented in the same workspace.

It creates a `package.json` for each component, in which dependencies are sorted to `dependencies`, `devDependencies` and `peerDependencies`.

### Workspace dependency graph

A workspace keep a dependency graph for with all components. This way when a component is modified all dependents of that component are marked as modified as well (recursively).

## Managing components

Each component exposes a set of APIs to "tell" the workspace how to run various tasks on them. This way Bit gives you a high level abstraction of managing a single workspace while behind the scenes Bit manages each component as its own isolated module. For example, when you run `bit build`, Bit does not run `build` on the entire workspace. Instead it gets the list of modified components (and their dependents), and runs their `build` API.

### Component types

A workspace manages two types of components. The different between both types is how you control their configuration.  
Regardless the relationship type of a component with the workspace, you still get the same high-level abstraction of running tasks on components.

#### Workspace components

Components that implemented in the project that a workspace was initialized for. Their configuration is set according to the `workspace.json` file.

> **Note**
>
> You can eject a specific component configuration file to get full control over a that component.

#### Vendor components

Component dependencies of the project that where source to the project with the `bit import` command. These components are not affected by the policies as defined in the `workspce.json` file, so Bit will not change their configuration according to the configuration as defined in the consuming project.

## Workspace structure

Initializing Bit workspace adds the following resources to a project:

- Workspace configuration - `workspace.json`.
- Components mapping - `.bitmap`.
- Local scope - `.git/bit`.

### `workspace.json`

This file handles all configuration for the Bit workspace. Default configurations and extensions for components, dependency graph management and integrations with local tools like Git. You can create and configure your own extension to add more features to your workspace.

[Learn more about workspace configuration](TODO)

### `.bitmap`

`.bitmap` holds the component map. Bit uses this file keep a link between components and the files that comprise them. Bit modifies the `.bitmap` file every time the components are changed. Changes happen when adding files, tagging components, importing, or exporting.

> **Note**
>
> This file is automatically managed by Bit.

### `.git/bit`

The workspace's local scope stores all information about the components in the workspace, such as source files, versions, and dependencies. By default, the components store is an extension to the git repository under `.git/bit` directory, but can be stored elsewhere, such as under a `.bit` folder.

> **Note**
>
> This file should not be ignored by Git.

## Workspace UI

The workspace UI is a local development server designed to give you an integrated development environment for your components. Using an set of integrations is shows you all tests, renders stories and creates a documentation page for each component.

**TODO ADD IMAGES**

### Dynamic component list

All components in the workspace are listed and sorted according to their namespaces, making it easy for you to understand which components are present for the workspace. When you add and create a new component it automatically added to the list. Additionally, all modified components are marked as such, so you can quickly understand how a single modification to a component affected their dependents.

### Component overview

The **overview** renders the component documentation so you can better understand how to utilize the component.

### Compositions

This tab renders component compositions and stories. Use it as an isolated development environment for your component. So when you make modifications to your component you can see it renders in isolation. For each composition you also get a view of all dependent components, so you can see them re-rendered on each modification you make.

### Dependency graph

- show dependencies
- show dependents
- packages
- components
- filter

### Tests

- get real time test results

### Change log

- see component history
- jump to version
