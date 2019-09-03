---
id: update-dependencies
title: Update Dependencies
permalink: docs/update-dependencies.html
layout: docs
category: Getting Started
prev: modifying-sourced-components.html
next: updating-sourced-components.html
---

In some cases in which we want to intervene with a component's dependency management.

Bit detects and manages all component's dependencies. With Bit, adding or removing packages is an automated task. Bit maintains a `package.json` file for each component. This off-loads most dependency management tasks to Bit.  
There are two types of dependencies, packages and components. We can manage both as package dependencies. But there are some unique cases and features around management of component dependencies.

## Update Component Dependencies

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

## Update Package Dependencies

Bit handles adding and removing of dependencies. Bit reads all component's code on every action. It then updates each component's `package.json` according to changes in the implementation. For example, if a file of a component requires a new package, Bit adds it to the `package.json`.

Tasks like changing a package version or moving a package from `dependency` to a `peedDependency` are manual.

### Viewing a component's package.json

By default Bit hides the component's `package.json` file. This is to reduce a component's footprint in a project. So the first step of managing dependencies is to have the `package.json` visible for editing. To make the `package.json` visible append `--conf` flag to the `import` command.

```bash
$ bit import <component ID> --conf
```

It's possible to append a specific location to which Bit writes the `package.json` file

```bash
$ bit import <component ID> --conf src/random/folder
```

### Change a dependency version

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

> **Note**
>
> The same flow is also effective for components that require other components as packages. This is not limited only for packages.

### Change from dependency to peerDependency

Bit determines the type of a package dependency [according to how a component uses it](/docs/tracking-dependencies.html). Bit keeps updating component's dependencies according to the same logic. Deciding between a `peerDependency` and a `dependency` is something that we should control. Bit offers this flexibility.  
The same flow for changing a component version works for this case as well. But unlike it, the change should be moving the package from the `dependencies` list to `peerDependencis`, and vice-versa.  
Let's follow a simple example:

```bash
$ bit import <component ID> --conf   # fetches the package.json
$ vim <path to package.json>  # edit package.json
$ bit status # to see that Bit registered the change
$ bit tag --patch  # create a new patch version for the update
$ bit export <remote collection> # share patch component
```