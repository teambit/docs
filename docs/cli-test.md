---
id: cli-test
title: Test
permalink: docs/cli-test.html
layout: docs
category: CLI Reference
prev: cli-tag.html
next: cli-untag.html
---

Runs the tests of the specified component(s) using the configured tester.

## Synopsis

```bash
bit test|t [-a|--all] [--fork-level] [-v|--verbose] [--include-unmodified] [id]
```

## Examples

### Run tests on all your project's components

```bash
bit test
```

### Run tests on a specific component

```bash
bit test foo/bar
```

## Options

**-v, --verbose**

Shows npm verbose output for inspection.

```bash
bit test foo/bar --verbose
```

**--include-unmodified**

Test all components in the workspace, including components with no modifications.

```bash
bit test --include-unmodified
```