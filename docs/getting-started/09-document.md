---
id: document
title: Add Documentation
---

For a component to be usable as an independent building block, not only by machines but also by humans, it must have its own documentation.

## Docs template

Bit generates a documentation page for each component, you can find it in the component's "overview" tab. The documentation is generated accoridng to a template defined as part of the [Component Development Environment](TODO) applied on your component.

The core template features several automated features to streamline the documentation process.

### Property table

![Properties Table](/img/docs_prop_table.jpg)

The documentation template provided by the React environment can be customized in two ways:

1. Using its API for ad-hoc modifications. This is done to add custom components or to override a section in a specific component documentation.
2. Creating a new React environment by extending the React environment currently in use, and overriding its documentation template.

### Compositions gallery

A component that has compositions to demo its capabilities features all compositions as a gallery for their consumers.

## Freeform docs using MDX

Bit supports adding MD/MDX files to components, so you can add your own free-form documentation. To add it start by creating a new docs file to the component. For this tutorial we'll use [MDX](https://mdxjs.com/) format, as it allows embedding React in Markdown).

```shell
$ touch components/react/ui/button/button.docs.mdx
```

### Adding components to docs

You can write any arbitrary React code to the documentation. For example:

```mdx title="components/react/ui/button/button.docs.mdx"
import { Separator } from '@teambit/documenter.ui.separator';

## Guidelines 

* Place buttons where expect to find them. Do not force users to "hunt for buttons"
* Do not use generic names for your buttons. Use verbs that clearly explain the button's function.
* Size buttons in proportion to their importance.

<Separator />
```

In this example we used a component that is themed according to Bit's Documenter design system, which is a design system used to document components.

Head over to the Workspace UI to see our new section.

### Bit flavored MD/MDX

There are several template features we can use the MD/MDX formats to override using Markdown Headers. We can use it to manipulate specific parts of the component documentation metadata.

```mdx title="Markdown headers examples"
---
displayName: silly-button
description: An imperfect button.
labels: ['buttons', 'base', 'silly']
---
```

### Live component playground

MDX allows you to transform any code-block to a playground. Just add `live=true` to any codeblock.

````jsx title="add a live playground with React
```jsx live=true
<p> Hello World! </p>
```
````

#### Using with external modules/components

The live playground can access the docs file dependencies. To use an external component or module, first import it to the docs file.

For example:

````jsx title="MDX with imported component"

import { Button } from '@my-org/ui.button';

```jsx live=true
<Button variant="primary">Click here</Button>
```
````

![Button Overview](/img/button_overview.png)
