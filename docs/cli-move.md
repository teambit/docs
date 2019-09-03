---
id: cli-move
title: Move
permalink: docs/cli-move.html
layout: docs
category: CLI Reference
prev: cli-merge.html
next: cli-remote.html
---

Moves a file/directory that's part of a tracked component to a new location.
This command will update the [.bitmap file](/docs/initializing-bit.html#bitmap) accordingly.

## Synopsis

```bash
bit move|mv <from> <to>
```

## Examples

### Move a file that's part of a tracked component

```bash
bit move src/foo/bar/index.js src/components/new/location/new-file-name.js
```

### Move a directory that's part of a tracked component

```bash
bit move src/foo src/components/new/location/foo
```

### Rename a component

Similar to Git, you can also use `move` to rename files within a component.

```bash
$ bit move <oldDirName> <newDirName>
$ bit move <oldFileName> <newFileName>
```