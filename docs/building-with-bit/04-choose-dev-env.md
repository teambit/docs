---
id: choose-dev-env
title: Use a Dev Environment
---

[A Bit Development Environment](/environments/overview) is a special type of component that configures and “bundles” together the different services required in a component development workflow.
That includes processes such as compiling, testing, linting and even documenting. Environments take direct inspiration from `react-scripts` ([CreateReactApp](https://github.com/facebook/create-react-app)).

:::note
The various services used by a Bit environment are provided by different Bit extension components.  
Learn more about "Environment Services" [here](/environments/environment-services).
:::

Bit provides various Environments to start from. Each Environment is [**customizable and extendible**](/environments/build-environment). Once you create your own environment, it can be shared and used by others just like any other Bit component.

## Set all components to use the 'React' Environment

**Uncomment** the following lines in your `workspace.jsonc` configuration file, to apply the basic ['React' development environment](/react/overview) on all components in this workspace.

```json title="workspace.jsonc"
"teambit.workspace/variants": {
  "*": {
    "teambit.react/react": { }
  }
}
```

:::info configuration Variants

The snippet above defines a [configuration variant](/workspace/cascading-rules) with the `*` selector. Variant selectors use glob-patterns to decide on which component to apply a specific configuration. By setting configuration with `*` we ensure `teambit.react/react` is applied by default on all components.

With Variants, different components can be configured in the same workspace with different settings and environments.
Variants in Bit are similar to CSS-rules as the more specific selectors override rules defined higher up on the hierarchy.
:::

### Reset your dev server

Stop Bit server (Ctl + c) and run it again:

```shell
bit start
```
