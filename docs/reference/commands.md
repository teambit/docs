---
id: commands
title: Commands
---

import BitInit from '@site/docs/mdx-components/commands/bit-init.md'

### Help

#### Get information about available CLI commands

```bash
bit --help
```

#### Get information about a specific CLI command

```bash
bit <command> --help
```

### Workspace

#### Initialize a new workspace

<BitInit />

#### Start Bit development server / Run the Workspace UI

```bash
bit start
```

#### Get workspace status

```bash
bit status
```

#### Reset the workspace - hard

Deletes all Bit files and directories, including Bit configuration, tracking and locally stored component release versions.

```bash
bit init --reset-hard
```

#### Reset the workspace - soft

Removes all locally stored component release versions.
Reset the workspace `.bitmap` file and register components as if they were newly added.

```bash
bit init --reset-new
```

### Component workflow

#### Create a Component

```bash
bit create react-component <my-component> --namespace <namespace>
```

#### See Available Templates

```bash
bit templates
```

#### Track a component

To add pre-existing components not created with the `bit create` command.

```bash
bit add <path/to/component>
```

#### Track a component and set it with a namespace

```bash
bit add <path/to/component> --namespace <namespace>
```

Alias: `-n`

#### Untrack a component

```bash
bit untrack <component-id>
```

#### Get component configuration details

That includes its dependencies, package name, environment, etc.

```bash
bit show <component-id>
```

#### Version (tag) a component

```bash
bit tag <component-id> <new-version-number>
```

- Optional: `--message "a note about recent changes"`

#### Untag a component

```bash
bit untag <component-id>
```

#### Untag all components

```bash
bit untag --all
```

#### Export components

```bash
bit export
```

### Dependencies

#### Install a package

```bash
bit install <package-name>
```

#### Install all dependencies after cloning a workspace

This process will install all packages, import all components and link the imported components.

```bash
bit install
```

#### Import a component

Import a component from a remote scope.

```bash
bit import <component-id>
```

#### Import all components

Import all components listed in the workspace `.bitmap` file.

```bash
bit import
```

#### List all dependencies of a component and the reason for each dependency version

`EXPERIMENTAL`

```bash
bit dependencies <component-id>
```

### Component development

#### Compile a component

```bash
bit compile <component-id>
```

#### Compile all components

```bash
bit compile
```

#### Compile all components that were modified since their last compilation

```bash
bit compile --changed
```

#### Build a component

```bash
bit build <component-id>
```

#### Build all components

```bash
bit build
```

#### Test components

```bash
bit test
```

### Move or remove components

#### Move component to a different directory

```bash
bit mv <component> <target-dir>
```

#### Relink components to the workspace

'link' generates symlinks for components in the workspace `node_modules` directory.
The linking process happens automatically when a component is tracked.
There could be cases where the path to a component has been modified and that process needs to be re-run with to address recent changes.

```bash
bit link
```

#### Remove a component from the workspace

```bash
bit remove <component-id>
```

#### Deprecating a component in a workspace

```bash
bit deprecate <component-id>
```

#### Remove a component from a remote scope

```bash
bit remove <component-id> --remote
```

#### Deprecate a component in a remote scope

```bash
bit deprecate <component-id> --remote
```

### Other

#### Eject component configurations

Create a `component.json` file in the component's directory, to directly configure it. Learn more [here](/building-with-bit/manage-workspace#eject-component-configurations-componentjson).

```bash
bit eject-conf <component>
```
