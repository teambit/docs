---
id: component-json
title: Configuration
---

In a Bit workspace, each component has its own configuration (just like a module in a monorepo), but it gives you a centralized API in the form of the `workspace.json` to control for each of the components you maintain.  
To get each component's configuration use the `bit show` command.

```sh
$ bit show button (--json)

# TODO - output
```

## Multiple components in a workspace

The main benefit of keeping a per-component configuration is the ability to have different types of components implemented in a connected workspace. This way you can have Stencil components alongside React, with direct `import` statements between them.  
The development experience is working just like you would in a monorepo, but with a far less rigid directory tree. The workspace does not run operations on a component, instead a component defines to which APIs its connected. When you run a command in a workspace that a component is registered to, the component is responsible for running its own operation and sending back the results to the workspace.

If we follow the Stencil<>React monorepo scenario, this is how it (roughly) plays out:  
In the same workspace you have a basic `stencilButton` and a `reactButton` that depends on it. Each of them has different build tasks. So `stencilButton` and `reactButton` both register themselves to the `bit build` command. When you issue the command, both components kick start their own `build` process, each with its own configuration and tools. Once the process is done, they send the results back to the workspace for it to render the result in a centralized location.

## Configuration structure

Similar to the workspace configuration, a component is configured using a set of extensions.

```json
// TODO - snippet with comments
```

Each of these extensions registers the component to number of APIs.

### Environment

The [environment](TODO) controls how to build, test and lint the component. For Bit to run an operation on a component, the component must have an environment defined.

### Dependency resolver

Bit sets the component's dependencies by parsing each components' `import` statements. Then is defines the correct version to set for each library using the workspace' [dependency polity](TODO). Once a library version is found, Bit logs it (and it's type) on the component.

## Configuration using `variant`s

We recommend keeping all configuration rules as part of the `workspace.json`. When you want to have detailed control for a component it's best to use a specific [variant](TODO). As Bit calculates the configuration to apply for a component by its most specific `variant`.

```json
// TODO - config snippet
```

### Override `workspace.json` configuration

You can always choose to "eject" a specific component configuration and have detailed control over it. This is not recommended as its very easy to loose control over in a large workspace. Bit supports keeping a `component.json` file in the component's root directory. If such file is preset, Bit will use it and not propagate to the `workspace.json` file.  
Use `bit eject-conf` command for Bit to generate the component configuration per the specific component

```sh
$ bit eject-conf <component>
$ tree account/login-form
account/login-form
├── index.tsx
├── component.json # configuration file
├── ...
```

You can modify the `component.json` file directly to apply configuration changes on the component. If you remove the file, Bit reverts back to define the configuration according to the `workspace.json` file.
