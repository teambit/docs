---
id: initializing-bit
title: Initializing Bit
---

Initializing Bit on a repository allows you to track and share components.

Initialize a Bit workspace on a project by running the [bit init](/docs/apis/cli-all#init) command a project’s root directory.

```bash
cd project-root
bit init
```

Initializing Bit adds resources to a project: [bit config](#bit-config), [.bitmap file](#.bitmap), and a [local storage directory](#bit-local-storage).

### Recreate Bit resources in case of corrupted data

If an error caused data corruption, add the `--reset` flag to `bit init`.

```bash
bit init --reset
```

## The contents of a workspace with Bit

### Bit local storage

The local storage stores Bit objects (components, versions, etc.). Bit manages it in a directory called `.bit`. If you use [Git](https://git-scm.com), Bit creates a local storage directory in the `.git` directory. Do not track changes in the `.bit` directory using SCM. Make sure to add it to the `.gitignore` file.

To force Bit not to nest the local storage in `.git`, use the `--standalone` flag:

```bash
bit init --standalone
```

### bit config

[bit](/docs/conf-bit-json.html) config is Bit's main configuration section. By default it is managed in the project's `package.json` file. If you choose to set up bit in `standalone` mode, Bit generate a `bit.json` file to hold the configuration.

### .bitmap

`.bitmap` maps components with local files in the workspace. Bit uses this file to import and update sourced components in the correct paths in a workspace. You should track this file by an SCM tool, alongside the project.