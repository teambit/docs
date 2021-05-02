---
id: bit-dev
title: bit.dev Functionality
sidebar_label: Functionality
---

Bit.dev server is a cloud service provided by Bit. Accessing bit.dev server requires registering a user account on the bit.dev server. To export and import components from a local workspace to the account, the developer must login from the local workspace.  

> Unlike bit-cli tool which is open-source, the bit.dev server and its cloud features are proprietary and owned by Bit.

Bit.dev server provides these functions:  

<div style="margin: auto; width: 90%; padding: 30px;">
<a href="#remote-collections-hosting">
    <img src="https://storage.googleapis.com/static.bit.dev/docs/bit-dev/remote-collections.svg" alt="remote hosting" width="250" height="200" />
</a>
<a href="#package-registry">
    <img src="https://storage.googleapis.com/static.bit.dev/docs/bit-dev/pacakges-registry.svg" alt="Packages registry" width="250" height="200" />
</a>
<a href="#component-ci">
    <img src="https://storage.googleapis.com/static.bit.dev/docs/bit-dev/component-ci.svg" alt="Component CI" width="250" height="200" />
</a>
<a href="#component-explorer">
    <img src="https://storage.googleapis.com/static.bit.dev/docs/bit-dev/component-explorer.svg" alt="Component Explorer" width="250" height="200" />
</a>
<a href="#component-changes-prs">
    <img src="https://storage.googleapis.com/static.bit.dev/docs/bit-dev/component-PRs.svg" alt="component changes PRs" width="250" height="200" />
</a>
<a href="#integrations-and-notifications">
    <img src="https://storage.googleapis.com/static.bit.dev/docs/bit-dev/integrations.svg" alt="Integrations and notifications" width="250" height="200" />
</a>
</div>

## Remote collections hosting

The primary goal of bit.dev is to be a SaaS service for hosting remote scopes.  
Bit.dev manages scopes in **collections** and determines the permissions users have for these collections:  

- A **public** collection is is visible to all users.  
- A **private** collection is visible only to the members of the organization which owns the collection.

Bit also ensures that code in private collections is not exposed via public collections and places the following restrictions on using components across collections:  

- Components in public collections cannot depend on private components: A public component is available for the entire Bit community. Therefore, it may not depend on components that reside in private collections.  
- Components in private collections cannot depend on components in private collections owned by another Bit entity (user or organization). Components in private collections may depend on public collections, or private collections that belong to the same owner.  

In addition, Bit maintains licensing information for the components (such as MIT or GPL), on a per collection basis.  

Learn more about [users and collections management](/bit-dot-dev/my-account).

## Package Registry

All components that are exported to bit.dev are stored in the Bit package registry. The components are available as npm packages that can be [installed](/getting-started/installing-components) using standard package managers (NPM or Yarn).  
The bit.dev package registry is secured according to the collections' permissions settings, so the only way to publish components to the registry is by using the bit export command.  
The components in the Bit.dev registry are available with the `@<owner>` prefix, where `owner` is the name of the user or organisation which owns the scope you are exporting to. The full name of the component is in the format of `npm i @<owner>/<scope-name>.<component-name>`.  

## Component CI

When a component is exported to bit.dev, the components CI (Continuous Integration) runs a container for building and testing the component. The container uses the [environment](/building-with-bit/environments) defined for the component in the original project.  

Each component is built in an isolated environment. The isolated environment contains the packages and dependencies defined for the component itself, without all the remaining project definitions. This isolation makes sure the component is truly stand-alone and therefore consumable by other projects without local side-effects.  

The Component's CI displays the results for the component build and test run on the component page on [bit.dev](https://bit.dev). When build and test tasks complete the remote container is purged.  
The component is then available in the remote scope.

Each container on the bit.dev CI runs:  

- Ubuntu jessie
- headless chrome driver
- latest version of Bit
- node 8

Each container is limited to:  

- 10 minutes run time
- 2GB RAM
- 0.5 CPU core

> Note, for paid plans Business and above the container specifications are higher than above

## Component Explorer

![component explorer](https://storage.googleapis.com/bit-docs/component-discovery-bit-react-gif.gif)

Bit.dev's component explorer allows searching across all the remote collections that the user has access to, such as the public collections and the user/organization's own components.  
The component explorer uses metadata of the component - tags, language, framework, and size - for advanced searching capabilities.  

## Component Change PRs

Bit.dev provides organizations with the ability to integrate with Github for bumping versions of components in consuming projects, helping both project developers keep their repositories up-to-date, and maintainers of shared libraries track the adoption of components.  
BitdevBot is a Github bot ensuring projects contain the latest versions of Bit components. The BitdevBot tracks collections of components and a set of Github repositories. When a component maintainer exports a new version of a component, the Bot creates PRs for upgrading these updated components in all connected repositories to their latest exported version.  

![Github Integration](https://storage.googleapis.com/static.bit.dev/docs/images/github-integration.png)

The automated dependency management gives consumers a simplified process for updating their projects. Instead of checking for updates and having to create PRs for their components which have been updated (due to updates in their child component), they get a ready-made PR with all their updates. The PRs act as push notifications when changes occur. If the repository is associated with a CI / CD process, the PR triggers a CI process, so that the consumer can know up-front if the update causes their own app to break. 
Library maintainers can track the adoption of new components and their updates and communicate with the project owners if they did not apply the changes in their projects.  

> Components PRs are available for bit.dev organization accounts only.

Read more about the [PRs integration](https://blog.bitsrc.io/announcing-auto-github-prs-for-component-version-bumping-74e7768bcd8a)

## Integrations and notifications

Bit.dev lets you get notified and trigger additional activities when changes are made in component collections. Bit.dev integrations are triggered when components are:  

- Exported to the collection (`bit export <collection name>`)
- Imported from the collection (`bit import <collection name>`)
- Removed from the collection (`bit remove --remote <component full id>`)

On each of this actions, a **Slack** message can be sent to a designated channel, or a **Webhook** can be triggered to a specific URL. Webhooks can include a token in their header.  

> Integrations and notifications are available for Bit.dev organization accounts only.

Read more about the [Slack integration](https://blog.bitsrc.io/optimizing-collaboration-between-distributed-front-end-teams-82ba14ce21f9).
