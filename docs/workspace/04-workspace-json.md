---
id: workspace-json
title: Workspace Configuration
---

The `workspace.json` file defines a set of configuration that control the entire process of managing components using a set of Extensions (plugins). Each extension is responsible on a specific set of tasks. This means that when configuring a workspace you essentially choose which set of extensions Bit should use for managing your project.

Use the `@teambit.core/workspace` extension to set default policy for configuring all components in the project.

```json
{
    "@teambit.core/workspace": {
        "scope": "acme.base-ui",
        "directory": "components",
        "extensions": {
            "@teambit.environments/react": {
                "typescript": "<version>"
            }
        }
    }
}
```

- Defines the scope of all components as the `base-ui` for `acme`.
- Sets `components` as the default directory for newly created components.
- Sets `react` as a default extension for all components and apply `typescipt` support.

