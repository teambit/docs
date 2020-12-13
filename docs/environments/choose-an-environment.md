---
id: choose-an-environment
title: Choosing Environments
---

Environments are set in the `workspace.jsonc` configuration file, __using their component ID__ (not their module name).  

An environment can either be one of Bit's out-of-the-box environments or a custom environment extension (usually imported from [Bit.dev](https://bit.dev)).

You can use one of Bit's default "out-of-the-box" environments, create your own environment extensions, or use 3rd party extensions shared by the community on [Bit.dev](https://bit.dev)).  

## Choosing a default environment  

Bit currently provides the following environments out of the box. Just picj and start using any of them in your workspace.

### [React](/docs/react/using-react)
### [Node](/docs/nodejs/using-node)
### [React Native](/docs/react-native/using-react-native)

## Using an environment  

### Setting a default environment for the workspace  

Environments can only be configured using the `teambit.workspace/variants` workspace API. That means the `teambit.workspace/workspace` cannot be utilized to set an environment as the default for all components. To achieve a similar result, select all components using the `*` wildcard.

For example:

```json
{
    "teambit.workspace/variants": {
        "*": {
            "teambit.react/react": { }
        }
    }
}
```

> Notice how an environment is not explicitly defined as an environment. That is true for all types of extensions and aspects.
### Setting multiple environments
A single workspace can use different environments for different sets of components. Setting an environment on a specific group of components is done by selecting the group and applying the environment. This is done using `teambit.workspace/variants`. To learn more about using 'variant' to select components, [see here](/docs/workspace/cascading-rules)

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

### Aspect Environment (for Bit extensions and aspects)
