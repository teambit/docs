---
id: components
title: Bit Components
---

Components are the building blocks of modern web architectures. Encapsulated and composable components let developers build more robust software applications quickly.

Bit adds a semantic layer on top of repositories that maps files into components. This extra layer provides Bit with robust capabilities in making the component reusable across projects.

## Understanding Bit Components

A Bit component is a reusable piece of code, such as

* A react, Vue or Angular component
* Shared stylesheet (e.g., CSS, SCSS) or stylesheets
* Client library for an API
* Middlewares, modules and providers

While the exact boundaries of the component are a design decision, we urge you to think about how a component will be consumed and composed in different situations and provide a solid dev-experience for consumers (see - [thinking in components](/component-architecture/thinking-in-components)).

While Bit in un-opinionated in what your component is implemented is does require a component to be a directory in your project, containing all relevant files.

```sh title="Shopping Cart component"
├── index.ts
├── shopping-cart.composition.tsx
├── shopping-cart.docs.mdx
├── shopping-cart.spec.tsx
└── shopping-cart.tsx
```

### Independent components

Bit components are self-contained and independent from any specific codebase, making them transferable between different workspaces. In the workspace you only "see" the component's implementation and build it, but behind the scenes Bit combains three different elements for each component.

* **Implementation** - the component files in your workspace, as marked in `.bitmap` file.
* **Configuration** - as calculated for each component from `workspace.jsonc` file.
* **Dependency graph** - all component dependnecies, as resolved from its implementation.

This way Bit provides with a monorepo-like workflow where the workspace have the same dev-experience of building all components in a single project, but each component is individually managed by Bit.

// TODO - Virtual workspace diagram

### Configuration

Component's configuration is a set of Bit [Aspects](TODO). A unique type of Aspect is [Component Development Environment](TODO) (or Env in short). An Env contains the concrete configuration and tools for running the different operation on a component. For exmaple:

* Compilation
* Testing
* Documentation

This makes components transferable, as a component contains all the insturctions on how to build and test itself as APIs for Bit to use. The same design is what allows a workspace to have many components with drastically different setups without having a large amount of configurations and files in the workspace.

> Envs are Bit components as well, managed with their own configurations and aspects.

### Dependency graph

Bit runs static code analysis on components locally to find all `import` statements. Bit then builds a dependency graph and saves it as part of the component version.  
All Bit components in the graph have their dependencies fully resolved and their versions are locked.

> Read more on dependency resolution [here](aspects/dependency-resolver).

### Component history

When tagging a version, Bit creates an immutable asset from the component's implementation, configuration and dependencies. The new version will point to the previous version, thus building a history.  
To ensure you don't publish broken versions, Bit runs the component's build process when versioning components. As part of the process there are several artifacts generated like documentation, test results and all compiled outputs are packaged.

// TODO - component history graph

### Isolation

For each component, Bit builds a context disconnected from the rest of the workspace. Inside this context, Bit creates a full environment required for building, testing and rendering the component. This context is called a **Capsule**.

The contents of a capsule looks like a "repository" for a component:

* source code of the component.
* All dependencies (packages and other Bit components) in `node_modules`.
* Auto-generated `package.json`.

All lifetime operations happen withins capsules during `build`.

## Scoping Components

A component must have a [Scope](TODO) defined. The scope is both a logical and a physical location for components.
