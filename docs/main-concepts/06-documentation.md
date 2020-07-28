---
id: documentation
title: Documentation
---

Documentation is the path to fame. It is what turns a good component to a useful component. 

Bit presents the components' documentation both in the local Workspace UI, under the 'overview' tab, and in the remote Scope UI. 

Bit offers a variety of ways to customize the documentation, with different courses pertaining to different parts of the documentation.

## The anatomy of a documentation (top to bottom):

* __Title__: The component's name, read from the code (and parsed from PascalCase/camelCase).
* __Abstract__: The component description. 
* __Tags__: Keywords that describe and categorize the component. 
* __Custom JSX__: A slot for a custom JSX component.
* __Playground__: A real-time playable examples of code.
* __Compositions__: Instances of the component in different contexts and variations.  
* __Properties table__: A table showing the name, type, default value and description of the component's props.

### Abstract & Tags
* The _abstract_ and _tags_, located under the component title are set using the `abstract` and `tags` variables, in the component's `*.doc.tsx` file. Setting these attributes using code means you can generate them in any way you choose.

For example:

Let's first create the `*.doc.tsx` file in the component's directory

```sh
$ touch ./path/to/component/folder/<component>.docs.tsx
```

Then, set the abstract and tags variables and export them.

```javascript
export const abstract = "An imperfect button"

export const tags = ["react", "typescript", "button"]
```

### Custom JSX
The custom JSX slot, placed below the component's meta-data, allows you to extend the documentation with your own custom component.

For example, let's create a 'Guidelines' section for our 'Button' component documentation:

We'll first create a `*.doc.tsx` file in the 'Button' component directory:
```sh
$ touch ./path/to/component/folder/button.docs.tsx
```

In this file, we'll create a React component and `export default` it, like so:

```tsx
import React from 'react'

export default function () {
    const style = {
      // some styling...
    }
    return (
        <div style={style}>
            <p >Guidelines</p>
            <ul>
                <li>
                    Place buttons where users expect to find them. Do not force users to "hunt for buttons".
                </li>
                // more list items...
            </ul>
        </div>
    )
}
```
And, that's it. No further configurations are needed.

The code above will be rendered like so:
![](https://res.cloudinary.com/blog-assets/image/upload/v1595893358/Screen_Shot_2020-07-28_at_2.39.53_jcccrz.png)

[Learn more about Compositions here.]()
### Playground

### Compositions
Compositions are examples or instances of a component. They demonstrate potential behaviors and use cases for that component. Compositions are no more than standard components, located in the `<component>.compositions.tsx` directory.

For example, let's create two simple compositions for a 'Button' component:

```sh
$ touch ./path/to/component/folder/button.compositions.tsx
```
We'll then import the 'Button' component and use it to create the compositions:

```tsx
import React from "react";
import { Button } from "./button";

export const PrimaryButton = () => {
  return (
    <Button variant="primary">
        Click Me
    </Button>
  );
};


export const SecondaryButton = () => {
  return (
    <Button variant="secondary">
        Click Me
    </Button>
  );
};
```


###  Properties Table

To ensure the documentation is faithful to the code, Bit generates the properties table from the code itself using [react-docgen](https://github.com/reactjs/react-docgen). At the bottom of the overview page you'll find all the component props listed and characterized in a table. These props are extracted from the JSDoc, prop-types and typescript type definitions, as well as the functional run-time code itself.

#### TypeScript + JSDocs:
```tsx
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


*  Conflicts between the different parts of the code that is parsed to the properties table, will be resolved one way or the other. So, make sure to keep all parts in coherence.
For example:
```tsx
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

#### prop-types + JSDocs:

```jsx
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

*  Conflicts between the different parts of the code that is parsed to the properties table, will be resolved one way or the other. So, make sure to keep all parts in coherence. [See the example above]()
