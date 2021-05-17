---
id: consuming-components
title: Consuming Components
---

import InstallComponents from '@site/docs/components/install/install-components.md'
import ScopedRegistry from '@site/docs/components/install/scoped-registry.md'

There are two ways a developer can consume a component in their project.

## Install Components as Packages

To simplify the dev-expereince of consumers, all exported components are available to be installed as an npm package using any package manager.

### Installing Component

<InstallComponents />

### Configure Scoped Registry

<ScopedRegistry />

## Vendor Components

Bit Components are self contained, and have all their past versions, code and configurations as part of them. This allows for a unique feature where a consuming project may vendor a component to their Bit Workspace and manage the component as if it was authored in their workspace.

> This feature is only available for workspaces with Bit initialized.

### Import Components

Use the `import` command to vendor a component.

```bash title="Import a single component"
bit import learn-harmony.hooks/use-counter
```

```bash title="Import many components with glob-pattern"
bit import teambit.mdx/*
```

When importing components Bit will:

* Place the component the workspace according to the `defaultDirectory` as defined in `workspace.jsonc`.
* Add component to `.bitmap`.
* Install component dependencies.

> All imported components are visible on the local Dev Server (`bit start`).

### Update Imported Components

To get the latest versions of every imported component in our workspace run:

```bash
bit import
```

### Eject Imported Componenta

To turn a vendor component to a dependency use the `eject` command.

```sh
bit eject learn-harmony.hooks/use-counter
```

## Use Components

Regardless of the consumption method chosen, using the component in the project is just the same:

```js title="app.js"
import { Button } from '@yourUserName/componentScopeName.componentID'

...

<Button>click Here</Button>
```

## FAQ

### How to import component to a different path?

In case you need to set a different path for a specific imported component, use the `--path` option with the `bit import` command.
