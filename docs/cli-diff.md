---
id: cli-diff
title: Diff
permalink: docs/cli-diff.html
layout: docs
category: CLI Reference
prev: cli-deprecate.html
next: cli-doctor.html
---

Shows difference between components files.

## Synopsis

```bash
bit diff <component IDs> [version]
```

## Examples

### Compare all modified components to their model version

Runs `diff` for all components in local Collection. Comparing local state in the working tree to the component objets in the Collection.

```bash
bit diff
```

### Compare the specified components against their modified states

```bash
bit diff bit.example/string/pad-left
```

### Compare the specified version to used or modified files

```bash
bit diff bit.example/string/pad-left 1.0.0
```

### Compare between two specific versions of a component

```bash
bit diff bit.example/string/pad-left 1.0.0 2.0.0
```