--- 
id: components
title: Components
--- 

import { Image } from '@site/src/components/image'


A Bit component is a super-set of a node package. In addition to its distributable code, a Bit component has everything it needs to be maintained and developed as an independent building block.
That includes its source code, version history, development environment configurations and documentation.

A Bit component is authored in a Bit workspace. It is where its configurations are set, where it is rendered in isolation and where it is being compiled and built.

When a component gets 'tagged', its release version gets stored in the workspace local scope as a completely isolated unit.
That means, all its configurations and built artifacts are encapsulated as a single, immutable and transferable object.
This object can then be exported and stored in a remote scope, hosted on a Bit server like [Bit.dev](https://bit.dev), where it is made available to other web projects, both as a Bit component but also as a node package.

Bit components 'imported' into a Bit workspace, can be modified, versioned and exported again.

## A Bit component common structure

Below is an example of a Bit component file structure. The types of files are determined by the environment in use although there are a few constants to be aware of:

- A documentation file (`*.docs.*`). That is a combination of an auto-generated and manually customized documentation for the component.
- 'Compositions' files (`*.compositions.*`). These are examples of that component - relevant only to UI components.
- A "barrel" or entry file (`index.ts`).

```sh
├── account/login-form           # root directory for storing all component files
    ├── index.tsx                # barrel/entry file to export modules
    ├── login-form.composite.tsx # examples of that component being used
    ├── login-form.docs.mdx      # documentation
    ├── login-form.spec.tsx      # tests
    └── login-form.tsx           # implementation
```

> All _internal dependencies_ of a component must be in the same directory (its styling, documentation, compositions, etc.)

## Stages in a Bit component's life

A Bit component goes through a number of stages before it can be used across repositories:

### 1. Authored & tracked in a Bit workspace

- A component is created and tracked by Bit.
- A package for that component is created in the workspace' `node_modules` directory (at this point this package can only be used internally).
- Configurations are set for the component using the `workspace.json` configuration file. That includes its development environment and dependency policies.
- A component is rendered in an isolated "controlled environment". These is done by authoring and rendering component 'compositions', which are instances of that component as it is being used in different context and variations.
- A component is documented (in addition to the auto-generated documentation created by its environment)

### 2. Versioned

A component gets a new release version. That happens only after it is built using its environment's build pipeline. The new release version can be determined locally or as part of a remote CI (after being 'suggested for new version release' by the local workspace).

### 3. Exported

A component's release version, encapsulated with all its configurations and built artifacts, gets uploaded to a Remote Scope (e.g, [Bit.dev](https://bit.dev)).

This exported version is now available to be used and maintained in other Bit Workspaces.

## Component Id

Each Bit component has a unique identifier with the following pattern:<br />
`<scope-owner>.<scope-name>/<namespace(s)>/<name>`. <br />
A component ID is generated when a component gets tracked by Bit for the first time.

> Note that not all Bit servers will have a 'scope-owner'

- **Scope** - The component's scope as applied by the `workspace.json` file. It can be a `scope` property as defined for the component's `variant` or the `defaultScope` configured to the `teambit.workspace/workspace` extension. `scope` is usually a combination of the scope owner and scope name (e.g, `<my-org><my-scope>`)

- **Namespaces** (optional) - Set with the `--namespace` or `-n` flag when adding the component (supports nesting - `--namespace nesting/namespace/yay`).
- **Name** - The name of the component, according to the component's root directory name.

Bit uses these IDs when listing or running operations and commands on components.

## Component package

Bit creates a package from each component in the workspace' root `node_modules` directory. This package contains the component's transpiled code for other components to import.  
The package name is defined by the component ID. However, Node supports a single forward slash (`/`) in a module name (to set the module scope). Bit uses the `<scope>` defined for the components as such (with the `/` separator). All other `/` between namespaces (if found) are translated to dots (`.`).

For example the component ID `my-org.design-system/component/base/button` will result in a module called `@my-org/design-system.components.base.button`.

> Why doesn't Bit keep the same module naming as node?
>
> The future of JavaScript development brings tools like ESM and Deno that have different approach for module consumption with namespacing support. As Bit components needs to be future-proof to support additional tooling it keeps its own naming scheme that can be translated according to the consumption method.

## Component configurations

A component's configurations are set by the `workspace.jsonc` configuration file. These settings include rules and policies regarding its dependencies, the development environment to support it, the properties for its generated package, and so on. [Learn more about it here](/building-with-bit/workspace).

A component can also have its configurations "ejected". That means it will stop inheriting its settings from the `workspace.jsonc` file. Instead, these will be managed using the `component.json` configuration file, located in its directory (this file will only appear after ejecting).

To eject a component, run the following:

```shell
bit eject-conf <component-id>
```

> Ejecting a component's configurations is not recommended! Use the `workspace.jsonc` instead, whenever possible.

## Tracking


The tracking process translates sets of files into a single component that is semantically understood by Bit. It is the first step in a component's journey to complete independency.

When a component gets tracked, Bit does the following:

- It determines which files should be be included in that component (see the result in the .bitmap file)
- It determines the [component ID](/building-with-bit/components)
- It determines the component entry point and its dependency graph
- It creates a package in the workspace `node_modules` directory
- It renders the component in the Workspace UI


### Track a single component

```shell
bit add <path to component>
```

For example:

```shell
bit add components/react/button
```

A tracked component should appear in the Workspace UI navigation bar with an "N" to its right, to signify that it is a new component.

<Image src="/img/new_component.png" alt="new component" width="60%" />
<br />

:::note Check for tracking issues
Use the `bit status` command to check for tracking issues.
:::

#### Add a namespace

Namespaces serve as (abstract) folders that organize components in the Workspace/Remote Scope. In addition to that, namespaces are a way to decouple your components' configurations from the file structure, as they allow you to [handle components using names](/building-with-bit/workspace#selecting-using-a-namespace) that pertain to the function and purpose of a component, instead.

To namespace a component us the `--namespace` or `-n` option.

```shell
bit add <path to component> --namespace <name>
```

For example:

```shell
bit add components/react/button --namespace react-ui
```

Namespaces also support nesting. For example:

```shell
bit add components/react/button --namespace react/ui
```

### Track multiple components

To track multiple components, set the path to the common directory and use the `*` wildcard.

For example:

```shell
bit add path/to/common/path/*
```

### Set an entry point for a component

The default entry point is `index.ts`/`index.js`. To set a different entry point:

```shell
bit add <path to component> --main <entry file>
```

For example

```shell
bit add components/react/button --main main.js
```

## Untracking components

```shell
bit untrack <component id>
```

## Best Practices

- Start tracking components bottom-up, so all components that are shared by other components are tracked first.
- Plan and arrange components in namespaces according to their functionality, similar to the way you would arrange them in folders in a project.
- Review the package.json in your original projects to ensure proper definition of dependencies.
- If you are using path aliases in your `import` statements, make sure you define Bit's custom paths resolution configuration.


## Versioning

When we version or 'tag' a component, we commit changes and prepare it to be exported to a remote scope. This process most often includes compiling and testing, as well.

## Version CLI commands

### Tag a component

```shell
bit tag <component-id> <new-version>
```

For example:

```shell
bit tag ui-primitives/button 1.0.0
```

#### Tag a component with a message

```shell
bit tag <component-id> <new-version> --message "this is the tag message"
```

### Tag all components in the workspace

Tag all components and bump the patch number of each component version

```shell
bit tag --all
```

### Soft and hard tags: component collaboration

When collaborating on components it is not advisable to tag a new component release version locally, but instead to have it done by the CI.

The process:

1. Tag a component using the `--soft` option. This will not create a new release version but will update the `.bitmap` file to suggest a new version.

```shell
bit tag --soft <component-id>
```

2. Commit changes made to the `.bitmap` file (the previous version update suggestion) and push to the remote repository.

3. Have the CI run the following command to tag all components suggested to be versioned (suggested by the previous 'soft tag')

```shell
bit tag --persist --all
```

### Untag a component

To untag our a component run the following:

```shell
bit untag <component-id>
```

### List all 'tagged' components

'tagged' or versioned components are components stored in your local scope.

```shell
bit list
```

Example output:

```shell
  ┌──────────────────────────────────────────────────────────────────────┬─────────┬─────────┐
  │ component ID                                                         │ local   │ used    │
  │                                                                      │ version │ version │
  ├──────────────────────────────────────────────────────────────────────┼─────────┼─────────┤
  │ button                                                               │ 1.0.0   │ 1.0.0   │
  └──────────────────────────────────────────────────────────────────────┴─────────┴─────────┘
```



## Actions executed by the 'tag' command

### 1. Runs the environment's 'build pipeline'

The 'build pipeline' is a series of tasks defined by the environment. In our case, we've set all our components to use the React environment which has, as a default, two tasks in its build pipeline:

1. Compile (using the React environment compiler)
2. Test (using the React environment tester)

If any of the build pipeline's tasks fail, the tagging is aborted.

> As with any other service provided by the environment, the '[build pipeline](/building-with-bit/react)' can too be extended and customized.

### 2. Sets a new version for the tagged component

Bit's versioning follows the common semantic structure of [major].[minor].[patch]. As a default, if a version number was not included in the tag command, Bit will bump the patch number.

### 3. Tags all components that are dependant on this component

Bit makes sure to run the tagging process on every component affected by the modified (versioned) component. As mentioned earlier, that process also includes compiling and testing. This process let's us know immediately when another component breaks due to that change.

To see a diagram of the dependencies in your workspace or scope, take a look at the 'Dependencies' tab (in the Workspace UI/ Remote Scope)

### 4. Locks any further changes to that version and stores it in the local scope

> The above example uses the `--persist` flag to perform a 'hard tag'. In most cases, you would not want to commit changes (and later on, export) components directly from your local environment. It is usually preferable to use 'soft tag' to **propose** a new version and let your CI set a new version with the committed changes (using 'hard tag')
>
> ```shell
> // soft-tag
> bit tag <component-id>
> ```

## Exporting


A scope is where the release versions of independent components are stored. Scopes are used both locally and remotely:

- **Local scopes** store "staged" components that are ready to be exported from the local environment to a remote scope. You'll find your local scope in the `.bit` or `.git/bit` directory inside your workspace directory.
- [**Remote scopes**](/building-with-bit/scopes), either on Bit.dev or other self-hosted Bit servers, store exported components that are available to be used by other repositories.

A single server may host multiple scopes. Each of these scopes groups together components that are related to each other by function or purpose. Each scope naturally corresponds to a specific team of developers (and even non-developers).

So far, we've tracked a component and tagged it. As mentioned earlier, the tagging process prepares the component to be exported to a remote scope by running the build pipeline on it and storing it in the local scope with a new version number.

## Setting up your remote Bit Scope

To set a remote scope for your soon-to-be exported components, use the `workspace.jsonc` configuration file.

For example:

```json
{
  "$schema": "https://static.bit.dev/teambit/schemas/schema.json",
  "teambit.workspace/workspace": {
    "name": "getting-started-harmony",
    "icon": "https://static.bit.dev/bit-logo.svg",
    "defaultScope": "my-org.my-scope"
  },
```

The `defaultScope` field suggests it can be overridden. To learn about setting different scopes for different sets of components in your workspace.
### Scope on bit.dev

To host components on [Bit.dev](https://bit.dev), [create a scope](https://bit.dev/~create-collection) (or "collection").

<Image src="/img/scope_type.png" alt="create a scope" padding={20} width="60%" />

### On premise Scopes

If you are self-hosting a Bit server, you need to ensure you create a Bit server. 

## Export all staged components to a remote scope

Run the `bit export` command to have Bit publish all versioned components. In our case it is only the previously tagged 'Button' component.

```sh
bit export
```

## Post export operations

The export process updates your workspace' `.bitmap` file. Make sure to commit these changes to Git.

```sh
git commit -am 'updated .bitmap file after a successful export'
```


## Importing

## Overview
Importing a component, from a remote scope to your local workspace, allows you to maintain the component in your own workspace and even build, version and export it back to its remote scope with a new bumped version.

An imported component can have its configurations changed using the (hosting) workspace configuration file, and developed using the Workspace UI and the component dev environment (testing, compiling, etc.).

Once a component is imported and placed in a directory named `<scope-name>.<component-name>` as a default, it is linked to the `node_modules` directory so that it an be consumed by other components in the workspace using its package name (and not its relative path).

The component's compiled code will be available in the component package `dist` directory.
Modifying the component's source code will trigger a compilation process that will result in new dist files (learn more about compilation [here](/building-with-bit/compiling)).

## Import a single component

A single component is imported using its ID. A component ID has the following pattern:

`scope-owner.scope-name/namespace/component-name`

For example, to import the `dots-loader` component from the `teaching` scope, owned by `teambit` and namespaced as `ui/elements`, we'll run the following command:

```shell
bit import teambit.teaching/ui/elements/dots-loader
```

To replace the default directory for that component, we'll add the `--path` flag and the preferred directory.

## Import all components in a scope or namespace

To import all components from the `teaching` scope, we'll replace the namespace and component name with the `*` sign:

```shell
bit import teambit.teaching/*
```

To limit our import to components under the `ui/elements` namespaces, we'll replace just the component name:

```shell
bit import teambit.teaching/ui/*
```

## Import the latest versions of components in a workspace

To get the latest versions of every imported component in our workspace, we'll run:

```shell
bit import
```

:::info the workspace component list
The list of authored/imported components in a workspace can be found using the `bit list` command
or by exploring the workspace `.bitmap` file.
:::

## Using local/remote components

Bit does not allow referencing one component to another, using relative paths. This is done in order to keep components independent and context-agnostic.

Tracked components, locally tagged components and imported components should all be `imported` / `required` into other components using their node module name.

For example:

```js
import { Button } from '@my-scope/button';
```

## Change the configurations of an imported component

Imported components can have their configurations modified using the workspace configuration file (`workspace.jsonc`).
That includes configurations that are set manually but also those set programmatically by other extensions (for example, the environment).

## Installing

## Installing component packages in a Bit workspace

Installing component packages (or any other packages), in a Bit workspace, is done only by using the `bit install` command which will use the [Dependency Resolver](/building-with-bit/dependencies) extension.

#### Learn more about package installation in a Bit workspace, [here](/building-with-bit/dependencies).

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

- To install component packages in a non-Bit project, using npm or Yarn, configure your package manager to use your __scope owner__ name
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
  When using the `bit install` command to install all the workspaces's dependencies, the [Dependency Resolver extension](/building-with-bit/dependencies) extension (in charge of that task) will
  make sure to import (and not install) components that should be managed by the workspace (these are components that are listed in the workspace `.bitmap` file).
  Once the components are imported, they will be symlinked to the workspace `node_modules` directory so that they could be used just like any other component/package.
  :::

## Inspecting


This page lists different ways to inspect the workspace and its components using Bit's CLI and the Workspace/Scope UI.

## Get a component's essential info

### Bit CLI

The `show` command displays a component's essential information. For example, its dependencies, its dev dependencies, the environment being used by it, etc.

Since Bit components are not configured directly but through the various extensions that are used by them (either the extensions' default values or manual configurations in workspace configurations file), it is much easier to review their configurations by using the `show` command than it is by doing so manually.

```shell
bit show <component-id>
```

For example:

```shell
bit show my-org.my-scope/ui-primitives/button
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

<Image src="/img/dependencies_graph.png" width="80%" />

#### Configurations

The 'Configuration' tab <img src="/img/config_icon_2.png" width="15rem" ></img> shows the components configurations, grouped by each extension used by it. That also includes _all_ its dependencies (under the `@teambit.pkg/pkg` packager extension).

For example:

<Image src="/img/dots_loader_pkg.png" width="60%" />

## Log

### Bit CLI

The log command shows the version history of a component:

```shell
bit log button
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

<Image src="/img/log_example.png" width="80%" padding={20}/>

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

- Learn more [here](/building-with-bit/workspace)

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
bit list --outdated
```

## Removing and Deprecating

Refactoring code often causes components to become obsolete or irrelevant. This is where removing and deprecating components becomes useful and necessary.

## Remove a component from a workspace

Removing a local component has no ripple effects. This is only relevant to the consuming project. To do so specify the component ID to remove.

```shell
bit remove foo/bar
successfully removed components:
foo/bar
```

Bit triggers a warning when trying to remove modified components. Use the `--force` flag to force it.

### Effects of deleting components from a workspace

Other components in the workspace may depend on removed components. Meaning that removing these dependencies affects dependent components. Several cases may occur when deleting a local component:

- A _new_ component that depends on a _removed component_ is not affected. This is because Bit did not isolate the component.
- A _staged_ component that depends on a _removed component_ causes Bit to stop the remove command. To force it, we use the `--force` flag.
- An _exported component_ that depends on a local _removed component_ is not affected. This is because an exported component is isolated and immutable. So deleting a local dependency does not affect.

## Remove a component from a remote scope

To remove a component from a remote scope, specify the full component ID.

```shell
bit remove username.your-scope/foo/bar --remote
successfully removed components:
username.your-scope/foo/bar
```

### Effects of deleting components

To better understand how Bit handles deleted components, let's follow this example:

- The `left-pad` in the `utils` scope.
- A component `trim-right` depends on `left-pad` and is also in `utils` scope.
- A component `login` also depends on `left-pad` but is in another scope - `onboarding`.

This is what happens if we remove `left-pad`:

- Bit notifies that `trim-right` depends on `left-pad`. If we want to remove it, Bit asks to use the --force flag. This is because scopes don't cache their components.
- The `trim-right` component has a missing dependency `left-pad`. A refactor for `trim-right` is critical for it to work.
- `login` that also depends on `left-pad` is not affected by the removal of `left-pad`. This is because scopes keep a cache of external dependencies.
- It is still possible to source `login` to another consumer project, as the cache works for Bit.
- Installing `login` using npm fails because npm tries to install `left-pad` from its original scope.

## Deprecate a component in a remote scope

To deprecate a component in a remote Scope, specify the full component ID and use the `--remote` option.

```shell
bit deprecate username.your-scope/foo/bar --remote
deprecated components: username.your-scope/foo/bar
```

## Deprecating a component in a workspace

To deprecate a component in a workspace, specify the component ID.

```shell
bit deprecate foo/bar
deprecated components: foo/bar
```
