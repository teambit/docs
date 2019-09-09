---
id: bit-dev
title: bit.dev Overview
---

Bit.dev server is a cloud service provided by Bit. Accessing bit.dev server requires registering a user account on the bit.dev server. To export and import components from a local workspace to the account, the developer must login from the local workspace.  

![Bit.dev](https://storage.googleapis.com/static.bit.dev/docs/images/bit.dev.png)

> Unlike bit-cli tool that is open-sourced, bit.dev server is proprietary and owned by Bit.

Bit.dev server provides these functions:  

## Remote Collections Hosting

A Remote Collection is a curated list of shared components on a remote server. The remote collection is used for collaborating on components between bit workspaces. Bit.dev provides hosting for remote collections for all the users.
Each remote collection contains the bit scope of its components as well as additional information on the collection:  

- Collection name - The name by which the bit scope in the collection is available to developers for sharing or consuming components. 
- Visibility - Determines who can view the Collection: A public collection is a free collection that is visible for all registered users. A private collection is limited to the organizations registered users.  
- License - The default code license that is applicable for all the components shared in the collection (such as MIT, GPL or other licenses) 
- Users & Roles - the users that have access to the collection and their roles on the collection (admin, developer, or viewer).

## Component Playground

![Component Playground](https://storage.googleapis.com/static.bit.dev/docs/images/playground.png)
The component playground is a web-based editor and a rendering environment for each component hosted on Bit.dev server.  
The component playground enables developing example wrappers for the component to show its usage.

## Component CI

When a component is exported to bit.dev, the components CI (Continuous Integration) runs a container for building and testing the component. The container uses the compiler and tester defined for the component in the original project.  

The component is built in an isolated environment. The isolated environment contains the packages and dependencies defined for the component but does not have all the remaining project definitions. This isolation makes sure the component is truly stand-alone and is consumable by other projects.  

The Component's CI displays the results for the component build and test run on the component page on [bit.dev](https://bit.dev). When finishing the build and test tasks, the remote container is purged.  
The component is then available in the component playground.

Each container on the bit.dev CI runs:  

- Ubuntu jessie
- headless chrome driver
- latest version of Bit
- node 8

Each container is limited to: 

- 10 minutes run time
- 2GB RAM
- 0.5 CPU core

## Components Explorer

Bit.dev components explorer allows searching across all the remote collections that the user has access to,  such as the public collections and the user’s or organization's components. 
The component explorer is using metadata on the component:  tags, language, framework, and size for advanced searching capabilities. 
