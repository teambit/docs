---
id: using-react
title: Using React
---

To use the React environment, set it in the `workspace.jsonc` configuration file. React can only be configured using the 'variants' config API.

## Apply React on a group of components

The example below shows React being applied on all components in the workspace, using the wildcard character `*`. To use React on a more limited set of components, [see here](/workspace/cascading-rules)

```json
{
  "teambit.workspace/workspace": {
    "name": "react-design-system",
    "icon": "https://image.flaticon.com/icons/svg/185/185034.svg"
  },
  "teambit.workspace/variants": {
    "*": {
      "teambit.react/react": {}
    }
  }
}
```

## Available config options

### MDX compiler

The React environment has built-in support for MDX.

To set React to compile MDX components (so that they can be shared as a distributable code), set the `mdx` property to `true`.

```json
{
  "teambit.workspace/variants": {
    "*": {
      "teambit.react/react": {
        "mdx": true
      }
    }
  }
}
```

> The above configuration does not affect the compilation of MDX documentation files (`*.doc.mdx`).

### React Version

The React environment is set to use version `^16.13.1`. To use a different version set the `reactVersion` property with a new version number.

```json
{
  "teambit.workspace/variants": {
    "*": {
      "teambit.react/react": {
        "reactVersion": "16.0.0"
      }
    }
  }
}
```
