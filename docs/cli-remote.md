---
id: cli-remote
title: Remote
permalink: docs/cli-remote.html
layout: docs
category: CLI Reference
prev: cli-move.html
next: cli-remove.html
---

Displays, adds and removes remote Collections.

## Synopsis

```bash
bit remote [add <url>] | [rm <name>] [-g|--global]
```

## Examples

### Display existing remote Collections

```bash
bit remote
```

### Add a remote

Add a remote to the local workspace.

```bash
bit remote add <url>
```

Or add a remote globally

```bash
bit remote add <url> --global
```

Remote name will be the remote Collection name.

## Remove a remote (from local workspace/global config).

```bash
bit remote rm <collection-name>
```