---
id: overview
title: Overview
---

Managing the dependencies of every component in a Bit workspace can become quite a tedious task. To address that, a Bit workspace uses the `@teambit.dependencies/dependency-resolver` extension component.

The 'dependency-resolver' simplifies dependency management by providing the following features:

1. [Dependency resolution](/docs/dependencies/dependency-resolution): A service that auto-generates the entire workspace dependency graph. This is done by parsing the `import` \ `require` statements in a component's files. The dependency-resolver uses each component's environment configurations to determine if a dependency is of type 'dependency', 'devDependency' or 'peerDependency'. For example, a module used by a `.spec.jsx` file of a component using the React environment will be determined as a `devDependency`.

2. [Dependency policies](/docs/dependencies/dependency-policies): An API for the workspace configurations. This API allows us to determine which versions should be used for every dependency in the generated dependency graph. When used in combination with `@teambit.workspace/variant` it allows us to define, in a CSS-like way, different dependency policies for different sets of components. In addition to that, this combination enables us to add new dependencies that were not already included in the auto-generated dependency graph.

3. [Dependency installation](/docs/dependencies/dependency-installation): The 'dependency-resolver' directs the [package manager](/docs/packages/overview) to install the right packages at the right place in the workspace file structure. That includes installing multiple versions of the same package when different groups of components are set to use different versions.

<img src="/img/dependencies_graph.png" width="80%" ></img>
