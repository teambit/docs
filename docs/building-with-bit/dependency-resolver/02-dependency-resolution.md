---
id: dependency-resolution
title: Dependency Resolution
---

Dependency resolution is handled by the [Dependency Resolver extension](https://bit.dev/teambit/dependency-resolver/dependency-resolver).

Dependency Resolver parses out all `import` \ `require` statements in the component's files.
It then determines if these dependencies are packages, components (listed in the workspace `.bitmap` file) or internal implementation files.
The generated data is integrated with dependency policies that were set by various Bit extensions (mainly,
[Environment](/building-with-bit/environment/overview)) and by the manually configured policies set in the [workspace configuration file](/building-with-bit/workspace/configurations) (`workspace.jsonc`).

The result of that process determines the list of dependencies for each component, as well as their dependency-type (`dependencies`, `devDependencies` and `peerDependencies`) and version number.

## Workspace dependency graph

When all import statements in all components in the workspace have been parsed, Bit creates a complete dependency graph for the workspace.
This allows Bit to understand which component in the workspace is affected by a change made to another component and perform the needed actions to handle that (notify of a change in the Workspace UI, test and re-compile affected components, etc.).

## The dependency policies hierarchy

The Dependency Resolver integrates dependency policies from various sources to determine the component's final dependency graph.
Cases of conflicting policies are resolved according to a hierarchy of source types, where the one at the top overrides the rest.

The hierarchy in a descending order:

1. Policies set by Variants (@teambit/variants) and the component.json files of "ejected" components (these two sources are merged by Variants).
2. Policies set by various extensions/aspects (using registerDependencyPolicy)
3. Policies set by the environment (using getDependencies)
4. Bit’s automated dependency detections, and policies set by the Dependency Resolver at the workspace configuration root-level.

:::note
Learn more about how the Variants extension selects and merges policies that were set using it, [here](/building-with-bit/workspace/cascading-rules)
:::

:::info understanding the resolved dependencies for a component
Use the `bit dependencies <component-id>` command to understand the calculations and interactions that resolved in the generated dependency graph of a specific component.
:::
