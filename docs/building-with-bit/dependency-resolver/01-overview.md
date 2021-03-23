---
id: overview
title: Overview
---

import { Image } from '@site/src/components/image'

Managing the dependencies of every component in a Bit workspace can become quite a tedious task. To address that, a Bit workspace uses the `@teambit.dependencies/dependency-resolver` extension component.

The 'dependency-resolver' simplifies dependency management by providing the following features:

1. [Dependency resolution](/dependency-resolver/dependency-resolution):
   The Dependency Resolver generates the dependency graph for each component handled by the workspace.
   It does so by parsing out all `import` \ `require` statements in the component's files.
   It then determines if these dependencies are packages, components or internal implementation files.
   If they are external components or packages, it goes on to determine their version and dependency-type (`dependencies`, `devDependencies`, `peerDependencies`).

2. [Dependency policies](/dependency-resolver/dependency-policies):
   An API for the workspace configurations.
   This API allows us to determine which versions should be used for every dependency in the generated dependency graph.
   When used in combination with `@teambit.workspace/variant` it allows to define, in a cascading (CSS-like) way,
   different dependency policies for different sets of components, and even to add or remove dependencies, altogether.

3. [Dependency installation](/dependency-resolver/dependency-installation):
   The 'dependency-resolver' directs the [package manager](/packages/overview) to install the right packages at the right place in the workspace file structure.
   In addition to that, it provide a single `bit install` command to take care of installing all package dependencies and importing all component dependencies.

<Image src="/img/dependencies_graph.png" />
