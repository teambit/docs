---
id: creating-components
title: Creating Components
---

Bit tracks component folders so everything belonging to that component should live in that folder and should have an `index.ts` as main entry file.

:arrow_right: Learn more about [Bit Components](/building-with-bit/components).

```sh
mkdir button
```

We then need to create the necessary files.

```sh
touch button/index.ts button/button.tsx button/button.composition.tsx button/button.docs.mdx
```

## The Index file

The `index.ts` file is the file that exports the component

```tsx title="index.ts"
export { Button }  from './button';
```

## The Component file

The `button.tsx` file is where we create and export our component

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

:arrow_right: Learn more about [Bit Components](/building-with-bit/components).

## The Composition file

The `button.composition.tsx` file is needed so that we can visualize our component in our workspace.

```tsx title="button.composition.tsx"
import React from 'react';
import { Button } from './button';

export const BasicButton = () => {
  return <Button text="click me" />;
};
```

:arrow_right: Learn more about [Bit Compositions](/building-with-bit/compositions).

## The Docs file

This `button.docs.mdx` file is not needed but is very helpful as adds documentation for your component as well as a live playground.

```mdx title="button.docs.mdx"
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

:arrow_right: Learn more about [Bit Documenting](/building-with-bit/documenting).

## Install Dependencies

As we are creating a React component and therefore importing React we will need to install it so we can use it. We can run the `bit install` command to install all needed dependencies.

```shell
bit install
```

:arrow_right: Learn more about [Bit Dependency Installation](/building-with-bit/dependencies).
