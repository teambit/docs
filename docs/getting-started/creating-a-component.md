---
id: creating-a-component
title: Creating a Component
---

Bit requires that every component is in it's own folder. To create a button component we need to create a button folder.

```shell
mkdir button
```

We then need to create the necessary files. 

```shell
touch button/index.ts button.tsx button.composition.tsx
```

## The Index file

The `index.ts` file is the file that exports the component

```jsx
export { Button }  from './button';
```

## The Component file

The `button.tsx` file is where we create and export our component

```jsx
import React from 'react';

export function Button() {
  return <button>click me</button>;
}
```

## The Composition file

The `button.composition.tsx` file is needed so that we can visualize our component in our workspace.


```jsx
import React from 'react';
import { Button } from './button';

export const BasicButton = () => {
  return <Button>Click here!</Button>;
};
```

### Adding our Components to the Workspace

To add our components to the workspace we use the `bit tag` command.

```shell
bit tag --all
```
