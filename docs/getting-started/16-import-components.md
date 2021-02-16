---
id: import-components
title: Import Components
---

A Bit workspace can locally clone a complete component, alondside its implementation, configuration and dependencies.

## Initialize a Bit Workspace

Before we can import the component's implementation we'll need to initialize a Bit worksspace for the **my-consumer** application.

```sh
$ bbit init --harmony
```

## Import a Component

Each Bit workspace is a monorepo of components, where Bit keeps all data on dependencies and configuration for each component in the local scope (`.git/bit`). All we need to add an existing remote component to the local workspace is to use the `bit import` command.  
Head over to the component's page on bit.dev, click on the green **use** box on the top-right corner of the page, and past the `bbit import` command.

```sh
$ bbit import owner.demo/react/ui/button
```

Bit runs the following process:

* Fetch component data and keep it in `.git/bit`.
* Create a directory for the component in the workspace and writes the component's implementation there.
* Creaet a component-module directoty at the root's `node_modules` directory of the workspace.

## Use Imported Component

To use an imported component we need to use it in our app just like any other dependency; `import {x} from 'component-name'`. In our case `my-consumer` already uses the imported component. However, now the contents of the module is linked to the imported component.  
This means that if as a consumer you depend on a component and now want to `import` it and modify the component; there's no need for code modifications for the consuming app.

### Modify Component

By having a component's code imported to a workspace we can make local changes to that component, compile the code, and see it's result in the consuming application just as if we develop the imported component in that project.

Head over to `button`'s implementation and modify any CSS property.

To see the effect on your application you need to compile the component. Noramlly you can use `bbit start` or `bbit watch`, but in this case we'll manually set up compilation:

```sh
$ bbit compile
```

See how the button changed in the `my-consumer` application.

## Advanced Workflows

### Import Many Components

To import many components Bit support glob-patterns for component-names:

```shell
$ bbit import teambit.bad-jokes/*
$ bbit import bbit import teambit.bad-jokes/ui-primitives/*
```

### Update Imported Components

To get the latest versions of every imported component in our workspace, we'll run:

```shell
$ bbit import
```

### "Eject" Imported Components

To remove an imported component from a workspace and replace it back with a package use the `eject` command:

```sh
$ bbit eject owner.demo/react/ui/button
```

### Change Configuration

Imported components expose their configurations in the `component.json` file found at their base directory. You can modify it to fit your requirements. Bit will "know" to apply these changes only to that imported component.
