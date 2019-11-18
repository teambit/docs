---
id: sourcing-components
title: Importing 
---

## Importing Components

To use a component in a workspace, the component needs to be fetched into the [local scope](/docs/how-bit-works#scope) and a specific version checked out into the [workspace](/docs/how-bit-works#workspace). Bit provides some shortcut command to make the work more fluent.  

![import](https://storage.cloud.google.com/static.bit.dev/docs/images/import.png)

## Initial Component Import

To import a component for the first time, i.e. component not yet exists in the workspace, you need to specify the component id:  

```bash
bit import bit.examples/foo
```

You can also specify a specific version to be imported:  

```bash
bit import bit.examples/foo@0.0.11
```

Bit then imports the component into the local scope and fetches the specified version (or latest, if none was specified) into the workspace with the following steps:  

- Update the [Bit components map](/docs/workspace#components-map) with the component's exact version
- Copy the component source code to a directory created in the [default component's directory](/docs/conf-bit-json#componentsdefaultdirectory), or in another location specified by the user with the `--path` option during the import.
- Update the workspace's top level `package.json` to include the new component as a dependency. This allows importing the component in the code as `'@bit.<owner>.<collection>.<namespace>.<component-name>'
- Create a symlink between the top level node_modules in the workspace and the locaiton of the installed component.  
- Install the component's dependencies using a package manager or imported using Bit according to the [dependencies policy](/docs/conf-bit-json#savedependenciesascomponents).  
- Write the built files from the component's cache. This can be overridden using the `--ignore-dist` option.  

At this point the source code of the component exists in the workspace. Running `bit status` does not show the component, but running `bit list` shows that the component exists in the workspace. 

## Importing New Versions

If a new version is added on the remote scope, you can import it into the local scope by running:  

```bash
$ bit import
successfully imported 2 components
- up to date bit.example/foo
- updated bit.example/baz new versions: 1.0.1
```

Bit notifies on any new versions found for the components that exist in the local workspace.

Running `bit status` also shows that there are pending changes for the component: 

```bash
$ bit status
pending updates
(use "bit checkout [version] [component_id]" to merge changes)
(use "bit log [component_id]" to list all available versions)

    > bit.example/baz current: 1.0.0 latest: 1.0.1
```

When importing specific component (or components) by their ids, Bit fetches the changes and also checks out the component's code into the workspace. Bit updates the index with the version of the newly fetched component. To fetch only the changes but without checking out the component into the workspace use:  

```bash
bit import foo --objects
```

## Importing for modified components

Bit behaves slightly differently when importing changes for a component that was modified locally:  

```bash
$ bit status
modified components
  > baz... ok
```

> If a component was changed locally for internal use, it is recommended to commit the component's source code to the project’s SCM.

When running `bit import` with the component id, Bit imports the changes into the scope, but stops before checking out the component into the workspace. The component now exists in two parallel statues: modified, due to the local changes and pending updates, due to the incoming version:

```bash
$ bit status
pending updates
(use "bit checkout [version] [component_id]" to merge changes)
(use "bit log [component_id]" to list all available versions)

    > bit.example/foo current: 1.0.0 latest: 1.0.1

modified components
(use "bit tag --all [version]" to lock a version with all your changes)

    > foo ... ok
```

There are two options for handling the changes:  

### Checkout

running [`bit checkout`](/docs/apis/cli-all#checkout) checks the latest version (or a version that was specified as the component's version) in the workspace. Bit uses git diff to merge with existing changes. In case of conflicts, Bit notifies and let merge the changes: 

```bash
$ bit checkout 1.0.1 foo
successfully switched bit.example/foo to version 1.0.1

updated src/foo/foo.spec.js
updated src/foo/index.js
auto-merged src/foo/foo.js
```

The component is now on the version that was checked out with the local changes on top of it.

### Merge

Running [`bit merge`](/docs/apis/cli-all#merge) gets the changes from the remote into the component's version that exists in our workspace.

```bash
$ bit status
modified components
(use "bit tag --all [version]" to lock a version with all your changes)

    > foo ... ok
```

> For both merge and checkout bit can be instructed on how to resolve merge conflicts if exist, using the ours, theirs or manual strategies.


## Component Dependencies

Bit makes sure to install all dependencies of sourced components. By default Bit installs component dependencies as packages, using the configured package manager in the [bit config](/docs/conf-bit-json) file. We can override this behavior and configure Bit to source the component dependencies instead.  
Bit installs package dependencies using the configured package manager. It is not possible to override this behavior, as node registries only support a single API for package installation.

### Importing packaged components

Bit handles sourcing of packaged components by modifying the linked files. In case we have installed a component using NPM, and now we need to source it, the step we need to do is to run `bit import`. Bit overrides the package with its linked files. This means that there's no need to change the code that imports the component.

## Update Component Dependencies

In some cases in which we want to intervene with a component's dependency management.

Bit detects and manages all component's dependencies. With Bit, adding or removing packages is an automated task. Bit maintains a `package.json` file for each component. This off-loads most dependency management tasks to Bit.  
There are two types of dependencies, packages and components. We can manage both as package dependencies. But there are some unique cases and features around management of component dependencies.  

To update a component dependency we need to fetch the new version of the dependency, and have it available in the project's workspace. Bit detects changes to component versions in a workspace, and change dependency trees accordingly. A change in a component's dependency tree makes Bit mark the component as `modified`. `modified` components can tagged and exported as a new version. In this case, the change in the version will be of an up-to-date dependency.  
Let's see this in action:

```bash
$ bit import bit.example/string/contains # fetch updated version of a component dependency
successfully imported 1 component
- updated bit.example/string/contains new versions: 1.0.1
$ bit checkout 1.0.1 string/contains # change the version of the dependency in the worksapce
successfully switched bit.example/string/contains to version 1.0.1
$ bit status # see that the component the depends on string/contains is modified
modified components
  > string/pad-left... ok
$ bit tag string/pad-left --patch # tag string/pad-left with a new patch version, to log the updated change
$ bit export string/pad-left
```

Use the same workflow to downgrade dependency versions.

### Update Package Dependencies

Bit handles adding and removing of dependencies. Bit reads all component's code on every action. It then updates each component's `package.json` according to changes in the implementation. For example, if a file of a component requires a new package, Bit adds it to the `package.json`.

Tasks like changing a package version or moving a package from `dependency` to a `peedDependency` are manual.

#### Viewing a component's package.json

By default Bit hides the component's `package.json` file. This is to reduce a component's footprint in a project. So the first step of managing dependencies is to have the `package.json` visible for editing. To make the `package.json` visible append `--conf` flag to the `import` command.

```bash
$ bit import <component ID> --conf
```

It's possible to append a specific location to which Bit writes the `package.json` file

```bash
$ bit import <component ID> --conf src/random/folder
```

#### Change a dependency version

To change a version of a package dependency we need to edit the `package.json` of the component. This change can be a version upgrade or a downgrade.  
First of all, we need to make the component's `package.json` visible. Afterwards change it as needed. Bit tracks changes in the `package.json`, and reflects them as changes in the component. We can then version and export the modified component.  
Let's follow a simple example:

```bash
$ bit import <component ID> --conf   # fetches the package.json
$ vim <path to package.json>  # edit package.json
$ bit status # to see that Bit registered the change
$ bit tag --patch  # create a new patch version for the update
$ bit export <remote collection> # share patch component
```

> The same flow is also effective for components that require other components as packages. This is not limited only for packages.

#### Change from dependency to peerDependency

Bit determines the type of a package dependency [according to how a component uses it](/docs/add-and-isolate-components). Bit keeps updating component's dependencies according to the same logic. Deciding between a `peerDependency` and a `dependency` is something that we should control. Bit offers this flexibility.  
The same flow for changing a component version works for this case as well. But unlike it, the change should be moving the package from the `dependencies` list to `peerDependencis`, and vice-versa.  
Let's follow a simple example:

```bash
$ bit import <component ID> --conf   # fetches the package.json
$ vim <path to package.json>  # edit package.json
$ bit status # to see that Bit registered the change
$ bit tag --patch  # create a new patch version for the update
$ bit export <remote collection> # share patch component
```



## Merge incoming changes

Bit allows merging component modifications with incoming changes.

We want to merge them to all incoming changes to all sourced components, even if we have modified them. This is to ensure we get all recent updates and fixes for our components. With Bit this flow is very much possible. To do that, Bit uses Git's `diff` and `merge` commands.

Let’s merge the local and remote changes of `string/contains`:

Fetch remote changes with `bit import` (as explained [here](/docs/updating-sourced-components.html)):

```bash
$ bit import
successfully imported 2 components
- up to date bit.example/string/is-string
- updated bit.example/string/contains new versions: 1.0.1
```

A new version is available for `string/contains`. `bit status` shows this as well:



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

### Handle merge conflicts

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

### Remote merge conflicts

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


The `bit import` command brings the source code of the component into the workspace where the user ran the build. 
Code is imported from a remote scope, such as `bit.dev` collection:  

```bash
bit import bit.utils/string/left-pad
```

Importing components is combined of two fold:  

1. Bringing the code into the [component storage](/docs/workspace#components-storage-scope) in the local workspace.  
1. Updating the workspace with the files changes