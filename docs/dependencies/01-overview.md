---
id: overview
title: Overview
---

Dependency management for components in a workspace is managed for each component individually using the `@teambit.bit/dependency-resolver` aspect. It handles the component dependency graph, which in turn is split into three main areas:

- Dependency resolution.
- Dependency policies.
- Installation of dependencies in a workspace.

In a Bit workspace you may have tens or even hundreds of components. Manually handling each dependency graph (`package.json`) is a very tedious and time-consuming task. `dependency-resolver` allows a more automated way of doing so by grabbing the dependencies directly from the code, and the configuration you supply to dependency-resolver in workspace.json provides you fine control over how it does this.

