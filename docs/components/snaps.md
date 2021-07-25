---
id: snaps
title: Snaps (component snapshots)
---

Bit components only support Tagging as a versioning feature. Component Tags capture the the component's functionality. They contain the component's implementation, dependency graph and additional metadata. A Tag is designed to be consumable so it is versioned using a SemVer. There's a need to keep intermediate component functionality and share them without affecting the consumption process.

The main difference between a **Tag** and a **Snap** is the fact that a Tag has a named SemVer as
a published version.

To resolve it there are several feature and improvements to implement:

## Introduce `bit snap` functionality

bit-snap - Records changes to a component.

A snapped component is staged to be exported.

### Description

Create a new snapshot of the current contents of a component and the given log message describing the changes. The new snap is listed in the component's index and is a child of the tip of the current Lane (another previous snapshot). The Lane is updated to point to the new tip.

A snapshot records a component functionality and holds additional information on the action:

- **Functionality** is defined by various data points and its contents is used as the snapshot's hash
  - **Implementation** as found in the tracked files in the workspace.
  - **Dependency graph** that includes all component's resolved dependencies, including components,
  packages, peerDependencies and devDependencies.
  - **Metadata** and additional configurations such as **build and test environments**, **overrides**,
  etc.
- **Parents** 0-N list of the previous snapshot/tag.
- **Revision** see [Human readable revision numbers](#human-readable-revision-numbers).
- **Author name and email** to understand which developer modified the component functionality.
- **Author date** the time the functionality has been changed.
- **Message** a message containing a summary of the change (we should consider splitting it to
  support **title** and **change type**).
- **Auto-snap information** that annotates that the snapshot has taken due to a dependency being `snap`-ed. It should include info on the component(s) that caused the triggered auto-snap.
- **Hash** the hash of the current **functionality**.

#### Differences from Tag

Unlike a Tag, Bit does not force a snapshot to pass tests/build steps.

#### Auto-snapshots for dependent components

Bit implicitly creates snapshots for components that depend on a component being explicitly `snap`-ed. The implicit auto-tag adds additional information on the snapshot like the dependency that caused the snapshot.
The `--message` for the auto-snap concats the message from the dependency and the dependency name.
In case several dependencies where `snap`-ed at the same time, the info saved for the auto-snap lists all components that caused the update. Additionally the auto-snap message concats all messages (create a paragraph for each individual dependency.)

#### Component HEAD pointer

Whenever a new snap occurs, the HEAD pointer of the component in that lane should point to the new snap.

##### Detached HEAD

Similar to Git. Can't do `snap` nor `tag` if HEAD points to a different snap than what's currently in the workspace. To resolve create a new lane.

### Synopsis

```bash
$ bit snap [--ignore-unresolved-dependencies] [--message] [--verbose] [--all] [--skip-tests] [--dependents] [--force] [<component id pattern>...]
```

#### Options

##### `--ignore-unresolved-dependencies`

Create a snapshot even if there are dependencies Bit is unable to resolve.

##### `--all`

Snap all new and modified components (synonym to `*` component ID pattern).

##### `--dependents`

Resolve the dependents graph of the components to snap, and create a snapshot of them, with an updated dependency graph (create snapshot for all pending-auto-snap components).

##### `--force`

Force Bit to take a snapshot even if component is not modified.

##### `[--message]`

Use as the message attached to the snapshot.

##### `component id pattern`

Glob-pattern indicated which component to create a snapshot for.

#### Examples

##### `bit snap --all`

Create a snapshot for all modified components.

##### `bit snap foo/bar --dependents`

Create a snapshot for `foo/bar` and all its dependent components recursively.

##### `bit snap foo/*`

Create a snapshot for all modified components that their name starts with `foo/*`.

## Update `bit tag`

- Version should reference to a snapshot, and include a SemVer.
- Version should support the additional `auto-tag` information, similar to snapshot.
- By default `bit tag` can only tag components that are already `snap`ped.

### New options

#### `--snap`

Create a snapshot for a new/modified component, and create a Tag that references to it.

#### `--dependents`

Similar to `snap`s `--dependents` flag - this option tags all components that depend on the tagged components. If any of them is new/modified, use the `--snap` to create a snapshot that the version points to.

#### Support component ID patterns

`bit tag` should support patterns to understand which components it should version. For example - `bit tag ui/*`.

## Caveats

### Tagged component dependency graph

The dependency graph of a component-version can't have snapshots in it. When tagging a version - you must tag all dependencies as well.

### bit.dev does not package snaps

Snaps are not meant to be consumed, so we should defer from letting projects depend on them.

## Affects on other commands

- **status** should show snaps as **staged**.
- **checkout** should allow checkout to a snap [TB: how? by hash?] [IM - yes, should also support abbreviated hash].
- **merge** should allow merging to and from a snap.
- **diff** should allow diffing snaps (and snap<>tags)
- **import** should import snaps alongside the rest of the component data.
- **export** should export snaps alongside the rest of the component data.
- **instal** TBD
- **remove** TBD
- **eject** TBD
- **link** should create a symlink in the `node_modules` folder to snaps.
- **log** should list all snaps alongside the tags in the component's log.
- **show** should work on snaps as well, and show snap information [TB: For all history?] [IM - component history is managed by `bit log`. `bit show` should simply show the hash and any additional information we find useful].