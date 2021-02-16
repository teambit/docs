---
id: choose-dev-env
title: Set Development Environment
---

[A Bit Development Environment](/docs/environments/overview) is a unique type of component that configures and “bundles” together different aspects of a component development workflow. That includes processes such as compiling, testing, linting and even documenting. Environments take direct inspiration from `react-scripts` ([CreateReactApp](https://github.com/facebook/create-react-app)).

Bit provides various Environments to start from. Each Environment is [__customizable and extendible__](/docs/environments/build-environment), which means you can start with a pre-defined Environment and update it to support more tools and specific configurations that fit your requirements.

## Use React Environment

For this project we'll start with the basic [React environment](/docs/react/overview) and set it as the default environment for all components.

1. Open the `workspace.jsonc` file.
1. Find the object named `"teambit.worksapce/variants"`.
1. Edit to look like this:

```json title="workspace.jsonc"
"teambit.workspace/variants": {
  "*": {
    "teambit.react/react": { }
  }
}
```

## Configuration Variants

The snippet above defines a [configuration variant](docs/variants/overview) with the `*` selector. Variant selectors use glob-patterns to decide on which component to apply a speicifc configuration. By setting configuration with `*` we ensure `teambit.react/react`, which is the pre-configured environment for React is applied by default for all components.  
With Variants you can configure different components in the same workspace with different settings and environments. Variants in Bit are similar to CSS-rules as the more specific selectors override rules defined higher up on the hirerchy.

> * Please install React as well (`bbit install react`) - this is a temporary inconvenience that will be resolved in the next few days.
> * To apply changes in `workspace.jsonc` you need to stop any running instances of Bit and rerun `bbit start`.

## Extending Pre-Defined Environments

Environments follow the same design patterns as composable components. You can extend and create your own flavor of configuration by creating a new component environment and have it composed of any other environment. This way you can either override default behavior or add new capabilities.  
For example, [see here](/docs/react/overview) about extending the pre-defined React environment.
