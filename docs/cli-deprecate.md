---
id: cli-deprecate
title: Deprecate
permalink: docs/cli-deprecate.html
layout: docs
category: CLI Reference
prev: cli-config.html
next: cli-diff.html
---

Marks a local/remote component as deprecated

## Synopsis

```bash
bit deprecate|d [-r|--remote] <ids...>
```

## Examples

### Mark a local component as deprecated

```bash
bit deprecate foo/bar
```

### Mark a remote component as deprecated

```bash
bit deprecate full.collection-name/foo/bar --remote
```

## Options

**-r, --remote**

Deprecate a component from a remote Collection.

```bash
bit deprecate full.collection-name/foo/bar --remote
```