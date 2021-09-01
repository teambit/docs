---
title: node_modules
id: node-modules
---

The `node_modules` directory is a standard directory in which modules are resolved from initially by the [NodeJS Module Resolution](https://nodejs.org/api/modules.html#modules_loading_from_node_modules_folders) and as a result by other tools across the JS ecosystem such as [Webpack](/), [Rollup](/), [TypeScript](/) and others.

Package managers take responsibility over the `node_modules` directory for installing external dependencies.

## Installing external dependencies
External dependencies are installed through the `bit install` command which encapsulates the usage of package managers as Yarn and PNPM making sure component dependencies are deduped correctly and linking all [Workspace](/) Components.

```bash
bit install
```

## Linking Workspace Components
Workspace components are linked through the `node_modules` directory to their location in the Workspace itself for type resolution. `package.json` compiled code is contained under the `dist` directory

```bash
$ bit link
```

## Delegating node_modules directory to a package manager
Other package managers like `NPM`, `Yarn` and `pnpm` can also be used directly. To use them configure a `postinstall` in your project's `package.json` file to make sure Workspace Component Links are generated properly and new Component Objects are imported.

:::note
We recommend to use `bit install` for the installation and management of modules in the `node_modules` directory.
:::

```json
{
  "name": "my workspace",
  "scripts": {
    "post-install": "bit import && bit link"
  }
}
```
