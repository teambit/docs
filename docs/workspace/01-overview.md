---
id: overview
title: Overview
---

Consider this project directory structure:

```sh
$ tree my-web-app
.
├── components
│   ├── app
│   ├── ui-primitives
│   │   ├── button
│   │   ├── table
│   │   ├── logo
│   │   └── title
│   ├── pages
│   │   ├── homepage
│   │   └── about
├── extensions
│   └── react
├── readme.md
└── workspace.jsonc
```

No configuration or complicated folder structures, only a set of neatly organized components.

This is a **Bit Workspace**, it focused around composing applications with components. We recommend breaking down you frontend application to its building blocks and composing pages, data-flows, forms and applications using APIs. Bit supports React, Angular, Vue and Stencil components, and can be extended to include more frameworks.

Workspace produces a set of individual components, each has it's own configuration, dependency graph and versioning. Bit manages the relationships between the components as if the workspace was a monorepo where each component is a separate project.

## Initializing Workspace

Initialize Bit workspace by running bit init command. The folder in which the workspace was initialized, is set as the workspace root.

```sh
$ bit init
Initiazlied an empty Bit worksapce
```

### Integrate with existing project

Bit is designed to have a minimal footprint on your codebase. You can embed a Bit workspace to any of your frontend projects, this way you can improve your component workflow and publish individual components with a minimum overhead.

To initialize a Bit workspace for an existing project, `cd` to the project's root directory and run the `bit init` command. Once you have Bit initialized for your project, you can configure `workspace.json` and use for managing components.

### Create a new project

> TODO

#### Using project templates

> TODO

## Workspace contents

When initializing a Bit workspace you get the ability to manage individual components using a centralized workflow and configuration. Bit's footprint on a project is rather small, as it adds the following resources:

1. Workspace configuration - `workspace.json`
1. Component map - `.bitmap`
1. Workspace scope - `.git/bit` (or `.bit`).

### Workspace configuration

The `workspace.json` file is Bit's main configuration file for a project. Use it to manage and maintain configuration for all components. Read more about it [here](TODO).

### Component map

Bit uses this file keep a link between components and their location in the project. Bit modifies this file when a component is added, removed or staged for publishing.

### Local scope

The workspace's scope contains information about Bit components, such as source files, versions, and dependencies. By default, the components store is an extension to the git repository under `.git/bit` directory, but can be stored elsewhere, such as under a `.bit` folder.

> **Distributed storage**
>
> Bit scopes implement a distributed storage system, similar to Git. This means that all data stored locally is what get's pushed to the remote server. Read more about it [here](TODO).

### Tracking workspace contents with Git

Make sure to track the following files with your SCM:

- `.bitmap`
- `worksapce.json`

You should not track the workspace scope with Git.

## Components

> TODO

## Component statuses in a workspace

The `bit status` [command](/docs/apis/cli-all#status) displays the state of the tracked components in your project's workspace.

Knowing the state of the workspace's components is always important - which components are staged, modified or have missing dependencies, for example.
It's important to note that we're talking about **the state of components with pending changes** - meaning, components that are pending export - they could be tracked and before their first export, or modified after export.

A component may exist in more than one state. A state that is derived from its code status (such as modified) and a state derived from its dependencies (e.g. pending to be tagged).

Listed here are all possible component states.

### Nothing to tag or export

No components have pending changes. Either no files are tracked in the workspace, or the tracked components are exported or sourced, with no pending changes.

```shell
$ bit status
nothing to tag or export
```

### New components

Components that have been tracked, but not yet tagged.

Bit tries to to validate if a *new component* can be isolated, and will print all isolation issues it finds (if any).  
[Read more about the different isolation issues and how to resolve them](/docs/add-and-isolate-components#isolation-errors).

```shell
$ bit status
new components
  (use "bit tag --all [version]" to lock a version with all your changes)

          > bits/a ... ok
```

### Staged components

All tagged components that are ready to be [exported](/docs/apis/cli-all#export) and shared to a remote Collection.

Staged component are fully isolated by Bit.

```shell
$ bit status
staged components
  (use "bit export <remote_collection> to push these components to a remote Collection")

  > string/index. versions: 0.0.1, 0.0.2, 0.0.3 ... ok
  > string/is-string. versions: 0.0.1 ... ok
  > string/pad-left. versions: 0.0.1, 0.0.2 ... ok
```

### Modified components

Components that have already been staged, exported or sourced, and then modified - meaning there's at least one tagged version, and untagged changes on top of it.
Modified components are meant to be tagged and set as a new version.

Bit tries to to validate if a *modified component* can be isolated, and will print all isolation issues it finds (if any).  
[Read more about the different isolation issues and how to resolve them](/docs/add-and-isolate-components#isolation-errors).

```shell
$ bit status
modified components
  (use "bit tag --all [version]" to lock a version with all your changes)
  (use "bit diff" to compare changes)

> string/pad-left ... ok
```

### Pending updates

Components with newer versions fetched by `bit import` and available to use. Use [bit checkout](/docs/apis/cli-all#checkout) to start using the newer version.

```shell
$ bit status
pending updates
  (use "bit checkout [version] [component_id]" to merge changes)
  (use "bit diff [component_id] [new_version]" to compare changes)
  (use "bit log [component_id]" to list all available versions)

        > string/pad-left current: 0.0.1 latest: 0.0.2
```

### Deleted components

A component's files were physically deleted from the filesystem, but the component is still listed by Bit. The component should be removed using `bit remove`.

```shell
$ bit status
deleted components
  these components were deleted from your project.
  use "bit remove [component_id]" to remove these component from your workspace

         > bits/b ... ok
```

### Component pending to be tagged automatically

Component (not in state new) whose at least one of its dependencies is in modified state.  

```shell
$ bit status
components pending to be tagged automatically (when their dependencies are tagged)
  > string/index ... ok
```
