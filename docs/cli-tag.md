---
id: cli-tag
title: Tag
permalink: docs/cli-tag.html
layout: docs
category: CLI Reference
prev: cli-status.html
next: cli-test.html
---

Locks the version of a 'new' or 'modified' component(s). Component's status will then be 'staged'.

## Synopsis

```bash
bit tag|t [id] [version] [-m|--message <message>] [-a|--all] [-s|--scope <collection-name>] [-p|--patch] [-mi|--minor] [-ma|--major] [-f|--force] [-v|--verbose] [-i|--ignore-unresolved-dependencies] [--skip-tests]
```

## Examples

### Tagging a specific component

Specify a component id.

```bash
bit tag foo/bar
```

You can also specify a version to tag.

```bash
bit tag foo/bar 1.0.2
```

### Tagging all new and modified components

Use the `all` flag.

```bash
bit tag --all
```

You can also tag all new and modified component with the same version by specifying one.

```bash
bit tag --all 0.4.2
```

### Semantic versioning

A component's version is set according to the [semantic versioning](https://semver.org/) specs.
Meaning - version will be MAJOR.MINOR.PATCH.

By default, tagging a component without specifying a version will bump the patch version. In order to bump a minor/major version, tag with the appropriate flag.

Bump minor version

```bash
bit tag foo/bar --minor
```

Bump Major version

```bash
bit tag foo/bar --major
```

### Tagging and tests

Tagging a component will automatically run its tests. By default, tagging will be cancelled if tests fail.

In order to see test results, use the `verbose` flag:

```bash
bit tag foo/bar --verbose
```

In order to force the tagging even though tests fail, use the `force` flag:

```bash
bit tag foo/bar --force
```

### Tagging a component with package dependencies

When tagging, make sure you've properly installed all the component's [package dependencies](/docs/how-dependency-management.html). Otherwise, tagging will be cancelled:

```bash
bit tag foo/bar
```

Will result in:

```bash
foo/bar
missing packages dependencies: some-package
```

In order to tag the component even though it has missing dependencies, use the `ignore missing dependencies` flag:

```bash
bit tag foo/bar --ignore-unresolved-dependencies
```

## Options

**-m, --message <message>**

Log message describing the user changes.

```bash
bit tag foo/bar --message 'changed something, but I wont tell you what...'
```

**-a, --all [version]**

Tag all new and modified components

```bash
bit tag -all
```

**-b, --scope <collection-name>**

Tag all components of the specified Collection.

```bash
bit tag --scope foo
```

**-p, --patch**

Increments the patch version number (even though that's the default behavior, so that's practically redundant).

```bash 
bit tag foo/bar --patch
```

**-mi, --minor**

Increments the minor version number.

```bash 
bit tag foo/bar --minor
```

**-ma, --major**

Increments the major version number.

```bash 
bit tag foo/bar --major
```

**-f, --force**

Force tagging even if tests are failing or component hasn't changed.

```bash
bit tag foo/bar --force
```

**-v, --verbose**

Display test results when tagging.

```bash
bit tag foo/bar --verbose
```

**-i, --ignore-missing-dependencies**

Ignore missing package and file dependencies.

```bash
bit tag foo/bar --ignore-unresolved-dependencies
```

**--skip-tests**

Skip testing components when tagging a new version.

```bash
bit tag --skip-tests
```