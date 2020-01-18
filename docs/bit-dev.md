---
id: bit-dev
title: bit.dev Functionality
sidebar_label: Functionality
---

Bit.dev server is a cloud service provided by Bit. Accessing bit.dev server requires registering a user account on the bit.dev server. To export and import components from a local workspace to the account, the developer must login from the local workspace.  

> Unlike bit-cli tool that is open-sourced, bit.dev server is proprietary and owned by Bit.

Bit.dev server provides these functions:  

<div style="margin: auto; width: 90%; padding: 30px;">
<a href="#remote-scopes-hosting">
    <img src="https://storage.googleapis.com/static.bit.dev/docs/bit-dev/remote-collections.svg" alt="remote hosting" width="250" height="200">
</a>
<a href="##package-registry">
    <img src="https://storage.googleapis.com/static.bit.dev/docs/bit-dev/pacakges-registry.svg" alt="Packages registry" width="250" height="200">
</a>
<a href="#component-playground">
    <img src="https://storage.googleapis.com/static.bit.dev/docs/bit-dev/component-playground.svg" alt="Component playground" width="250" height="200">
</a>
<a href="#component-ci">
    <img src="https://storage.googleapis.com/static.bit.dev/docs/bit-dev/component-ci.svg" alt="Component CI" width="250" height="200">
</a>
<a href="#component-explorer">
    <img src="https://storage.googleapis.com/static.bit.dev/docs/bit-dev/component-explorer.svg" alt="Component Explorer" width="250" height="200">
</a>
<a href="#component-changes-prs">
    <img src="https://storage.googleapis.com/static.bit.dev/docs/bit-dev/component-PRs.svg" alt="component changes PRs" width="250" height="200">
</a>
</div>

## Remote collections hosting

The primary goal of bit.dev is to be a SaaS service for hosting remote scopes.  
Bit.dev is managing scopes in **collections** and determines the permissions users have for these collections:  

- A **public** collection is is visible for all users.  
- A **private** collection is limited to the privileged users in the organization that owns the collection.

Bit also ensures that code in private collections is not exposed via public collections and places the following restrictions on using components across collections:  

- Components in public collections cannot depend on private components: A public component is available for the entire Bit community. Therefore, it may not depend on components that reside in public collections.  
- Components in private collections cannot depend on components of different owners (users or organizations). Components in private collections may depend on public or private collections that belong to the same owner.  

In addition, for each collection Bit maintains licensing information for the components (such as MIT or GPL).  

Learn more about [users and collections management](/docs/my-account).

## Package Registry

Bit.dev also manages a package registry for all components that are exported to bit.dev collections. Any component exported to bit.dev can be [installed](/docs/installing-components) using package managers (NPM or Yarn).  
All components in the Bit.dev registry are available with the `@bit` prefix. The full name of the component is in the format of `npm i @bit/<owner>.<collection-name>.<component-name>`.  

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

## Component Explorer

![component explorer](https://storage.googleapis.com/bit-docs/component-discovery-bit-react-gif.gif)

Bit.dev components explorer allows searching across all the remote collections that the user has access to,  such as the public collections and the user’s or organization's components.  
The component explorer is using metadata on the component:  tags, language, framework, and size for advanced searching capabilities.  

## Component Changes PRs

Bit.dev provides organizations the ability to integrate with Github for bumping versions of components in consuming projects, helping project developers keep their repositories up-to-date, and help maintainers of shared libraries track the adoption of components.  
BitdevBot is a Github bot ensuring projects contain the latest versions of the components. The BitdevBot tracks collections of components and a set of Github repositories. When a component maintainer exports a new version of a component, the Bot creates PRs for upgrading the components in all connected repositories to their latest exported version.  

![Github Integration](https://storage.googleapis.com/static.bit.dev/docs/images/github-integration.png)

The automated dependency management let component consumers get a simplified process in their projects. Instead of checking for updates and creating PRs for the components, they get a ready-made PR with all their updates. The PRs are acting as push notifications when changes occur. If the repository is associated with a CI / CD process, the PR triggers a CI process, so the user can know upfront if the update causes an app break.  
Library maintainers can track the adoption of new components and their updates and communicate with the project owners if they did not apply the changes in their projects.  

> Version bumping pull requests are only available for bit.dev organizations
