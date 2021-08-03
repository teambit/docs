---
id: overview
title: Overview
---

An Env is a component development environment encapsulated as an independent component.  
Envs offer a fast and simple way to set components to use a pre-defined collection of development tools and configurations (compilers, testers, linters, build workflows, etc.)

The development tools or used by the Env are each "wrapped" by a Bit Aspect so that they can hook into Bit's CLI, build workflow, Workspace UI, component previews, and more.

You can use Bit's out-of-the-box Envs, extend and customize them, or create your own ones from scratch.
Much like any other independent component, Envs can be shared, collaborated on, and reused across Bit workspaces.
Reusing shared Envs greatly speeds up the development process and standardizes component development across decoupled workspaces.

A single Bit workspace can use multiple Envs for different components.

## Using Envs

### Using a default Env for the workspace

Envs can only be configured using the `teambit.workspace/variants` workspace API. That means the `teambit.workspace/workspace` cannot be utilized to set an environment as the default for all components. To achieve a similar result, select all components using the `*` wildcard.

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

> <p style={{ color: '#c31313' }}>Never use the '*' wildcard in a workspace that uses multiple environments!</p>
> Instead, use exclusive namespaces or directories to select and configure each group of components to use its own environment
> (see an example in the next section).

- **For a list of all available pre-configured Envs, [see here.](/pre-configured-envs)**

### Using multiple Envs

A single workspace can use different Envs for different sets of components. Setting an environment on a specific group of components is done by selecting the group and applying the environment. This is done using [Variants](../workspace/variants.md).

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

## CLI Commands

Bit Envs hook into Bit's CLI to execute their different services. For example, `bit test`, will execute different test runners, depending on the environment in use.

#### start

Runs the development serve (that includes running the Workspace UI).

```shell
// run the dev server
bit start
```

#### build

Runs the build pipeline (without tagging components with a new release version).

```shell
bit build
```

#### test

Runs all tests.

```shell
bit test
```

#### compile

Compiles all components.

```shell
bit compile
```

#### lint

Get lint results for all components.

```shell
bit lint
```

## Env Anatomy
