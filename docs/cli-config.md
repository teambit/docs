---
id: cli-config
title: Config
permalink: docs/cli-config.html
layout: docs
category: CLI Reference
prev: cli-clear-cache.html
next: cli-deprecate.html
---

Manages your global Bit configuration.

## Synopsis

```bash
bit config [list] | [get <key>] | [del <key>] | [set <key> <val>]
```

## Examples

### List all configurations

```bash
bit config list
```

### Get a specific configuration value

```bash
bit config get user.name
```

Will return your [bit.dev](https://bit.dev) username.

### Set a configuration value

```bash
bit config set user.name myUserName
```

### Delete a configuration value

```bash
bit config del user.name
```