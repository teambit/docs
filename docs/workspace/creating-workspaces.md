---
id: creating-workspaces
title: Creating Workspaces
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


### Creating an Empty Workspace

An empty workspace is a workspace configured with the correct environment but with no components. This can be created using the `--empty` flag.

<Tabs
groupId="frameworks"
defaultValue="React"
values={[
{label: 'React', value: 'React'},
{label: 'Angular', value: 'Angular'},
]}>
<TabItem value="React">

```bash
bit new react my-workspace --empty
```

  </TabItem>
  <TabItem value="Angular">

feature not available yet for Angular

  </TabItem>
</Tabs>

### Creating a Workspace without git

This will create a workspace without git. This is useful when you want to create a workspace in an existing project.

<Tabs
groupId="frameworks"
defaultValue="React"
values={[
{label: 'React', value: 'React'},
{label: 'Angular', value: 'Angular'},
]}>
<TabItem value="React">

```bash
bit new react my-workspace --standalone
```

  </TabItem>
  <TabItem value="Angular">

Feature not available yet in Angular.

  </TabItem>
</Tabs>

## Created Files

<FilesBitCreates />

## Generating a Custom Workspace Template

You can generate your own workspace template and customize it to your needs.

```bash
bit create workspace-generator my-workspace
```
