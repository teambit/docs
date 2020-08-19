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

Bit uses **Environments** to manage the development of components within a Bit [workspace](TODO).

## How to use Environments?

> Refactor when `bit use` is implemented.

Adding an environment to a workspace can be done with the following configuration, using `variants`:

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

This way, we set the environment [`@teambit/react`](TODO) for all components in the `components` directory and [`@teambit/node`](TODO) for all components in `helpers`.

### Multiple environments in a workspace

While a component may have a single environment, you may have several components, each with its own environment in the same workspace. Just have an environment defined and run the required operation. Bit's [workspace UI](TODO) even renders components from multiple environments. Even when you have multiple types of components, you only manage a single process for Bit's dev-server, while Bit does all the heavy-lifting of managing different environments.

## How environments work?

Each environment is an [aspect](TODO) which implements cross-cutting functions to run on components. Such functions include:

- Compilation.
- Testing.
- Linting.
- Documentation.
- DevServer and rendering.
- CI pipeline.

Bit has a set of [**slots**](TODO), where each of them is an integration point environment hooks itself to so it can execute a function.  
Using this approach Bit runs as different implementation of each function, as defined by a component's environment. When Bit requires to run any operation on a set of components, it executes the functions each environment registers for their components.

## Manage component's runtime

Bit tries to use the minimal amount of processes when running components. Usually this means a process for sets of components, according to their environments.  
Each environment defines **runtime requirements** for the components. These requirements are the component's `peerDependencies`, which are configured by the environment. This way you don't need to handle `peerDependencies` for each workspace or project. This is a part of the environment definition for the frameworks you use.

[Learn more about using runtimes.](TODO)

## Zero configuration

Each environment encapsulate it's configurations. It gives you the same zero-config approach you get when using tools like [`react-scripts`](https://www.npmjs.com/package/react-scripts) in a Bit workspace.

> **Composition, not configuration**
>
> You can modify and extend any environment by creating a new one that composes the environment and changes its behaviors programatically. [Learn more](TODO).
