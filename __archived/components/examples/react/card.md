---
id: card
title: Card
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
defaultValue="TypeScript"
groupId="langs"
values={[
{label: 'TypeScript', value: 'TypeScript'},
{label: 'JSX', value: 'JSX'},
]}>
<TabItem value="TypeScript">

```jsx {2} title="card.tsx"
import React from 'react'
import { Button } from '@my-scope/ui.button'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = ({ children, ...rest }: CardProps) => {
  return (
    <div {...rest}>
      <Button>Click here</Button>
    </div>
  )
}
```

  </TabItem>
  <TabItem value="JSX">

```jsx {2} title="card.jsx"
import React from 'react'
import { Button } from '@my-scope/ui.button'

export const Card = ({ children, ...rest }) => {
  return (
    <div {...rest}>
      <Button>Click here</Button>
    </div>
  )
}
```

  </TabItem>
</Tabs>
