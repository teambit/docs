---
id: renaming-components
title: Renaming Components
---

Component depend on each other using the [Component ID](/components/id) as the unique reference, therefore renaming it might break dependents expecting a different component ID. Bit blocks you from removing Components used by others without removing the dependency first.

Therefore, to rename a Component, it is recommended to use `bit deprecate` and create a new component with a new designated ID.

In this example, we are renaming the component `teambit.base-ui/button` to `teambit.base-ui/ui/button` by deprecating the first component:

```bash
bit deprecate teambit.base-ui/button
```

And then, creating a new one with the `ui` namespace.

```bash
bit create ui/button -s base-ui
```
