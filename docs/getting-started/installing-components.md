---
id: installing-components
title: Installing Components
---

import InstallComponents from '@site/docs/components/install/install-components.md'

import ScopedRegistry from '@site/docs/components/install/scoped-registry.md'

Once you have [exported your component](exporting-components) you can now install it in another Bit workspace or any in another web project.

## Installing your component

<InstallComponents />

:arrow_right: Learn more about [Installing Components](/building-with-bit/installing-components).

## Configure your Scoped Registry

<ScopedRegistry />

<!-- :arrow_right: Learn more about the [Installing Components](/building-with-bit/installing-components). -->

<!-- ## Install Dependencies

Install dependencies for all the imported components.

```bash
bit install
``` -->

## Use your Component

You can now use the component in your app by importing it from your node modules and then using it in your app or component.

```js title="app.js"
import { Button } from '@yourUserName/componentScopeName.componentID'
```

```js title="app.js"
<Button>click Here</Button>
```

## What's Next?

We have just covered the basics and there is still so much to learn. Now it's time to really think about how you can use Bit to it's full advantage. Learn more about [What Bit is](/essentials/what-is-bit) and the[ Advantages of Bit](/essentials/advantages-of-bit) or Dive deeper into our [Building with Bit](/building-with-bit/workspace) section and learn how to configure Bit.
