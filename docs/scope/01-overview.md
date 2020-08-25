---
id: overview
title: Overview
---

A Bit scope is a virtual storage of your components. It allows you to save the individual versions of each of your components, which you can access when needed.

## Distributed development

As with most other distributed version control systems, every Bit scope is a full-fledged scope with a complete history and full version tracking abilities. Bit gives each developer a local copy of the full development history for each component, and changes are copied from one such scope to another.

> **Where Bit and Git differs...**
>
> Unlike distributed SCMs like Git, Bit does not force a hard link between a local workspace and a remote scope. A local workspace can consume and export components from/to multiple remote scopes.

### Workspace' local scope

When creating a new workspace Bit creates a local scope in a hidden directory - `.git/bit/`, as Bit does not use Git to store its data and objects. When Bit stores a version of a component, it keeps more than just the component's implementation. A component-version includes all configurations applied for the specific component as well as it's the dependency graph. So when you access a past version, you get the complete functionality to use in the workspace.

> **`.git/bit/` directory**
>
> This is so the contents of the scope will not be tracked by Git, but managed alongside the repository.

### Remote scope

Use remote scopes to host your components. Exporting components to remote scopes makes them available for other developers to consume. You can create remote scopes on [your own server](TODO) or manage use [bit.dev as a scope hosting platform](TODO).

By exporting components to scopes, other developers can utilize your components in their projects. This is beneficial for several reasons:

1. Reduce the amount of duplicated code.
1. Enable discovery of components.
1. UI experience will always be consistent across flows.
1. Shortens time to market for products.

Bit does not force you to keep all components in the same scope, do so when they are semantically related.

## Workspace remote scopes

As each component is isolated and separated from all other components, you can set which remote scope will be the target remote of a component. The same workspace can have multiple components, each with its own target. 
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
