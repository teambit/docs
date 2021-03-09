---
id: cheat-sheet
title: CLI Reference
---

### Help

#### Get information about available CLI commands

```
bbit --help
```

#### Get information about a specific CLI command

```
bbit <command> --help
```

### Workspace

#### Initialize a new workspace

```
bbit init --harmony
```

#### Start Bit development server / Run the Workspace UI

```shell
bbit start
```

#### Get workspace status

```shell
bbit status
```

#### Reset the workspace - hard

Deletes all Bit files and directories, including Bit configuration, tracking and locally stored component release versions.

```shell
bbit init --reset-hard
```

#### Reset the workspace - soft

Removes all locally stored component release versions.
Reset the workspace `.bitmap` file and register components as if they were newly added.

```shell
bbit init --reset-new
```

### Bit component workflow

#### Track a component

```shell
bbit add <path/to/component>
```

#### Track a component and set it with a namespace

```shell
bit add <path/to/component> --namespace <namespace>
```

Alias: `-n`

#### Untrack a component

```shell
bbit untrack <component-id>
```

#### Get component configuration details

That includes its dependencies, package name, environment, etc.

```shell
bbit show <component-id>
```

#### Version (tag) a component

```shell
$ bbit tag <component-id> <new-version-number>
```

- Optional: `--message "a note about recent changes"`

#### Untag a component

```shell
bbit untag <component-id>
```

#### Untag all components

```shell
bbit untag --all
```

#### Export components

```shell
$ bbit export
```

### Dependencies

#### Install a package

```shell
$ bbit install <package-name>
```

#### Install all dependencies after cloning a workspace

This process will install all packages, import all components and [link](/cli/cheat-sheet#relink-components-to-the-workspace) the imported components.

```shell
$ bbit install
```

#### Import a component

Import a component from a remote scope. Learn more [here](/components/importing).

```shell
bbit import <component-id>
```

#### Import all components

Import all components listed in the workspace `.bitmap` file.

```shell
bbit import
```

#### List all dependencies of a component and the reason for each dependency version

`EXPERIMENTAL`

```shell
bbit dependencies <component-id>
```

### Component development

#### Compile a component

```shell
bbit compile <component-id>
```

#### Compile all components

```shell
bbit compile
```

#### Compile all components that were modified since their last compilation

```shell
bbit compile --changed
```

#### Build a component

```shell
bbit build <component-id>
```

#### Build all components

```shell
bbit build
```

#### Test components

```shell
$ bbit test
```

#### Move component to a different directory

```shell
$ bbit mv <component> <target-dir>
```

#### Relink components to the workspace

'link' generates symlinks for components in the workspace `node_modules` directory.
The linking process happens automatically when a component is tracked.
There could be cases where the path to a component has been modified and that process needs to be re-run with to address recent changes.

```shell
$ bbit link
```

#### Remove a component from the workspace

```shell
$ bbit remove <component-id>
```

#### Eject component configurations

Create a `component.json` file in the component's directory, to directly configure it. Learn more [here](http://localhost:3005/workspace/cascading-rules#eject-component-configurations-componentjson).

```shell
bbit eject-conf <component>
```
