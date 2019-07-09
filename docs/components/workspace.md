---
id: workspace
title: Bit Workspaces
sidebar_label: Workspaces
---

## Bit Architecture Parts 

The bit platform is composed of the following parts: 
- Bit local Workspace
- Bit Server
- Bit cloud
- Bit machine configuration

## Bit Workspace

All bit components are managed inside a local workspace. Typically, a workspace will be a single project or repository, but a single repository can also include multiple workspaces. 

A workspace is initialized with the `bit init` command. A bit workspace will contain at minimum, the package manager that is used to install bit components (`npm`) the following the following: 


### Bit Configuration File

The bit configuration file is managed by default in the project's `package.json` file, under the `bit` section. Alterntively, the bit configuration can be located in a separate file called `bit.json`. 
The configuration file will include the following: 


[bit](/docs/conf-bit-json.html) config is Bit's main configuration section. By default it is managed in the project's `package.json` file. If you choose to set up bit in `standalone` mode, Bit generate a `bit.json` file to hold the configuration.

The `bit init` command initializes the Bit workspace. Once The workspace is initialized, the following resources will be created: 

- A bit config file at the project root (bit.json)
- A `.bitmap` file 
- Bit local storage directory

### Bit local storage

The local storage stores Bit objects (components, versions, etc.). Bit manages it in a directory called `.bit`. If you use [Git](git-scm.com), Bit creates a local storage directory in the `.git` directory. Do not track changes in the `.bit` directory using SCM. Make sure to add it to the `.gitignore` file.

To force Bit not to nest the local storage in `.git`, use the `--standalone` flag:

```bash
bit init --standalone
```

### bit config

Bit manages two types of configurations for components. `env` for defining build and test configurations, and component dependencies. While `env` is manual, [dependency management is automated](/docs/component-dependencies.html).  
During the versioning process, Bit saves the current component configuration as part of the component-version.

* Only relevant when `useWorkspaces:true` and `packageManager:"yarn"`.
* Bit manages `componentsDefaultDirectory` and `dependenciesDirectory` and all [custom import
  paths](https://docs.bit.dev/docs/cli-import.html#import-a-single-component-from-a-remote-collection).
* Bit marks root `package.json` as `private:true`.

### .bitmap

`.bitmap` maps components with local files in the workspace. Bit uses this file to import and update sourced components in the correct paths in a workspace. You should track this file by an SCM tool, alongside the project.

The `bit status` [command](/docs/cli-status.html) displays the state of the tracked components in your project's workspace.

Knowing the state of the workspace's components is always important - which components are staged, modified or have missing dependencies, for example.
It's important to note that we're talking about **the state of components with pending changes** - meaning, components that are pending export - they could be tracked and before their first export, or modified after export.

## Component states

Listed here are all possible component states.

### Nothing to tag or export

This means there are no components with pending changes - either there are no files tracked in the workspace, or the tracked components are exported or sourced, with no pending changes.

```bash
$ bit status
nothing to tag or export
```

### New components

Components that have been tracked, but not yet tagged.

Bit tries to to validate if a *new component* can be isolated, and will print all isolation issues it finds (if any).  
[Read more about the different isolation issues and how to resolve them](/docs/troubleshooting-isolating.html).

```bash
$ bit status
new components
  (use "bit tag --all [version]" to lock a version with all your changes)

          > bits/a ... ok
```

### Staged components

All tagged components that are ready to be [exported](/docs/cli-export.html) and shared to a remote Collection.

Staged component are fully isolated by Bit.

```bash
$ bit status
staged components
  (use "bit export <remote_collection> to push these components to a remote Collection")

  > string/index. versions: 0.0.1, 0.0.2, 0.0.3 ... ok
  > string/is-string. versions: 0.0.1 ... ok
	> string/pad-left. versions: 0.0.1, 0.0.2 ... ok
```

### Modified components

Components that have already been staged, exported or sourced, and then modified - meaning there's at least one tagged version, and untagged changes on top of it.
Modified components are meant to be tagged and set as a new version.

Bit tries to to validate if a *modified component* can be isolated, and will print all isolation issues it finds (if any).  
[Read more about the different isolation issues and how to resolve them](/docs/troubleshooting-isolating.html).

```bash
$ bit status
modified components
  (use "bit tag --all [version]" to lock a version with all your changes)
  (use "bit diff" to compare changes)

> string/pad-left ... ok
```

### Pending updates

Components with newer versions fetched by `bit import` and available to use.

> **Note**
>
> To start using the newer version, use [bit checkout](/docs/cli-checkout.html).

```bash
$ bit status
pending updates
  (use "bit checkout [version] [component_id]" to merge changes)
  (use "bit diff [component_id] [new_version]" to compare changes)
  (use "bit log [component_id]" to list all available versions)

        > string/pad-left current: 0.0.1 latest: 0.0.2
```

### Deleted components

A component's files were physically deleted from the filesystem, but the component is still listed by Bit. The component should be removed using `bit remove`.

```bash
$ bit status
deleted components
  these components were deleted from your project.
  use "bit remove [component_id]" to remove these component from your workspace

         > bits/b ... ok
```

### Component pending to be tagged automatically

Components whose component dependencies have been modified, and will be tagged automatically once the modified component is tagged.

```bash
$ bit status
components pending to be tagged automatically (when their dependencies are tagged)
  > string/index ... ok
```
