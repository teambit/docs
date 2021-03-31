---
id: document
title: Document Components
---

import { Image } from '@site/src/components/image';

For a component to be usable as an independent building block, not only by machines but also by humans, it must have its own documentation.

:::note
This section discusses the documentation in the 'React', 'React Native', and 'Node' development environments.
:::

A component documentation is made of two parts:

1. The documentation template (defined by the [component development environment](/building-with-bit/environments)).
   In the case of the 'React' and 'React Native' environments, it will include the auto-generated 'Properties' table (that lists all the component's props), and the manually added docs content.

2. The manually added docs content is placed in a `.docs.mdx` or `*.docs.md` file, in the component's directory.
   It will automatically get integrated in the environment's docs template.

For example:

```bash {4}
└── tech-jokes-viewer
    ├── index.tsx
    ├── button.composition.tsx
    ├── button.docs.mdx
    ├── button.module.css
    └── button.tsx
```

<Image src="/img/ws_getting_started_docs.png" />

## Using the frontmatter API

Bit parses your code to generate metadata for your components. This metadata is presented in the component's documentation and is used by Bit.dev's search engine.  
To override it, use Bit's frontmatter properties, at the top of your MDX file.

- `displayName` _string_ overrides the component name.
- `description` _string_ overrides the component description/abstract.
- `labels` _string[]_ overrides the component labels/tags.

```md
---
displayName: Button
description: An imperfect button.
labels: ['react', 'typescript', 'button']
---
```

<Image src="/img/ws_getting_started_frontmatter.png" width="70%" padding={20}/>

## Using the live playground

To use Bit's live playground add `live` to your codeblock. The live playground displays code examples that can be modified straight from the docs.

````jsx
;```jsx live
() => {
    return <p> Hello World! </p>
}
```
````

## Using the live playground with external modules

The live playground can access the docs file dependencies. To use an external module, first import it to the docs file.

For example:

````jsx
---
description: An imperfect button.
labels: ['react', 'typescript', 'button']
---

import { Button } from './button';

### Using the 'button' component

```jsx live
<Button variant="primary">Click here</Button>
```
````

<Image src="/img/ws_getting_started_mdx_imports.png" padding={20}/>
