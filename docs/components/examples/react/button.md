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
export { Button } from './button'
export type { ButtonProps } from './button'
```

  </TabItem>
  <TabItem value="button.tsx">

```tsx title="button.tsx"
import React from 'react'

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export const Button = ({ children, ...rest }: ButtonProps) => {
  return <button {...rest}>{children}</button>
}
```

  </TabItem>
    <TabItem value="button.composition.tsx">

```tsx
import React from 'react'
import { Button } from './button'

// sets the Component preview in gallery view
export const BasicButton = () => {
  return <Button>click me</Button>
}
```

  </TabItem>
  <TabItem value="button.docs.mdx">

```mdx
---
labels: ['react', 'typescript', 'button']
description: 'A Button component.'
---

import { Button } from './button'

Button example:

A simple Button component with some text

// live component playground - if you remove the word live it turns into a code snippet
/`/`/`js live

<Button>click me</Button>
/`/`/`
```

  </TabItem>
<TabItem value="button.spec.tsx">

```tsx
import React from 'react'
import { render } from '@testing-library/react'
import { BasicButton } from './button.composition'

describe('button', () => {
  it('should render with the correct text', () => {
    const { getByText } = render(<BasicButton />)
    const rendered = getByText('click me')
    expect(rendered).toBeTruthy()
  })
})
```

  </TabItem>
</Tabs>
