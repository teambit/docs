---
id: remote-scope
title: Hosting Components
---

Scope is a virtual storage for components. Bit uses Scopes to save versions of [Bit Components](/essentials/components) and access them as needed.

Set **Scopes** on remote servers to share components. Storing components on a remote scope makes them available for reuse in other projects. Use the `import` and `export` commands to fetch and push components from and to remote scopes.

Remote scopes are hosted on [Bit.dev](https://bit.dev) or [self-hosted Bit servers](/reference/bit-oss-server).

### Scope Web Server

All components in a scope are rendered and presented on a server. The web server allows for visual exploration of the components in the remote scope. You can see all past versions of components, their documentation, rendering, and code.

<div style={{textAlign: 'center'}}>
    <img src="/img/scope.png" width="500" alt="Scope Web Server" />
</div>

### Sort Components in Scopes

Use scopes for logical and physical grouping of components according to their functionality, business concerns or any other topic. Components in a scope don't have to share technical similarities. You can keep frontend React components, SDKs, utils and even shared data types. This makes scopes be more like "features" grouping together related components implementing a cross-cutting concern with components relevant to different parts in your architecture.

<div style={{textAlign: 'center'}}>
    <img src="/img/scope-contents.png" width="500" alt="Scope Contents" />
</div>

### Cross-Scope Dependencies

Components in different scopes may depend on each other. This creates a network of scopes which are connected according to component dependencies. In turn the network of scopes mimics the topology of how products and technology are built. It can also form a way to learn and measure how different teams communicate within a codebase.

<div style={{textAlign: 'center'}}>
    <img src="/img/scope-dependency.png" width="500" alt="Cross Scope Dependencies" />
</div>

### Feature Ownership

By setting read/write access on scopes, and sorting components according to cross-cutting business concerns, you gain **feature ownership**.  

### Cached Component Dependencies

Scopes cache all external dependencies (i.e, components located in other scopes). This is done to ensure your own scope is completely independent, even when its different components use components maintained by others. Even in cases where a scope you depend on is no longer accessible, each scope ensures all its components are operational.

## FAQ

### How to create a Scope on Bit.dev?

[Bit.dev](https://bit.dev) is a managed hosting platform for scopes. To create a new remote scope on [Bit.dev](https://bit.dev), [follow these steps](/getting-started/remote-scope).

Scopes hosted on [Bit.dev](https://bit.dev) should be prefixed by their **owner account** and use a `.` as a separator. This is so different organizations on the platform can create similarly named scopes of their own.

### Can I set up my own self-hosted scope?

Bit is an open source tool you can use to host components. To host your own scope [follow these steps](/reference/bit-oss-server).

### What are the benefits of using Bit.dev?

Bit is 100% open source platform for component management. You can use it for setting up remote scopes and export components to them. Bit.dev adds an additional set of features and automation on top this basic workflow. [Learn more](/bit-dot-dev/bit-dev).
