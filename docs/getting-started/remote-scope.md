---
id: export-to-remote-scope
title: Export to Remote Scope
---

import GitCommitBitmap from '@site/docs/components/commands/git-commit-bitmap.md'

## What is a Scope?

[Scope](/bit-scopes/remote-scope) is a virtual storage for components. Bit uses Scopes to save versions of [Bit Components](/bit-components/component-overview) and access them as needed. Set Remote scopes on [Bit.dev](https://bit.dev) or self-hosted Bit servers to share components.

---

## Export Components

Once you have tagged your component you can then run the `bit export` command.

```bash
bit export
```

When your component has finished exporting you should see the following message:

```bash
exported the following 1 component(s):
your-username.demo-scope/ui/button
```

:arrow_right: Learn more about the [Exporting Components](https://bit-components/exporting-components).

### See your Component in the Workspace

In your workspace go to `https://bit.dev/<user-name>/<scope-name>` to see your exported components.

:::tip

Use `bit export --help` or `bit export -h` to get a list of available options for this command.

:::

---

## Committing the Bitmap

<GitCommitBitmap />

---
