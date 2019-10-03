---
id: concepts
title: Bit Concepts
---
## Components

Bit concepts revolve around components. Bit manages a full lifecycle of a component, from the definition of a component, supporting its lifecycle and its packaging and distribution.  

For each component, Bit manages source files, dependency graph, and build and test tools.  

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
