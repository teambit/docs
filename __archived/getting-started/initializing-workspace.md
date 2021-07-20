---
id: initializing-workspace
title: Initializing a Workspace
---

import FilesBitCreates from '@site/docs/components/workspace/files-bit-creates.md'
import BitInit from '@site/docs/mdx-components/commands/bit-init.md'
import ReactEnvironment from '@site/docs/mdx-components/workspace/react-environment.md'
import QuickGuide from '@site/docs/mdx-components/quick-guide.md'

In order to initialize a workspace you will need to first [install Bit](installing-bit). A Bit Workspace enables you to author and manage multiple independent components in a simple and elegant way. Bit works with Git so you can either add init a new git repo or add Bit to an existing git repo.

<iframe width="560" height="315" src="https://www.youtube.com/embed/7afMBwj5fR4?start=135" title="Let's Build with Bit" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Quick Guide

<QuickGuide />

1. Start a new bit project

```bash
bit new react-workspace <my-workspace-name>
```

2. Open the directory that has just been created and run install dependencies

```bash
cd <my-workspace-name>
bit install
```

---

**There are two ways you can initialize a workspace:**

## Option 1: Use bit new to create a React workspace

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

## Option 2: Use bit init to initialize and manually configure your workspace

<BitInit />

:::tip

Use `bit init --help` or `bit init -h` to get a list of available options for this command.

:::

### Setting a React Environment

<ReactEnvironment />

---

## Created Files

<FilesBitCreates />

---

## What's Next

Once you have initialized a workspace, you can start [creating components](creating-components).
