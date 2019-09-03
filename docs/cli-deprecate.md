---
id: cli-deprecate
title: Deprecate
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