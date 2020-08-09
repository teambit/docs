---
id: overview
title: Overview
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


