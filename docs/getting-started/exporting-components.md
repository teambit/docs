---
id: exporting-components
title: Exporting Components
---

import GitCommitBitmap from '@site/docs/components/commands/git-commit-bitmap.md'

Once you have created your [remote scope](remote-scope) and configured your defaultScope you can then export your components to the remote scope so they can be published and installed in other Bit workspaces or in other web projects.

## Tagging Components

Before exporting our components we need to tag them using the `bit tag` command. This will create a new version of your component.

```bash
bit tag --all
```

When component has finished tagging you should see the following message:

```bash
new components
(first version for components)
     > ui/button@0.0.1
```

:arrow_right: Learn more about the [Tagging Components](/building-with-bit/tagging-components).

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

:arrow_right: Learn more about the [Exporting Components](/building-with-bit/exporting-components).

### See your Component in the Workspace

In your workspace go to `https://bit.dev/<user-name>/<scope-name>` to see your exported components.

## Committing the Bitmap

<GitCommitBitmap />

## What's Next?

After exporting your component to the remote scope you can then [install your component](installing-components) in another Bit workspace or in any other web project.
