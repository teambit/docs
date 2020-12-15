---
id: document
title: Document
---
For a component to be usable as an independent building block, not only by machines but also by humans, it must have its own documentation.

Bit automates component documentation by parsing its code and displaying the output in a template provided by the Environment used by that component. The generated documentation is displayed both in the local Workspace UI and in the remote Scope UI.

In this section we'll focus on the documentation template provided by the default React environment. To see the auto-generated docs of our [previously-created 'Button' component](/docs/getting-started/add-components), head over to the 'Overview' tab in the Workspace UI. 

Our component's documentation already displays a 'Properties' table, detailing the different props it receives. It also shows its title and abstract.

![Properties Table](/img/docs_prop_table.jpg)

The documentation template provided by the React environment can be customized in two ways:

1. Using its API for ad-hoc modifications. This is done to add custom components or to override a section in a specific component documentation.
2. Creating a new React environment by extending the React environment currently in use, and overriding its documentation template.

This tutorial will only cover using the docs API for ad-hoc modifications. To learn how to extend and override the documentation template, [see here](docs/react/overview).


### Create a docs file

Create a docs file in the 'Button' component directory. The doc file could either be a T/JSX file or an [MDX file](https://mdxjs.com/).

MDX gives us the best of both worlds, the simplicity of writing markdown with the endless possibilities of coding, or more specificity - JSX.

MDX written in the documentation is themed using Bit's [documenter design system](https://bit.dev/teambit/documenter).

The filename should follow this pattern: `<component>.docs.mdx` (or .js/.ts/.jsx/.tsx).

For example:

```shell
// in the 'Button' component directory
$ touch button.docs.mdx
```

### Add a custom section (component)
Let's say we  want to add a 'guidelines' section to explain how our button should be used for an optimized user experience. In this example we'll simply write down MDX in the `button.docs.mdx` file. As you recall, this can be a combination of standard markdown with JSX.

MDX elements are themed using the [documenter design system](https://bit.dev/teambit/documenter).


```md
import { Separator } from '@teambit/documenter.ui.separator';

## Guidelines 

* Place buttons where expect to find them. Do not force users to "hunt for buttons"
* Do not use generic names for your buttons. Use verbs that clearly explain the button's function.
* Size buttons in proportion to their importance.

<Separator />
```
> Notice how 'react' was not imported. This is done automatically by default.

Head over to the Workspace UI to see our new section.
### Override the 'description'/'abstract' property
By default the abstract property is automatically parsed from the code. To override it, insert the following in the MDX [front matter](https://github.com/cuttlebelle/website/blob/master/content/documentation/what-is-frontmatter.md):

```mdx
---
description: 'An imperfect button.'
---
```

### Override the 'labels' property

'Labels' are also auto-generated. To override them, insert the following in the MDX [front matter](https://github.com/cuttlebelle/website/blob/master/content/documentation/what-is-frontmatter.md):

```mdx
---
labels: ['react', 'typescript', 'button']
---
```

### Add live examples

Examples are descriptions and playable code that instruct on how to use a component. 

The `examples` variable receives an array of objects, each representing a single example with the following properties:

- `scope` - An `object` with all relevant imports.
- `title` - A `string` for the example title.
- `description` - A `string` for the example description.
- `code` / `jsx` - A `string`/ `JSX` for the example code

For example:

```tsx
export const examples = [
  {
    scope: {
      Button,
    },
    title: 'Using the Button component',
    description: <div>example description with JSX</div>,
    jsx: <Button variant="primary">Click here</Button>,
  },
  {
    scope: {
      Button,
    },
    description: 'Use the Button component with any (native) HTML button attribute.',
    code: `<Button disabled>Click here</Button>`,
  },
];
```
![Button Overview](/img/button_overview.png)