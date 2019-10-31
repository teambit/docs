---
id: sourcing-components
title: Importing 
---

## Importing Components

Bit lets developers import component's source code to a consumer project.

With Bit, you can develop components from any repository. Inside the importing project, you can change the component.  
If a component was changed locally, you can either keep the changes locally or send them back to the component's collection. This depends on the organization's structure and the privileges developers have to change components.  

> If a component was changed locally for internal use, it is recommended to commit the component's source code to the project’s SCM.

### Importing component's source code

To import a component's code to a project, use [bit import](/docs/apis/cli-all#import).

```bash
$ bit import bit.utils/string/left-pad
```

**Import entire collection**

You can use glob patterns to import an entire collection, or a part of it

```bash
bit import bit.utils/*        # import entire collection
bit import bit.utils/array/*  # import entire namespace
```

> Depending on your OS, you may need to wrap the glob pattern with quotes

This command imports the component's source code to the project. Bit also fetches all resources and dependencies it needs to build and test the component. This makes the component usable in any project.

As part of the import process, Bit creates a set of binding files in the project's `node_modules` directory. This allows importing components like any other package:

```js
import component from '@bit.<owner>.<collection>.<namespace>.<component-name>';
```

#### Dependencies of sourced components

Bit makes sure to install all dependencies of sourced components. By default Bit installs component dependencies as packages, using the configured package manager in the [bit config](/docs/conf-bit-json.html) file. We can override this behavior and configure Bit to source the component dependencies instead.  
Bit installs package dependencies using the configured package manager. It is not possible to override this behavior, as node registries only support a single API for package installation.

#### Import a component to a specific path

Setting a destination to the imported component is possible. Bit writes the files there instead of the default location.

```bash
$ bit import bit.utils/string/left-pad --path src/components
```

#### Import a specific version

To import a specific version, specify it after the `@` sign:

```bash
bit import bit.examples/string/left-pad@0.0.11
```

### Importing packaged components

Bit handles sourcing of packaged components by modifying the linked files. In case we have installed a component using NPM, and now we need to source it, the step we need to do is to run `bit import`. Bit overrides the package with its linked files. This means that there's no need to change the code that imports the component.

### Import Default directory 

Set a default directory for component sourcing in your project's [bit config](/docs/conf-bit-json.html#componentsdefaultdirectory--string).

```js{2}
{
  "componentsDefaultDirectory": "src/{namespace}-{name}"
}
```

## Modify Imported Component

It's possible to change a component from any consuming project.

When we import a component using Bit, it downloads the source code of the component. Moreover, Bit keeps tracking the files as a component. This allows doing modifications to the component. It's also possible to run build and test tasks for imported components. This is because Bit keeps them isolated from the consumer project. All changes are also tracked, versioned and exported.

For example, if we import and component and then change, we can run `bit status` and see that the component is `modified`.

```bash
$ bit status
modified components
  > string/pad-left... ok
```

### Version an imported component

Sharing a modified version of a sourced component is like sharing any modified component. First we need to tag a new version and see that it is isolated. Afterwards we run `bit export` to share the new version.

```bash
$ bit tag string/left-pad
$ bit export bit.utils
```

### Keep local changes

In some cases we want to change a component and keep the modifications local. This can be because there are specific customizations required for that specific instance of a component. With Bit we can do that by importing components, make the changes, and track all files using Git.  
Bit still allows fetching remote changes for these components. We can even merge the changes to the modified component.

### Replace component with a package

It's possible to replace a sourced component with its corresponding node package. We call this process *eject*. When we eject a component using Bit, Bit triggers a delete action for the local component, and `npm install` command to install the package.

To eject a component on export:

```bash
$ bit export bit.examples string/left-pad --eject
```

To eject a component after export:

```bash
$ bit eject string/left-pad
```

Learn more about exporting and ejecting components [here](/docs/export#ejecting-components).

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

## Receive component changes

With Bit, we can keep sourced components synced and up-to-date with remote changes.

If we use Bit to [source components in a project](/docs/sourcing-components.html), it is still possible to keep them up to date with remote changes. The reason for it is that Bit allows modifications of components from other projects. Updating sourced components is a part of a distributed component development workflow.  
The update process is a combination of two steps. The first step is to fetch all remote changes. The second step is to checkout the latest version of the components.

### Check for remote changes

Checking for remote changes is not a mandatory step. You can run a quick test to see if there are newer versions for all sourced components. To do this, we run the `bit list` command, with the `--outdated` flag.

```bash
bit list --outdated
```

### Get all updated versions

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

### See available pending updates for components

Use `bit status` to list all pending local updates of all sourced components.

```bash
$ bit status
pending updates
(use "bit checkout [version] [component_id]" to merge changes)
(use "bit log [component_id]" to list all available versions)

    > bit.example/string/contains current: 1.0.0 latest: 1.0.1
```

### Checkout a component version to the workspace

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

### Compare different versions of components

Bit supports comparing between versions of components:

```bash
$ bit diff bit.example/string/contains
```

Bit does not have a `diff` functionality. It uses `git diff`.

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
