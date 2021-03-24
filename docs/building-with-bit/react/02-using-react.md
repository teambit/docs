---
id: using-react
title: Using React
---

To use the React environment, set it in the `workspace.jsonc` configuration file. React can only be configured using the 'variants' config API.

## Use React as the default environment

Apply the React environment on all components in the workspace, using the wildcard character `*`.

```json title="workspace.jsonc"
{
  "teambit.workspace/variants": {
    "*": {
      "teambit.react/react": {}
    }
  }
}
```

## Use React on a specific group of components

Apply the React environment on a limited set of components. For example, all components inside the components/react-ui directory.

```json title="workspace.jsonc"
{
  "teambit.workspace/variants": {
    "components/react-ui": {
      "teambit.react/react": {}
    }
  }
}
```

- Learn more about configuring a selected set of components, [here](/building-with-bit/workspace/cascading-rules).
