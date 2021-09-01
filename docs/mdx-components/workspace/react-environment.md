---
id: react-environment
title: React Environment
---

**Uncomment** the following line in your `workspace.jsonc` file, to apply the React development environment on all components in this workspace.

```json title="workspace.jsonc"
"teambit.workspace/variants": {
  "*": {
    "teambit.react/react": { }
  }
}
```

Install React and React Dom as peer dependencies:

```bash
bit install react --type peer
bit install react-dom --type peer
```
