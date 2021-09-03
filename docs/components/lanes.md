---
id: lanes
title: Lanes (component branches)
---

`Lanes` is designed to help developers apply and collaborate on changes across multiple components without interfering with the main development course. It lets developers manage cross-component dependency graph changes.

`Lanes` are highly inspired by Branches, implemented in SCMs such as Git. Imagine a git-branch that can sync changes between different repositories. Lanes are lightweight, making diverging to new lines of development very fast.

## Introduce `bit lane` functionality

bit-lane - List, create or manage lanes.

## Description

### Lanes in a nutshell

To understand how Bit manages Lanes, let's examine how Bit stores it's data.

Bit stores its data in a series of snapshots for each component.

When you take a snapshot to tag a component, Bit creates a pointer from the component to the snapshot object that was created (it also contains additional info, like data, message, etc). The new snapshot also points to the snapshot/tag that came directly before (this is considered as the **parent(s)**). A component's initial snapshot/tag has no parents, a normal snapshot has 1 parent, snapshots with multiple parents is the result of a merge between 2 or more lanes.

To visualize it let's assume that we have a project with a modified component.

```sh
bit snap comp-a
```

When you create a snap using `bit snap`, Bit checksums each the component's implementation, dependency graph, configuration and extensions, and stores it as an object in the Bit scope. Bit then creates a snapshot object that holds additional metadata (date, message).

The Bit scope now contains 3 objects:

- 1 blob that contains the contents of the component's implementation, dependencies, configurations....
- 1 snapshot to hold the metadata and point to the blob.
- 1 component that points to the snapshot.

[IMAGE SHOULD BE HERE]

If you make some changes and take another snap, Bit stores a pointer in the next snap to point to the commit that came before.

[IMAGE SHOULD BE HERE]

A Lane in Bit is simply a lightweight movable pointer to one of these snapshots. The default Lane name is **master**. As you start doing tags and snaps, you'r given a lane that points to the last snapshot. With every new snap/tag, the master lane moves forward automatically.

[IMAGE SHOULD BE HERE]

#### Lane can point to several components

We've covered the flow for a single component. But a lane can point to multiple snaps at the same time if they are of different components.

[IMAGE SHOULD BE HERE]

## Creating a new lane

What happens when we create a new Lane? Doing so creates a new pointer for you to move.

```sh
bit lane new-auth
```

This creates a new pointer to the same snap/tag you are already working on.

[IMAGE SHOULD BE HERE]

How does Bit know which Lane you are on? It keeps a **special pointer** called `HEAD`.

[IMAGE SHOULD BE HERE]

You can see it by running `bit X` command that shows you where the Lane pointer are pointing to.

```
## TODO FIGURE OUT LOG FOR WORKSPACE
```

## Switching lanes

To diverge to a different lane, use the `checkout` command.

```sh
bit checkout new-auth
```

This moves the `HEAD` pointer to the `new-auth` lane.

[IMAGE SHOULD BE HERE]

Now let's modify a component and take a snap.

```
# dome modification command
bit snap comp-a
```

[IMAGE SHOULD BE HERE]

The `new-auth` lane has moved forward, but `master` still points to the previous snap. You can switch back to `master`.

```sh
bit checkout master
```

[IMAGE SHOULD BE HERE]

This command did two things:

- It moved the `HEAD` pointer to the `master` lane.
- It revered **all components in the workspace** back to the snapshots that `master` points to.

This also means that all changes you make from this point onward will diverge from an older version of the component.

```sh
# some change
bit snap comp-a
```

Now the Lane contains a set of changes that **diverged**. Both changes are isolated in separate Lanes. You can switch back and forth between them. You can merge them together when you are ready.

[IMAGE SHOULD BE HERE]

You can also see in the the log.

```sh
# NEED TO DEFINE OUTPUT FORMAT TO SHOW LANE PROGRESSION
```

Lanes allow to track changes across components and sync them to ensure that if a change in a component has affects on other components, the side-effects are isolated to the lane, so they can be tested and verified before being applied. This means that you can create major breaking changes to several components, and only when their entire dependency graph complies with the changes - merge.

## Additional things I need to add to somewhere

### Detached HEAD

When checking out to an old snapshot/tag Bit should enter a 'detached HEAD' state. When hitting this state it is required that all further tags/snaps should be done in a new Lane.

### Component Tags in Lanes

Component Tag is an immutable version meant to be consumed and is linked to the component itself. This means that when you run `bit tag` in a Lane, you will no longer be able to delete that lane. Bit will do a **soft delete** for the Lane instead.

- bit should warn user against tagging in a lane
- tag can't depend on a snapshot

### more features and flows

- ability to checkout an entire lane to my workspace, regardless of the components i have checked-out
- importing a lane and create a workspace for it
- merge a part of a lane
- remove components from a lane
- `bit reflog` shows all snaps... to be able to recover stuff. (need a way to point a l)
- `bit reset`
- two phase tag/snap? (similar to git)
