---
id: overview
title: overview
---

Formatter helps you format your components' code according to a pre-defined set of styling rules.

Code formatting is the process of styling code to make it "cleaner", clearer and consistent. Having your team's code formatted automatically saves time otherwise wasted on discussions and code reviews about code styling.

The Formatter aspect simplifies and standardizes the process of code formatting for [Components](#). It does so for code formatting during development (in the workspace) and for code formatting during component build (in a capsule, as part of the [Build Pipeline](#))

## Format in development

Bit formats all components in the [Workspace](#) using just a single command. That is true for components of all types, regardless of their specific [Env](#), and as a consequence of that, their specific [Formatter implementation](#) and configuration.

```bash
$ bit format

formatting total of 2 component(s) in workspace 'my-workspace'

my-scope/custom-aspect
the following files have been re-formatted:
custom-aspect.aspect.ts

my-scope/ui/button
no issues found
```

To learn more on formatting code during development, please refer to [Workspace Linting](/).

## Format during build

Formatting components' code for distribution is done during `build` by the Bit [Builder](/).

Component build can be simulated with `bit build` and done through [Tag](/) or [Snap](/)

```bash
bit build
```

By default, formatting is **not** part of the [Build Pipeline](#).

To learn more on formatting code during build and how to add a formatter [Build Task](#), please refer to [Formatting During Build](#).

## Configuring and implementing Linters

The [Formatter implementation](#) is configured in the [Env](#) which is configured on your [Component](/). Customizing it can be done by [customizing an existing env with your formatter](/) or by [implementing your own Env](/).

Formatter can also be implemented into Bit through few interfaces. For more information on implementing your own linter please refer to [Implement a Formatter](/).
