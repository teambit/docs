---
id: advantages-of-bit
title: Advantages of Bit
---

# Development 🏗️

Bit Virtual Component Monorepo allows us to use any component as a building block for any other component, app or service. This disconnects our development experience from our Git repositories structure, as any repo can use component that was originated in any other repo.

Untangling development from codebase structure and architecture allows us to essentially build like Google, where all code written is available for reuse (assuming it's JavaScript based).

# Integration 🤝

Integration between components happens in build-time. This means each app controls the deployed experiences they provide for their consumers. We use this to ensure consistency across our deployments, as the team who own a product owns what gets built into it.

With Bit we decide when we want to adopt incoming changes for components and also be able to adopt some of the updates for some of the components.

# Deployment 🚢

Bit makes it easy to recombine our components into any number of services and deploy them to meet our performance needs. Bit is 100% build time tool and has no affect on the app/service runtime nor adds any runtime dependencies to your code. This allows us to decide how we deploy our apps and if we want to use any runtime performance tools like code-splitting, etc.

Bit also allows us to constantly change our deployment architecture when need arises, as deployment is handled per-component, and we can decide to compose different components and create new deployments in no-time.