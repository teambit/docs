---
id: components-envs
title: Components are not using the selected environment
---

## Problem description

Components that are configured to use a specific environment, use the workspace's default environment, instead.

```jsonc title="Example"
{
  "teambit.workspace/variants": {
    "*": {
      "teambit.react/react": {}
    },
    "components/utils": {
      "teambit.harmony/node": {}
    }
  }
}
```

In the above example, components in the `components/utils` directory are set to use the Node environment.
Since that selection is more specific than the one done using the `*` wildcard selector, it is expected to override it.

## Understanding the problem

To select the right configurations for each component, the Variants aspect sorts all workspace configurations,
from the most specific to the most general. The first configuration set on an aspect (the most specific one) will be the one that is selected for that aspect.
That means, once Variants encounters configurations for an aspect, it stops looking for additional configurations for that specific aspect.

Each environment is considered as a different aspect, even though they are all under the "environments" category and can only be used once per component.
Variants does not understand categories, only individual aspects and therefore, cannot override one environment with a different environment.

## Solution #1

Remove the `*` general selection and use only specific and exclusive selectors to configure environments
(that means your workspace directories/ namespaces need to be structured in a way that enables complete selection of all components using selectors that are exclusive).

```json title="Example"
{
  "teambit.workspace/variants": {
    "components/react": {
      "teambit.react/react": {}
    },
    "components/utils": {
      "teambit.harmony/node": {}
    }
  }
}
```

## Solution #2

```json title="Example"
{
  "teambit.workspace/variants": {
    "*": {
      "teambit.react/react": {}
    },
    "components/utils": {
      "teambit.harmony/node": {},
      "teambit.envs/envs": {
        "env": "teambit.harmony/node"
      }
    }
  }
}
```

:::note
Notice how the Node environment was added also as a standalone aspect, to ensure that it is registered as a dependency of the selected components.
:::
