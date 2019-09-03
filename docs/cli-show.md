---
id: cli-show
title: Show
permalink: docs/cli-show.html
layout: docs
category: CLI Reference
prev: cli-remove.html
next: cli-status.html
---

Shows component overview.

## Synopsis

```bash
bit show [-j|--json] [-r|--remote] [-v|--versions <version>] [-o|--outdated] [-c|--compare]
```

## Examples

```bash
bit show foo/bar
```

## Options

**-j, --json**

Displays a json output.

```bash
bit show foo/bar --json
```

**-v, --versions**

Shows the component overview for a specific version.

```bash
bit show foo/bar --versions 4.3.1
```

**-o, --outdated**

Shows the component's latest version from the remote Collection (if exists).

```bash
bit show foo/bar --outdated
```

**-c, --compare**

Compares the component's current file system version to its latest tagged version.

```bash
bit show foo/bar --compare
```