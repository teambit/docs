---
id: using-docs-api
title: Using the Docs API
---

//TODO add to building with bit section


import { Image } from '@site/src/components/image'

:::note
This tutorial discusses the documentation template for React, React Native and NodeJS environments.
:::

## Create a documentation file

To start customizing your documentation, create a documentation file in the component directory.
Choose between a JSX or an MDX file (to learn about the MDX syntax, [see here](https://mdxjs.com/table-of-components)).

### MDX doc file

```
touch path/to/component/directory/component-name.docs.mdx
```

### JS doc file

```
touch path/to/component/directory/component-name.docs.tsx
```

## Title / Display Name

The component's name.

**Using MDX** (front matter):

```mdx
---
displayName: Button
---
```

**Using JS:**

```js
export const title = 'my new customized title';
```

## Abstract / Description

The component description. To override, insert the following in the `*.docs.*` file:

**Using MDX** (front matter):

```mdx
---
description: my customized title
---
```

**Using JS:**

```js
export const abstract = 'my new customized title';
```

## Labels

Keywords that describe and categorize the component (used by Bit.dev's search engine).

To override, insert the following in the `*.docs.*` file:

**Using MDX:** (front matter)

```mdx
---
labels: ['react', 'typescript', 'ui']
---
```

**Using JS:**

```js
export const labels = ['react', 'typescript', 'ui'];
```

<Image src="/img/ws_getting_started_frontmatter.png" width="70%" padding={20}/>

## Custom section

The custom JSX slot gives you the freedom to extend the documentation page as you like.

**Using MDX**:

This can be done by simply writing down MDX in the component's `*.docs.mdx` file, which can include simple markdown, as well as JSX.

> Never import React to MDX doc files as it is injected by default.

```mdx
import { Card } from './card';

### This is a custom section

Here's a React Card Component:

<Card />
```

<Image src="/static/img/card_example.png" width="50%"/>

<br />

**Using JSX:**
Create a function with the name 'Overview' and export it as default:

```jsx
export default function Overview() {
  return <h3>My custom docs section</h3>;
}
```

## Live examples

Examples are descriptions and playable code that instruct on how a component should be used.

To add live examples, insert the following in the `*.docs.*` file:

**Using MDX:**

````mdx
    ```jsx live=true
    const SayHi = () => {
        return <p>Hello!</p>
    }
    ```
````

**Using JSX:**
Create an `examples` variable.
The `examples` variable receives an array of objects, each representing a single example and each contains the following data (keys):

- **scope**: An _object_ with all relevant imports.
- **title**: A _string_ for the example title.
- **Description**: A _string_ for the example description.
- **Code**: A _string_ (template literal) for the example code.

For example, let's create an example for a 'Card' component:

```shell
$ touch ./path/to/component/folder/card.docs.tsx
```

Inside that file, we'll import the 'Card' component and set the `examples` variable with a single object.

```jsx
import React from 'react';
import { Card } from './card';

export const examples = [
  {
    scope: {
      Card,
    },
    title: 'Simple Card',
    description: "Use 'fullWidth' for small screens",
    code: `<Card size='fullWidth'>
                <p>When do two functions fight?</p>
                <p>- When they have arguments</p>
            </Card>`,
  },
];
```
