---
id: independent-component-versioning
title: Independent Component Versioning
---

To allow developers compose modular modern web application you can use Bit to version single components. This way you provide granular control over the composition of web applications. The advantages of per-component versioning are:

1. Meaningful updates.
1. Avoiding redundant dependency conflicts.
1. Continuous releases, hotfixes, and rollbacks.
1. Mix and match UI composition.
1. Retaining team independence.
1. Performance, stability, and dev velocity.

[Additional read on the subject of individual component versioning](https://blog.bitsrc.io/versioning-independent-ui-components-why-and-how-7ea60d8be5f2).

## Track changes

Once a component has been created or modified you can tell Bit to generate a change-file for the workspace, describing the next version for each component. As part of the process, Bit will validate that the component is properly isolated and is able to pass its build and test tasks.

```sh
# Track change for a specific component
$ bit tag base-ui/button
1 components set to be tagged | 1 added, 0 changed, 0 auto-tagged
added components:  base-ui/button@0.0.1

# Track changes for all modified component
$ bit tag --all

# Track changes for components according to their scope
$ bit tag <scope>/*
```

Add and commit the generated `change.json` file to your Git repository.

### Setting a specific version

By default Bit versions are incremented by semver patch versions. You can either define the version bump type as well as the target version.

```sh
bit tag --patch
bit tag --minor
bit tag --major
bit tag --version 1.2.3
```

### Setting a pre-release version

A pre-release version aims to define an unstable version of a component. Meaning that before you publish `1.0.0` you can publish `1.0.0-alpha.1`. This way consumers will know to which version the upcoming changes will be published to.

Use the `--pre-release` tag to annotate that the changes are upcoming changes for a future version. For example, say a component is currently in version `1.0.0`:

```sh
# By default, Bit does a patch bump. when `--pre-release` is added, pre-release is for a patch change.
$ bit tag --pre-release
userAvatar@1.0.1-alpha.1

# Set a pre-release version of a patch/minor/major update.
$ bit tag --pre-release [ --patch | --minor | major ]
userAvatar@1.0.1-alpha.1

# Set a pre-release with a specific name.
$ bit tag --pre-release delta
userAvatar@1.0.1-delta.1
```

#### Incrementing a pre-release

As long as you keep using the `--pre-release` option, Bit keeps incrementing the pre-release part of the component's semaver.

```sh
# keep the same pre-release name
# userAvatar@1.0.1-next.1
bit tag --pre-release
userAvatar@1.0.1-next.2

# update pre-release name
# userAvatar@1.0.1-next.1
bit tag --pre-release beta
userAvatar@1.0.1-beta.1

# set the pre-release to a different actual release
# userAvatar@1.0.1-next.1
bit tag --pre-release --major
userAvatar@2.0.0-next.1
```

#### Set a pre-release to a release version

Annotate that all work on the pre-release and the pre-release version is to be released by running `bit tag` without the `--pre-release` option. Bit then set the intended semver as the next version bump.

```sh
# tag the component userAvatar@1.0.1-next.3 without the --pre-release makes Bit tag it as 1.0.1, as it was the intended version.
bit tag
userAvatar@1.0.1
```

## Automatic dependents tagging

Bit manages dependencies between Bit components by storing the full dependency graph of the components. When you track changes to a component, Bit finds all components depending on it in your workspace. The dependent components are then incremented by a patch version, to comply with the fact that their dependency has been updated.

Let's say we have 2 components: A `navbar` and a `main-menu`. The `navbar` is importing the `main-menu` component as follow:

```javascript
import MainMenu from '../main-menu/main-menu';
```

Now let's make some modification to `main-menu` and see the workspace status.

```sh
$bit status
modified components
(use "bit tag --all [version]" to lock a version with all your changes)
(use "bit diff" to compare changes)

     > main-menu ... ok

components pending to be tagged automatically (when their dependencies are tagged)
     > navbar ... ok
```

When you issue the `bit tag` command, Bit logs a change for `navbar` as well:

```sh
$bit tag main-menu
2 component(s) tagged
(use "bit export [collection]" to push these components to a remote")
(use "bit untag" to unstage versions)

changed components
(components that got a version bump)
     > main-menu@0.0.2
       auto-tagged dependents: navbar@0.0.2
```

## Unstage component changes

If for some reason you require to unstage component, use the `bit untag` command.

```sh
# untag a specific component
bit untag foo/bar

# untag all components
bit untag --all

# untag all components that has a specific version
bit untag --all 1.0.0

# untag all components of a specific scope
bit untag <scope>/*
```
