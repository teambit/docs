---
id: merge-changes
title: Merging Component Changes
permalink: docs/merge-changes.html
layout: docs
category: Getting Started
prev: updating-sourced-components.html
next: ext-concepts.html
---

Bit allows merging component modifications with incoming changes.

We want to merge them to all incoming changes to all sourced components, even if we have modified them. This is to ensure we get all recent updates and fixes for our components. With Bit this flow is very much possible. To do that, Bit uses Git's `diff` and `merge` commands.

## Merge incoming changes

Let’s merge the local and remote changes of `string/contains`:

Fetch remote changes with `bit import` (as explained [here](/docs/updating-sourced-components.html)):

```bash
$ bit import
successfully imported 2 components
- up to date bit.example/string/is-string
- updated bit.example/string/contains new versions: 1.0.1
```

A new version is available for `string/contains`. `bit status` shows this as well:

```bash
$ bit status
pending updates
(use "bit checkout [version] [component_id]" to merge changes)
(use "bit log [component_id]" to list all available versions)

    > bit.example/string/contains current: 1.0.0 latest: 1.0.1

modified components
(use "bit tag --all [version]" to lock a version with all your changes)

    > string/contains ... ok
```

In this case, we have also local modifications made to `string/contains`. To start the merge process, we need to checkout the latest version:

```bash
$ bit checkout 1.0.1 string/contains
successfully switched bit.example/string/contains to version 1.0.1

updated src/contains/contains.spec.js
updated src/contains/index.js
auto-merged src/contains/contains.js
```

Bit uses `git merge` to auto-merge the both versions.

```bash
$ bit status
modified components
(use "bit tag --all [version]" to lock a version with all your changes)

    > string/contains ... ok
```

## Handle merge conflicts

When Git can’t resolve a conflict between components, you need to resolve the conflict. There are three possible options:

* `--theirs` - the remote version overrides the local modifications.
* `--ours` - the local implementation overrides the remote changes.
* `--manual` - resolve the conflict manually.

Let's go back to the previous example. This time the versions cannot be auto-merged:

```bash
bit checkout 1.0.5 user.checkout/string/pad-left
automatic merge has failed for component user.checkout/string/pad-left.
please use "--manual" to manually merge changes or use "--theirs / --ours" to choose one of the conflicted versions
```

The first two options are straightforward. It's a decision between keeping our local modifications or use the incoming changes. let’s resolve the conflict using `--manual` option.

```bash
$ bit checkout 1.0.5 bit.example/string/pad-left --manual

successfully run npm install at /Users/user/Bit/test/src/pad-left

successfully switched bit.example/string/pad-left to version 1.0.5

updated src/pad-left/pad-left.spec.js
updated src/pad-left/index.js
CONFLICT src/pad-left/pad-left.js automatic merge failed. please fix conflicts manually and then tag the results.
```

To resolve the conflicts within the specified file, Bit will open the merge tool configured in Git.  
Once we resolve the merge, we can run `bit status` and see the result:

```bash
$ bit status
modified components
(use "bit tag --all [version]" to lock a version with all your changes)

     > string/pad-left ... ok
```

## Remote merge conflicts

We may encounter a merge conflict, if we tagged a new version and exported it. Let's resolve such conflict.  
The example shows a sourced component `pad-left`, tagged as `1.0.5`. It also has a remote version of `1.0.5`. Trying to import the remote version to merge the changes between them won't work. Bit cannot import a version that already exists:

```bash
$ bit import
error: merge conflict occurred while importing the component bit.example/string/pad-left. conflict version(s): 1.0.5
to resolve it and merge your local and remote changes, please do the following:
1) bit untag bit.example/string/pad-left 1.0.5
2) bit import
3) bit checkout 1.0.5 bit.example/string/pad-left
```

To resolve the conflict, `untag` the component’s local version.

```bash
$ bit untag bit.example/string/pad-left 1.0.5
1 component(s) were untagged:
bit.example/string/pad-left. version(s): 1.0.5
```

Next, `import` the remote version.

```bash
$ bit import
successfully imported one component
- updated bit.example/string/pad-left new versions: 1.0.5
```

Next, `checkout` the component’s latest version to the project's workspace. Resovle merge conflicts as they occur.

```bash
$ bit checkout 1.0.5 string/pad-left
successfully switched bit.example/string/pad-left to version 1.0.5

updated src/pad-left/pad-left.spec.js
updated src/pad-left/index.js
auto-merged src/pad-left/pad-left.js
```

Now `tag` a new version for the component.

```bash
$ bit tag --all
```

Version `1.0.6` can be now exported to the remote collection.
