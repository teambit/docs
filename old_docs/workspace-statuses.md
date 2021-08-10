---
id: workspace-statuses
title: Workspace Statuses
---

The `bit status` [command](/docs/apis/cli-all#status) displays the state of the tracked components in your project's workspace.

Knowing the state of the workspace's components is always important - which components are staged, modified or have missing dependencies, for example.
It's important to note that we're talking about **the state of components with pending changes** - meaning, components that are pending export - they could be tracked and before their first export, or modified after export.

## Component states

Listed here are all possible component states.

### Nothing to tag or export

This means there are no components with pending changes - either there are no files tracked in the workspace, or the tracked components are exported or sourced, with no pending changes.

```shell
$ bit status
nothing to tag or export
```

### New components

Components that have been tracked, but not yet tagged.

Bit tries to to validate if a _new component_ can be isolated, and will print all isolation issues it finds (if any).  
[Read more about the different isolation issues and how to resolve them](/docs/add-and-isolate-components#isolation-errors).

```shell
$ bit status
new components
  (use "bit tag --all [version]" to lock a version with all your changes)

          > bits/a ... ok
```

### Staged components

All tagged components that are ready to be [exported](/docs/apis/cli-all#export) and shared to a remote scope.

Staged component are fully isolated by Bit.

```shell
$ bit status
staged components
  (use "bit export <remote_scope> to push these components to a remote scope")

  > string/index. versions: 0.0.1, 0.0.2, 0.0.3 ... ok
  > string/is-string. versions: 0.0.1 ... ok
  > string/pad-left. versions: 0.0.1, 0.0.2 ... ok
```

### Modified components

Components that have already been staged, exported or sourced, and then modified - meaning there's at least one tagged version, and untagged changes on top of it.
Modified components are meant to be tagged and set as a new version.

Bit tries to to validate if a _modified component_ can be isolated, and will print all isolation issues it finds (if any).  
[Read more about the different isolation issues and how to resolve them](/docs/add-and-isolate-components#isolation-errors).

```shell
$ bit status
modified components
  (use "bit tag --all [version]" to lock a version with all your changes)
  (use "bit diff" to compare changes)

> string/pad-left ... ok
```

### Pending updates

Components with newer versions fetched by `bit import` and available to use.

> **Note**
>
> To start using the newer version, use [bit checkout](/docs/apis/cli-all#checkout).

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

Components whose component dependencies have been modified, and will be tagged automatically once the modified component is tagged.

```shell
$ bit status
components pending to be tagged automatically (when their dependencies are tagged)
  > string/index ... ok
```
