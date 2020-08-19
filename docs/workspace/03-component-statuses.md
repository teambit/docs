---
id: statuses
title: Component States
---

Bit displays the state of the tracked components in your project's workspace.

Knowing the state of the workspace's components is always essential - which components are staged, modified, or have missing dependencies, for example. A component may have more than one state. A state derived from its code status (such as modified) and a state derived from its dependencies (e.g., pending to be tagged).

> TODO - Diagram

## Get component state

Bit shows the state of each component in the workspace' component list using annotations and icons. You can also get this data by running the `bit status` command in the terminal.

> This document uses the terminology used as part of the terminal outputs.

## States

### Nothing to tag or export

No components have pending changes. Either no files are tracked in the workspace, or the tracked components are exported or sourced, with no pending changes.

```shell
$ bit status
nothing to tag or export
```

### New components

Components that have been tracked, but not yet tagged.

Bit tries to validate if a *new component* can be isolated, and will print all isolation issues it finds (if any). 
[Read more about the different isolation issues and how to resolve them](/docs/add-and-isolate-components#isolation-errors).

```shell
$ bit status
new components
 (use "bit tag --all [version]" to lock a version with all your changes)

 > bits/a ... ok
```

### Staged components

All tagged components that are ready to be [exported](/docs/apis/cli-all#export) and shared to a remote Collection.

Staged components are fully isolated by Bit.

```shell
$ bit status
staged components
 (use "bit export <remote_collection> to push these components to a remote Collection")

 > string/index. versions: 0.0.1, 0.0.2, 0.0.3 ... ok
 > string/is-string. versions: 0.0.1 ... ok
 > string/pad-left. versions: 0.0.1, 0.0.2 ... ok
```

### Modified components

Components that have already been staged exported or sourced, and then modified - meaning there's at least one tagged version, and untagged changes on top of it.
Modified components are meant to be tagged and set as a new version.

Bit tries to validate if a *modified component* can be isolated, and will print all isolation issues it finds (if any). 
[Read more about the different isolation issues and how to resolve them](/docs/add-and-isolate-components#isolation-errors).

```shell
$ bit status
modified components
 (use "bit tag --all [version]" to lock a version with all your changes)
 (use "bit diff" to compare changes)

> string/pad-left ... ok
```

### Pending updates

Components with newer versions fetched by `bit import` and available to use. Use [bit checkout](/docs/apis/cli-all#checkout) to start using the newer version.

```shell
$ bit status
pending updates
 (use "bit checkout [version] [component_id]" to merge changes)
 (use "bit diff [component_id] [new_version]" to compare changes)
 (use "bit log [component_id]" to list all available versions)

 > string/pad-left current: 0.0.1 latest: 0.0.2
```

### Deleted components

A component's files were physically deleted from the filesystem, but the component is still listed by Bit. The component should be removed using `bit remove`.

```shell
$ bit status
deleted components
 these components were deleted from your project.
 use "bit remove [component_id]" to remove these component from your workspace

 > bits/b ... ok
```

### Component pending to be tagged automatically

Component (not in state new) whose at least one of its dependencies is in modified state. 

```shell
$ bit status
components pending to be tagged automatically (when their dependencies are tagged)
 > string/index ... ok
```
