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

Wouldn't it be nice that regardless of project setup, framework, and configuration, all development workflow operations will be standardized? You will be able to jump right into any project and just *know* how to start a dev server, *know* how to build and test, so you can just focus on writing the lines of code required to complete your task as efficiently as possible?

Bit uses **Environments** to manage support in different JavaScript frameworks for components within a Bit [workspace](/docs/workspace/overview).

## How to use Environments?

Adding an environment to a workspace can be done with the following configuration:

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

Using `variants` you set the environment `@teambit/react` for all components in the `components` directory and `@teambit/node` for all components in `helpers`.

> **Multiple environments in a workspace**
>
> While a component may have a single environment, a workspace can manage multiple environments defined for different sets of components.

## How environments work?

Environments implement cross-cutting functions to run as tasks during the component's lifecycle. Such functions include:

- Compilation.
- Testing.
- Linting.
- Documentation.
- DevServer and rendering.
- CI pipeline.

An environment registers itself to any number of integration points Bit has, so it can "tell" Bit what to execute on each component, when required.  
This means that when you only need to handle the implementation and code of your components, as the environment takes care of the rest. No need to add complicated configurations or scripts to your project. By adding a new environment, or replacing one with another, all your workflow and components would align to the new implementation.

## Manage component's runtime

Environments provide tools to install and manage peer dependencies for your development environment. It does so by defining **runtime requirements** and ensuring they are available whenever any function is executed for a component. In most cases runtime requirements will be the framework (React, Angular, Vue...) and the supported version range, however they can also be libraries that needs have a single instance installed (for example - `styled-components`, `react` or `react-dom`).

[Learn more about using runtimes when composing environments.](TODO)

## Zero configuration

Each environment encapsulate it's configurations. It gives you the same zero-config approach you get when using tools like [`react-scripts`](https://www.npmjs.com/package/react-scripts) in a Bit workspace.

> **Composition, not configuration**
>
> You can modify and extend any environment by creating a new one that composes the environment and changes its behaviors programatically. [Learn more](/docs/environment/composing-environments).