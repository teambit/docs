---
id: choose-an-environment
title: Choosing an Environment
---

//TODO maybe reuse for getting started docs

Environments are set in the `workspace.jsonc` configuration file, **using their component ID** (not their module name).

An environment can either be one of Bit's out-of-the-box environments or a custom environment extension (usually imported from [Bit.dev](https://bit.dev)).

You can use one of Bit's default "out-of-the-box" environments, create your own environment extensions, or use 3rd party extensions shared by the community on [Bit.dev](https://bit.dev)).

## Choosing an environment

Bit currently provides the following core environments out of the box. Just pick one and start using any of them in your workspace.

### [React](/building-with-bit/react/using-react)

### [React Native](/building-with-bit/react-native/using-react-native)

### [Node](/building-with-bit/nodejs/using-node)

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

:::caution Never use the wildcard in a workspace with multiple environments
Never use the '\*' wildcard in a workspace that uses multiple environments.

Instead, use exclusive namespaces or directories to select and configure each group of components to use its own environment (see an example in the next section).

**[Learn more](/troubleshooting/components-envs)**
:::

### Setting multiple environments

A single workspace can use different environments for different sets of components. Setting an environment on a specific group of components is done by selecting the group and applying the environment. This is done using `teambit.workspace/variants`. To learn more about using 'variant' to select components, [see here](/building-with-bit/workspace)

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
