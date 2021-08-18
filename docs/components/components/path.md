---
id: path
title: Path
---

Components are created in a directory using the name configured in your defaultScope in your workspace.jsonc. The defaultScope should be configured as your `username.scope-name` and cannot contain a `/`. If you would like to change the default behavior of where you components are created you should use the `--path` flag.

```bash
bit create react-component ui/button --path bit/components
```

:::note Organizing your Components
We don't recommend creating Bit components in your apps src/components folder. You should build components as if they were external modules, as if your components were in a different app.
:::
