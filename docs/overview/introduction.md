---
id: introduction
title: Introduction
---

Bit makes life easier for JavaScript developers who build their applications with components. If you’re looking to publish individual components from a repository to curated collections, you came to the right place! Bit is a tools to help you distribute and maintain your design system components, helpers, pages and features. It gives you:

## Workspace UI

All your components managed in a single place. See test results, rendered stories, dependency graph insights and documentation in the a dedicated development environment, for each component.

## Component isolation

Bit helps you keep your components isolated from each other. Less spaghetti code and relative requires. Bit creates a module from each component with its own absolute name, dependency graph and configuration. Isolated components are easier to reuse by other developers, projects and components.

## Connected components workspace

Inside a Bit workspace, all your components are automatically linked to each other. When you make a change, you can see the downstream effects right in your development environment.

## Automated documentation

## Fast incremental builds

## Bulk publishing

When it's time to do a release, Bit detects which components have changed and their dependents, bumps their appropriate version numbers, and publishes each components as an individual module.

## Changelog tracking

Whenever a PR is created, you can require developers to provide a major/minor/patch log entry for the affected components. During publishing, these changes will be automatically aggregated into a nicely formatted changelog.

### benefits of bit in a repo

- turn any workspace to a monorepo of components
- atomic changes
- component-first workflow
- consistent way of building and testing
- can still have keep your app(s)

### Why not per-component-project

- drawbacks of current monorepo tools
- ...

## Bit can help

Bit provides tools to give you the benefits of a monorepo without the drawbacks of sub-projects.

- Workspace designed around managing of inner-connected components.
- Get an automated overview of how your components progresses over time.
- Pre-configured build, test and lint setups for React, Angular, Stencil, Vue and utility functions.
- Local development server with live-rendering for components.
- Individual component versioning and publishing.
- Component example management and Storybook integration.
- Browsing component's dependency graph.
- Building and testing dependent components when a dependency is modified.
- Separate utility and styles from component implementation.
