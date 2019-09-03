---
id: cli-list
title: List
permalink: docs/cli-list.html
layout: docs
category: CLI Reference
prev: cli-link.html
next: cli-log.html
---

Shows a list of all available components in a local workspace or a remote Collection.

## Synopsis

```bash
bit list|ls [-ids|--ids <ids...>] [-r|--raw] [-s|--scope] [-o|--outdated] [-j|--json] [Collection]
```

## Examples

### List all components in local workspace

```bash
bit list
```

### List all components in a remote Collection

```bash
bit list [Collection name]
```

### Show the local and remote versions of all local components

```bash
bit list --outdated
```

## Options

**-ids, --ids**

Show only the specified ids (comma-separated list)

```bash
bit ls username.foo --ids 'bar,foo'
```

**-b, --raw**

Shows raw output (more detailed, less pretty).

```bash
bit ls --raw
```

**-o, --outdated**

Shows the local and remote versions of all local components.

```bash
bit ls --outdated
```

**-j, --json**

Shows the output in JSON format.

```bash
bit ls --json
```