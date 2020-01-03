---
id: view
title: Viewing
---

Bit provides a set of tools to view the state of the workspace and of the components.
These tools are useful when you need to analyze and debug issues with components.  

## Status

### View Components status

Displays the status of all the components currently under work. You will see the new, modified and staged components. Components that are exported and components that have been imported but not modified are not visible on the bit status command, so use [`bit list`](#list);

```bash
bit status
```

Output will be:

```bash
new components
     > foo/bar... ok


no modified components


staged components
     > moon/sun... ok
```

You can find a full description of all possible component statuses [here](/docs/workspace#workspace-statuses).  

### View untracked files

The `status` command also shows files that are untracked in the components. You will get notified on all the files that are imported in the component and are not part of any Bit component.  

## List

The list command display the components in the local workspace or in remote scope.  

To list all components in local workspace:

```bash
bit list
```

To list all components in a remote Collection:

```bash
bit list my-collection
```

### List versions

You can compare the component version in the local scope against the remote scope, and also view which version of the component can be checked out using the `outdated` flag.  

```bash
$bit list --outdated
  ┌────────────────────────────────────────────────────────────┬───────┬───────┬───────┐
  │ component ID                                               │ local │ used  │ remot │
  │                                                            │ versi │ versi │ e     │
  │                                                            │ on    │ on    │ versi │
  │                                                            │       │       │ on    │
  ├────────────────────────────────────────────────────────────┼───────┼───────┼───────┤
  │ heading                                                    │ 0.0.2 │ 0.0.2 │ N/A   │
  ├────────────────────────────────────────────────────────────┼───────┼───────┼───────┤
  │ navbar                                                     │ 0.0.2 │ 0.0.2 │ N/A   │
  └────────────────────────────────────────────────────────────┴───────┴───────┴───────┘
```

## Show  

The show command is useful to see the specific details of each component:  

```bash
$ bit show navbar
╔══════════════════╤════════════════════════════════════════════════════╗
║ Id               │ navbar@0.0.2                                       ║
╟──────────────────┼────────────────────────────────────────────────────╢
║ Compiler         │ bit.envs/compilers/react-typescript@3.0.26         ║
╟──────────────────┼────────────────────────────────────────────────────╢
║ Language         │ javascript                                         ║
╟──────────────────┼────────────────────────────────────────────────────╢
║ Main File        │ src/components/navbar/navbar.tsx                   ║
╟──────────────────┼────────────────────────────────────────────────────╢
║ Dependencies     │ styles/logo                                        ║
║                  │ react@^16.10.2                                     ║
╟──────────────────┼────────────────────────────────────────────────────╢
║ Dev Dependencies │ @types/react@16.9.5                                ║
╟──────────────────┼────────────────────────────────────────────────────╢
║ Files            │ src/components/navbar/navbar.css                   ║
║                  │ src/components/navbar/navbar.tsx                   ║
╚══════════════════╧════════════════════════════════════════════════════╝
```

## Log

The log command shows the versions history of a component:

```bash
$ bit log navbar
tag 0.0.2
author: Tally Barak <tally@bit.dev>
date: 10/24/2019, 5:49:15 PM

tag 0.0.1
author: Tally Barak <tally@bit.dev>
date: 10/24/2019, 5:48:51 PM
```
