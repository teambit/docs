--- 
id: documenting-components
title: Documenting
--- 

import { Image } from '@site/src/components/image'

For a component to be usable as an independent building block, not only by machines but also by humans, it needs to have its own documentation.
The documentation for each component is displayed in the 'Overview' tab of the Workspace UI and the Scope UI.

<Image src="/img/ws_getting_started_docs.png" width="60%"/>

## Environment-specific templates

Bit automates component documentation by parsing its code and displaying the output in a template provided by the [environment](/building-with-bit/environments) used by that component.

Using different templates for different types of components (each using a different environment) means your components get documented in a way that makes sense for them. In addition to that, each documentation template provides a different API that uses the JS flavor or framework in use by the documented component. That means an Angular component will be documented using Angular and not, for instance, React.

## Development vs Production

Documentation in development, for authored or modified components, will be shown in the Workspace UI. These docs will be generated using the ['DevServer'](/building-with-bit/environments#devserver) environment service to enable features needed for development, like "hot reloading".

The "production" version of the documentation, for component release versions, will be shown in the Scope UI and in the Workspace UI, for previous tag releases. The "production" version is generated using the 'Preview' service and provides an optimized built.

## Customizing the documentation

The documentation can be customized in two ways:

1. Using the documentation template API for ad-hoc modifications. This is done to add custom components or to override a section in a specific component documentation. Learn about the React, React Native and Node environments API here.

2. Creating a new documentation template. This can be done as part of an [environment extension](/building-with-bit/environments) or as part of a new environment aspect.

## Using the Docs API


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

## Properties Table

> The properties table is only available for the React and React Native environments

To ensure the documentation is faithful to the code, Bit generates the properties table from the code itself using [react-docgen](https://github.com/reactjs/react-docgen). At the bottom of the overview page you'll find all the component props listed and characterized in a table. These props are extracted from the JSDoc, prop-types and typescript type definitions, as well as the run-time code itself.

#### TypeScript + JSDocs

```js
export interface IButton extends  ButtonHTMLAttributes<HTMLButtonElement> {
    /** Choose between primary and secondary styling. */
    variant?: 'primary' | 'secondary';
}


export const Button = ({children, variant, ...rest} : IButton) => {
    return (
        <button className={styles[variant]} {...rest}>
            {children}
        </button>
    )
}

Button.defaultProps = {
    variant: 'primary'
}
```

A few things to note here:

* JSDocs comments written directly above the type definitions, will show up as prop description in the properties table.
* Inherited props, often received by extending React's out-of-the-box types, will not show up in the documentation unless they are explicitly defined. For example, in the code snippet above, a Button component extends a native HTML button attributes (`ButtonHTMLAttributes<HTMLButtonElement>`) but none of these attributes will appear in the props table (for example: `disabled`,`onclick`, etc.)
* Conflicts between the different parts of the code that is parsed to the properties table, will be resolved one way or the other. So, make sure to keep all parts in coherence.

```js
export interface IButton extends  ButtonHTMLAttributes<HTMLButtonElement> {
    variant: 'primary' | 'secondary';
}

export const Button = ({children, variant = 'primary', ...rest} : IButton) => {
    return (
        <button className={styles[variant]} {...rest}>
            {children}
        </button>
    )
}
```

The above code shows 'variant' as a 'required' prop (since that is the default). However, the 'variant' prop receives a default value, making it 'optional'. The properties table will ignore TS and show the prop as 'optional'.

![](https://res.cloudinary.com/blog-assets/image/upload/v1595377690/props_screenshot_vuv0px.png)

#### prop-types + JSDocs

```js
export const Button = ({children, variant, ...rest}) => {
    return (
        <button className={styles[variant]} {...rest}>
            {children}
        </button>
    )
}

Button.defaultProps = {
    variant: 'primary'
}

Button.propTypes = {
    /** Choose between primary and secondary styling. */
    variant: PropTypes.oneOf(['primary', 'secondary']),
    children: PropTypes.any.isRequired
}
```

A few things to note here:

* JSDocs comments written directly above the prop type definitions, will show up as prop description in the properties table.
* Conflicts between the different parts of the code that is parsed to the properties table, will be resolved one way or the other. So, make sure to keep all parts in coherence.