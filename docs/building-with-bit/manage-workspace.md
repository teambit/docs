---
id: manage-workspace
title: Manage Workspace
---

Bit Workspace provides a centralized dev-experience for managing components. Manage and configure your workspace to build your component based workflow.

## Initialize a Workspace

A Bit workspace can be initialized on an empty directory to create a new workspace. It can be initialized on an existing project to manage and export its components.

To initialize Bit run the following command:

```sh
bit init --harmony
```

## Workspace configuration

`workspace.jsonc` is the main configuration file for your workspace. Use this file to list the different [Bit Aspcets](aspects/aspects-overview) and their respected configuration to customize your component development workflow and have a centralized control over component configuration.  
The main aspect controling the workspace is [`teambit.workspace/workspace`](https://bit.dev/teambit/workspace/workspace), as it sets the basics for your workflow and component management.

### Defaul Scope

Bit Components are scoped by default. When creating a workspace, Bit requires you to set a `defaultScope` for components. You can control default scope in [`teambit.workspace/variants`](aspects/variants) as well. Scope will be the prefix of each component-id and as such:

* Should not contain any of the following characters: `~)('!*`.
* Can't start with `.` or `_`.
* Must not contain any non-url-safe characters.

Component's Scope defined the name of the remote Bit server to export the component to. So configure `defaultScope` according to how you want to structure and sort your components.

> **`defaultScope` on Bit.dev**
>
> Scopes in Bit.dev are nested in their respected accounts. So when using Bit.dev for hosting Bit components define your `defaultScope` according to this pattern `AccountName.ScopeName`.

### Default Component Directory

New components will be created according to the pattern defined in `defaultDirectory`. You can put any path you want for your components. Use these variables to dynamically create components:

* `{component}` - component name (including namespaces).
* `{scope}` - component socpe.
* `{owner}` - the account name managing the scope (Bit.dev only).
* `{scope-id}` - concat of `{owner}.{scope}` (if not Bit.dev-component, falls back to `{scope}` only).

This configuration applied by default when you use the `create` or `import` commands.

## Dependency resolution

The [`teambit.dependencies/dependency-resolver`](aspects/dependency-resolver) aspect defines a dependencies for the workspace.

```sh title="Install all workspace dependencies"
bit install
```

```sh title="Add a new dependency"
bit install lodash
```

[Dependency resolver aspect](aspects/dependency-resolver) parse each component's code to find `import` and `require` statements. It then uses file-name patterns to decide the dependency type (`dependency` or `devDependency`), and sets the dependency version according to the installed version of the package in `node_module` directory. This automates the tedious work of managing dependencies per component.

## Component Configuration Rules

[`teambit.workspace/variants`](aspects/variants) aspect lets you define sub-sections of your workspace with different configuration. With this aspect you can set different configuration policies in a centralize location. Instead of managing `package.json` per-component, you can apply different rules and policies which Bit will then calculate and define configuration for each component.

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

## Component Mapping

The `.bitmap` file maps different sub-directories in your workspace to specific Bit components. This is how Bit gives you flexibility to organize the workspace to your liking. It helps decoupling the Bit component name from its location on the file system.

### Remove components

If you no longer need a component in your workspace use the `remove` command.

```sh
bit remove shopping-cart
```

### Move components

Bit Components are decoupled from a specific location in the workspace. You can use the `move` command to move component to another location.

```sh
bit move shopping-cart some/other/path/
```

As components always use absolute `import` statements, there's no code-refactoring needed after component is moved.

### Eject components

You can remove a component from the codebase and turn it to a dependency with the `eject` command:

```sh
bit eject shopping-cart
```

Bit then removes the component code from your code base and adds that component as a dependency to your `workspace.json`.

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

## FAQ

### Can I onboard pre-existing components?

When initializing a Bit Workspace in an existing project you may want to onboard some of the components already implemented in your project.  
The `bit add` command "marks" directories as Bit Components. [Learn more](reference/pre-existing-components) about using it to onboard pre-existing components.

### How to override `defaultDirectory`?

Set a `defaultDirectory` per component when you run the `bit create` command by using the `--scope` option and override the default value for `{scope}` for the new component created.  
Use the `--path` option to set the full component path and override the entire patten defined in `defaultDirectory`.

### Can I use `package.json`?

You can keep using `package.json` to manage dependencies. `bit install` propagates from `workspace.json` to `package.json` to find all dependencies to install for the workspace. However,if a the same dependency is defined in both files, `workspace.jsonc` will "win".

### Can I use package manager directly?

Bit uses the APIs of package manager to install and manage the workspace dependencies. You can decide not to adopt this feature and use a package manager directly with a `package.json` file. There are two things to note:

* Add `bit link` as a post-install script in `package.json` for Bit to generate all [Component Module Links](/essentials/workspace#component-module-links).
* Bit supports using different versions of the same dependency for components with the [variants aspect](aspects/variants), this will not be supported when using a package manager directly.
