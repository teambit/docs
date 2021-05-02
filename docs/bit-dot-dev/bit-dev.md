---
id: bit-dev
title: bit.dev Functionality
---

Bit.dev is a cloud service provided by Bit. Accessing bit.dev server requires registering a user account on the bit.dev server. To export and import components from a local workspace to the account, the developer must login from the local workspace.  

## Remote Scope Hosting

The primary goal of bit.dev is to be a SaaS service for hosting remote scopes.  
Bit.dev can provision scopes on demand. Scope can be:  

- A **public** scope containing OSS components, visible to all users.  
- A **private** scope, visible only to the members of the organization which owns the scope.

Bit also enforce the following restrictions on component-dependencies:  

- Components in public scopes cannot depend on private components.
- Components in private scopes cannot depend on components in private collections owned by another Bit account (user or organization).

## Organization and Permission Management

Bit.dev centralize the management of your team’s scopes and control permissions for members of your organization.  
Organization members can create Scopes within the organization and be invited to collaborate on Scopes created by others in the organization.
Organization admins can manage permissions for members and curate the organization’s dashboard. The admins have owner permissions to manage (create, update or remove) all Scopes created within the organization.

Centralizing the management of your organization’s Scopes and permissions while enabling teams within the organization to work independently enables you to keep control without slowing down your development using Bit.

## SSO SMAL



## Package Registry

All components that are exported to bit.dev are stored in the Bit package registry. The components are available as npm packages that can be [installed](/getting-started/installing-components) using standard package managers (NPM or Yarn).  
The components in the Bit.dev registry are available with the `@<owner>` prefix, where `owner` is the name of the user or organisation which owns the scope you are exporting to. The full name of the component is in the format of `npm i @<owner>/<scope-name>.<component-name>`.

## Component Explorer

![component explorer](https://storage.googleapis.com/bit-docs/component-discovery-bit-react-gif.gif)

Bit.dev's component explorer allows searching across all the remote collections that the user has access to, such as the public collections and the user/organization's own components.  
The component explorer uses metadata of the component - tags, language, framework, and size - for advanced searching capabilities.

## Artifactory and Nexus Integrations

Teams already utilizing private registries can have their components available for installing from the same centralized location, allowing for a simple and unintrusive workflow.

## Ripple CI (TBD)


