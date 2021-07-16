---
id: advantages-of-bit
title: Advantages of Bit
---

## Development

Use any component as a building block for any other component, app, or service. This disconnects development experience from your application's code structure, as any repo can use a component that was originated in any other repo.

## Component Teamwork

_Share components between different projects._

A team can work together on a component’s shared code even when projects are located in separate repositories. When a component is updated, or any of its dependencies, a new version is created only for the impacted components.

Bit manages each component separately. The component's consumer receives only the changes that are relevant to their projects.

Bit components sharing accelerate teams' work to build applications with hundreds and thousands of components.

## Isolated Component Environment

_Detach the component from the rest of the project._

In Bit, each component is created by analyzing all the files and dependencies that build it. Each component becomes a stand-alone entity that can be shared and used across multiple projects.

Bit provides tools for **building**, **testing**, and **rendering** each component in its own canned environment, so it is clear what the component is built upon.

Bit verifies that components are loosely coupled from the rest of the project and helps teams to write better code.

## Component Discovery

_Find the right components for the project._

Generic search tools can help in locating components only to a certain level. Finding the right component for the project usually requires drilling into the components behind what a search engine can provide.

Bit provides a Components Hub with dedicated searching and filtering capabilities that can narrow the components search to list only the components that are adequate to your project, by **language**, **framework**, **dependencies**, and **size**.

Inside the Components Hub, you can see a live version of the component, play with it and create multiple variants of its usage.

With Bit, components selection is faster.

## Integration

Integration between components happens in build-time. This means each app controls the deployed experiences they provide for their consumers. We use this to ensure consistency across our deployments, as the team who own a product owns what gets built into it.

With Bit, we decide when we want to adopt incoming changes for components and also be able to adopt some of the updates for some of the components.

## Deployment

Bit makes it easy to recombine our components into any number of services and deploy them to meet our performance needs. Bit is a 100% build-time tool and has no effect on the app/service runtime nor adds any runtime dependencies to your code. This allows us to decide how we deploy our apps and if we want to use any runtime performance tools like code-splitting, etc.

Bit also allows us to constantly change our deployment architecture when the need arises, as deployment is handled per-component. We can decide to compose different components and create new deployments in no-time.
