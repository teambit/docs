---
id: initializing-workspace
title: Initializing a Workspace
---

A Bit Workspace enables you to author and manage multiple independent components in a simple and elegant way. First setup a new Git repo for your project and then initialize the Bit workspace.

```shell
bit init --harmony
```

Bit creates the following files when initializing a new workspace:

- `workspace.jsonc` - The Workspace configuration file a single file that sets rules and policies for the workspace and all its components.
- `.bitmap` - An auto-generated mapping between tracked components in the workspace and their physical location on the file system. The file-structure of your workspace is entirely up to you.
- `.git/bit` (directory) - Your local scope. Where your workspace's component release versions are stored.

