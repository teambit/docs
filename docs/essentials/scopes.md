---
id: scopes
title: Scopes
---

Scope is a virtual storage for components. Bit uses Scopes to save versions of [Bit Components](/essentials/components) and access them as needed.

## Remote Scopes

Set **Remote Scopes** on remote servers to share components by different teams. Storing components on a remote scope makes them available to be consumed and further maintained, by other [Bit Workspaces](/essentials/workspace).

Each scope, or "collection", groups together components that are related by function or purpose. As such, a single bare scope should be maintained by a single group of stakeholders, developers and even non-developers (designers, product managers, etc.).

Remote scopes are hosted on [Bit.dev](https://bit.dev) or [self-hosted Bit servers](/reference/bit-oss-server).

### Scope Server

All components in a scope are rendered and presented on a server. The web server allows for visual exploration of the components in the remote scope. You can see all past versions of components, their documentation, rendering, and code.

<Image src="/img/scope_ui.png" />

### Sort Components in Scopes

Use scopes for logical and physical grouping of components according to their functionality, business concerns or any other topic. Components in a scope don't have to share technical similarities. You can keep frontend React components, SDKs, utils and even shared data types. This makes scopes be more like "features" grouping together related components implementing a cross-cutting concern with components relevant to different parts in your architecture.

### Cross-Scope Dependencies

Components in different scopes may depend on each other. This creates a network of scopes which are connected according to component dependencies. In turn the network of scopes mimics the topology of how products and technology are built. It can also form a way to learn and measure how different teams communicate within a codebase.  

### Feature Ownership

By setting read/write access on scopes, and sorting components according to cross-cutting business concerns, you gain **feature ownership**.  

### "Always on" Dependencies

Scopes cache all external dependencies (i.e, components located in other scopes). This is done to ensure your own scope is completely independent, even when its different components use components maintained by others. Even in cases where a scope you depend on is no longer accessible, each scope ensures all its components are operational.

## Workspace Scope

Every developer's [workspace](/essentials/workspace) holds a working copy of the components and their history in a local Scope. This allows browsing history, compare versions and checkout past revisions of components.

A workspace scope may contain components from various remote scopes.

### Manage Components

Workspaces are user-friendly and hence allow the user to create new, or modify existing components. You can import and export components from a local scope to remote scopes with the `import` and `export` commands.

A workspace scope may contain components from various remote scopes and publish components to various remote scopes, there is no hard-set limitations on how and where components are managed.

### Independent Components

Components in Bit are independent from one another and each has its own revision history. An advantage of this design is having a `checkout` operation which can be limited to a single component. For example, you may revert a single component back to a previous version while keeping the rest of your codebase in its current state.

## Distributed Workflow

A scope keeps a complete history of each component. This makes Bit compatible with practically any workflow, as a the "source of truth" of a component can be determined by you. It can be a Git repository or a remote scope.  
You may still use Git as the source of truth for all component development, and a network of remote scopes as a distribution and discovery platform for components.
