---
id: using-react-native
title: Using React Native
---

To use the React Native environment, set it in the `workspace.jsonc` configuration file. React Native can only be configured using the 'variants' config API.

## Apply React Native on a group of components

The example below shows React Native being applied on all components in the workspace, using the wildcard character `*`. To use React Native on a more limited set of components, [see here](/workspace/cascading-rules)

```json
{
  "teambit.workspace/workspace": {
    "name": "react-native-design-system",
    "icon": "https://image.flaticon.com/icons/svg/185/185034.svg"
  },
  "teambit.workspace/variants": {
    "*": {
      "teambit.react-native/react-native": {}
    }
  }
}
```
