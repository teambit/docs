---
id: files-bit-creates
title: Files Bit Creates
---

Bit creates the following files when initializing a new workspace:

- `workspace.jsonc` - The workspace configuration file that sets rules and policies for the workspace and all its components.
- `.bitmap` - An auto-generated mapping between tracked components in the workspace and their physical location on the file system. The file-structure of your workspace is entirely up to you.
- `.git/bit` (hidden directory) - Your local scope. Where your workspace's component release versions are stored.

### Committing to git

Both the `workspace.jsonc` and the `.bitmap` should be commited to git. The `.git/bit` folder will be automatically ignored by git.
