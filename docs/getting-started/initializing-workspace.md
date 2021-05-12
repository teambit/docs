---
id: initializing-workspace
title: Initializing a Workspace
---

import FilesBitCreates from '@site/docs/components/workspace/files-bit-creates.md'
import BitInit from '@site/docs/components/commands/bit-init.md'
import ReactEnvironment from '@site/docs/components/workspace/react-environment.md'

In order to initialize a workspace you will need to first [install Bit](installing-bit).

## Bit Workspace

A Bit Workspace enables you to author and manage multiple independent components in a simple and elegant way. First setup a new Git repo for your project and then initialize the Bit workspace.

```bash
git init
```

## Bit New React Workspace

:::info Experimental Feature
This is experimental and may change in the future. If you experience any issues with this command please let us know or feel free to use `bit init --harmony` as documented below
:::

Start a new Bit workspace with a React environment.

```bash
bit new react-workspace <my-project-name>
```

Install all dependencies

```bash
bit install
```

## Bit Init a Workspace

<BitInit />

### Setting a React Environment

<ReactEnvironment />

## Created Files

<FilesBitCreates />

## What's Next

Once you have initialized a workspace, you can start [creating components](creating-components).
