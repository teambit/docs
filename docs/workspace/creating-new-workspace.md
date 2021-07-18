---
id: creating-new-workspace
title: Creating a New Workspace
---

import FilesBitCreates from '@site/docs/mdx-components/workspace/files-bit-creates.md'
import BitInit from '@site/docs/mdx-components/commands/bit-init.md'
import ReactEnvironment from '@site/docs/mdx-components/workspace/react-environment.md'
import QuickGuide from '@site/docs/mdx-components/quick-guide.md'


```bash
bit new react-workspace <my-workspace-name>
```

2. Open the directory that has just been created and run install dependencies

```bash
cd <my-workspace-name>
bit install
```

Create a new Bit workspace for a React environment. This command will initialize a Bit Harmony workspace configured for a React environment. To create a workspace and manually configure the env use the `bit init --harmony` command.

:::info Experimental Feature
This is experimental and may change in the future. If you experience any issues with this command please let us know.
:::

Start a new Bit workspace with a React environment. This will create a new directory with the necessary files inside.

```bash
bit new react-workspace <my-workspace-name>
```

Once you are inside that directory you can then install all dependencies needed for your workspace.

```bash
bit install
```

## Created Files

<FilesBitCreates />
