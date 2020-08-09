---
id: automated-docs
title: Automated Docs
---

The documentation is presented in the local [Workspace UI](), and in the remote [Scope UI]() (e.g, on Bit.dev).

The documentation pages are generated using templates. These templates are determined by the different [environment(s)]() that are set for different types of components. That ensures each component type gets documented in the way that suits its purpose and technology (e.g, a doc template for React UI components and another template for serverless node functions).

In addition to that, Bit exposes a simple API for ad hoc customization.

### Example: The anatomy of a default React documentation

* __Title__: The component's name, read from the code (and parsed from PascalCase/camelCase).
* __Abstract__: The component description.
* __Tags__: Keywords that describe and categorize the component.
* __Custom JSX__: A slot for a custom JSX component.
* __Compositions__: Instances of the component in different contexts and variations.
* __Examples__: Instructions and playable examples of code that function as a mini tutorial for components.
* __Properties table__: A table showing the name, type, default value and description of the component's props.

### Working with the auto-generated properties table

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
* Conflicts between the different parts of the code that is parsed to the properties table, will be resolved one way or the other. So, make sure to keep all parts in coherence. [See the example above](TODO)

### Writing component compositions

Compositions are examples or instances of a component. They demonstrate potential use cases and behaviors for that component. Compositions are no more than standard components, located in the `<component>.compositions.tsx` directory.

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
