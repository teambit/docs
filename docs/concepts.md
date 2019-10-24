---
id: concepts
title: Bit Concepts
---
## Components

Bit concepts revolve around components. Bit manages a full lifecycle of a component, from the definition of a component, supporting its lifecycle and its packaging and distribution.  

Components are the building blocks of modern web architectures. [Encapsulated and reusable components](https://addyosmani.com/first/) with focused and well-defined APIs let developers build more robust software applications more quickly.

The major frontend frameworks - [React](https://reactjs.org), [Vue](https://vuejs.org/), and [Angular](https://angular.io) - all share the concept of using component-based architecture to compose state-of-the-art applications. Even browsers themselves are backing components as an inherent feature by supporting the [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) standard.

At the same time, Version Control Systems (VCS) and package managers are still revolving around the concept of projects. Each project is a single VCS repository and requires a substantial overhead. As a result, organizations are aggregating multiple components, and sometimes multiple projects, into a single VCS repository.  

Bit adds a semantic layer on top of repositories that maps files into components. This extra layer provides Bit with robust capabilities in managing components: tracking code changes, verifying dependencies completeness or isolating and executing each component.  

### Component Files

Inside of a repository, all files are considered equal. There is no semantic definition of a component aside from conventions of directories and filenames.  

Bit adds the mapping between the component as a logical unit with a defined and specific functionality and the files that comprise this functionality.  

![Bit Component](https://storage.googleapis.com/static.bit.dev/docs/images/component.png)

### Component Dependencies

Components do not exist in a vacuum. Components depend on each other by using functionality from other components. This creates a graph of component dependencies. Understanding the relationships between components is crucial when there are tens and hundreds of components.

Bit provides the tooling for managing this dependency graph. Bit not only knows what the code for each component is but also analyzes the source code to understand the components' dependencies.  

Once a dependency graph exists for each component, its management becomes simpler. If you want to transfer a component from one project to another, Bit knows exactly which additional components should go with it. If a change occurs in a component, Bit can identify which components are impacted by it and notify consumers that a version update is available.  

### Component Packaging  

The specific content of a bit component varies according to the specific framework. It may hold a single plain javascript file with a single function, React Component, Vue component, Angular module, or a web component.  

The modern frameworks require that components go through a build process to be usable. Good software practices also suggest unit testing each component to validate its functionality.  

Bit manages the full lifecycle of the component. In addition to the source code and the dependency graph, Bit retains information about the tools and configurations needed for building and testing the component.  

## Scopes  

Bit stores components in scopes. Just like a version control system stores related files in a project, scope stores related components.  

Bit scopes are distributed. Similar to distributed version control systems (DVCS) such as git or mercurial, bit scopes are all considered equal. That means that components can be exported and imported between any two scopes.  

However, just like a typical DVCS workflow, it is common to have a  __master__ scope that centralizes the components from different working environments. A cloud or on-premise server hosts the master scope.  

![Bit scope](https://storage.googleapis.com/static.bit.dev/docs/images/scope.png)

> When using `bit.dev` as a server, scopes are referenced as collections.

## Bit CLI (bit-bin)

The bit-cli tool is an [open-source tool](https://github.com/teambit/bit) distributed tool for managing components and scopes.  

Bit commands are executed as terminal commands.  

Bit uses a local configuration on the installed machine. bit-cli configuration is accessible using the [`bit config`](apis/cli#config) command.  

The full list of Bit cli commands is detailed [here](/docs/apis/cli-all).

## Bit Workspace

A project that is set to work with Bit is considered a workspace. A workspace contains all of the components' information and provides the functionality to author, export, and import. Usually, a project has a single workspace.  

Each workspace has a single scope with its components and the configuration that is specific to this workspace.  
Understand more about the contents of [Bit workspace](/docs/workspace).  

## Bit Server

A user can set up a [Bit Server](/docs/bit-server) that holds remote scopes for sharing components between Bit workspaces.  
A single server can host multiple remote scopes. Each scope has its name.  

Unlike scopes stored in working projects, scopes stored on a server are **bare scopes**.  

Both workspaces and servers are managed using the Bit cli tool.  

## bit.dev

Instead of hosting their own server, users can use bit.dev for storing remote scopes of components.  

Learn more about the benefits of using the [`bit.dev` service](/docs/bit-dev).  

Bit works in conjunction with package managers such as NPM or Yarn. Components deployed to `bit.dev` are available for installation using package managers.  

Bit components are stored in the `@bit` registry, located in `https://node.bit.dev`.  

To locate the packages in the registry, Bit updates the NPM configuration (the [`.npmrc` file](https://docs.npmjs.com/files/npmrc)) with relevant information, including user's information to restrict access to private collections.  
