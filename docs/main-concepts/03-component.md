---
id: component
title: Components
---

A Bit component is a reusable piece of code, such as

- A react, Vue or Angular component
- Shared stylesheet (e.g., CSS, SCSS) or stylesheets
- Utility function used by the application.

The exact boundaries of the component are a design decision. It is possible to package a whole library as a single Bit component or split each functional piece as a separate component.

In a bird-eye view, code options can boil down to these:

```javascript
// Atomic, presentational components
import { Text } from '@bit/base-ui.text'
import { Card } from '@bit/base-ui.card'
import { Button } from '@bit/base-ui.button'

// A composed components
import { CardGallery } from '@bit/gallery.cards'

// A data-connected component
import { InvoiceList } from '@bit/billing.invoice-list'

// A page implemented as a component
import { HomePage } from '@bit/marketing-site.pages'
```

## Create a new component

The recommended way to create new components in a workspace is using the `bit create` command. This command uses pre-defined templates you can customize and define according to your company's practices. When creating a new component you must set it with its name. You may use forward-slash (`/`) to create namespaces (or use the `--namespace` option)

```sh
$ bit create account/login-form
```

## Anatomy

All component files should be in the same directory, including component's code, stylings, tests, documentation, and testing snapshots. If your components is using sub-components, i.e., components that you can only use within the context of the parent component (List and ListItem or a component and its styled component), it make sense to include them in the same directory.

```sh
account/login-form           # root directory for storing all component files
├── index.tsx                # main entry point file that exports modules to import
├── login-form.composite.tsx # examples and compositions for the component
├── login-form.docs.tsx      # component documentation
├── login-form.spec.tsx      # tests
└── login-form.tsx           # implementation
```

This creates a directory structure that is easily consumable by placing all the related files together.

## Component ID

Each component has a unique ID. This ID consists of `scope`, as defined in its configuration and `component-name` combined. This means that when `@acme.base-ui` is set as the scope of your workspace and you've created the component `account/login-form`, the component ID is `@acme.base-ui/account/login-form`.

## Using a component

As each component is its own module you must use absolute `import` calls to have a component use another. Bit creates a module in the project's root `node_modules` directory for each component. Use the generated module for your import statements (as you would any other installed package in a project).

Valid modules name are less flexible than component ID and only support a single scope. So Bit applies the following rules when generating the module name from the component ID.

- Workspace `scope` is used as the module scope.
- Namespace forward-slash (`/`) are turned into dots (`.`).

For example, for when the scope defined in a workspace is `acme.base-ui`.

```javascript
// Importing a component that uses a namespace as part of its ID
import { TextArea } from '@acme.base-ui/form-elements.text-area'

// Importing a component that does not have a namespace
import { Button } from '@acme.base-ui/button'
```

## Component configuration

Alongside the code and dependency graph, Bit keeps configuration for each component. It is derived from the workspace configuration so you can control a set of similar components from a single configuration source. To see the actual configuration applied on a component use the `bit show` command.

```sh
$ bit show button

# TODO - output
```

### Eject component configuration file

If you require detail control on a specific component and don't want to keep this configuration as part of the workspace you can choose to eject the component configuration to your workspace and modify it according to your needs.
To get the calculated component configuration and have specific control over it use the `bit eject-conf` command. When this command is issued Bit will eject a `component.json` file containing the specific configuration of the selected component.

```sh
$ bit eject-conf <component>
$ tree account/login-form
account/login-form
├── index.tsx
├── component.json # configuration file
├── ...
```

You can keep modifications in this file and control the specific component. Bit will use that file as the source of the component configuration.

#### Component configuration structure

Similar to the `workspace.json` file, the `component.json` file is configured with a set of extensions. However, there are special keys for components which are not available for a workspace.

```json
// TODO - snippet with comments
```

## Component dependency graph

Bit creates a dependency graph for each component by parsing it's code and using the dependency policies as defined for the [workspace](LINK). Each time you use `import`, Bit finds the imported module and then decides what's the actual imported module, its version and if it is a runtime, development or a peer dependency.

### See component dependency graph

You can browse a component dependency graph using Bit's local dev server, when choosing the 'dependencies' tab or run the following command:

```sh
$ show button
# TODO output
```

### Parsing import statements

Each of the implementation files of the component may contain several `import` statements. Each of the imported modules differs from one another and affects the component's dependency graph.

```javascript
// Module installed from a public registry
import LeftPad from 'left-pad';

// Other component in the workspace
import { default } from '@acme.base-ui/button';

// Internal file of the component
import { default } from './user-service/client'
```

1. Modules installed from registries are marked as **dependencies**. Their version is set according to the workspace dependency resolution extension and the policies defined in your `workspace.json` file.
1. Other components from the workspace are marked as **dependencies** as well. Their version is set according to their current version in the workspace (see [versioning](LINK) for additional details).
1. Internal files are not registered as dependencies as they are a part of the implementation of the component. However, if any internal file has more dependencies - they will be registered as ones.

This means that the component dependency graph depends on it's implementation. So to add or remove a dependency you should modify the component's implementation.

### Types of dependencies

There are three types of dependencies. When Bit registers a new dependency for a component, it sets its type as well.

- **Development dependencies** are all dependencies of the test, documentation and composition files.
- **Runtime dependencies** are all dependencies of the component's implementation.
- **Peer dependencies** are defined for each component by its configured environment and the workspace dependency policy.

### Dependency policies

TODO
