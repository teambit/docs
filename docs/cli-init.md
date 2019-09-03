---
id: cli-init
title: Init
permalink: docs/cli-init.html
layout: docs
category: CLI Reference
prev: cli-install.html
next: cli-link.html
---

Initializes a [bit workspace](/docs/concepts.html#bit-workspace) and creates  Bit's configuration, and a `.bit` directory, which will contain Bit's objects & models. You can specify workspace defaults as parameters, that can later be changed in the configuration files. 

## Synopsis

```bash
bit init [-b|--bare] [-s|--shared <group-name>] [-T|--standalone] [--reset] [--reset-hard] [-c|--compiler] [-t|--tester] [-p|--package-manager] [-d|--default-directory]
```

 and create the needed directories.   


## Options

**-b, --bare [name]**

Initializes an empty bit bare Collection.

```bash
bit init --bare
```

**-s, --shared <group-name>**

Adds group write permissions to a Scope properly.

```bash
bit init --shared group-name
```

**-T, --standalone**

Creates the [component store](/docs/initializing-bit.html#component-store) outside the `.git` directory.

```bash
bit init --standalone
```

**--reset**

Resets Bit to its initial state. Use this in case you have any corrupted data.

```bash
bit init --reset
```

**--reset-hard**

Removes Bit completely from a local workspace. Use this in case you want to completely remove Bit from your project.

This will delete `.bitmap`, `bit.json` and `.bit`.

```bash
bit init --reset-hard
```

**--compiler `<compiler name>`**

Specifies default compiler to used in the workspace

```bash
bit init --compiler @bit/bit.envs.compilers.react-typescript
```

**--tester `<tester name>`** 

Specifies default tester to use in the workspace

```bash
bit init --tester @bit/bit.envs.testers.jest
```

**--package-manager `<npm | yarn>`**
Specifies the default package manager to use when installing components. 

```bash
bit init --package-manager yarn  
```

**--default-directory `<directory name>`**
Specifies up the default directory to which components will be imported. 

```bash
bit init --default-directory src/imports
```
