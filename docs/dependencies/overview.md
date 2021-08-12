---
id: overview
title: Overview
---

## Dependency Automation

Bit greatly simplifies component dependency management by automating most of it. It auto-generates the dependency graph for each component and for the entire workspace.
This process starts by statically analyzing the component's files and parsing out all `import` \ `require` statements.
Bit then determines, for each dependency, whether it is a package, an independent component or internal implementation file.
If is is an [external] independent components or package, it goes on to determine its version and dependency-type (`dependencies`, `devDependencies`, `peerDependencies`).

## Immutable Dependencies

One of the design goals of Bit was to make consumption of dependencies predictable and consistent. That means that for every time you install a dependency, you will get the exact same code.

Traditionally, resolution of dependencies is done on installation time and cached via Lock file (e.g. yarn.lock, package-lock.json) by package managers.
Bit's default, and best practice, is to compute and set dependencies for each version upon [tag](/) (e.g. instead of setting left-pad@~1.0.0, Bit will set left-pad@1.0.1) to make sure a component uses the exact version it needs.

## Dependency Safety

Using dependencies might couple to

## Dependency Policies

The dependency policies for components in a workspace can all be configured in a single place, the workspace configuration file. These policies augment and modify the components' auto-generated dependency graphs.

For example, a policy can configure all components that have 'lodash' as a dependency (in their auto-generated dependency graph), to use version 4.0.0.

Dependency policies can also be configured on specific groups of components. This is done by first selecting a group of components and then configuring it to use a specific set of dependencies.
These sort of selections behave much like CSS selections, where the most specific selector overrides the rest.

This centralized approach makes dependency configuration efficient and elegant as it does not require each component to be individually configured, and makes dependency policies easy to maintain.

## Dependency Installation

Bit uses the Dependency Resolver aspect to simplify and standardize the process of dependency installation, both in the workspace and in ['capsules'](#), during component build.

For example, when used in the workspace, a single `bit install` command installs all workspace dependencies using your package manager of choice, and imports all components (listed in the `.bitmap` file).

## Dependency Insights

Understanding the relation between components is key to safe and effective component maintenance and collaboration. For that, Bit offers a variety of CLI and UI tools that help in understanding your component dependencies.
It enables you to understand:

- What are a component's dependencies
  - What's their dependency type (runtime, dev, peer)
  - What's their module type (package or independent component)
  - How was a dependency (and its version) determined by Bit
- What are a component's dependents (direct and indirect)

## Peer Dependencies

## Dependency Standardization (Envs)

Component dependencies can be configured via an Env to create a single dependency standard for all components using that Env.
For example, an Env can set all components to use `react@16.3.0` as a peer dependency. That way, components will not produce unexpected conflicts when composed together.
