---
id: exporting-components
title: Exporting Components
---

import GitCommitBitmap from '@site/docs/components/commands/git-commit-bitmap.md'

Exporting a component to a remote scope makes it available to be used by other Bit workspaces or your applications.

## Tagging Components

Before exporting our components we need to tag them using the `bit tag` command. This will create a new version of your component.

```shell
bit tag --all
```

Once the component has finished tagging you should see the following message:

```sh
new components
(first version for components)
     > ui/button@0.0.1
```

:arrow_right: Learn more about the [Tagging Components](/building-with-bit/component/versioning).

## Export Components

Once you have tagged your component you can then run the `bit export` command.

```sh
bit export
```

Once your component has finished exporting you should see the following message:

```shell
exported the following 1 component(s):
your-username.demo-scope/ui/button
```

:arrow_right: Learn more about the [Exporting Components](/building-with-bit/component/exporting).

In your workspace go to `https://bit.dev/<owner-name>/<scope-name>` to see your exported components.

### Committing your Changes

<GitCommitBitmap />
