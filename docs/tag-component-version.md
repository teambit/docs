---
id: tag-component-version
title: Tagging a Component
permalink: docs/tag-component-version.html
redirect_from:
  - "docs/versioning-tracked-components.html"
layout: docs
category: Getting Started
next: building-components.html
prev: manage-component-files.html
---
Tagging a component creates a locked version of the component.

Component versions are immutable. This means that they contain all dependencies required to make a component usable. Its possible to version a component from any project. Component versioning is the last step before sharing a component.  
When you tag a component, Bit performs the actions below:

* **Locking dependency resolution.** Bit ensures it can resolve all dependencies. Afterward, Bit logs the dependencies' state.
* **Running component's build and test**. Bit runs compile and test tasks, if defined.
* **Setting a version for the component.** Bit uses [SemVer](https://semver.org) to version components.

## Tagging a component

Bit can only version tracked components that it can isolate. This example shows the component `hello/world`, which Bit can isolate.

```bash
$ bit status
new components
    > hello/world... ok
```

To tag the `hello/world` component, use [bit tag](/docs/cli-tag.html).

```bash
$ bit tag hello/world
1 components tagged | 1 added, 0 changed, 0 auto-tagged
added components:  hello/world@0.0.1
```

This command has tagged the new component `hello/world` in version `0.0.1`. By default, Bit increments a patch version when tagging. The component is now `staged`, as shown in the [bit status](/docs/cli-status.html) output. Bit can only export `staged` components.

```bash
$ bit status
staged components
    > hello/world
```

## Set a specific version

Bit can set a specific version when tagging a component.

```bash
$ bit tag hello/world 1.0.0
1 components tagged | 1 added, 0 changed, 0 auto-tagged
added components:  hello/world@1.0.0
```

## Versioning many components

Often, we'll want to tag many components at the same time. We do this with the `--all` flag.

The `--all` flag causes Bit to tag all new and modified components together. It can accept a specific SemVer for all components or increment each of the component's versions.  
To better understand this, let's take the following component status as an example:

```bash
$ bit status
new components
    > hello/world... ok
    > ui/button... ok
modified components
    > string/pad-left... ok
```

We have two new components (`hello/world` and `ui/button`) and one modified component (`string/pad-left`). We tag them together as follows:

```bash
$ bit tag --all
3 components tagged | 2 added, 1 changed, 0 auto-tagged
added components:  hello/world@0.0.1, ui/button@0.0.1
changed components: string/pad-left@1.0.2
```

We did not specify a version, so Bit has incremented all new and modified components by a patch version.

## Aligning all local components to the same version

It's possible to tag all components and set them with the same version. This is useful in cases where we need to ensure all components synced to a specific version release. To do this, we need to add the `--scope` flag to the command:

```bash
bit tag --scope 1.0.1
```

Bit tags all components with version `1.0.1`.

## Bumping component versions

The great thing about Semantic Versions is that it tells the consumers the type of change to expect. Bit double downs on it by allowing to state the type of change, and bump the version according to it.  
Bit can bump either patch, minor and major versions, as flags of `bit tag`.

```bash
bit tag --major          # Increment all modified and new components with a major version.
bit tag --minor          # Increment all modified and new components with a minor version.
bit tag --scope --patch  # Increment all components with a patch version.
bit tag --scope --patch  # Increment all components in the workspace with a patch version.
```

## Untagging components

We can untag staged components. Meaning that Bit has yet to export a version to a remote collection. Untagging a version won’t undo the code changes associated with that version. So, the component’s status reverts back to `new` or `modified`.  We untag a version using the `bit untag` command:

```bash
$ bit untag foo/bar
```

Note that when Bit untags a staged component, it removes all pending versions.

### Untagging a specific version

It's possible to remove a single version if we have several tagged version of a component. We need to specify the exact version we want to remove:

```bash
bit untag foo/bar 1.0.0
```

### Untagging a specific version for all the staged components

Untagging a specific *staged* version from all the staged components at once is done by using the `--all` option and specifying a version.

```bash
bit untag --all 0.11.4
```

### Untagging all the staged versions for all the components

To revert all staged versions in the workspace, use the `--all` flag, without specifying a version.

```bash
bit untag --all
```

## View component history

You can view a component's tag history using [bit log](/docs/cli-log.html).

```bash
bit log hello/world
```