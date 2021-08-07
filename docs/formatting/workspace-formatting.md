---
title: Workspace Formatting
id: workspace-formatting
---

During development, Bit formats your components using the `bit format` commands. This command provides a standard dev experience for formatting the code of any kind of [Component](/), whether it is a NodeJS modules,
a React component or anything else.

## Compile all components in the Workspace

Bit allows to format all components in the [Workspace](/) regardless to the configured [Env](/) and therefore Compiler
with a single command.

```bash
bit format
```

## Compile only components that changed

You can also use the `--changed` flag to format only `new` and `modified` components. Use `bit status` to learn
which components are either `new` or `modified`.

```bash
bit format --changed
```

## CLI References

- [bit format](/)
