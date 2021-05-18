---
id: what-is-bit
title: What is Bit
---

Bit is a component-based approach to modern application development.

Bit makes the development and composition of modern applications from independent components repeatable and fun.

## Component Driven Development

Components enable composability by consolidated functionality. Distributed teams can build components and compose them in many apps, producing consistent user experiences, removing code duplications, and improving dev-velocity.

With Component Driven Development you can take the same composition approach of micro-services and micro-frontends for the system's runtime and move it to a code-architecture style with more granularity.  
Instead of building larger "pieces" (service, frontend), compose smaller, more reusable components. Think about **Components as Services** in the codebase and use them to compose more concrete functionality.

### Not Just User Interfaces

Component-driven development has done a lot to scale user interfaces. Frameworks like React, Vue, and Angular improved it by making our apps more modular.  
Bit takes the same approach and adds this functionality to anything you build. Any functionality can be consolidated to a component and reused in many apps by many teams.

### Build Time Tool

Bit is a build tool. There are no SDKs or runtime dependencies added to your code. Aside from not affecting your app's performance, this also means you can decide to opt-out of Bit without the cost of refactoring your code.

## Break Down the Monolith

Modern web development made components its first-class citizens. Still many projects are built in monoliths.  
Monolithic codebases can be cumbersome to maintain, especially with growing complexity and team size. Distributed teams collaborating on the same apps should happen in distributed codebases.

### Distribute Component Development

With Bit large modern web applications can be composed of different teams building components. Each team can autonomously develop, expose, and integrate components. All components can be easily integrated in build time as your app's building blocks.

## Extendability

Bit is focused on creating a simple and flexible developer experience.

With over 600 APIs every part of Bit - from dev environments to the UI - can be extended and customized to fit your best experience. And, any extension is a Bit component, so it can be easily integrated and reused in different projects and shared with more people.

## Advantages of Bit

### Development

Bit allows using any component as a building block for other components, apps, or services. This disconnects the development experience of components from the codebase structure, as any repository can use any component, regardless of its origin.

Untangling development from codebase structure and architecture allows us to have more modular codebase.

### Integration

Integration between components happens in build-time. This means each app controls the experiences they provide for consumers. Use this to ensure consistency across our deployments, as the team who own a product owns what gets built into it.

With Bit, you can decide when to adopt incoming changes for components and decide which component-updates to adopt.

### Deployment

Bit makes it easy to compose components to any number of apps. Bit is a 100% build-time tool and has no effect on the app/service runtime nor adds any runtime dependencies to your code. This allows to decide on deployment strategies on a per-app basis, and utilize runtime performance tools like code-splitting, etc.
