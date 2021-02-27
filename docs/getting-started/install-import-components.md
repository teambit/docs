---
id: install-import-components
title: Import or Install Components
---

Once you initialize a Bit workspace your project essentially becomes part of one virtual monorepo.
A vast number of independent components instantly become available for you to use and develop in your local workspace.
These could be either private components, maintained by your own organization, or public components maintained by the open-source community.

## Import vs Install

Components can be consumed by your own project either by 'installing' or 'importing' them.

Since Bit components are much more than a distributable node package, they can either be 'imported' into a project,
to have all their data available in your workspace (assets, Bit configurations, etc), or installed just like any other package.

- Installed components cannot be explored using the workspace UI
- Installed components cannot be maintained and developed by the workspace. They cannot be configured by the `workspace.jsonc` or go through the build and tag processes.
- Installed components will not be automatically tested, built and tagged when their dependencies are modified (in the workspace).

  :::info Using the bbit install command
  When using the `bbit install` command to install all the workspaces's dependencies, the [Dependency Resolver extension](/docs/dependencies/overview) extension (in charge of that task) will
  make sure to import (and not install) components that should be managed by the workspace (these are components that are listed in the workspace `.bitmap` file).
  Once the components are imported, they will be symlinked to the workspace `node_modules` directory so that they could be used just like any other component/package.
  :::

## Import a component

Components are imported using their component ID, which can be found in their component page, under the 'Use' drop menu.

As an example, let's import a component from Bit's public 'evangelist' scope.
This component will be the twitter-card, used by Bit's marketing team:

```
bbit import teambit.evangelist/marketing/twitter-card
```

Head back to your workspace UI to explore the new imported component.

<div style={{textAlign: 'center'}}>
     <img src="/img/ws_getting_started_import.png" width="90%" style={{boxShadow: '3px 3px 15px 3px rgba(0,0,0,0.20)'}}></img>
</div>

<br />

- #### To learn more about 'importing' [see here](/docs/components/importing)

## Install a component package

Component packages are installed using their package name. The package name usually correlates to the component ID.

As an example, let's install a component package from the same 'evangelist' scope.
This tie the component will be the 'testimonials' component used by Bit's marketing team:

```
bbit install @teambit/evangelist.marketing.testimonial
```

:::info Bit.dev's registry
The installation process is done by the [Dependency Resolver extension](/docs/dependencies/overview).
By default, the Dependency Resolver installs packages from Bit.dev's registry.
The authentication for that is done using your Bit.dev token, listed under `@bit`, in your `.npmrc` file.
If that token cannot be found in the `.npmrc` file, it will look for it in your global Bit configurations (use the bit config command to output your `user.token` property).

If your npm is configured to use a registry different than npmjs's - the Dependency Resolver will use that configured registry, instead.
:::

- #### To learn more about installing component packages or any other package, [see here](/docs/dependencies/dependency-installation).
