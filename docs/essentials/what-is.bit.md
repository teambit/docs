---
id: what-is-bit
title: What is Bit
---

Bit is platform for building with components and use them to compose apps and systems. Building with Bit gives a host of benefits for the modularity, composability, testability, and scalability of the organization's codebase.

One of the key benefits is how bit isolates components, giving us the freedom to build and work with each component as an isolated module, and compose it to more concrete components, deploy as an app or a service, and collaborate with different product teams.

# In a nutshell 🥜

Bit allows us to compose apps and codebases from components. With this approach we can implement components as services, thus replacing the "layering" approach for code architecture with service oriented one.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a547b593-12ec-418a-b090-a900fd5e8913/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a547b593-12ec-418a-b090-a900fd5e8913/Untitled.png)

Teams sort components in **Scopes**, where each Scope "implements" a cross cutting concern of different business aspects of the end product(s). Each component in a Scope is essentially a service for other developers to use when they compose their app.

Scopes allows us to achieve feature ownership as components in each Scope can implement different tools, libraries, SDKs and UI components relevant for that specific business concern/feature.

# Why Bit? 🤔

Building software that scales is hard and gets harder for larger system where the ability to collaborate and sync between many distributed teams on the same end-product(s) is absolutely crucial.
What we need is a new way of working with software that focuses on simplicity, productivity and composability.

Solutions like monorepos can be a solution for a single codebase; we need a way to scale this architecture for the entire organization; which has many product teams, each with their own codebase. We need a first-class development experience for discovering, navigating and refactoring organization's codebase while ensuring different product teams remain independent while depending on other team's code.

We want to compose apps and services from components from ready made components and share components as services for other teams to compose with. We want to build scaleable products and improve collaboration between different teams in a consistent, repeatable and non-intrusive manner.
We don't want code duplications and build systems in any size.

**We want to develop in harmony.**

# Virtual Component Monorepo 🌌

Bit unlocks a unique software architecture that simplifies our frontend apps, backend services and tools by enabling us to construct them as "modular codebases" using composable components.

In Bit we implement all our code in components; sort them into different scopes and use them to create different workspaces for features and bug fixes. By composing with components we create dependency relationships across teams, so when we build new capabilities we have full access to all available components, just like in a monorepo; but we still use smaller repos to collaborate on code changes.

## Component 🧩

Component is the basic building block in Bit. A component can represent a UI primitive (button, text area), a middleware (authentication, log), SDK for a service, themes/styles...

Implement components as services to remove the need for layers (horizontal, vertical slice, or onion) in your architecture. This ensures all building of more concrete components is done by composing small and simple ones.

Highly concrete and specialized components can be apps, backend services, micro-frontends, serverless functions, etc.

## Scope 🔭

A Scope is a product feature in the organization's "virtual" codebase. Scope hosts closely related and cross-dependent components that implements all cross-cutting concerns of a product aspect. For example, a **User** scope can have a `login-form` frontend component, `authentication`middleware, `user-settings` micro-frontend, and a `user-service` microservice.

All components of a scope are available as services for other teams, apps and components. Each scope is owned by a different product team, responsible on that functionality.

Scopes allows for optimal reuse of components across multiple teams.

## Component Marketplace 🛍️

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/10864a3d-4e8e-45fc-9e2d-4c2e4e068836/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/10864a3d-4e8e-45fc-9e2d-4c2e4e068836/Untitled.png)

A component marketplace happens naturally when we grow the amount of scopes and create dependency relationships between components hosts on different scopes. Each scope contains all its dependencies cached to improve performance and reliability of a feature, making the process of depending on others code more stable.

Single component marketplace helps with discoverability of components, as all developers know where they can find components, and where they can decide to create new scopes to publish new components.

A growing component marketplace reduce the amount of work on each new feature.

## Workspace 🛠️

A workspace is a place where we use to work with all our components. It gives us a “monolithic development experience” with full code navigation, debugging, and refactoring across components. It is a place where we can work on all our components as building blocks, create new ones, manage configurations and collaborate on components.

Workspaces are flexible and used to maintain components from many scopes.

We use Git repositories to collaborate in workspaces.

## Lane (coming soon) 🌊

A lane facilitate an overarching change across multiple components. Lane mirrors a software development swim lane where a change needs to happen for several components at once. Think about the capability of tying together Pull Requests from multiple Git repositories to a single "virtual" PR.

We use Lanes to manage cross-team changes and communicate over API changes for components.

# Benefits of Using Bit 🎁

- Components simplify the design of our tools and services by giving us building blocks at the required level of abstraction.
- Components maximise code reuse to the point of having zero code duplication across our entire codebase.
- Composing apps and services with components removes the need for architecture layers in our codebase and allows for much smoother dev-experience of working in a service oriented codebase where each component is a service that can be composed with other components to solve concrete problems.
- Bit's scopes implements feature ownership across the organization and by hosting cross-cutting concern components that facilitate services.
- Workspaces are flexible and can be used to maintain components from many scopes, making it easier to reuse and collaborate on available components.
- Lanes help distributed teams to communicate and collaborate on API changes by understanding the underline dependency graph of components, and "bundling" together changes that affect many teams and should be synced.