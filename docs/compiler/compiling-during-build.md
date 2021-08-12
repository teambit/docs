---
id: compiling-during-build
title: Compiling During Build
---

## As a task

A task is running with `bit build` or during the tag process on the capsules or the workspace (depends on the specific compiler implementation).

The env extension should have this compiler extension as a dependency first, then add to the `getBuildPipe()` array the following: `this.compiler.createTask()`.
