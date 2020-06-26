---
id: scopes
title: Scopes
---

Scopes are where Bit manages components. You can set up any number of remote Scopes as servers to host remote components.

## Scopes and workspaces

You can export components from several workspaces to the same remote Scope. This means that is you have several projects that handle the same general business logic (or - scope) and you want them to share components to the same Scope, you can do just that.

### Default scope

When you plan to publish components you should have a `defaultScope` defined in the project's  `workspace.json` file. This way Bit will automatically set that Scope as the target for the `bit export` command for component-publishing. You can have several Scopes defined in a workspace and share components to different targets if required.  
Bit also give you the ability to publish components from several projects to the same Scope.

### Publishing process

When you export a component to a Scope Bit makes sure all it's component-dependencies are cached in the Scope as well, regardless if they are actually exported to a different Scope. This way Bit protects you from cases where a Scope your components depend on is not available.

## Component scoping strategies

There are several ways you can organize components in scopes.

### Business domains

A product, or a company product line, can be sliced to several domains. Each domain can define a rather large context and bundle inside of it several repositories implementing multiple frontends. A Scope can encapsulate a business domain.
This way we have several applications that are linked together to the same subdomain, as compose a larger business responsibility. This way when a developer needs to integrate a feature related to any of the company's domains, they can quickly find the required component.

For example a company that deals with video streaming might have sort components in these Scopes:

- Design system
- Landing pages
- Authentication
- Catalogue
- Streaming
- User accounts
- Chat

### Teams

You might choose to assign each team with its own Scope. This way a team has a specific remote location they can share all the components from the projects they are working on. So when another team in the company require to integrate with another, they can simply browse each other's Scope and use their components.

## Collections in bit.dev

Bit.dev manages Scopes in the cloud. It adds additional features on top of them, for example:

- Permission management.
- CI for exported components.
- Search and indexing.
