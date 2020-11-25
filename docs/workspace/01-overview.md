---
id: overview
title: Overview
---

A Bit workspace enables __a single repository__ to [author](/docs/getting-started/add-components), [export](/docs/getting-started/export-to-scope), [import](/docs/getting-started/import-install-components) and [manage](/docs/getting-started/manage-dependencies) multiple __independent components__.

To initialize a new workspace, run the following command in the root directory of your project:

```shell
$ bbit init
```
> A Bit workspace can be initialized on an empty directory, to create a new modular project from scratch. It can also be initialized on an existing project to modularize it and export its components to a remote scope.

A workspace is made of the following parts:

1. __Workspace configurations__ (the `workspace.jsonc` file). This is where rules and policies are set for the workspace itself but also for each component managed by it. These rules include component dependencies, development environments (compilers, testers, linters, etc.), scopes, and so on. [Learn more about it here](/docs/dependencies/overview).

2. __Files-to-component mapping__ (the `.bitmap` file). This is where Bit maps files to separate units, separate components. This process happens once a component is tracked by Bit (`bbit add path/to/component`). This mapping will also include the following information:
    * The component entry point (usually, the `index.js/ts` file).
    * The component version (if a component has been versioned).
    * Whether this component is pending to be versioned by the CI.
    * Whether this component is authored by this workspace or imported to it.

3. __Local scope__ (the `.bit` or `.git/.bit` directory). This is where versioned or tagged components (either authored or imported) are stored. Components are stored with all the information they need to become completely independent. That includes their source code but also, data regarding their history, dependencies, their development environment, and so on. The local scope serves two main functions:
    1. It is where components are "staged" before they are exported to a remote scope.
    2. It enables the workspace to recognize whether a component has been modified by comparing the immutable version stored in the local scope to the component files tracked by the workspace.

4. __Component packages__ (located in the `node_modules/@scope-name` directory). This is where the distributable, compiled, code of a component is placed. Components in the workspace refer to each other only via their packages. This is crucial to keeping each component independent and context-agnostic.
> Component packages should never be modified directly. Modification should should only be done using the workspace configuration file.

5. __Workspace UI__. The workspace UI is a visual real-time representation of the workspace. Components managed by the workspace can be views as they are rendered in isolation. In addition to that, different aspects of a component, such as its history, documentation and even test logs, can be explored to get a better understanding of it and assist in developing it as and independent building block. To run the workspace UI (on `localhost:3000`):
```shell
$ bbit start
```
[Learn more about it here](/docs/workspace-ui/overview).
## Get the most out of a Bit Workspace

While components can be added and managed by a Workspace on an ad-hoc basis, we envisage workspaces as the interface between your code repo and the Bit eco-system. By creating a Bit workspace at the root of your repo file system for instance, you can then manage each component as a separate module - with it's own versioning, build and CI, and much more; all the while keeping the existing file structure of your repo or mono repo (Bit is entirely agnostic to how you organise and track your code). That way Bit works seamlessly with your source control, while providing entirely isolated control over the individual components the repo contains.

Bit Workspaces are focused on composing applications with components. We recommend breaking down your frontend application to its most basic building blocks (buttons, text inputs, etc) and then successively composing pages, data-flows, forms, and applications using your components and APIs they expose. Components can be implemented in React, Angular, Vue, Stencil, and Node.
## Bit workspace and Git

Make sure to track the following files with your SCM:

- `.bitmap`
- `worksapce.jsonc`

> You should not track the local scope (`.bit` or `.git/bit`) with Git.