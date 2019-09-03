---
id: cli-install
title: Install
permalink: docs/cli-install.html
layout: docs
category: CLI Reference
prev: cli-import.html
next: cli-init.html
---

Installs all dependencies for all the sourced components (or for a specific one), whether they were defined in your `package.json` or in each of the sourced components, and [links](/docs/cli-link.html) them.

## Synopsis

Install all component package dependencies.

```bash
bit install [-v|--verbose] [id]
```

## Examples

### Install dependencies for all the sourced components

```bash
bit install
```

This will install all the dependencies for the sourced components.

### Install dependencies for a specific component

```bash
bit install foo/bar
```

This will install all the dependencies for a specific component.

### Pass an extra arguments to npm

In order to pass extra arguments to an npm client, place the arguments after `--`.
  
```bash
bit import -- --production --no-optional
```
## Options

**-v, --versbose**

Shows a more verbose output when possible.

```bash
bit install --verbose
```