---
id: workspace-ui
title: Workspace UI
---

The workspace UI displays all components tracked by the Bit workspace. It is a development tool that enables you to examine your components in different contexts and variations. 

There's much overlap between the local workspace UI and the remotely-hosted ['Scope UI'](#), as they both present components, documentation and compositions, however, they do not share a purpose. The former is a "component workshop", a platform to write component-first code, while the latter serves as a component gallery.


## Features

### A dynamic component navigator
* The workspace sidebar displays all tracked components in a human-friendly manner. Components are categorized according to their [namespace](#) which represents a category of functions or business concerns.

* The component navigator uses the VSCode language to notify of changes, errors, and other important updates happening to components in the  component tree. For example, the 'E' letter will appear to the right of a component name, in case of an error. 

### A single platform for all environments
* Design systems often include more than a single implementation of their UI components. The workspace UI displays all components in a single place, regardless of their framework or environment. Bit does that by using iframes to display components running on different servers, for different environments.

### Component compositions with no configurations
[component compositions](#) are examples or instances of a component. They're used to exhibit and test a component in different contexts and variations. Writing a composition does not require any configuration at all. Simply import and use the component in the component's `*.compositions.tsx` file and export it as a named export (the name of the export will be used for the composition name).

For example, to create compositions for a Button component:

```jsx
import React from 'react';
import Button from './button';


export const PrimaryButton = () => {
     return(
         <Button variant='primary'>Primary Button</Button>
     );
};

export const SecondaryButton = () => {
    return(
        <Button variant='secondary'>Secondary Button</Button>
    );
};
```
Two compositions will appear in the workspace, the 'Primary Button' and the 'Secondary Button'.

### Documentation written in code, not in markdown

* To ensure the documentation is faithful to the code, Bit generates the docs from the code itself using [react-docgen](https://github.com/reactjs/react-docgen). At the bottom of the overview page you'll find all the component props listed and characterized in a table. These props are extracted from the JSDoc, prop-types and typescript type definitions.

For example:

```tsx
import React, {ButtonHTMLAttributes} from 'react'
import styles from './button.module.scss'


export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
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
The above code will produce the following table:

![](https://res.cloudinary.com/blog-assets/image/upload/v1595377690/props_screenshot_vuv0px.png)

* The _abstract_ and _tags_, located under the component title are set automatically by Bit but can be overridden by using the 'abstract' and 'tags' variables, in the component's `*.doc.tsx` file. Setting these attributes using code means you can generate them in any way you choose.

For example, to set them manually:

```javascript
export const abstract = "An imperfect button"

export const tags = ["react", "typescript", "button"]
```

Bit.dev uses both attributes in the Scope UI search engine. 

* The documentation can be extended using the optional slot for a custom component (positioned above the 'compositions' section). The component should be written in the component's`*.doc.tsx` file and exported as default. 

For example:

```jsx
export default function () {
    return (
        <div>This is a custom segment.</div>
    )
}
```