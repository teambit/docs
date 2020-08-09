---
id: overview
title: Overview
---

A Bit scope is a virtual storage of your components. It allows you to save the individual versions of each of your components, which you can access when needed.

## Distributed development

As with most other distributed version-control systems, every Bit scope is a full-fledged scope with complete history and full version-tracking abilities. Bit gives each developer a local copy of the full development history for each component, and changes are copied from one such scope to another.

## Workspace' local scope

When creating a new workspace Bit creates a local scope in a hidden directory - `.git/bit/`, as Bit does not use Git to store it's data and objects. When Bit stores a version of a component it keeps more than just the component's implementation. A component-version includes all configurations applied for the specific component as well as it's dependency graph. So when you access a past version, you get the complete functionality to use in the workspace.

> **`.git/bit/` directory**
>
> This is so the contents of the scope will not be tracked by Git, but managed alongside the repository.

## Remote scope

Use remote scopes to host your components. Exporting components to remote scopes makes them available for other developers to consume. You can create remote scopes on [your own server](TODO) or manage use [bit.dev as a scope hosting platform](TODO).

By exporting components to scopes, other developers can utilize your components in their projects. This is beneficial for several reasons:

1. Reduce amount of duplicated code.
1. Enable discovery of components.
1. UI experience will always be consistent across flows.
1. Shortens time to market for products.

You Bit does not force you to keep all components in the same scope , usually they are semantically related.

## Local workspace and remote scopes

Bit each component can have a different remote scope, even if they originate in the same workspace (and thus stored in the same local-scope). This is opposed to traditional SCM tools that require all files to be exported to the same remote repository. The reason Bit is able to implement this capability is because each component is fully isolated and Bit treats it as a mini-project.
