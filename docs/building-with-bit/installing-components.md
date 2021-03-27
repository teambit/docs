---
id: installing-components
title: Installing
---

Installing component packages (or any other packages), in a Bit workspace, is done only by using the `bit install` command which will use the [Dependency Resolver](/aspects/dependency-resolver) extension.

#### Learn more about package installation in a Bit workspace, [here](/aspects/dependency-resolver).

:::caution
Never use package managers to install packages in a Bit workspace.
:::

:::info Bit.dev package registry
By default, the Dependency Resolver installs packages from Bit.dev's registry.
The authentication for that is done using your Bit.dev token, listed under `@bit`, in your `.npmrc` file.
If that token cannot be found in the `.npmrc` file, it will look for it in your global Bit configurations (use the bit config command to output your `user.token` property).

If your npm is configured to use a registry different than npmjs's - the Dependency Resolver will use that configured registry, instead.
:::

## Installing component packages in a non-Bit project

- To install component packages in a non-Bit project, using npm or Yarn, configure your package manager to use your **scope owner** name
  (Bit username or organization) as a scoped registry:

```shell
npm config set @scope-owner:registry https://node.bit.dev
```

- Use npm login to login using your Bit credentials:

```shell
npm login --registry=https://node.bit.dev --scope=@scope-owner
```

## Import vs Install

Components can be consumed by your own project either by 'installing' or 'importing' them.

Since Bit components are much more than a distributable node package, they can either be 'imported' into a project,
to have all their data available in your workspace (assets, Bit configurations, etc), or installed just like any other package.

- Installed components cannot be explored using the workspace UI
- Installed components cannot be maintained and developed by the workspace. They cannot be configured by the `workspace.jsonc` or go through the build and tag processes.
- Installed components will not be automatically tested, built and tagged when their dependencies are modified (in the workspace).

  :::info Using the bit install command
  When using the `bit install` command to install all the workspaces's dependencies, the [Dependency Resolver extension](/aspects/dependency-resolver) extension (in charge of that task) will
  make sure to import (and not install) components that should be managed by the workspace (these are components that are listed in the workspace `.bitmap` file).
  Once the components are imported, they will be symlinked to the workspace `node_modules` directory so that they could be used just like any other component/package.
  :::
