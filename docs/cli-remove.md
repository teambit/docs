---
id: cli-remove
title: Remove
permalink: docs/cli-remove.html
layout: docs
category: CLI Reference
prev: cli-remote.html
next: cli-show.html
---

Removes a component - will delete a specific version, or the entire component and all of its versions. Use this with care. If a component has other components depending on it within the same Scope, you will be required to change them so they will not use it (or use the --force flag).

## Synopsis

```bash
bit remove|rm [-r|--remote] [-f|--force] [-d|--delete-files] [-s|--silent] [-t|--track] <ids...>
```

## Examples

### Remove a component from its remote Scope

In order to remove a component from a [remote Scope](/docs/organizing-components-in-scopes.html#create-a-remote-scope), just specify the [full component id](/docs/isolating-and-tracking-components.html#automatic-component-id-resolution) and add the remote flag `--remote `.

```bash
bit remove username.your-scope/foo/bar --remote
```

> **Note**
>
> You have to be an [owner or a collaborator](/docs/scopes-on-bitsrc.html#permission-types) on the [remote Scope](/docs/organizing-components-in-scopes.html#create-a-remote-scope) in order to be able to remove components from it.

#### Remove a component from its remote Scope when other components depend on it

What happens in case you're trying to remove a component that's already being used by another component?

* When both components are in the same Scope, Bit will prevent you from removing, unless you use the `--force` flag.

```bash
bit remove username.your-scope/foo/bar --force
```

* When the dependent component is in a different Scope, removal will go as planned. That's because a cached version of the removed component will remain on the other Scope, and the dependent component will continue functioning as usual.

### Remove a component from your local Scope

In order to remove a component from your [local Scope](/docs/what-is-bit.html#what-is-a-scope-collection), just specify the [local component id](/docs/isolating-and-tracking-components.html#automatic-component-id-resolution) (meaning - just namespace and name).

```bash
bit remove foo/bar
```

#### Remove a component that other components depend on

What happens when other components in your local Scope depend on the removed component?

* If an [exported](/docs/cli-export.html) component depends on the removed component, removal will go as planned. That's because a cached version of the removed component will remain.
* If a [new](/docs/cli-status.html#component-status-definitions) component depends on the removed component, removal will go on as planned.
* If a [staged](/docs/cli-status.html#component-status-definitions) component depends on the removed component, Bit will prevent you from removing, unless you use the `--force` flag.

```bash
bit remove foo/bar --force
```

#### Remove a modified component from your local Scope

When you try to remove a [modified](/docs/cli-status.html#component-status-definitions) component from your local Scope, Bit will prevent you from doing it, unless you use the `--force` flag.

```bash
bit remove foo/bar --force
```

> **Note**
>
> Removing a [new](/docs/cli-status.html#component-status-definitions) component is basically just untracking it, so just use the [untrack command](/docs/cli-untrack.html) for that.

#### Remove a staged component from your local Scope

Removing a [staged](/docs/cli-status.html#component-status-definitions) component will remove and untrack it (meaning - it will be removed from the [.bitmap file](/docs/initializing-bit.html#bitmap)). 
If you want Bit to also delete the component files, use the `--delete-files` flag:

```bash
bit remove foo/bar --delete-files
```

If, on the other hand, you want to keep tracking it as a [new](/docs/cli-status.html#component-status-definitions) component, use the `--track` flag:

```bash
bit remove foo/bar --track
```

> **Note**
>
> If you've [tracked](/docs/isolating-and-tracking-components.html) and [tagged](/docs/versioning-tracked-components.html) two components, and one depends on the other, removing it will remove its dependency as well.

#### Silently approves remove confirmation message

Accept the `remove` prompt, without using `--force`.

```bash
bit remove foo/bar --silent
```

## Options

**-r, --remote**

Remove the component from a remote Scope.

```bash
bit remove foo/bar --remote
```

**-f, --force**

Force remove a component, even if Bit prevents it by default.

```bash
bit remove foo/bar --force
```

**-d, --delete-files**

Delete the component's files when removing a staged component that hasn't been exported yet.

```bash
bit remove foo/bar --delete-files
```

**-t, --track**

Keep tracking the component

```bash
bit remove foo/bar --track
```

**-s, --silent**

Skip remove confirmation

```bash
bit remove foo/bar --silent
```