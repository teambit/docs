---
id: cli-untrack
title: Untrack
---

Untracks a new (not yet tagged) component.

## Synopsis

```bash
bit untrack|u [-a|--all] [ids...]
```

## Example

### Untrack a specific newly-added component

```bash
bit untrack foo/bar
```

### Untrack all newly-added components

```bash
bit untrack --all
```