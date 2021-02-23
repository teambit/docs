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

  :::tip Using the bbit install command
  When using the `bbit install` command to install all the workspaces's dependencies, the Dependency Resolver extension (in charge of that task) will
  make sure to import (and not install) components that should be managed by the workspace (these are components that are listed in the workspace `.bitmap` file).
  Once the components are imported, they will be symlinked to the workspace `node_modules` directory so that they could be used just like any other component/package.
  :::

## Import a components

Components are imported using their component ID, which can be found in their component page, under the 'Use' drop menu.

As an example, let's import a component from Bit's public 'evangelist' scope.
This component will be the twitter-card, used by Bit's marketing team:

```
bbit import teambit.evangelist/marketing/twitter-card
```

Head back to your workspace UI to explore the new imported component.

![](/img/ws_getting_started_import.png)

To learn more about 'importing' [see here](/docs/components/importing)

## Install a component package

Component packages are installed using their package name. The package name usually correlates to the component ID.

As an example, let's install a component package from the same 'evangelist' scope.
This tie the component will be the 'testimonials' component used by Bit's marketing team:

```
bbit install @teambit/evangelist.marketing.testimonial
```

To learn more about installing component packages or any other package, [see here](/docs/packages/install-packages).