---
id: install-components
title: Install Components
---

import InstallComponents from '@site/docs/components/install/install-components.md'

<InstallComponents />


### Bit.dev's registry

The installation process is done by the [Dependency Resolver extension](/dependencies/overview).
By default, the Dependency Resolver installs packages from Bit.dev's registry.
The authentication for that is done using your Bit.dev token, listed under `@bit`, in your `.npmrc` file.
If that token cannot be found in the `.npmrc` file, it will look for it in your global Bit configuration (use the bit config command to output your `user.token` property).

If your npm is configured to use a registry different than npmjs's - the Dependency Resolver will use that configured registry, instead.
:::

- #### To learn more about installing component packages or any other package, [see here](/dependencies/dependency-installation).

## Import vs Install

Components can be consumed by your own project either by 'installing' or 'importing' them.

Since Bit components are much more than a distributable node package, they can either be 'imported' into a project, to have all their data available in your workspace (assets, Bit configurations, etc), or installed just like any other package.

- Installed components cannot be explored using the workspace UI
- Installed components cannot be maintained and developed by the workspace. They cannot be configured by the `workspace.jsonc` or go through the build and tag processes.
- Installed components will not be automatically tested, built and tagged when their dependencies are modified (in the workspace).

### Using the bit install command

  When using the `bit install` command to install all the workspaces's dependencies, the [Dependency Resolver extension](/dependencies/overview) extension (in charge of that task) will make sure to import (and not install) components that should be managed by the workspace (these are components that are listed in the workspace `.bitmap` file).
  
  Once the components are imported, they will be symlinked to the workspace `node_modules` directory so that they could be used just like any other component/package.
  
