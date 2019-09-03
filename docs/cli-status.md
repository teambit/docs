---
id: cli-status
title: Status
permalink: docs/cli-status.html
layout: docs
category: CLI Reference
prev: cli-show.html
next: cli-tag.html
---

Displays the status of all the components currently under work.
Meaning - displays new, modified and staged components.
Does not display components that have already been exported, and components that have been imported but not modified.

> **Note**
>
> You can find a full description of all possible component statuses [here](/docs/workspace-statuses.html)

## Synopsis

```bash
bit status|s [-j, --json]
```

## Examples

```bash
bit status
```

Output will be:

```bash
new components
     > foo/bar... ok


no modified components


staged components
     > moon/sun... ok
```
