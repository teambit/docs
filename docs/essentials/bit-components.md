---
id: components
title: Bit Components
---

Components are the building blocks of modern web architectures. Encapsulated and composable components let developers build more robust software applications quickly.

Bit adds a semantic layer on top of repositories that maps files into components. This extra layer provides Bit with robust capabilities in making the component reusable across projects.

## Understanding Bit Components

A Bit component is a reusable piece of code, such as:

* A React, Vue or Angular component.
* Shared stylesheet (e.g., CSS, SCSS).
* Client library or a utility.
* Middlewares, modules and providers.

While the exact boundaries of the component are a design decision, we urge you to think about how a component will be consumed and composed in different situations and provide a solid dev-experience for consumers (see - [thinking in components](/component-architecture/thinking-in-components)).

### Independent components

Independent components are components that are independently developed, versioned, and collaborated on. To ensure Bit components are self-contained and independent from any specific codebase, it models each component as follows:

<div style={{textAlign: 'center'}}>
    <img src="/img/component-contents.png" width="200" alt="Component Contents" />
</div>

* **Files** - List of all files containing the implementation of the component, including tests and any asset or stylesheet.
* **Aspects** - The different [Aspects](/aspects/aspects-overview) (including [Component Development Environment](/building-with-bit/environments)) configured for controling operations like compilation, testing, documentation etc.
* **Dependency graph** - All dependencies, including packages and other components ([Read more on dependency resolution](/aspects/dependency-resolver)).

The combination of all the above makes each Bit component to be a "self-containing" module, as this is the information needed to reproduce the component in any workspace when using the `import` command.

### Component history

When tagging a version, Bit creates an immutable version from the component's implementation, configuration and dependencies. The new version will point to its ancestor, thus building the component's history.

<div style={{textAlign: 'center'}}>
    <img src="/img/version-history.png" width="200" alt="Component Version History" />
</div>

Each component-version is a snapshot of a component in a specific point in time. This means you can use commands like `checkout` to revert a single component to a previous state, while keeping the rest of the components in the workspace in their latest version.

#### Version Artifacts

For each immutable version in the component's history Bit keeps artifacts created during the versioning process. They are generated according to the component's Aspects. Some of these artifacts are:

* Test results
* Compilation targets
* Build logs

Different features in Bit later use these artifacts. For example, the [PKG Aspect](/aspects/pkg) that runs `npm pack` on each component exposes APIs for package managers to install components as if they where packages.

## Component Scope

The component's scope is the extent of the functionality that the component deals with. Each component must have a scope defined.  
Bit uses the component's scope for two main purposes:

* **Component ID** - used for refering to the component in many commands and the UI and to calculate the package name.
* **Remote Bit server** - set as the target for exporting components.
