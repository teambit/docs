---
id: cli-merge
title: Merge
permalink: docs/cli-merge.html
layout: docs
category: CLI Reference
prev: cli-login.html
next: cli-move.html
---

Join two development histories of a component together.

## Synopsis

```bash
bit merge [-o|--ours] | [-t|--theirs] | [-m|--manual] <version> <component_ids>
```

## Examples

### Choose local file modifications to resolve a merge conflict

```bash
bit merge --ours 0.0.1 foo/bar
```

### Choose remote file modifications to resolve a merge conflict

```bash
bit merge --their 0.0.1 foo/bar
```

### Set all conflicted modifications of a file to resolve manually

```bash
bit merge --manual 0.0.1 foo/bar
```

## Options

**-o, --ours**

```bash
bit merge --ours 0.0.1 foo/bar
```

**-t, --theirs**

```bash
bit merge --theirs 0.0.1 foo/bar
```

**-m, --manual**

```bash
bit merge --manual 0.0.1 foo/bar
```
