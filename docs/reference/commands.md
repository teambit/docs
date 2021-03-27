---
id: commands
title: Commands
---

import BitInit from '@site/docs/components/commands/bit-init.md'

### Help

#### Get information about available CLI commands

```
bit --help
```

#### Get information about a specific CLI command

```
bit <command> --help
```

### Workspace

#### Initialize a new workspace

<BitInit />

#### Start Bit development server / Run the Workspace UI

```shell
bit start
```

#### Get workspace status

```shell
bit status
```

#### Reset the workspace - hard

Deletes all Bit files and directories, including Bit configuration, tracking and locally stored component release versions.

```shell
bit init --reset-hard
```

#### Reset the workspace - soft

Removes all locally stored component release versions.
Reset the workspace `.bitmap` file and register components as if they were newly added.

```shell
bit init --reset-new
```

### Component workflow

#### Track a component

```shell
bit add <path/to/component>
```

#### Track a component and set it with a namespace

```shell
bit add <path/to/component> --namespace <namespace>
```

Alias: `-n`

#### Untrack a component

```shell
bit untrack <component-id>
```

#### Get component configuration details

That includes its dependencies, package name, environment, etc.

```shell
bit show <component-id>
```

#### Version (tag) a component

```shell
bit tag <component-id> <new-version-number>
```

- Optional: `--message "a note about recent changes"`

#### Untag a component

```shell
bit untag <component-id>
```

#### Untag all components

```shell
bit untag --all
```

#### Export components

```shell
bit export
```

### Dependencies

#### Install a package

```shell
bit install <package-name>
```

#### Install all dependencies after cloning a workspace

This process will install all packages, import all components and link the imported components.

```shell
bit install
```

#### Import a component

Import a component from a remote scope. Learn more [here](/building-with-bit/scopes).

```shell
bit import <component-id>
```

#### Import all components

Import all components listed in the workspace `.bitmap` file.

```shell
bit import
```

#### List all dependencies of a component and the reason for each dependency version

`EXPERIMENTAL`

```shell
bit dependencies <component-id>
```

### Component development

#### Compile a component

```shell
bit compile <component-id>
```

#### Compile all components

```shell
bit compile
```

#### Compile all components that were modified since their last compilation

```shell
bit compile --changed
```

#### Build a component

```shell
bit build <component-id>
```

#### Build all components

```shell
bit build
```

#### Test components

```shell
bit test
```

### Move or remove components

#### Move component to a different directory

```shell
bit mv <component> <target-dir>
```

#### Relink components to the workspace

'link' generates symlinks for components in the workspace `node_modules` directory.
The linking process happens automatically when a component is tracked.
There could be cases where the path to a component has been modified and that process needs to be re-run with to address recent changes.

```shell
bit link
```

#### Remove a component from the workspace

```shell
bit remove <component-id>
```

#### Deprecating a component in a workspace

```shell
bit deprecate <component-id>
```

#### Remove a component from a remote scope

```shell
bit remove <component-id> --remote
```

#### Deprecate a component in a remote scope

```shell
bit deprecate <component-id> --remote
```

### Other

#### Eject component configurations

Create a `component.json` file in the component's directory, to directly configure it. Learn more [here](/building-with-bit/workspace#eject-component-configurations-componentjson).

```shell
bit eject-conf <component>
```
