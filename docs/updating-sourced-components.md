---
id: updating-sourced-components
title: Updating Sourced Components
permalink: docs/updating-sourced-components.html
layout: docs
category: Getting Started
prev: update-dependencies.html
next: merge-changes.html
---

With Bit, we can keep sourced components synced and up-to-date with remote changes.

If we use Bit to [source components in a project](/docs/sourcing-components.html), it is still possible to keep them up to date with remote changes. The reason for it is that Bit allows modifications of components from other projects. Updating sourced components is a part of a distributed component development workflow.  
The update process is a combination of two steps. The first step is to fetch all remote changes. The second step is to checkout the latest version of the components.

## Check for remote changes

Checking for remote changes is not a mandatory step. You can run a quick test to see if there are newer versions for all sourced components. To do this, we run the `bit list` command, with the `--outdated` flag.

```bash
bit list --outdated
```

## Get all updated versions

To fetch updated versions of all sourced components, run the `bit import` command.

```bash
$ bit import
successfully imported 2 components
- up to date bit.example/string/is-string
- updated bit.example/string/contains new versions: 1.0.1
```

You can also fetch the updated version of a specific component:

```bash
$ bit import bit.example/string/contains
successfully imported 1 components
- updated bit.example/string/contains new versions: 1.0.1
```

## See available pending updates for components

Use `bit status` to list all pending local updates of all sourced components.

```bash
$ bit status
pending updates
(use "bit checkout [version] [component_id]" to merge changes)
(use "bit log [component_id]" to list all available versions)

    > bit.example/string/contains current: 1.0.0 latest: 1.0.1
```

## Checkout a component version to the workspace

We can checkout fetched versions into the workspace. Using `bit checkout`, we tell Bit to switch the component's version in the workspace. If other components depend on a sourced component, updating its version updates their dependency tree.  
For example:

```bash
$ bit checkout 1.0.1 string/contains
successfully switched bit.example/string/contains to version 1.0.1

updated src/pad-left/contains.spec.js
updated src/pad-left/index.js
updated src/pad-left/contains.js
```

Now `string/contains`'s version in the workspace is `1.0.1`. Bit also updates the dependency trees of components that depend on it.

## Compare different versions of components

Bit supports comparing between versions of components:

```bash
$ bit diff bit.example/string/contains
```

Bit does not have a `diff` functionality. It uses `git diff`.
