---
id: render-component
title: Render Isolated Compositions
---

'Compositions' are, essentially, small apps that exhibit and test a component in various potential usages.
They serve as a way to run manual and automated integration tests, before such integrations are done by consumers of that component.

Moreover, a component's composition is a way to demonstrate that component for other developers looking to use it, and non-developers, such as designers and product managers, looking to inspect it.

Adding compositions to a component is done by creating a file in the component's directory, using the `*.composition.*` pattern.

For example:

```{3}
└── tech-jokes-viewer
    ├── index.tsx
    ├── tech-jokes-viewer.composition.tsx
    ├── tech-jokes-viewer.docs.mdx
    ├── tech-jokes-viewer.module.css
    └── tech-jokes-viewer.tsx
```

Each composition is a standard usage of a component (requiring no special syntax) that is exported with a name.

For example, the following is a composition of the 'tech-jokes-viewer' component.
This composition uses the 'app-bar' component to validate that 'tech-jokes-viewer' behaves as expected and toggles between local and remote jokes, when used as part of these sorts of compositions.

```tsx title="tech-jokes-viewer.composition.tsx"
import React, { useState } from 'react';
import { AppBar } from '@demo-org/tech-jokes.ui.app-bar';

import { TechJokesViewer } from './tech-jokes-viewer';

export const FullPage = () => {
  const [isLocal, setIsLocal] = useState(false);

  const menuItems = [
    { label: 'Explore New Jokes', action: () => setIsLocal(false) },
    { label: 'Saved Jokes', action: () => setIsLocal(true) },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <AppBar items={menuItems} style={{ marginBottom: '25px' }} />
        <TechJokesViewer local={isLocal} />
      </div>
    </div>
  );
};
```

:::note
Uncomment the above snippet in your project to see it rendered in your workspace UI.
:::

![A n example of a composition](/img/compositions_demo.png)
