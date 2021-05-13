---
id: manage-workspace
title: Manage Workspace
---

## Initialize a Workspace

A Bit workspace can be initialized on an empty directory to create a new workspace. It can also be initialized on an existing project to manage and export its components.

To initialize Bit run the following command:

```sh
bit init --harmony
```

## Generate module links

Bit automatically generates and manages module links. You can manually trigger this action:

```sh
bit link
```

## Workspace configuration

`workspace.jsonc` is the main configuration file for your workspace. Use this file to configure any of Bit's core aspects or add your own customized ones.  
While in this file you can set configuration for any aspect, there are some key configurations to control your workspace and development workflow.

### Local dev experience

Control local dev-experience and optimize the workspace to fit your workflow with the [`teambit.workspace/workspace`](https://bit.dev/teambit/workspace/workspace) aspect configuration. It has three key configurations you can set to determine defaults for various outputs and flows:

- `name` - workspace name to be used in the local dev server and terminal outputs.
- `defaultDirectory` - directory for all newly created and imported components.
- `defaultScope` - sets default scoping for components.

## Dependency resolution

Bit spares us the tedious work of managing dependencies per component. Instead it implements the [`teambit.dependencies/dependency-resolver`](aspects/dependency-resolver) which allows to define a dependency policy for the workspace itself, which will then be used to set dependencies for all components.

This means that to add a dependency you should use the `install` command, which will add a dependency to the policy and install it to `node_modules`.

```sh
bit install lodash
```

Bit uses parse each component's code to find `import` and `require` statements. It then finds which module is required (another component or an external pacakge). Bit then uses file-name patterns to decide if the file importing the module is a dev-file, according to it - is that module a `dependecy` or a `devDependency`.

> If your project has a `package.json` file both the `install` command and Bit's dependency definition process will propagate to it and use its contents.

## Centralized component configuration

Bit use a set of cascading configuration rules and policies to manage a centralize location for configuration. Similar to how CSS-selectors work you can define configurations on components according to their location in the workspace directory tree or namespace structure.

This way, instead of managing `package.json` per-component, you can apply different rules and policies which Bit will then calculate and define configuration for each component.

These rules are defined by [`teambit.workspace/variants`](aspects/variants) aspect.

```jsx
{
  "teambit.workspace/variants": {
    "design/theme": {
      "defaultScope": "acme.theme",
    },
    "cart": {
      "defaultScope": "acme.cart",
      "teambit.react/react": {}
    }
  }
}
```

You can see each component's configuration with the `show` command:

```sh
bit show shopping-cart
```

## Vendor Components

A fundamental feature of a Bit workspace is the ability to vendor components. This means you can use a single command, and instead of adding a component as a dependency, you import that component's implementation to your workspace, as-if you are its author.

```sh
bit import teambit.documenter/button
```

> Components you `import` will be visible on the local dev server.

You can do local modifications to it, commit to your Git repository and work with it as if it is yours, even to the point of exporting a new version for that component.

If you need to eject it from your workspace and turn the component to a dependency use the `eject` command:

```sh
bit eject teambit.documenter/button
```

## Component Mapping

The `.bitmap` file maps different sub-directories in your workspace to specific Bit components. This is how Bit gives you flexibility to organize the workspace to your liking. It helps decoupling the Bit component name from its location on the file system.

### Add new components

You can either manually create a directory and contents to be tracked as a component using the `add` command, or use any of the templates with the `create` command. When you add a new component, Bit adds a new entry to the `.bitmap` file.

```sh
bit create react-component shopping-cart
```

### Remove components

You can remove a component from your local workspace with the `remove` command. This will also remove it from the `.bitmap` file.

```sh
bit remove shopping-cart
```

### Move components

As the component-name is decoupled from a specific location in the workspace you can use the `move` command and Bit will move the component's directory to a new location and update `.bitmap`

```sh
bit move shopping-cart some/other/path/
```

As components always use absolute `import` statements, there's no code-refactoring needed after component is moved.
