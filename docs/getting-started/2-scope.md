---
id: scope
title: Component Scopes
---

When you create component you always consider its context. Take for example an application that manages a movie streaming. This application can have several "types" of **card components**:

- A video to stream.
- A subscription in the billing page.
- A base UI primitive.

Each of these cards is implemented as part of a different context of the overall application; videos, billing and design-system. These contexts are represented in Bit as **Scopes**.

## Set a default Scope for workspace components

A single project or a repository usually has a specific part of a larger application. In this common case its preferred to have a default Scope configured for all newly created components for that project.

In your project's `workspace.json` configuration use the `scope` key to define the scope for all new components as follows: `<company-name>.<scope-name>`.

```json
{
    "@teambit.core/workspace": {
        "scope": "acme.base-ui"
    }
}
```

> **Important**
>
> Bit requires each component to have a scope defined.

## Set multiple scopes in the same workspace

Some projects might keep components that are related to different scopes. Use the `variants` extension to define Scopes for components according to their location in the workspace. Any component not in the configured directory would be a part of the workspace default scope.

```json
{
    "@teambit.core/variants": {
        "components/billing": {
            "scope": "acme.billing-system"
        },
        "components/account": {
            "scope": "acme.user-management"
        }
    }
}
```
