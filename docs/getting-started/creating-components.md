---
id: creating-components
title: Creating Components
---

Bit tracks component folders so everything belonging to that component should live in that folder and should have an `index.ts` as main entry file.

```shell
mkdir button
```

We then need to create the necessary files. 

```shell
touch button/index.ts button.tsx button.composition.tsx
```

## The Index file

The `index.ts` file is the file that exports the component

```jsx title="index.ts"
export { Button }  from './button';
```

## The Component file

The `button.tsx` file is where we create and export our component

```jsx title="button.tsx"
import React from 'react';

export type ButtonProps = {
  text?: String
}

export function Button({text}) {
  return <button>{text}</button>;
}
```

## The Composition file

The `button.composition.tsx` file is needed so that we can visualize our component in our workspace.


```jsx title="button.composition.tsx"
import React from 'react';
import { Button } from './button';

export const BasicButton = () => {
  return <Button>Click here!</Button>;
};
```

