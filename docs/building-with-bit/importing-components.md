--- 
id: importing-components
title: importing
--- 

Importing a component, from a remote scope to your local workspace, allows you to maintain the component in your own workspace and even build, version and export it back to its remote scope with a new bumped version.

An imported component can have its configurations changed using the (hosting) workspace configuration file, and developed using the Workspace UI and the component dev environment (testing, compiling, etc.).

Once a component is imported and placed in a directory named `<scope-name>.<component-name>` as a default, it is linked to the `node_modules` directory so that it an be consumed by other components in the workspace using its package name (and not its relative path).

The component's compiled code will be available in the component package `dist` directory.
Modifying the component's source code will trigger a compilation process that will result in new dist files.

## Import a single component

A single component is imported using its ID. A component ID has the following pattern:

`scope-owner.scope-name/namespace/component-name`

For example, to import the `dots-loader` component from the `teaching` scope, owned by `teambit` and namespaced as `ui/elements`, we'll run the following command:

```shell
bit import teambit.teaching/ui/elements/dots-loader
```

To replace the default directory for that component, we'll add the `--path` flag and the preferred directory.

## Import all components in a scope or namespace

To import all components from the `teaching` scope, we'll replace the namespace and component name with the `*` sign:

```shell
bit import teambit.teaching/*
```

To limit our import to components under the `ui/elements` namespaces, we'll replace just the component name:

```shell
bit import teambit.teaching/ui/*
```

## Import the latest versions of components in a workspace

To get the latest versions of every imported component in our workspace, we'll run:

```shell
bit import
```

:::info the workspace component list
The list of authored/imported components in a workspace can be found using the `bit list` command
or by exploring the workspace `.bitmap` file.
:::

## Using local/remote components

Bit does not allow referencing one component to another, using relative paths. This is done in order to keep components independent and context-agnostic.

Tracked components, locally tagged components and imported components should all be `imported` / `required` into other components using their node module name.

For example:

```js
import { Button } from '@my-scope/button';
```

## Change the configurations of an imported component

Imported components can have their configurations modified using the workspace configuration file (`workspace.jsonc`).
That includes configurations that are set manually but also those set programmatically by other extensions (for example, the environment).
