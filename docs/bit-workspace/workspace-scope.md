---
id: workspace-scope
title: Component Revisioning
---

Scope is a virtual storage for components. Bit uses Scopes to save versions of [Bit Components](/bit-components/component-overview) and access them as needed.

Every developer's [workspace](/bit-workspace/manage-workspace) holds a working copy of the components and their history in a local Scope. This allows browsing history, compare versions and checkout past revisions of components.

A workspace scope may contain components from various remote scopes.

### Manage Components

Workspaces are user-friendly and hence allow the user to create new, or modify existing components. You can import and export components from a local scope to remote scopes with the `import` and `export` commands.

A workspace scope may contain components from various remote scopes and publish components to various remote scopes, there is no hard-set limitations on how and where components are managed.

### Independent Components

Components in Bit are independent from one another and each has its own revision history. An advantage of this design is having a `checkout` operation which can be limited to a single component. For example, you may revert a single component back to a previous version while keeping the rest of your codebase in its current state.

## Distributed Workflow

A scope keeps a complete history of each component. This makes Bit compatible with practically any workflow, as a the "source of truth" of a component can be determined by you. It can be a Git repository or a remote scope.  
You may still use Git as the source of truth for all component development, and a network of remote scopes as a distribution and discovery platform for components.

## FAQ

### Can the same workspace have many scopes?

Yes. Bit is a virtual layer on top of your SCM, this means the connection between the two is not a hard link. You can have components configured with different scopes and export components to many scopes from a single workspace.
