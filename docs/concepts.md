---
id: concepts
title: Bit Concepts
---
## Components

Components are the building blocks of Modern web architectures. [Encapsulated and reusable components](https://addyosmani.com/first/) with focused and well defined APIs, components let developers build software applications better and faster.

The major frontend frameworks, [React](https://reactjs.org), [Vue](https://vuejs.org/), and [Angular](https://angular.io) all share the concept of using components based architecture to compose state-of-the-art applications. Even the browsers themselves are now backing components as an inherent feature by supporting the [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) standards.  

At the same time, Version Control Systems (VCS) and package managers are still revolving around the concept of projects. Each project is a single VCS repository and requires a substantial overhead. As a result, organizations are aggregating multiple components, and sometimes multiple projects, into a single VCS repository.  

A typical example of a single repository holding multiple components are shared libraries such as Bootstrap or Material UI. Similarly, organizations manage their design systems in a single code repository.  

The result is a complete discrepancy between producers and consumers. The components producer is storing all the components in a single repository and a single package. The consumer of the components only needs a subset of the package.  

Bit bridges this gap. Bit adds a layer on top of existing tools for destructing repositories into discrete components and supports their lifecycle.  

### Components and Files

Inside a repository, all files are made equal. There is no semantic definition of a component, aside from conventions of directories and files names.  

Bit adds the mapping between the component as a logical unit with a defined and specific functionality and the files that comprise this functionality.  

![Bit Component](https://storage.googleapis.com/static.bit.dev/docs/images/component.png)

### Components Dependencies

Components do not exist in a vacuum. Components depend on each other by using functionality from other components. This creates a graph of components dependencies. Understanding the relationships between components is crucial when there are tens and hundreds of components.  

Bit provides the tooling for managing this dependency graph. Bit does not only know what is the code for each component, but also analyzes the source code to understand the components' dependencies.  

Once a dependencies graph exist for each component, its management becomes simpler. If you want to transfer a component from one project to another, Bit knows exactly what are the additional components that should go with it. If a change occur in a component, Bit can identify what components are impacted by it, and notify on a version update that is needed on it.  

### Components Packaging  

The specific content of a bit component varies according to the specific framework. It may hold a single plain javascript file with a single function, React Component, Vue component, Angular module or a web component.  

The modern frameworks require that components go through a build process to be usable. Good software practices also suggest unit testing for each component to validate its functionality.  

Bit manages the full life cycle of the component. In addition to the source code, and the dependency graph, Bit retains information about the tools and configurations needed for building and testing the component.  

## Scopes  

Bit stores components information in scopes (in bit.dev they are referenced as collections). Just like a version control system is storing related files in a project, a scope is storing related components.  

Bit scopes are distributed. Similar to distributed version control systems (DVCS) such as git or mercurial, bit scopes are all made equal. That is to say that components can be exported and imported between any two scoped.  

However, just like a typical DVCS workflow, it is common to have a  __master scope that centralizes the components from different working environments. A cloud or on-premise server hosts the master scope.  

![Bit scope](https://storage.googleapis.com/static.bit.dev/docs/images/scope.png)

## Bit Workspace

A Bit workspace is a collection that resides inside a project. A workspace contains all the component information and provide the functionality to author, export, import, and install components. Usually, a project has a single workspace.  

![Bit Workspace](https://storage.googleapis.com/static.bit.dev/docs/images/workspace.png)

The Bit workspace has 3 parts:

- **workspace config** contains information about the Bit project configuration, such as the package manager for installing components, the default compilers and testers, and the components code location. 
The `package.json` file has a `bit` section with all the workspace configuration. Alternatively, a `bit.json` file at the project's root directory can store the information on a separate file. This configuration is editable by the user to fit the exact configuration of the project.  
- **components map** defines the files that comprise each component. The `.bitmap` file at the project's root stores this information. This file is created by Bit as a result of different actions of the user (e.g. adding new components). To retain information about the components map, the `.bitmap` file should be committed to the Version Control tool.  
- **collection**   the workspace's [collection](#collection) contains the content of components. By default, the components store is an extension to the git repository under `.git/bit` directory, but can be stored elsewhere, such as under a `.bit` folder.

## Bit Server

A user can set up a Bit server that holds remote collections. The remote collection shares components between multiple local workspaces.  Bit can be set up as a server for sharing components between local workspaces. A Bit server may host multiple collections, called **remote collections**.  
A remote collection is a **bare collection** that only stores the components information. Authoring and tracking components are not possible inside a bare collection.  

A project's workspace exports components to a remote collection hosted on a Bit server.  

There are no limitations on components exporting - a local workspace may import from and export to multiple collections stored on different servers.  

Managing remote collection as well as local workspaces is by using the [`bit-cli`](#bit-cli-bit-bin). Also, the server needs to have the bit-cli and npm configurations.

For hosting remote collections, you can use The [bit.dev cloud server](/docs/bit-dev) or setup own Bit Server](/docs/bit-server).

## Bit CLI (bit-bin)

Working with a bit workspace on local dev machine or setting up a bit server requires the bit-cli tool. bit-cli manages the components and collections and their content.  

The bit-cli tool is an [open-source tool](https://github.com/teambit/bit). The tool is installed both on a project's workspace and on a Bit server for managing remote collections. 

All components and collections management is done using the bit-cli tool, installed on a specific machine.  

The bit-cli configuration is  shared between all workspaces on a single machine. bit-cli configuration is accessible using the [`bit config`](apis/cli#config) command. The configuration file is created when running `bit login`, and is stored according to the OS.

### NPM Configuration

When using NPM or Yarn to install components, the tools should be capable of finding bit components.  

NPM and Yarn use the npm configuration ( the [`.npmrc` file](https://docs.npmjs.com/files/npmrc)).  

NPM configuration points to the bit registry for all installs that start with `@bit`. The bit registry itself is located in `https://node.bit.dev`.

When a user logs into Bit, the CLI updates the NPM configuration with the Bit registry information, including the user token. The user token ensures that the user can only access authorized collections.  
