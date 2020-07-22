---
id: workspace-ui
title: Workspace UI
---

The workspace UI presents all your workspace tracked components. It serves two main purposes:

1. It is a development tool as it enables you to examine you components (in your local dev environment) in different contexts and variations.

2. When published to a remote server (e.g, Bit), it serves as a catalog for shared components with documentation and compositions showcasing each component's usage.

![](https://res.cloudinary.com/blog-assets/image/upload/v1595374309/workspace_ui_spxnr9.png)

### Mapping components to the workspace UI

A quick reminder - this is a standard component directory structure:

```
|-- components
    |-- button
        |-- button.tsx
        |-- button.module.scss
        |-- button.spec.js
        |-- button.compositions.tsx
        |-- button.docs.tsx
        |-- index.ts
```

1. __The sidebar navigation__ displays all tracked components grouped under their set namespace. In the screenshot above all components are under the "ui" namespace.

2. __The abstract and tags__, located under the component title are set in the `*.doc.tsx` file using the 'abstract' and 'tags' variables. For example:

```javascript
export const abstract = "An imperfect button"

export const tags = ["react", "typescript", "button"]
```

3. __A slot for a custom component__ positioned right below the division line and above the 'compositions' section, is occupied by an optional component that is placed in the `*.doc.tsx` file and exported as 'default'.

For example:

```jsx
export default function () {
    return (
        <div>This is a custom segment.</div>
    )
}
```

This is one of many ways to extend and customize your workspace UI.

4. __The compositions section__, as well as the compositions tab, exhibit the component in different contexts and variations. These example code are place in the `*.compositions.tsx` file and exported using named exports.

For example:

```jsx
import React from 'react';
import Button from './button';


export const PrimaryButton = () => {
     return(
         <Button variant='primary' onClick={() => alert('Clicked!')}>Primary Button</Button>
     );
};

export const SecondaryButton = () => {
    return(
        <Button variant='secondary'>Secondary Button</Button>
    );
};
```

5. __The properties__ section displays the different props the component receives. This table of props is extracted from the components code.

For example:

```tsx
import React, {ButtonHTMLAttributes} from 'react'
import styles from './button.module.scss'


export interface IButton extends  ButtonHTMLAttributes<HTMLButtonElement> {
    /** Choose between primary and secondary styling. */
    variant : 'primary' | 'secondary';
}


const Button = ({children , onClick, variant, ...rest} : IButton) => {
    return (
        <button className={styles[variant]} {...rest}>
            {children}
        </button>
    )
}

Button.defaultProps = {
    variant: 'primary'
}


export default Button;
```
This above code will produce the following table:

![](https://res.cloudinary.com/blog-assets/image/upload/v1595377690/props_screenshot_vuv0px.png)