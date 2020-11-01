---
id: vendor-components
title: Vendor Components
---

To keep your project independent and take ownership of your dependencies, use `bit import` to vendor any component to be a module in your workspace.

## Import a component

To import a component for the first time, i.e. component not yet exists in the workspace, you need to specify the component id:

```sh
bit import bit.examples/foo
```

You can import multiple components at once using glob patterns:

```sh
# Imports all components in the remote collection
bit import "<owner>.<collection>/*"

# Imports all component under the namespace in a remote collection
bit import "<owner>.<collection>/<namespace>/*"
```

You can also specify a specific version to be imported:

```sh
bit import bit.examples/foo@0.0.11
```

Bit then imports the component into the local scope and fetches the specified version (or latest, if none was specified) into the workspace with the following steps:

- Update the Bit components map with the component's exact version
- Copy the component source code to a directory created in the default component's directory, or in another location specified by the user with the `--path` option during the import.
- Create a symlink between the top level node_modules in the workspace and the location of the installed component.
- Install the component's dependencies using a package manager or imported using Bit according to the dependencies policy.
- Write the built files from the component's cache.

At this point the source code of the component exists in the workspace. Running `bit status` does not show the component, but running `bit list` shows that the component exists in the workspace.

## Commit local changes

You can keep local modifications for imported component. To do that you can simply `git commit` your modifications.

## Importing New Versions

If a new version is added on the remote scope, you can import it into the local scope by running:

```sh
$ bit import
successfully imported 2 components
- up to date bit.example/foo
- updated bit.example/baz new versions: 1.0.1
```

Bit notifies on any new versions found for the components that exist in the local workspace.

Running `bit status` also shows pending changes for the component:

```sh
$ bit status
pending updates
(use "bit checkout [version] [component_id]" to merge changes)
(use "bit log [component_id]" to list all available versions)

    > bit.example/baz current: 1.0.0 latest: 1.0.1
```

When importing specific component (or components) by their ids, Bit fetches the changes and also checks out the component's code into the workspace. Bit updates the index with the version of the newly fetched component. To fetch only the changes but without checking out the component into the workspace use:

```sh
bit import foo --objects
```

## Importing for modified components

Bit behaves slightly differently when importing changes for a component that was modified locally:

```sh
$ bit status
modified components
  > foo... ok
```

> If a component was changed locally for internal use, it is recommended to commit the component's source code to the project’s SCM.

When running `bit import` with the component id, Bit imports the changes into the scope, but stops before checking out the component into the workspace. The component now exists in two parallel statues: modified, due to the local changes and pending updates, due to the incoming version:

```sh
$ bit status
pending updates
(use "bit checkout [version] [component_id]" to merge changes)
(use "bit log [component_id]" to list all available versions)

    > bit.example/foo current: 1.0.0 latest: 1.0.1

modified components
(use "bit tag --all [version]" to lock a version with all your changes)

    > foo ... ok
```

The two options for handling the changes are:

### Checkout

Running `bit checkout` checks the latest version (or a version that was specified as the component's version) in the workspace. Bit uses git diff to merge with existing changes. In case of conflicts, Bit notifies and let merge the changes:

```sh
$ bit checkout 1.0.1 foo
successfully switched bit.example/foo to version 1.0.1

updated src/foo/foo.spec.js
updated src/foo/index.js
auto-merged src/foo/foo.js
```

The component is now on the version that was checked out with the local changes on top of it.

### Merge

Running `bit merge` gets the changes from the remote into the component's version that exists in our workspace.

```sh
$ bit status
modified components
(use "bit tag --all [version]" to lock a version with all your changes)

    > foo ... ok
```

Bit uses `git merge-file` to attempt merging the changes between versions. When trying to merge, conflicts may occur:

```sh
$ bit checkout 1.0.5 bit.example/foo --manual
successfully run npm install at /Users/user/Bit/test/src/foo
successfully switched bit.example/foo to version 1.0.5
updated src/foo/foo.spec.js
updated src/foo/index.js
CONFLICT src/foo/foo.js automatic merge failed. please fix conflicts manually and then tag the results.
```

If it cannot resolve the conflict, it needs user's guidance to select one of three possible options:

- `--theirs` - the remote version overrides the local modifications.
- `--ours` - the local implementation overrides the remote changes.
- `--manual` - resolve the conflict manually.

> For both merge and checkout bit can be instructed on how to resolve merge conflicts if exist, using the ours, theirs or manual strategies.

Once we resolve the merge, we can run `bit status` and see the result:

```sh
$ bit status
modified components
(use "bit tag --all [version]" to lock a version with all your changes)

     > foo ... ok
```

## Merge remote conflicts

We may encounter a merge conflict, if we tagged a new version and exported it. Let's resolve such conflict.  
The example shows a sourced component `foo`, tagged as `1.0.5`. It also has a remote version of `1.0.5`. Trying to import the remote version to merge the changes between them won't work. Bit cannot import a version that already exists:

```shell
$ bit import
error: merge conflict occurred while importing the component bit.example/string/pad-left. conflict version(s): 1.0.5
to resolve it and merge your local and remote changes, please do the following:
1) bit untag bit.example/foo 1.0.5
2) bit import
3) bit checkout 1.0.5 bit.example/foo
```

To resolve the conflict, `untag` the component’s local version.

```shell
$ bit untag bit.example/foo 1.0.5
1 component(s) were untagged:
bit.example/foo. version(s): 1.0.5
```

Next, `import` the remote version.

```shell
$ bit import
successfully imported one component
- updated bit.example/foo new versions: 1.0.5
```

Next, `checkout` the component’s latest version to the project's workspace. Resolve merge conflicts as they occur.

```shell
$ bit checkout 1.0.5 foo
successfully switched bit.example/foo to version 1.0.5

updated src/foo/foo.spec.js
updated src/foo/index.js
auto-merged src/foo/foo.js
```

Now `tag` a new version for the component.

```shell
bit tag --all
```

Version `1.0.6` can be now exported to the remote collection.
