---
id: cli-eject
title: Eject
permalink: docs/cli-eject.html
layout: docs
category: CLI Reference
prev: cli-doctor.html
next: cli-export.html
---

Remove components from the local scope and install them by the NPM client.

## Synopsis

```bash
bit eject|E [-f|--force] [-j|--json] <ids...>
```

## Examples

### Eject a non-modified tagged component and replace it with the corresponding node module

If you used `bit import` to source a component, and want to replace it with its node module:

```bash
bit eject bit/utils/array/sort
```
