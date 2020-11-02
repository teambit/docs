---
id: documenting-react
title: Documenting React
---

### The anatomy of a default React documentation

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
* Conflicts between the different parts of the code that is parsed to the properties table, will be resolved one way or the other. So, make sure to keep all parts in coherence.

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

### Overriding and extending the documentation

Use the `doc` file to override the component's meta-properties and extend the documentation page with a custom component.

We'll start by creating a `doc` file under the component directory.

```sh
$ touch ./path/to/component/folder/<component>.docs.tsx
```

#### Override 'abstract' and 'tags'

The 'abstract' and 'tags' define the component description and related categories. Both are generated automatically by Bit. To override Bit's auto-generated data, use the `abstract` and `tags` variables, in the component's `*.doc.tsx` file.

```js
export const abstract = "An imperfect button"

export const tags = ["react", "typescript", "button"]
```

#### Embed your own custom component

The custom JSX slot gives you the freedom to extend the documentation page as you like. To use it, create a regular React component in the `doc` file, and export it as `default`

For example, let's create a 'Guidelines' section for a 'Button' component documentation:

```tsx
export default function () {
    const wrapper = {
      border: '1px solid #e0ddd8',
      borderRadius: '5px',
      padding: '25px',
      marginBottom: '25px'
    }
    return (
        <div style={wrapper}>
            <p style={{fontWeight: 700}}>Guidelines</p>
            <br/>
            <ul style={{listStyleType: 'circle', paddingLeft: "25px"}} >
                <li>
                    Place buttons where users expect to find them. Do not force users to "hunt for buttons".
                </li>
                <li>
                    Do not use generic labels for your buttons. Use verbs that clearly explain the button's function.
                </li>
                <li>
                    Size buttons in proportion to their importance
                </li>
            </ul>
        </div>
    )
}
```

The code above will be rendered like so:
![](https://res.cloudinary.com/blog-assets/image/upload/v1595893358/Screen_Shot_2020-07-28_at_2.39.53_jcccrz.png)

[Learn more about Compositions here.](/docs/compositions/develop-in-isolation)

### Adding examples -  instructions with playable code

Examples are descriptions and playable code that instruct on how a component should be used.

Examples are set using the `examples` variable in the `<component>.docs.tsx` file.

The `examples` variable receives an array of objects, each representing a single example and each contains the following data (keys):

* __scope__: An _object_ with all relevant imports.
* __title__: A _string_ for the example title.
* __Description__: A _string_ for the example description.
* __Code__: A _string_ (template literal) for the example code.

For example, let's create an example for a 'Card' component:

```sh
$ touch ./path/to/component/folder/card.docs.tsx
```

Inside that file, we'll import the 'Card' component and set the `examples` variable with a single object.

```jsx
import React from 'react'
import {Card} from './card'

export const examples = [
  {
    scope: {
      Card
    },
    title: "Simple Card",
    description: "Use 'fullWidth' for small screens" ,
    code: `<Card size='fullWidth'>
                <p>When do two functions fight?</p>
                <p>- When they have arguments</p>
            </Card>`
    }
];
```