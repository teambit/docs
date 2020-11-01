---
id: overview
title: Overview
---

At its most basic, a Bit scope is a virtual storage and server of Bit components. It stores the individual versions of components, which you can access when needed.

## Distributed development

As with most other distributed version control systems, every Bit scope is a full-fledged scope with a complete history and full version tracking abilities. Bit gives developers a local copy of the full development history for each component, which the local scope manages, and changes are copied from one such scope to another when exporting and importing components.

> **Where Bit and Git differ...**
>
> Unlike distributed SCMs like Git, Bit does not force a hard link between a local workspace - and its associated local scope - and a remote scope. A local workspace can consume and export components from/to multiple remote scopes.

### Workspace's local scope

When creating a new workspace Bit creates a local scope in a hidden directory - `.git/bit/`. This local scope stores the data and objects of the components being worked on in the workspace. When Bit stores a version of a component, it keeps more than just the component's implementation files. A component-version includes all configurations applied for the specific component as well as it's the dependency graph, so that when you access a past version of a component, you get the complete functionality to use in the workspace.

> **`.git/bit/` directory**
>
> The scope is placed here so that the contents of the scope will **not** be tracked by Git, but managed alongside the repository.

### Remote scope

Remote scopes are used to host your components and group them under a single entity. We recommend using remote Scopes as a functional collection of components (e.g. Utils). Exporting components to remote scopes makes them available for other developers to consume. You can create remote scopes on [your own server](/docs/guides/host-your-own-scope) or use [bit.dev as a scope hosting platform](/docs/guides/using-bit-dev).

By exporting components to scopes, other developers can utilize your components in their projects. This is beneficial for several reasons:

1. Reduce the amount of duplicated code.
1. Enable discovery of components.
1. UI experience will always be consistent across flows.
1. Shorten time to market for products.

Bit does not force you to keep all components in the same scope, we recommend you do so when they are semantically related.

## Workspace and remote scopes

A workspace is not connected to any specific Remote scope. The same workspace can have multiple components, each with its own target.  
In a why this is similar to having a monorepo composed by pulling many sub-projects where each has its own remote.

> Read more about different strategies to organize components in scope [here](TODO).

### Default target scope

You can define a default target scope using a default `variant` for a workspace:

```json
{
  "@teambit.core/variants": {
    "*": {
      "scope": "acme.ui",
    }
  }
}
```

### Managing multiple scopes

If you are required to export components to a set of different scopes, you `@teambit/variants` define sets of components with another target scope.

```json
{
  "@teambit.core/variants": {
    "components/elements": {
      "scope": "acme.elements"
     },
    "components/helpers": {
      "scope": "acme.helpers"
     }
  }
}
```
