---
id: overview
title: Overview
---

Consider this project directory structure:

```sh
$ tree my-web-app
.
├── components
│   ├── app
│   ├── ui-primitives
│   │   ├── button
│   │   ├── table
│   │   ├── logo
│   │   └── title
│   └── pages
│       ├── homepage
│       └── about
├── readme.md
├── pnpm-lock.yaml
└── workspace.jsonc
```

No configuration or complicated folder structures, only a set of neatly organized components.

This is a **Bit Workspace**. At it's most basic it's just a zone on your machine where you can use Bit to manage your components. But built into a Bit Workspace is functionality which enables you to control, configure and track your components in a way you simply couldnt do without encapsulating each component as its own entity.

First things first - the workspace is where you separate your code/repo structure from your component management. Here you tell Bit where a component resides, and from then on Bit will manage that component as a self-enclosed identity. You keep your existing repo structure, and Bit manages the mapping from file structure to Bit components.

The workspace's configuration file is then where a lot of the magic happens. Via the workspace you can control how your Bit components will behave. You can set the development environment - compilation, transpiling, linting, testing and much more. You can manage dependencies, for the entire workspace (e.g. if you want to ensure that React is always a peer dependency, even if someone forgot to add that) or per component. All of these, at any level of granularity - component, namespace, or just the entire workspace - that you require. 

## Get the most out of a Bit Workspace

While components can be added and managed by a Workspace on an ad-hoc basis, we envisage workspaces as the interface between your code repo and the Bit eco-system. By creating a Bit workspace at the root of your repo file system for instance, you can then manage each component as a separate module - with it's own versioning, build and CI, and much more; all the while keeping the existing file structure of your repo or mono repo (Bit is entirely agnostic to how you organise and track your code). That way Bit works seamlessly with your source control, while providing entirely isolated control over the individual components the repo contains.

Bit Workspaces are focused on composing applications with components. We recommend breaking down your frontend application to its most basic building blocks (buttons, text inputs, etc) and then successively composing pages, data-flows, forms, and applications using your components and APIs they expose. Components can be implemented in React, Angular, Vue, Stencil, and Node.

## Components as workspace modules

Each component in the workspace is managed as a standalone module. In the process of telling Bit to track each commponent, Bit builds a mapping between the component files and their 'physical' location in the workspace, so that Bit can from then on manage the component's code as a single, self-enclosed entity. 

### Multiple types of module

Instead of using the same build configuration for all components in a project, via the workspace you can configure the development and build environment for components as groups or even individual components. For example you can group all react components and apply a specific React environment on them. And then in a sister directory have your Angular components with their own Angular environment, or node components... you get the picture. All sitting on the same Workspace and even in the same repo.

Learn more about it [here](/docs/environment/overview#how-environments-work).

## Initializing Workspace

Initialize Bit workspace by running `bit init` command. The folder in which the workspace was initialized, is set as the workspace root.

```sh
$ bit init
Initialized an empty Bit worksapce
```

### Integrate with existing project

Bit is designed to have a minimal footprint on your codebase. So you can embed a Bit workspace to any of your frontend projects. This way, you can improve your component workflow and publish individual components with minimum overhead.

Suppose you already have a project with components. In that case, you can initialize a Bit workspace in its root directory and use Bit to harvest pre-existing components using the `bit add` command. Once managed by Bit, you can use the `workspace.json` file to apply configurations for your components. The application itself can use the absolute import statements to use the modules Bit creates for each component in the project's `node_modules` directory.

### Create a new project

When utilizing component-driven development, entire applications can be considered as a composition of components. Instead of treating your entire project as an application, you can decide to develop a component to be an application and have that component composed of various other components in your workspace.

You can follow Bit's [getting-started](/docs/getting-started/quick-start) guide to experiment with such a workflow.

#### Starting with a project templates

> **Not yet implemented**
>
> project-template capability is not yet implemented.

## Workspace contents

When initializing a Bit workspace, you can manage individual components using a centralized workflow and configuration. Bit's footprint on a project is rather small, as it adds the following resources:

1. Workspace configuration - `workspace.json`
1. Component map - `.bitmap`
1. Workspace scope - `.git/bit` (or `.bit`).

### Workspace configuration

The `workspace.json` file is Bit's primary configuration file for a project. Use it to manage and maintain configuration for all components. Read more about it [here](/docs/component/component-json).

### Component map

Components are composed of files organized in a directory structure. Unlike other monorepo tools, Bit does not limit you to a predefined directory structure. You can create whatever directory structure you see fit.  
To keep track of the location of each component in your workspace, Bit uses the `.bitmap` file. Whenever a component is created, moved, or removed, Bit automatically updates this file.

### Local scope

The workspace's scope contains information about Bit components, such as source files, versions, and dependencies. By default, the components store is an extension to the git repository under `.git/bit` directory, but can be stored elsewhere, such as under a `.bit` folder.

> **Distributed storage**
>
> Bit scopes implement a distributed storage system, similar to Git. This means that all data stored locally is what gets pushed to the remote server. Read more about it [here](/docs/scope/overview).

## Bit workspace and Git

Make sure to track the following files with your SCM:

- `.bitmap`
- `worksapce.json`

You should not track the workspace scope with Git.


Examples of Bit's linking function:
```sh
./node_modules/@acme/button   -> ./components/ui-primitives/button
./node_modules/@acme/homepage -> ./components/pages/hompage
...
```


While the component's source code is a part of your workspace, Bit keeps the compiled module in the `node_modules` directory. Each component should be consumed using an absolute `import` statement from its node_modules package using its module name (and not via a relative import). This ensures both that you're using a fully compiled and isolated version of the component's code, and that you dont need to retrace your steps to convert relative imports to node_modules imports once you've completed your development work.
 
By treating each component as a module Bit helps you build isolated components that interact with each other using only their APIs.