---
id: tag-component-version
title: Versioning
---
Tagging a component creates a locked version of the component using the [`bit tag`](/docs/apis/cli-all#tag) command. This version can then be [exported](/docs/export).

Component versions are immutable. I.e., they contain the source code and all dependencies required to make a component usable. Components can be tagged and versioned from any project.  

A component's version is set according to the [semantic versioning](https://semver.org/) specs.
Meaning - version is MAJOR.MINOR.PATCH. By default, tagging a component without specifying a version bumps a patch version.  

When tagging a component or multiple components, Bit performs the actions below:

- Locking dependencies versions for the components.
- Running compile and test for the component.
- Setting a version of the component.
- Automatically tag components that depend on that component.

When a component is tagged, it moves into the [`staged` status](/docs/workspace#staged-components). You can revert tagging a component by running the [`bit untag`](/docs/apis/cli-all#untag)

## Tagging Components

Bit can only version tracked components that it can isolate, that is components that are new or modified stage. This example shows the component `hello/world`, which Bit can isolate.

```shell
$ bit status
new components
    > hello/world... ok
```

To tag the `hello/world` component, use [bit tag](/docs/apis/cli-all#tag).

```shell
$ bit tag hello/world
1 components tagged | 1 added, 0 changed, 0 auto-tagged
added components:  hello/world@0.0.1
```

You can tag a specific version by specifying its version number:  

```shell
$ bit tag hello/world 1.0.0
1 components tagged | 1 added, 0 changed, 0 auto-tagged
added components:  hello/world@1.0.0
```

You can also tag all the components in the scope that are new or modified using the `--all` option.  

```shell
$ bit status
new components
    > hello/world... ok
    > ui/button... ok
modified components
    > string/pad-left... ok

$ bit tag --all
3 components tagged | 2 added, 1 changed, 0 auto-tagged
added components:  hello/world@0.0.1, ui/button@0.0.1
changed components: string/pad-left@1.0.2
```

It is also possible to tag all the components that are in the local scope, using the `--scope` option. If you specify a version number, Bit aligns all the components to the same version.  

```shell
bit tag --scope 1.0.1 # all components on local scope are set to 1.0.1
```

### Setting a version

By default, Bit creates a SemVer patch version for any component that is tagged. You can specify a version when tagging components, and Bit sets this version.  

Bit can set a specific version when tagging a component.

```shell
$ bit tag hello/world 1.0.0
1 components tagged | 1 added, 0 changed, 0 auto-tagged
added components:  hello/world@1.0.0
```

You can specify a SemVer increment, so Bit tags all the components using that increment. Bit supports `patch`, `minor` and `major` increments.  

```shell
bit tag --all --major          # Increment all modified and new components with a major version.
bit tag --all --minor          # Increment all modified and new components with a minor version.
bit tag --scope --patch  # Increment all components with a patch version.
bit tag --scope --patch  # Increment all components in the workspace with a patch version.
```

### Dependencies resolution

When tagging versions, Bit recalculates dependencies as described [here](/docs/add-and-isolate-components#dependencies). If an error occurs, such as the package not found, the tagging is canceled.  

To tag the component even though it has missing dependencies, use the `ignore unresolved dependencies` flag:

```shell
bit tag foo/bar --ignore-unresolved-dependencies
```

### Build and Test

Before Tagging a component, Bit runs its build and test. Failure in build or tests cancels the tagging.  
To see test results, use the `verbose` flag:

```shell
bit tag foo/bar --verbose
```

To force the tagging even when tests fail, use the `force` flag:

```shell
bit tag foo/bar --force
```

## Untagging components

We can untag staged components, i.e., components that were tagged by not yet exported to a remote scope.  
Bit untag reverts the component to its previous state, i.e., `new`, `modified` or `exported`.  

>Untag does not revert code changes made in the component.  

Use `bit untag` to untag a component:

```shell
bit untag foo/bar
```

Untag removes all tags of the component that were not yet exported. You can untag a specific version by providing the version to untag:  

```shell
bit untag foo/bar 1.0.0
```

To untag a version from all the unstaged components use the `--all` option and specifying a version:

```shell
bit untag --all 0.11.4
```

To revert all staged versions in the workspace, use the `--all` flag, without specifying a version.

```shell
bit untag --all
```

## Automatic dependents tagging

Bit manages dependencies between Bit components by storing the full dependency graph of the components. When Bit tags a component, it also tags any other Bit components that exist in the local scope and depend on it. The dependent components are always tagged with a `patch` version, regardless of base component increment.  

Let's say we have 2 components: A `navbar` and a `main-menu`. The `navbar` is importing the `mainmenu` component as follow:  

```javascript
import MainMenu from '../main-menu/main-menu';
```

We [track](/docs/add-and-isolate-components) the components in bit, using the `bit add` command. `bit status` shows that components are added:  

```shell
$bit status
new components
(use "bit tag --all [version]" to lock a version with all your changes)

     > main-menu ... ok
     > navbar ... ok

```

We will tag both components so they are both on version `0.0.1`.  

```shell
$bit tag --all
2 component(s) tagged
(use "bit export [collection]" to push these components to a remote")
(use "bit untag" to unstage versions)

new components
(first version for components)
     > main-menu@0.0.1
     > navbar@0.0.1
```

Running `bit status` again now shows that the components are tagged:  

```shell
$bit status
staged components
(use "bit export <remote_scope> to push these components to a remote scope")

     > main-menu. versions: 0.0.1 ... ok
     > navbar. versions: 0.0.1 ... ok
```

Now, let's make some changes in the code of `main-menu`, the dependency of `navbar` and run `bit status` again:

```shell
$bit status
modified components
(use "bit tag --all [version]" to lock a version with all your changes)
(use "bit diff" to compare changes)

     > main-menu ... ok


staged components
(use "bit export <remote_scope> to push these components to a remote scope")

     > main-menu. versions: 0.0.1 ... ok
     > navbar. versions: 0.0.1 ... ok


components pending to be tagged automatically (when their dependencies are tagged)
     > navbar ... ok
```

We see that `main-menu` is modified, and as a result `navbar` is pending to be tagged as well, since its dependency was modified.  

now we will tag `main-menu`. As a result, we see that navbar is also tagged:

```shell
$bit tag main-menu
2 component(s) tagged
(use "bit export [collection]" to push these components to a remote")
(use "bit untag" to unstage versions)

changed components
(components that got a version bump)
     > main-menu@0.0.2
       auto-tagged dependents: navbar@0.0.2

```

Once the component is tagged, all tagged components including dependent components move to the [`staged` state](/docs/workspace#staged-components).  

### Skip auto tag

To skip tagging dependent components use the `--skip-auto-tag` flag:

```shell
bit tag foo/bar --skip-auto-tag
```

Alternatively, you can [untag](#untagging-components) the dependent components, so a new version pointing to the changed component is not created.  

### Auto tag rules  

- Components are always auto tagged with a patch version, regardless of the bump type applied on the dependency.  
- If a component is being auto-tagged, the version changes only include the dependency changes, even if the component has source code modifications. To include the source modification, the auto tagged component need to be included in the tagging, e.g. by using `bit tag --all`.  
- Tagging is propagated to the dependency chain of the component. E.g., Foo depends on Bar, which depends on Baz. Tagging Baz triggers auto-tagging of both Bar and Foo.  
- The auto tag only happens to components that exist in the scope where the component was tagged. The propagation of the auto-tag chain stops when a component is not on the local scope. E.g. if Bar is not in the local step, only Baz is tagged.  

## View component history

You can view a component's tag history using [bit log](/docs/apis/cli-all#log).

```shell
bit log hello/world
```
