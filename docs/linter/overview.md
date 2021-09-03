---
id: overview
title: Overview
---

Linting helps us maintain consistent code styling and avoid potential bugs by analyzing our source code, statically, before it is compiled and executed.

The Linter aspect simplifies and standardizes the process of component linting. It does so for linting during development (in the workspace) and for linting during component build (in a capsule, as part of the [Build Pipeline](#))

## Testing in development

Bit lints all components in the [Workspace](#) using just a single command. That is true for components of all types, regardless of their specific [Env](#), and as a consequence of that, their specific [Linter implementation](#) and configuration.

```bash
bit lint
```

To learn more on linting during development, please refer to [Workspace Linting](/).

## Testing during build

Testing components for distribution is done during `build` by the Bit [Builder](/builder/overview).

Component build can be simulated with `bit build` and done through [Tag](/components/tags) or [Snap](/components/snaps)

```bash
bit build
```

By default, linting is **not** part of the [Build Pipeline](#).

To learn more on linting during build and how to add a lint [Build Task](#), please refer to [Linting During Build](#).

## Configuring and implementing Linters

The [Linter implementation](#) is configured in the [Env](#) which is configured on your [Component](/components/overview). Customizing it can be done by [customizing an existing env with your linter](/) or by [implementing your own Env](/).

Linter can also be implemented into Bit through few interfaces. For more information on implementing your own linter please refer to [Implement a Linter](/).
