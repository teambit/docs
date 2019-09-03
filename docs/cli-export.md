---
id: cli-export
title: Export
permalink: docs/cli-export.html
layout: docs
category: CLI Reference
prev: cli-eject.html
next: cli-import.html
---

Pushes staged component(s) to a remote Collection.

## Synopsis

```bash
bit export [-f|--forget] [-e|--eject] <remote> [id...]
```

## Examples

### Export all staged components to the same Collection

```bash
bit export [Collection name]
```

### Export a specific component to a Collection

```bash
bit export [Collection name] [component id]
```

### Export two (or more components) to a Collection

```bash
bit export [Collection name] [component id 1] [component id 2]
```

### Eject component back as a dependency

In some workflows or cases, you may wish to remove a component from your repository's source-code and consume it as a dependency using common package managers such as NPM or Yarn after exporting it to a remote Collection. In order to do that, use the `--eject` flag.

```sh
bit export bit.examples string/pad-left --eject
```

## Options

**-f, --forget**

Export modified component and skip logging it as a dependency.

```sh
bit export bit.examples string/pad-left --forget
```

**-e, --eject**

Remove the component from the repository and consume it as a dependency using a common package manager.

```sh
bit export string/pad-left bit.examples --eject
```