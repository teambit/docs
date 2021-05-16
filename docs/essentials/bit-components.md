---
id: components
title: Bit Components
---

Components are the building blocks of modern web architectures. Encapsulated and composable components let developers build more robust software applications quickly.

Bit adds a semantic layer on top of repositories that maps files into components. This extra layer provides Bit with robust capabilities in making the component reusable across projects.

## Understanding Bit Components

A Bit component a set of files, configuration and dependencies, implementing a reusable piece of code, such as:

* A React, Vue or Angular component.
* Shared stylesheet (e.g., CSS, SCSS).
* Client library or a utility.
* Middlewares, modules and providers.

While the exact boundaries of the component are a design decision, we urge you to think about how a component will be consumed and composed in different situations and provide a solid dev-experience for consumers (see - [thinking in components](/component-architecture/thinking-in-components)).

### Bit Components are modules

A component is any has to export a module that can be loaded by the Node.js `require()` function. This is so any Node application or service can load it as an additional functionality.

### Component Scope

Bit Components required to be scopeed. A component's Scope has several porpuses:

* **Component ID** - used for refering to the component in many commands and the UI and to calculate the package name.
* **Remote Bit server** - set as the target for exporting components (Bit servers are also called **Scopes**).
* **Resolve Name Conflicts** - Scoping allows you to create a component with the same name as a component created by another without conflict.

### Independent components

Bit Components are self-contained and independent from any specific codebase. To ensure each component can be independently developed, versioned, and collaborated on Bit models a component as follows:

<div style={{textAlign: 'center'}}>
    <img src="/img/component-contents.png" width="200" alt="Component Contents" />
</div>

* **Files** - List of all files containing the implementation of the component, including tests and any asset or stylesheet.
* **Aspects** - The different [Aspects](/aspects/aspects-overview) (including [Component Development Environment](/building-with-bit/environments)) configured for controling operations like compilation, testing, documentation etc.
* **Dependency graph** - All dependnecies, including packages and other components ([Read more on dependency resolution](/aspects/dependency-resolver)).

The combination of all the above makes each Bit component to be a "self-containing" module, as this is the information needed to reproduce the component in any workspace.

### Component history

When tagging a version, Bit creates an immutable version from the component's implementation, configuration and dependencies. The new version will point to its ancestor, thus building the component's history.

<div style={{textAlign: 'center'}}>
    <img src="/img/version-history.png" width="200" alt="Component Version History" />
</div>

Each component-version is a snapshot of a component in a specific point in time. This means you can use commands like `checkout` to revert a single component to a previous state, while keeping the rest of the components in the workspace in their latest version.

#### Version Artifacts

For each immutable version in the component's history Bit keeps artifacts created during the versioning process. They are generated according to the component's Aspects. Some of these artifacts are:

* Node package with a `package.json`
* Test results
* Compilation targets
* Build logs

Different features in Bit later use these artifacts. For example, the [PKG Aspect](/aspects/pkg) that runs `npm pack` on each component exposes APIs for package managers to install components as if they where packages.

## FAQ

### Are Bit Components the same as npm packages?

The main difference between Bit Components and npm Packages is that Bit focuses on a component based workflow, where the implementation is a first class citizen, where npm packages concern about the compiled outputs. This key difference has the following implications:

* Bit Components produce an *npm package* as part of their build and keep it as a **version artifact**. Consumers can use package managers (npm, yarn and pnpm) to install components.
* Vendor component with the `bit import` and use it as a core component in your codebase (think about - `git clone` + `npm link` autoamted, inside the consuming codebase).
* A Component version is 100% immutable, as all dependencies are calculated and locked during build time, removing "dependency hell" when depending on components.

### Why component names are lowercase?

Similar to npm package, Bit Components must be `require`-able by a node program. Bit must fit the same naming constraints for modules in `node_modules` directory:

* Component name length should be greater than zero
* All the characters in the component name must be lowercase.
* Component name can consist of hyphens
* Component name must not contain any non-url-safe characters (since name ends up being part of a URL)
* Component name should not contain any leading or trailing spaces
* Component name should not contain any of the following characters: ~)('!*
* Component name cannot be the same as a node.js/io.js core module nor a reserved/blacklisted name.
* Component name length cannot exceed 214.
