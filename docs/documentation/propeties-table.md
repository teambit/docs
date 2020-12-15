---
id: properties-table
title: Properties Table
---

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