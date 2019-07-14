---
id: concepts
title: Bit Concepts
sidebar_label: Bit Concepts
---

## Overview

### Distributed Code Management
In the last decade, the concept of code sharing over distributed systems has become popular when distributed version control systems (DVCS) replaced the older generation of centralized systems. 
In a centralized system, a central repository exists that aggregate all changes made by all developers into a single "central" repository that serves as the single source of truth. 
In a distributed system, each developer has a copy of the code with full history and changes. Code modifications (known as changesets) are being pushed and pulled between repositories. It is common, though not necessary, to define a specific copy, usually residing on a server, as the "authority" copy. 

The most commonly known distributed code management system is Git, where a copy that resides on a server such as Github or Gitlab is considered as the master copy. 

![Distributed version control system](assets/version-control-systems.png)

### Bit Store
Bit is employing a similar concept of distributed code management when components code can be moved around repositories without specifying the main repository. 
Bit components are managed in a Bit Store. The Bit store, unlike a Git repository, contains information at a more granular level that is the component. For each component, Bit keeps information about its source code, versions,  dependencies and the tools used for building and testing the component. 
This level of granularity enables developers to collaborate on specific components and not only on source code files. 

### Bit CLI Tool
Bit CLI is an [open-source tool](https://github.com/teambit/bit) for managing components inside a workspace and between remote collections. All communications between bit stores is done using bit commands. 
Bit cli is installed per machine and is storing its configuration in a bit configuration file. Bit cli is also using configurations stored in the git and npm configurations defined on the local machine. 


![Bit Concepts](assets/concepts.png) 


## Bit Workspace
Each developer that uses Bit is initializing a Bit workspace in their working project.  The Bit Workspace contains local components storage as well as information about the user and the components that are shared from this workspace. 
The Bit workspace has 3 parts: 
Workspace configuration contains information about the project that contains the Bit components such as the package managed used for installing it, the compilers and testers that are used in the project and the components code location. The workspace configuration is stored under the bit section in the `package.json` or as a separate `bit.json` file at the workspace root.
Components map contains the mapping between locally exported components and the files that comprise them. This is stored in the `.bitmap` file at the workspace root.
Component Store with all the content of the shared components. By default, the components store will be an extension to the git repository under `.git/bit` directory, but can be stored elsewhere, such as under a .bit folder. 

## Remote Collection

A Remote Collection is a curated list of shared components on a remote server. The remote collection is used for collaborating on components between bit workspaces. 

Typically, a remote collection will reside on a server that is accessible to all developers that would like to share components thru it. It is possible, however, to set the remote collection locally on a machine. 
Any bit workspace can work against multiple remote collection and export and import components from any of them. 

## Bit.dev Server
Bit.dev server is a cloud service provided by Bit. Accessing Bit dev server requires registering a user account on the bit.dev server. To export and import components from a local workspace to the account, a login is required from the local workspace. 
Unlike bit cli tool that is open-sourced, bit server is proprietary and owned by bit. 

Bit.dev server main functionality:

### Remote Collections Hosting
Bit.dev is the bit cloud service  that provides remote collections for all registered users. A remote collection on bit.dev contains a Bit Store as well as information abou the remote collection itself:  
Collection name - the name by which the collection is accessible to its users. 
Visibility - Determines who can view the Collection: A public collection is a free collection that is visible for all registered users. A private collection is limited to the origanizations registered users. 
License - The code license that is applicable for all the components shared in the collection (such as MIT, GPL or other licenses) 
Users  - the users that have access to the collection and their roles on the collection (admin, developer or viewer).

### Components CI
bit.dev runs all build/test tasks for all components it hosts in their own isolated container. When  using Bit to export a component to a remote Collection hosted in bit.dev, a container running Bit will import the new component, set up an isolated runtime environment for it, containins all of its dependencies. The output of it will be then populate the component page.
The components CI is sued for developers to get immediate feedback on their components and verify that it can be actually consumed outside of their project. 

### Component Playground
On bit.dev server, each component in a remote collection has a component page with a dedicated playground. The playground provides an isolated visual container where the components can be interacted with. 
Each component may have multiple examples which are application wrappers for the component, showing variant usages of it. 

![Component Playground Example](assets/component-playground.png)

### Components Explorer
Bit.dev components explorer allow searching across all the public remote collections and locating components that can fit into the project. Advanced searching that are visible and display the results of the components. Search is not only In addition to the remote collections, the bit.dev server provides a components explorer for easy searching the public collections. 

