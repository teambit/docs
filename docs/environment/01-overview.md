---
id: overview
title: Overview
---

```sh
$ bit build
$ bit test
$ bit start
$ bit create <component>
$ bit ci
```

Wouldn't it be nice that regardless of a project setup, framework and configuration, all development workflow operations will be standardize? You will be able to jump right in to any project and just *know* how to start a dev server, *know* how to run build and test, so you can just focus on writing the lines of code required to complete your task as efficiently as possible?

Bit uses **Environments** as a way to define development environments for components and projects. Environments define how a component is built, tested and published.

## Set an environment for components

> Refactor when `bit use` is implemented.

Bit configures workspace components according to the `variant` they are in.  
For example:

```json
{
  "@teambit/variants": {
    "components": {
      "@teambit/react": {}
    },
    "helpers": {
      "@teambit/node": {}
    }
  }
}
```

This way we set the environment [`@teambit/react`](TODO) for all components in the `components` directory and [`@teambit/node`](TODO) for all components in `helpers`.

## Component environments

You may think about an environment as a set of `scripts` in a `package.json` file in the sense that it provides pre-defined operations to run on your code. The main difference is that environments are composed programmatically with Bit. They can extend features in the [workspace UI](TODO) as well as integrate the component's build, test and lint operations to Bit's commands.  
Environments in Bit work like components you compose together to form a functionality. For example, the `@teambit/react` environment comes with its own set of defaults for building and developing React components. It does not require any configuration files from the workspace, as like any component, it encapsulates a complete functionality and does not bound to external assets from the workspace (similar to how you'd prefer building a component that gets its state via an API instead of accessing a global variable).

## Multiple environments in a workspace

While a component may have a single environment you many have several components, each with its own environment in the same workspace. This means that you can keep component with React, Angular and Vue environments in the same workspace and not care about setting different configurations and processes for each. Just have an environment defined, and run the required operation. Bit's [workspace UI](TODO) even renders components from multiple environments.

## Component isolation

## Runtime
