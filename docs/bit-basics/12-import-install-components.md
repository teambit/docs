---
id: import-install-components
title: Import/Install Components
---

Once you start building your project with Bit, it essentially becomes part of one virtual monorepo. A vast and rapidly-growing number of independent components instantly become available for you to use and develop in your local workspace. These could be either private components, maintained by your own organization, or public components maintained by the open-source community.

In addition to that, components can be installed as standard node packages, either in a Bit workspace or even in a non-Bit project.

## Bit Import components

It's important to be clear on terminology here - when we say Bit import of a component, we don't mean importing it as a node_module dependency for a component via the line `import {x} from 'component-name'`. 

Instead we mean a Bit import which vendors the code into your workspace so that you can work on and debug the source code files of the component. This can be useful in a number of scenarios, from forking a component down to IDE debugging of a potential issue and creating a local fix (which you can then notify the component maintainers about).  

When you make any changes to an imported component and compile those changes, the compiled output is linked as a node_module - in fact, as soon as you import the component Bit automatically creates a node_module for consuming it. But in this case you are consuming the local version of the component, including any changes you might make to it.

### Import a single component
A single component is imported using its ID. A component ID has the following pattern: 

`scope-owner.scope-name/namespace/component-name`

For example, to import the `app-bar` component from the `bad-jokes` scope, owned by `teambit` and namespaced as `ui-primitives`, we'll run the following command:

```shell
$ bbit import teambit.bad-jokes/ui-primitives/app-bar
```

To replace the default directory for that component, we'll add the `--path` flag and the preferred directory. 

### Import all components in a scope or namespace

To import all components from the `bad-jokes` scope, we'll replace the namespace and component name with the `*` sign:

```shell
$ bbit import teambit.bad-jokes/*
```

To limit our import to components under the `ui-primitives` namespace, we'll replace just the component name:

```shell
$ bbit import bbit import teambit.bad-jokes/ui-primitives/*
```

### Import latest versions of components in a workspace

To get the latest versions of every imported component in our workspace, we'll run:

```shell
$ bbit import
```
> Component updates are only possible for components stored in your local scope (these are either imported or 'tagged' components) 
### Change the configurations of an imported component
Imported components expose their configurations in the `component.json` file. Its configuration structure is quite  similar to the workplace's.

## Install components as packages

To install a component, use either Bit or another package manager of your choice. For example:

```shell
$ bbit install @teambit/bad-jokes.ui-primitives.app-bar

$ npm i @teambit/bad-jokes.ui-primitives.app-bar

$ yarn i @teambit/bad-jokes.ui-primitives.app-bar
```