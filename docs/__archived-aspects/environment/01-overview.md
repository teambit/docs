---
id: overview
title: Overview
---

//TODO duplication of envs/envs

A Bit environment is a development environment encapsulated in a single Bit component. An environment includes linting, testing, compiling, documenting, and other [services](/building-with-bit/environments) which are needed in the lifecycle of an independent component.

Having just a single component to set up the entire development environment means no time gets wasted on tedious configurations. In addition, a sharable environment makes it easier to maintain consistency in development across multiple decoupled Bit workspaces.

A single workspace may also use multiple environments to "service" different groups of components. This gives us the freedom to author, maintain and explore different types of components, all in the same workspace.

For example, the following configuration sets two different environments, [React](/building-with-bit/react) and Node, on two groups of components, selected by their directories, `components/ui` and `components/utils`.

```json
{
  "teambit.workspace/variants": {
      "components/ui": {
        "teambit.react/react": {}
      },
      "components/utils": {
        "teambit.harmony/node"
      }
  }
}
```

Bit provides [a number of environments to choose from](/building-with-bit/environments). Each environment is completely [customizable and extendible](/building-with-bit/environments). Once you've created your own custom environment, you can share it with others, as you would with any other Bit component.

## Environments CLI reference

As mentioned above, Bit environments make use of Bit's CLI to execute their different services. That means, `bit test`, for example, may execute different test runners, depending on the environment in use.

### Run the Dev Server

```shell
bit start
```

### Run the build pipeline

```shell
bit build
```


### Run all tests

```shell
bit test
```


### Compile all components

```
bit compile
```


### Get lint results

```
bit lint
```
