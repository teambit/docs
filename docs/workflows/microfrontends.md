---
id: microfrontends
title: Micro Frontends
---
![Micro frontends workflow](https://storage.googleapis.com/static.bit.dev/docs/images/workflow-microfrontends.svg)

This workflow is beneficial for teams that:  

- Deploy their applications as micro frontends
- Have dedicated teams for each micro frontend
- Are autonomous and have specialized business domain expertise 

## Challenges of Micro Frontends

Micro frontends architecture is defined as "An architectural style where independently deliverable frontend applications are composed into a greater whole."  
Employing a micro-frontends architecture let multiple teams decompose a large monolith frontend application into smaller and simpler units. The teams develop each application chunk independently and deploy them separately. Each team has a dedicated business knowledge.  
Deploying a complete micro-frontend for a piece of the application can be very useful, but the problem arises when the teams want to share smaller pieces of code.  
As an example, the user management team wants to share a user avatar showing some user information (such as if the user is online). Each team can use the avatar inside the different parts of their applications.  
One possible solution is to pack each of these components in a dedicated NPM package and publish it to a package registry. This option is useful for medium-sized components but can incur high costs for a large amount of smaller components.  

## Benefits

Micro front end business-oriented teams can use Bit to deploy components that are business-specific and encompass the dedicated business logic.

- Bit let teams hide the complexity of their business logic by only exposing APIs that are consumed by other teams
- Small components can still be exposed but without the overhead of the deployment process.  
All components are available for all teams. Explicit components' APIs retain separation between micro frontends.
- Separately packaging each component allows teams to consume only the functionality they need. Bit automates the packaging and versioning of each component to reduce the team's overhead.
- Versioning components allow teams to communicate the level of changes performed in the component using semver. Previous versions are available so that teams can upgrade at their own pace.
- Dedicated collections for each team let them control who can make changes to the components. 

## How does it work?

This process assumes that each micro-frontend team has their code repositories and a process, preferably automated, to deploy their micro-frontends.  

1. Each business team creates itself a collection of components. Only that team can publish components to the collection. 
1. Other micro frontend teams access the other teams' collections and consume components from them using npm or yarn.
1. Teams can link their code repositories to the specific collection in bit.dev, so they get an automated pull request each time a new version of the component is published. Alternatively, they can get a slack notification, so they are informed on the change, and update their micro frontend manually. Each team links their repository to all the collections from which they consume components.
1. Once a component was changed, the team that consumes it can publish a new version of their micro-frontend, putting the required changes in place, if needed.
