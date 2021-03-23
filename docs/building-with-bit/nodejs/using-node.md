---
id: using-node
title: Using Node
---

To use the Node environment, set it in the `workspace.jsonc` configuration file. Node can only be configured using the 'variants' config API.

## Apply Node on a group of components

The example below shows Node being applied on all components in the workspace, using the wildcard character `*`. To use Node on a more limited set of components, [see here](/workspace/cascading-rules)

```json
{
  "teambit.workspace/workspace": {
    "name": "my-toolbox",
    "icon": "https://image.flaticon.com/icons/svg/185/185034.svg"
  },
  "teambit.workspace/variants": {
    "*": {
      "teambit.harmony/node": {}
    }
  }
}
```
