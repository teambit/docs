---
id: documentation
title: Documentation
---

Documentation is the path to fame. It is what turns a good component to a useful component. 

Bit presents the components' docs both in the local Workspace UI and in the remote Scope UI. 

Bit offers a variety of ways to customize the documentation, with different courses pertaining to different parts of the docs.

### The anatomy of a documentation, from top to bottom:

* __Title__: The component's name, read from the code (and parsed from PascalCase/camelCase).
* __Abstract__: The component description. 
* __Tags__: Keywords that describe and categorize the component. 
* __Custom JSX__: A slot for a custom JSX component.
* __Playground__: A real-time playable examples of code.
* __Compositions__: Instances of the component in different contexts and variations.  
* __Properties table__: A table showing the name, type, default value and description of the component's props.

## Customizing the documentation

### Abstract

### Tags

### Custom JSX
The custom JSX slot, placed below the component's meta-data, allows you to extend the documentation with your own custom component.

For example, let's say we need a "Guidelines" section for our Button component. This section will talk about the correct usage of a component, in terms of UX.

We'll first create a `<component>.docs.jsx` file in the Button component's directory:
```sh
$ thouch ./path/to/component/folder/<component>.docs.tsx
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

The code above will show up like so:
![](https://res.cloudinary.com/blog-assets/image/upload/v1595893358/Screen_Shot_2020-07-28_at_2.39.53_jcccrz.png)


### Playground

### Compositions

###  Properties Table

To ensure the documentation is faithful to the code, Bit generates the properties table from the code itself using react-docgen. At the bottom of the overview page you'll find all the component props listed and characterized in a table. These props are extracted from the JSDoc, prop-types and typescript type definitions, as well as the functional run-time code itself.

### TypeScript + JSDocs:
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


*  Conflicts between parts of the code that is parsed to the properties table, will be resolved one way or the other.
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

### TypeScript + JSDocs:





## Defining custom documentation

If you want to override and add features on top of the automatically generated documentation from the add a documentation file.

```sh
$ thouch ./path/to/component/folder/<component>.docs.tsx
```

This is a basic React component Bit uses to compose with the automated documentation. It supports several features:

### Adding your own documentation to a component

Any content used by the `default` export is rendered as the component's description.

```javascript
import React from 'react';

export default () => {
  return (
    <h1>New title in component overview</h1>
    <p>And some additional free-form text</p>
  );
};
```

Bit comes with many components you can use for your template:

```javascript
import React from 'react';
import { Paragraph } from '@bit/bit.test-scope.ui.paragraph';
import { Section } from '@bit/bit.test-scope.ui.section';
import { LinkedHeading } from '@bit/bit.test-scope.ui.linked-heading';

export default () => {
  return (
    <Section>
      <LinkedHeading link='overview'>Summary</LinkedHeading>
      <Paragraph>
        Links are used as navigational elements and can be used on their own or inline with text. 
        They provide a lightweight option for navigation but like other interactive elements, too 
        many links will clutter a page and make it difficult for users to identify their next steps. 
        This is especially true for inline links, which should be used sparingly.
      </Paragraph>
    </Section>
  );
};
```
