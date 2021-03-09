---
id: inspecting
title: Inspecting
---

This page lists different ways to inspect the workspace and its components using Bit's CLI and the Workspace/Scope UI.

## Get a component's essential info

### Bit CLI

The `show` command displays a component's essential information. For example, its dependencies, its dev dependencies, the environment being used by it, etc.

Since Bit components are not configured directly but through the various extensions that are used by them (either the extensions' default values or manual configurations in workspace configurations file), it is much easier to review their configurations by using the `show` command than it is by doing so manually.

```shell
$ bit show <component-id>
```

For example:

```shell
$ bit show my-org.my-scope/ui-primitives/button
```

Example output:

```shell
  ┌──────────────┬───────────────────────────────────────────────────────────────┐
  │ id           │ my-org.my-scope/ui-primitives/button@0.0.1                    │
  ├──────────────┼───────────────────────────────────────────────────────────────┤
  │ scope        │ my-org.my-scope                                               │
  ├──────────────┼───────────────────────────────────────────────────────────────┤
  │ name         │ ui-primitives/button                                          │
  ├──────────────┼───────────────────────────────────────────────────────────────┤
  │ env          │ teambit.react/react                                           │
  ├──────────────┼───────────────────────────────────────────────────────────────┤
  │ package name │ @my-org/ui-primitives.button                                  │
  ├──────────────┼───────────────────────────────────────────────────────────────┤
  │ main file    │ index.ts                                                      │
  ├──────────────┼───────────────────────────────────────────────────────────────┤
  │ files        │ __snapshots__/button.spec.jsx.snap                            │
  │              │ button.composition.tsx                                        │
  │              │ button.docs.tsx                                               │
  │              │ button.module.scss                                            │
  │              │ button.spec.jsx                                               │
  │              │ button.tsx                                                    │
  │              │ index.ts                                                      │
  ├──────────────┼───────────────────────────────────────────────────────────────┤
  │ dev files    │ button.docs.tsx (teambit.docs/docs)                           │
  │              │ __snapshots__/button.spec.jsx.snap (teambit.defender/tester)  │
  │              │ button.spec.jsx (teambit.defender/tester)                     │
  │              │ button.composition.tsx (teambit.compositions/compositions)    │
  ├──────────────┼───────────────────────────────────────────────────────────────┤
  │ extensions   │ teambit.react/react                                           │
  │              │ teambit.pkg/pkg                                               │
  │              │ teambit.component/dev-files                                   │
  │              │ teambit.compositions/compositions                             │
  │              │ teambit.docs/docs                                             │
  │              │ teambit.dependencies/dependency-resolver                      │
  │              │ teambit.envs/envs                                             │
  │              │ teambit.defender/tester                                       │
  │              │ teambit.pipelines/builder                                     │
  ├──────────────┼───────────────────────────────────────────────────────────────┤
  │ dependencies │ classnames@^2.2.6- (package)                                  │
  ├──────────────┼───────────────────────────────────────────────────────────────┤
  │ dev          │ @teambit/documenter.ui.linked-heading@0.2.3--- (component)    │
  │ dependencies │ @teambit/documenter.ui.list@0.2.3------------- (component)    │
  │              │ @teambit/documenter.ui.section@0.2.3---------- (component)    │
  │              │ @teambit/documenter.ui.separator@0.2.3-------- (component)    │
  │              │ @types/react@16.9.43-------------------------- (package)      │
  │              │ react-test-renderer@17.0.1-------------------- (package)      │
  │              │ @types/classnames@^2.2.10--------------------- (package)      │
  │              │ @types/react-router-dom@^5.1.5---------------- (package)      │
  │              │ @types/jest@~26.0.9--------------------------- (package)      │
  │              │ core-js@^3.6.5-------------------------------- (package)      │
  │              │ @types/node@^12.12.27------------------------- (package)      │
  ├──────────────┼───────────────────────────────────────────────────────────────┤
  │ peer         │ react@^16.13.1----- (package)                                 │
  │ dependencies │ react-dom@^16.13.1- (package)                                 │
  └──────────────┴───────────────────────────────────────────────────────────────┘
```

### Workspace/ Scope UI

The UI analog is placed in two separate tabs, 'Dependencies' and 'Configurations'.

#### Dependencies

The 'Dependencies' tab shows the component's dependencies. That only includes components. Other packages will not be displayed.

For example:

<img src="/img/dependencies_graph.png" width="80%" ></img>

#### Configurations

The 'Configuration' tab <img src="/img/config_icon_2.png" width="15rem" ></img> shows the components configurations, grouped by each extension used by it. That also includes _all_ its dependencies (under the `@teambit.pkg/pkg` packager extension).

For example:

<img src="/img/pkg_config.png" width="70%" ></img>

## Log

### Bit CLI

The log command shows the version history of a component:

```shell
$ bit log button
```

Example output:

```shell
tag 0.0.2
author: John Doe <john_doe@my-org-mail.com>
date: 10/24/2020, 5:49:15 PM

tag 0.0.1
author: Jane Doe <jane_doe@my-org-mail.com>
date: 09/24/2020, 4:48:51 PM
```

### Workspace/Scope UI

The 'History' tab <img src="/img/log_icon.png" width="15rem"></img> show a component's version history. The different versions can be explored further by clicking on their links.

For example:

<img src="/img/log_example.png"></img>

## View Components status

Displays the status for all tracked and staged (tagged) components. This will not include imported components that have not been modified or components' exported tagged versions.

Command:

```shell
bit status
```

Example output:

```shell
new components
(use "bit tag --all [version]" to lock a version with all your changes)

     > button ... ok


staged components
(use "bit export <remote_scope> to push these components to a remote scope")

     > app-bar. versions: 0.0.1 ... ok
```

- Learn more [here](/workspace/workspace-status)

## List components in the local scope

Lists all components in the local scope. That includes staged components as well as imported components.

```shell
bit list
```

## List components in a remote scope

To list all components in a remote scope:

```shell
bit list owner-name.scope-name
```

## List versions of components in the local scope

Displays local and remote versions of components in the local scope.

```shell
$ bit list --outdated
```
