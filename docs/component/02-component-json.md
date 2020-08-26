---
id: component-json
title: Configuration
---

Each component has its own configuration. It is controlled by centralized API in the form of the `workspace.json`.  
To get each component's configuration use the `bit show` command.

```sh
$ bit show button (--json)

# TODO - output
```

## Configuration structure

Similar to the workspace configuration, a component is configured using a set of extensions.

```json
// TODO - snippet with comments
```

Each of these extensions registers the component to number of APIs.

### Environment

The [environment](/docs/environment/overview) controls how to build, test and lint the component. For Bit to run an operation on a component, the component must have an environment defined.

### Dependency resolver

Bit sets the component's dependencies by parsing each components' `import` statements. Then it defines the correct version to set for each library using the workspace' [dependency polity](/docs/workspace/dependencies#dependency-policies). Once a library version is found, Bit logs it (and it's type) to the component.

## Configuration using `variants`

We recommend keeping all configuration rules as part of the `workspace.json`. When you want to have detailed control for a component it's best to use a specific [variant](/docs/workspace/variants). As Bit calculates the configuration to apply for a component by its most specific `variant`.

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
