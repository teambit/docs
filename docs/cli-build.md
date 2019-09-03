---
id: cli-build
title: Build
permalink: docs/cli-build.html
layout: docs
category: CLI Reference
prev: cli-add.html
next: cli-checkout.html
---

Builds a component (or all the project's components) with the configured compiler (in [bit config](/docs/conf-bit-json.html)).

## Synopsis

```bash
bit build [-v|--verbose] [-c|--no-cache] [id]
```

## Examples

Build a single component by specifying a component id:

```bash
bit build foo/bar
```

Build all components by not specifying a component id:

```bash
bit build
```

## Options

**-v, --verbose**

Shows npm verbose output for inspection.

```bash
bit build foo/bar --verbose
```

**-c, --no-cache**

Ignore component dist cache when building component

```bash
bit build --no-cache
```