---
id: cli-checkout
title: Checkout
permalink: docs/cli-checkout.html
layout: docs
category: CLI Reference
prev: cli-build.html
next: cli-clear-cache.html
---

Switch version for components, or restore working component files.

## Synopsis

```bash
bit checkout|c [-i|--interactive-merge] [-o|--ours] [-t|--theirs] [-m|--manual] [-r|--reset] [-a|--all] [-v|--verbose] [--skip-npm-install] [--ignore-dist] <version> <component id> <latest>
```

Options:
  -i, --interactive-merge  when a component is modified and the merge process found conflicts, display options to resolve them
  -o, --ours               in case of a conflict, override the used version with the current modification
  -t, --theirs             in case of a conflict, override the current modification with the specified version
  -m, --manual             in case of a conflict, leave the files with a conflict state to resolve them manually later
  -r, --reset              remove local changes
  -a, --all                all components
  -v, --verbose            showing verbose output for inspection
  --skip-npm-install       do not install packages of the imported components
  --ignore-dist            do not write dist files (when exist)

## Examples

### Switch between component versions in your working tree

In case a sourced component has a newer version then the one you use in your project, and you want to test it locally before you decide to update.

```bash
$ bit import foo/bar # this will fetch all objects of the component, including newer versions
$ bit checkout 0.0.3 foo/bar # to replace the working tree of the component
```

### Switch between versions of multiple components in your working tree

You can list a number of components together in order to use the same version for all of them.

```bash
bit checkout 0.0.3 foo/bar sun/moon
```

### Checkout the latest version of a component

As a quick way to checkout the latest version of a component to the workspace, add the `latest` argument.

```bash
$ bit checkout latest foo/bar
```

### Checkout the latest version of all components

Use the `--all` to checkout all components in their latest version.

```bash
$ bit checkout latest --all
```

### Remove local modifications of a component

Revert all changes to `foo/bar` the version `1.0.0`

```bash
$ bit checkout 1.0.0 foo/bar --reset
```

###

## Options

**-i, --interactive-merge**

Prompt interactive steps to resolve all conflicts.

```bash
bit checkout --interactive-merge <component_id>
```

**-o, --ours**

Triggers the `merge` command to resolve the conflict with the `--ours` flag.

```bash
bit checkout --ours <component_id>
```

**-t, --theirs**

Triggers the `merge` command to resolve the conflict with the `--their` flag.

```bash
bit checkout --theirs <component_id>
```

**-m, --manual**

Triggers the `merge` command to resolve the conflict with the `--manual` flag.

```bash
bit checkout --manual <component_id>
```

**--skip-npm-install**

Do not install package dependencies of a component when doing a checkout.

```bash
bit checkout --skip-npm-install <component_id>
```

**--ignore-dist**

Ignore distribution files of a component when doing a checkout.

```bash
bit checkout --ignore-dist <component_id>
```

**-a, --all**

Checkout all components

```bash
bit checkout latest --all
```