---
id: scopes
title: Scopes
---

import { Image } from '@teambit/documenter.ui.image'

A scope is a storage for components' tagged versions. The 'tagged versions' are the built and "committed" versions of a component. Tagged components are completely decoupled from their authoring [workspace](/essentials/workspace). That means, all configurations set by the workspace, and all generated artifacts, are stored and encapsulated in them.

## Remote scope

A remote scope is a remote collection of Bit components that were 'tagged' and 'exported' from one or more [Bit workspaces](/essentials/workspace). Storing components on a remote scope makes them available to be consumed and further maintained, by other Bit workspaces (in various repositories).

Each scope, or "collection", groups together components that are related by function or purpose. As such, a single remote scope should be maintained by a single group of stakeholders, developers and even non-developers (designers, product managers, etc.).

Remote scopes are hosted on [Bit.dev](https://bit.dev) or [self-hosted Bit servers](/building-with-bit/scopes). Each Bit server can host multiple scopes.

A scope is visually represented by the Scope UI (similarly to the way a workspace UI visually represents your workspace).

<Image src="/img/scope_ui.png" />

### Cached dependencies

Scopes keep internal copies of their external dependencies (i.e, components located in other scopes). This is done to ensure your own scope is completely independent, even when its different components use components maintained by others.

External dependencies are cached only if they are Bit components, registered on Bit's registry. Packages from other registries will not be cached.

## Local scope

The local scope is located in the `.bit` or `.git/bit` directory at the root of a Bit workspace. It is where versioned or tagged components, either authored in the workspace or imported into it, are stored.

The local scope serves two main functions:

- It is where components are "staged" before they are exported to a remote scope.
- It enables the workspace to recognize whether a component has been modified by comparing the immutable version stored in the local scope to the component files tracked by the workspace.

> The local scope (`.bit` or `.git/.bit`) should not be tracked by Git.

## Setting up a Remote Scope

A remote scope is where the _shared_ release versions of components are stored. Each of these release versions packs in it the workspace configurations relevant to it, as well as artifacts produced by the 'build pipeline'. That means, each component is not only available to be used in other repositories, but it can also be maintained and modified in other workspaces, as it offers all the information needed for it.

Setting up a remote scope is done in two steps:

1. Create a scope on [Bit.dev](https://bit.dev) (or self-host on your own server).

2. Configure your workspace to export components to one or more scopes

## Create a Scope on Bit.dev

[Bit.dev](https://bit.dev) is a cloud service built by the maintainers of Bit. This cloud service offers a multitude of features necessary for collaborating on independent components. That includes hosting and organizing Bit scopes, great search capabilities, a cross-repository CI for independent components, and much more.

To create a new remote scope on [Bit.dev](https://bit.dev), [follow these steps](/getting-started/remote-scope).

## Configure your Workspace

As with (almost) any other type of workspace configuration, scopes can be set as the workspace default (for all components) or as a property of specific sets of components.

### Set the Default Scope

The default scope is defined in the `workspace.jsonc` inside the `teambit.workspace/workspace` field. The default scope will be overridden by more specific scope configurations.

A scope hosted on Bit.dev will always have the following pattern: `<scope-owner>.<scope-name>`. A scope owner can be either a user or an organization.

```jsonc
{
  "$schema": "https://static.bit.dev/teambit/schemas/schema.json",
  "teambit.workspace/workspace": {
    "name": "my-workspace",
    "icon": "https://static.bit.dev/bit-logo.svg",
    "defaultScope": "my-org.my-scope"
  },
```

### Set Multiple Scopes

A single workspace can export components to multiple scopes. To achieve that, use [@teambit.workspace/variants](/aspects/variants) (in the `workspace.jsonc`)

## Change component scope

In case you want to export a component to a different scope you will need to modify its configuration. This configuration operation changes the component module name, so you will have to run the `bit link` command. This command creates the new component module name in your project's `node_modules`.

## Self Hosting a bit Scope

Collaborating between Bit components require setting up a remote server accessible for all collaborators. You may use bit.dev as a remote server or setup your own.

> You can host and share components on your own server. I.e. export components to it and import components from the server. Building, testing and rendering should be done on your own CI/CD. Search and npm / yarn install are only available for components exported to bit.dev.

### Self Hosting on a local machine

- `bit init --bare` in a new folder
- `bit start`
- Go to the workspace you want to use it
- Then `bit remote add http://localhost:3000`
- The scope name is the name of the folder where you init bare.
- Then you can export into this scope.
