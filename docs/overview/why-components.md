---
id: why-components
title: Why Components?
---

Components are the building blocks of modern web architectures. Encapsulated and reusable components with focused and well-defined APIs let developers build more robust software applications more quickly.

The major frontend frameworks - React, Vue, and Angular - all share the concept of using component-based architecture to compose state-of-the-art applications. Even browsers themselves are backing components as an inherent feature by supporting the Web Components standard.

Bit adds a semantic layer on top of repositories that maps files into components. This extra layer provides Bit with robust capabilities in making the component reusable across projects.

- new primitive of the web
- when you want to reuse a component you shouldn't create a dedicated project for it
- key part of all modern web frameworks
- components are not just for "design systems", they can be used to reuse functionality

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

use these features to:

### Scaling a repository

- faster command execution (only modified and affected code is rebuild)
- dependency graph and configuration management per components
- absolute imports

### Scaling your company

- code sharing
- enforce organization standards...
