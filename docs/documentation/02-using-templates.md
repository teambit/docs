---
id: using-templates
title: Using Templates
---

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

```js
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

The code above will be rendered like so

![](https://res.cloudinary.com/blog-assets/image/upload/v1595893358/Screen_Shot_2020-07-28_at_2.39.53_jcccrz.png)

[Learn more about Compositions here.](TODO)

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
