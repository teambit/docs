--- 
id: button
title: button 
--- 

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="index.ts"
  values={[
    {label: 'index.ts', value: 'index.ts'},
    {label: 'button.tsx', value: 'button.tsx'},
    {label: 'button.composition.tsx', value: 'button.composition.tsx'},
    {label: 'button.docs.mdx', value: 'button.docs.mdx'},
    {label: 'button.spec.tsx', value: 'button.spec.tsx'}
  ]}>
  <TabItem value="index.ts">

```tsx title="index.ts"
export { Button }  from './button';
```

  </TabItem>
  <TabItem value="button.tsx">

```tsx title="button.tsx"
import React from 'react';

export type ButtonProps = {
  text: string;
};

export const Button = ({
  text
}: ButtonProps) => {
  return <button>{text}</button>
};
```

  </TabItem>
    <TabItem value="button.composition.tsx">

```tsx
import React from 'react';
import { Button } from './button';

export const BasicButton = () => {
  return <Button text="click me" />;
};
```

  </TabItem>
  <TabItem value="button.docs.mdx">

```mdx
---
labels: ['react', 'typescript', 'ui', 'button']
description: 'A Button component.'
---

import { Button } from './button';

Button example:

// Uncomment out the code below by removing the '//'
// ```js live
<Button text="click here"/>
// ```
```

  </TabItem>
<TabItem value="button.spec.tsx">

```tsx
import React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';

import { BasicButton } from './button.composition';

it('should render', () => {
  const { getByText } = render(<BasicButton />);
  const rendered = getByText('click me');

  expect(rendered).to.exist;
});
```

  </TabItem>
</Tabs>