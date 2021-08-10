---
id: microfrontends
title: Micro Frontends
---

![Micro frontends workflow](https://storage.googleapis.com/static.bit.dev/docs/images/workflow-microfrontends.svg)

This workflow is beneficial for teams that:

- Deploy their applications as micro-frontends.
- Have dedicated teams for each micro-frontend.
- Are autonomous and have specialized business domain expertise.

## Challenges of Micro Frontends

Micro-frontends architecture is defined as "An architectural style where independently deliverable frontend applications are composed into a greater whole."
Employing a micro-frontends architecture lets multiple teams decompose a large monolithic frontend application into smaller and simpler units. The teams develop each application independently and deploy them separately. Each team is focused on a specific business concern.
Deploying a complete micro-frontend for a piece of the application can be very useful. Still, the problem arises when the teams want to share smaller pieces of code between said applications.
As an example, the _User Management Team_ wants to share a `userAvatar` component showing some information (such as if the user is online), so other teams can use the `userAvatar` inside the different parts of their applications.  
One possible solution is to implement `userAvatar` as a separate project and package it as a dedicated NPM package published to a registry. This option is useful for a small number of medium-sized components but can incur high costs for a large amount of smaller components shared by each team.

## Benefits

Micro-frontend business-oriented teams can use Bit to deploy components that are business-specific and encompass the dedicated business logic.

- Bit let teams hide the complexity of their business logic by only exposing APIs that are consumed by other teams.
- Small components can still be exposed but without the overhead of the deployment process.
- Components are available for all teams to consume.
- Explicit components' APIs retain separation between micro-frontends.
- Separately packaging small components allows consumers to integrate only the functionality they need.
- Bit automates the packaging and versioning of each component to reduce the shared component's maintenance overhead.
- Versioning components allow teams to communicate the level of changes performed in the component using semver.
- Previous versions are available so that teams can upgrade at their own pace.
- Dedicated scopes for each team let them control who can make changes to the components.
- The shared component's code stays in the team's repository making it easier to keep their functionality up to date.

## How does it work?

This process assumes each micro-frontend team already has their code repository and deployment processes to manage their micro-frontend.

1. The team creates a scope of components for publishing their components.
1. Micro-frontends teams can use components from other teams' scopes and embed them into their frontend applciation.
1. Teams can link their code repositories to the specific scope in bit.dev, so they are aware of new versions of the components used in the applications.
1. Once a component was changed, consumers can build and deploy a new version for their micro-frontend, as needed.

Bit.dev offers three methods for getting notification on updated components:

- Link the GitHub repository that consumes the components. With each new vesion, Bit.dev creates a PR for updating the component version.
- Receive a notification on a slack channel, and perform the update manually
- Bit.dev triggers a webhook with the information on the modified component. Use the webhook to create an automation for updating the repository.
