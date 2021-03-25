---
id: composition-providers
title: Composition providers
---

The React environment "wraps" every [composition](/building-with-bit/compositions) with an array of providers.
These providers can be used to render compositions in a common context such as a theme or data that needs to be globally available.

A Provider is any React component that accepts compositions as children. This component is registered using the `registerProvider`.

:::info
Providers are part of the component compositions and documentation bundle that is served by the environment's server and rendered by the browser.
As such, they run in the environment's Preview runtime and not the Main runtime. To learn more about runtime environments, [see here](/building-with-bit/environment/create-environments)
:::

For example, a provider that centers compositions in their rendering page, will look like so:

```tsx title="A composition provider example"
import React, { ReactNode, ReactElement } from 'react';

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

export const Center = ({ children }: { children: ReactNode }): ReactElement => {
  return <div style={style}>{children}</div>;
};
```

This provider will be registered using the registerProvider method in the React extension `*.preview.runtime.tsx` file:

```tsx title="react-with-providers.preview.runtime.tsx"
import { PreviewRuntime } from '@teambit/preview';
import { ReactAspect, ReactPreview } from '@teambit/react';
import { ReactWithProvidersAspect } from './react-with-providers.aspect';
import { Center } from './composition-providers/center';

export class ReactWithProvidersPreview {
  static runtime = PreviewRuntime;
  static dependencies = [ReactAspect];

  static async provider([react]: [ReactPreview]) {
    react.registerProvider([Center]);

    return ReactWithProvidersPreview;
  }
}

ReactWithProvidersAspect.addRuntime(ReactWithProvidersPreview);
```

- See the full demo project [here](https://github.com/teambit/react-env-with-providers).
