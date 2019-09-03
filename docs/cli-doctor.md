---
id: cli-doctor
title: Doctor
permalink: docs/cli-doctor.html
layout: docs
category: CLI Reference
prev: cli-diff.html
next: cli-eject.html
---

Diagnose a bit workspace.

## Synopsis

```bash
bit doctor [-j|--json] [-s|--save] [--list]
```

## Examples

### Run all checks on a workspace

In case you have an error in any of your commands, run a full diagnosis on the workspace. If any issues are found, a set of instructions to resolve them are presented.

```bash
bit doctor
```

### Save workspace state to reproduce an issue

Bundle all the workspace alongside Bit's logs and state and prepare it to send to the maintainers for debug.

```bash
bit doctor --save doctor-output
```
