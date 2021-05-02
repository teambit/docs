---
id: bit-dev
title: bit.dev Functionality
---

Bit.dev server is a cloud service provided by Bit. Accessing bit.dev server requires registering a user account on the bit.dev server. To export and import components from a local workspace to the account, the developer must login from the local workspace.  

> Unlike the bit-cli tool which is open-source, the bit.dev server and its cloud features are proprietary and owned by Bit.

Bit.dev server provides these functions:  


<div style={{margin: 'auto', width: "90%", padding: 30}}>
    <a href="#remote-collections-hosting">
        <img src="https://storage.googleapis.com/static.bit.dev/docs/bit-dev/remote-collections.svg" alt="remote hosting" width="250" height="200" />
    </a>
    <a href="#package-registry">
        <img src="https://storage.googleapis.com/static.bit.dev/docs/bit-dev/pacakges-registry.svg" alt="Packages registry" width="250" height="200" />
    </a>
    <a href="#component-explorer">
        <img src="https://storage.googleapis.com/static.bit.dev/docs/bit-dev/component-explorer.svg" alt="Component Explorer" width="250" height="200" />
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

## Component Explorer

![component explorer](https://storage.googleapis.com/bit-docs/component-discovery-bit-react-gif.gif)

Bit.dev's component explorer allows searching across all the remote collections that the user has access to, such as the public collections and the user/organization's own components.  
The component explorer uses metadata of the component - tags, language, framework, and size - for advanced searching capabilities.  
