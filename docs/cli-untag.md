---
id: cli-untag
title: Untag
permalink: docs/cli-untag.html
layout: docs
category: CLI Reference
prev: cli-test.html
next: cli-untrack.html
---

Reverts tagging of a component(s) - Removes a staged version(s).

## Synopsis

```bash
bit untag [id] [version] [-a|--all] [-f|--force]
```

## Examples

### Untagging a specific component

Specify a component id.

```bash
bit untag foo/bar
```

This will untag all the staged versions of the component.
You can also specify a specific version to tag.

```bash
bit untag foo/bar 1.0.2
```

### Untag a specific version for all staged components

Specify the `--all` option and a specific version.

```bash
bit untag --all 0.0.4
```

This will untag all the staged `0.0.4` versions for all the components in the workspace.

### Untag the staged versions for all staged components

Specify the `--all` option without any further arguments in order to untag all the staged versions for all the components in the workspace.

```bash
bit untag --all
```

## Options

**-a, --all**

Untag all the staged versions for all staged components.

```bash
bit untag --all
```

Or untag a specific staged version for all staged components.

```bash
bit untag --all 0.0.4
```