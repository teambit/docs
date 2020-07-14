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

```typescript
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

All component files should be in the same directory, including test files and other internal assets. A React component with a default template may contain the following files:

```sh
account/login-form           # root directory for storing all component files
├── index.tsx                # main entry point file that exports modules to import
├── login-form.composite.tsx # examples and compositions for the component
├── login-form.docs.tsx      # component documentation
├── login-form.spec.tsx      # tests
└── login-form.tsx           # implementation
```

You can add as many internal files and sub-directories as required. This is just a boilerplate for newly created components.

## Component ID

Each component has a unique ID. This ID consists of `scope`, as defined in its configuration and `component-name` combined. This means that when `@acme.base-ui` is set as the scope of your workspace and you've created the component `account/login-form`, the component ID is `@acme.base-ui/account/login-form`.

## Using a component

As each component is its own module you must use absolute `import` calls to have a component use another. Bit creates a module in the project's root `node_modules` directory for each component. Use the generated module for your import statements (as you would any other installed package in a project).

Valid modules name are less flexible than component ID and only support a single scope. So Bit applies the following rules when generating the module name from the component ID.

- Workspace `scope` is used as the module scope.
- Namespace forward-slash (`/`) are turned into dots (`.`).

For example, for when the scope defined in a workspace is `acme.base-ui`.

```typescript
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
