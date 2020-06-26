---
id: components
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

// A widjet components containing a business functionality
import { InvoiceList } from '@bit/billing.invoice-list'

// A page implemented as a component
import { HomePage } from '@bit/marketing-site.pages'
```

## Structure

For each component Bit stores three elements:

- The source code (including code itself, testing and documentation)
- Dependency graph
- Tools & Configuration

![Bit component](https://storage.googleapis.com/static.bit.dev/docs/images/component.svg)

### Source code

Typically, the component’s content is not just the source code itself and can include additional files that are related, such as the styling files, assets (images, fonts), test code, documentation. Bit maps the set of files to a component, with a particular file as the entry point for the component. Bit marks the entry point file as `main`.

### Dependency graph

Bit analyzes all the dependencies imported by the components. Bit then creates a model of all the dependencies of the component. The dependencies include the following:

- NPM packages installed as `node_modules`.
- Other components in the workspace.

The dependency graph makes a component self-contained and allows moving the component around projects without losing any references.

### Environments, Configuration and Extensions

Bit links each component with a set of environments, configurations and extensions. This allows Bit to give you a programmatic API to control the various tasks on the components, and share them with other developers.

All components configuration is defined with a default set of rules in the `workspace.json` file. They manifest themselves for each component in it's `component.json` file. Usually this file is managed by the global rules, but you can `eject` the configuration file to have more granular control.

> [learn more about configuring components](TODO)

## Component ID

Each component has a unique ID. This ID consists of `scope` and `component-name` combined. Once a version for component is tagged the component ID can't be changed.

A component ID would generally look like this:

- `@acme.base-ui/buttons/primary`
- `@acme.utils/sort-array`

> To change a component ID you will need to create a new component with the current implementation and deprecate the old component.

### Scope

A scope is a remote Bit server name with `@` as a prefix. For example: `@base-ui`. If using bit.dev to manage your remote hosts, it adds the account name to the scope name as follows: `@acme.base-ui`. This way Bit supports scoping of component names by their hosted servers.

### Component name

A component name is unique per Bit scope. Bit supports namespacing for component names using the forward slash (`/`). You can have 0-N number of namespaces. This is useful when you manage and sort components on a remote Bit server.

## Component module name (and package name)

The component `node_module` name is not the same as the component ID.

- Module can only have a single forward slash (`/`) in it's name.
- Component may be published as a package to a registry which may not have the same `scope` name available.
- Component may be published to an internal package registry that does not require scoping by the same account name as bit.dev.
- For developer-experience it might be beneficial to have a shorter name to use for the `import * from "<>"` syntax.

By default Bit translate component IDs to module names as follows:

- `@acme.base-ui/buttons/primary` -> `@acme/base-ui.buttons.primary` (when using account-scoping in bit.dev)
- `@acme.utils/sort-array` -> `@acme/utils.sort-array` (when using account-scoping in bit.dev)
- `@base-ui/buttons/primary` -> `@base-ui/buttons.primary` (when hosting your own Bit server)
- `@utils/sort-array` -> `@utils/sort-array` (when hosting your own Bit server)
