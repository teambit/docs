---
id: environments
title: Environments
---

A Bit environment is a development environment encapsulated in a single Bit component. An environment includes linting, testing, compiling, documenting, and other services which are needed in the lifecycle of an independent component.

## Choosing an Environment

Environments are set in the `workspace.jsonc` configuration file, **using their component ID** (not their module name).  
An environment can either be one of Bit's out-of-the-box environments or a custom environment extension (usually imported from [Bit.dev](https://bit.dev)).  
You can use one of Bit's default "out-of-the-box" environments, create your own environment extensions, or use 3rd party extensions shared by the community on [Bit.dev](https://bit.dev)).

Bit currently provides the following core environments out of the box. Just pick one and start using any of them in your workspace.

* [React](/aspects/react)
* [React Native](/aspects/react-native)
* [Node](/aspects/node)

## Using an environment

### Setting a default environment for the workspace

Environments can only be configured using the `teambit.workspace/variants` workspace API. That means the `teambit.workspace/workspace` cannot be utilized to set an environment as the default for all components. To achieve a similar result, select all components using the `*` wildcard.

For example:

```json
{
  "teambit.workspace/variants": {
    "*": {
      "teambit.react/react": {}
    }
  }
}
```

### Setting multiple environments

A single workspace can use different environments for different sets of components. Setting an environment on a specific group of components is done by selecting the group and applying the environment. This is done using `teambit.workspace/variants`. To learn more about using 'variants' to select components, [see here](/aspects/variants)

For example, to set the Node and React environments on two sets of components (selected by their directory):

```json
{
  "teambit.workspace/variants": {
    "components/ui": {
      "teambit.react/react": {}
    },
    "components/utils": {
      "teambit.harmony/node": {}
    }
  }
}
```

### Troubleshoot configured environments

There are several ways you can see which environment is configured for your component

#### Workspace UI

When you run `bit start` and browse the **component tree** on the left, hover on each component to see it's configured environment.

#### CLI

To quickly get a glimpse of all components and their environments, run the `bit env` command.
