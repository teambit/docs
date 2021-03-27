---
id: composing-components
title: Composing Components
---

You can compose components together from other components in your workspace or from components in the cloud.

## Composing from your Local Workspace

When importing a component into another component you cannot use a relative path. You must use your componentID. In the workspace UI you will see the package name for your component which you can copy to import it.

```js
import { Button } from '@my-scope/ui.button'
```

## What's Next?

It's time to create a [Remote Scope](remote-scope) so you can see you component on the [Bit.dev](https://bit.dev) cloud and then export it and import it into another application.