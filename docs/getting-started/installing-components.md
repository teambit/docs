---
id: installing-components
title: Installing Components
---

import InstallComponents from '@site/docs/components/install/install-components.md'

import ScopedRegistry from '@site/docs/components/install/scoped-registry.md'

Once you have exported your component you can now install it in your applications. Use any existing app or start a new one with `create-react-app`.

## Installing your component

<InstallComponents />

:arrow_right: Learn more about the [Installing Components](/building-with-bit/components).

## Configure your Scoped Registry

<ScopedRegistry />

:arrow_right: Learn more about the [Installing Components](/building-with-bit/components).

<!-- ## Install Dependencies

Install dependencies for all the imported components.

```shell
bit install
``` -->

## Use your Component

You can now use the component in your app by importing it from your node modules and then using it in your component function.

```js title="app.js"
import { Button } from '@yourUserName/componentScopeName.componentID';
```

```js title="app.js"
<Button text="click me" />
```
