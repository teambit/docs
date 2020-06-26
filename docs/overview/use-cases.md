---
id: use-cases
title: Use Cases
---

## Bit for design systems

The recommended way is to keep your design system separate from your existing applications and use the components as dependencies of your projects. What this basically means, is that your system’s design tokens, helpers, interfaces and components live in the system project and are only imported into your existing applications.

The benefit of this is that all your applications will have one centralized source of truth which is easier to scale and maintain.

For example, you can browse Bit's [Base-UI design system](https://github.com/teambit/base-ui).

## Specialized component compositions

When there's already a design system in place that several teams and projects utilize, it's very efficient to share specialized component compositions as their own components. A team that uses set of components from the design system to build their own dedicated components can share it as another components, so other teams can use it.

The benefit is the increased level of code reuse, as now teams are able to share more complex components that are build using the design system.

For example, Bit's marketing team uses the Base-UI design system and build [Evangelist](https://github.com/teambit/evangelist), a set of components for marketing pages, resources and any other internal requirements.

## Bit for frontends

## Frontend application integrations

When a company to use multiple Git repositories, each containing a different application that caters for different business needs of customers' segments, usually there are many similarities in the implemented business logic. A company that manages this structure is able to share isolated piece of business logic as components, so other teams can use it.

The benefits of this is that teams can hide the complexity of their business logic by only exposing APIs that are consumed by other teams. This allows for a tighter integration between frontend teams as service-providers for each other, similar to how backend teams use microservices and APIs.

For example, the **User Management Team** wants to share a `userAvatar` component showing some information (such as if the user is online), so other teams can use the `userAvatar` inside the different parts of their applications. The **User Management Team** can compose a component in their **User Management App** (or CMS) that combines both the UI representation of an **Avatar** as well as the communication with the **User Service** to fetch relevant data.
