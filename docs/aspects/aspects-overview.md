---
id: aspects-overview
title: Aspects Overview
---

Aspects are the building blocks of Bit.

Bit is built with Bit, meaning each aspect of the end product is a component doing a task. these are both backend, middleware and frontend. examples for such tasks:

- generate component docs
- render a tree of all components in the workspace
- calculate dependency graph for component

each of the aforementioned tasks are implemented as individual components that together compose the different aspects of Bit. each aspect handles all cross-cutting concerns related to its business use-case. for example:

- Jest aspect - handles the integration of Bit for running tests with the Jest test runner, including jest-configs for running component tests and fetching results.
- MDX aspect - handles compilation of MDX to React components.
- Dependency resolver aspect - handles dependency policies and resolutions for components and installing dependencies via an integration with various package managers.
