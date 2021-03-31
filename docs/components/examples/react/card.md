---
id: card
title: Card
---

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
