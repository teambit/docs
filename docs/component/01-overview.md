---
id: overview
title: Overview
---

A Bit component is an independent and isolated module containing:

- A JavaScript flavored implementation of a component (React, Angular, Vue, Node...)
- Assets (e.g., CSS, SASS).
- Tests.
- [Dependencies](TODO).
- [Documentation](TODO).
- [Compositions](TODO).
- [Environment](TODO).

In a bird-eye view, components can boil down to these:

```javascript
import { Card } from '@acme/base-ui.card'  // Atomic, presentational components

import { CardGallery } from '@acme/gallery.card-gallery' // A composed components

import { InvoiceList } from '@acme/billing.invoice-list' // A data-connected component

import { HomePage } from '@acme/marketing-site.pages' // A page implemented as a component

import { StandardizePath } from '@acme/modules.StandardizePath' // Utilities and helpers

import { DarkMode } from '@acme/base-ui.themes.dark-mode' // Shared styles and themes
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


