---
id: overview
title: Overview
---

//TODO try and simplify to something basic should be talking about feature ownership technically what it is not abstract as this is in what is bit docs

import { Image } from '@site/src/components/image'

A scope is a storage for components' tagged versions. The 'tagged versions' are the built and "committed" versions of a component. Tagged components are completely decoupled from their authoring [workspace](/building-with-bit/workspace). That means, all configurations set by the workspace, and all generated artifacts, are stored and encapsulated in them.

## Remote scope

A remote scope is a remote collection of Bit components that were 'tagged' and 'exported' from one or more [Bit workspaces](/building-with-bit/workspace). Storing components on a remote scope makes them available to be consumed and further maintained, by other Bit workspaces (in various repositories).

Each scope, or "collection", groups together components that are related by function or purpose. As such, a single remote scope should be maintained by a single group of stakeholders, developers and even non-developers (designers, product managers, etc.).

Remote scopes are hosted on [Bit.dev](https://bit.dev) or [self-hosted Bit servers](/building-with-bit/scopes). Each Bit server can host multiple scopes.

A scope is visually represented by the Scope UI (similarly to the way a workspace UI visually represents your workspace).

<Image src="/img/scope_ui.png" />

<br />

To set up a remote scope, [see here](/building-with-bit/scopes).

### Cached dependencies

Scopes keep internal copies of their external dependencies (i.e, components located in other scopes). This is done to ensure your own scope is completely independent, even when its different components use components maintained by others.

External dependencies are cached only if they are Bit components, registered on Bit's registry. Packages from other registries will not be cached.

## Local scope

The local scope is located in the `.bit` or `.git/bit` directory at the root of a Bit workspace. It is where versioned or tagged components, either authored in the workspace or imported into it, are stored.

The local scope serves two main functions:

- It is where components are "staged" before they are exported to a remote scope.
- It enables the workspace to recognize whether a component has been modified by comparing the immutable version stored in the local scope to the component files tracked by the workspace.

> The local scope (`.bit` or `.git/.bit`) should not be tracked by Git.
