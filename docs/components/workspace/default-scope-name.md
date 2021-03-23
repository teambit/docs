--- 
id: default-scope-name
title: Default Scope Name
---

- Open the `workspace.jsonc` file
- find the line `"defaultScope": "my-scope"`
- Replace it with your username/organization name, and 'demo-scope' as your scope

```json title="workspace.jsonc"
{
  "teambit.workspace/workspace": {
    "defaultScope": "your-username.demo-scope"
  }
}
