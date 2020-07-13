---
id: documenting-components
title: Documenting Components
---

Documentation is an essential part of code. When creating reusable components, it is especially important, as other developers need the documentation to properly use the components in their projects. It is an integral part of each Bit component. With tools like TypeScript and PropTypes your code practically documents itself. Harness these capabilities with Bit to create automated documentation pages for each of your components.

## Basic documentation template

Each Environment implemented an automated documentation generator for the framework it supports. A basic template may contain:

- **Component name** part of the component ID.
- **Usage instructions** using the component module name.
- **Documentation snippets** if you added JSDocs annotations to the code.
- **Component composition gallery** showcasing how the component is rendered.
- **Property table** to show supported params passed to the component.
- **API docs** for utility functions and helpers.

The contents of the default component documentation depends on the environment, as docs is another way of standardizing component development.

## Modify default component documentation

If you want to override and add features on top of the automatically generated documentation from the Environment's template, add a documentation file.

Create a `*.docs.tss` file for the component. In the `docs` file there are several `exports` you can use to modify the generated data in the template.

### Adding your own documentation to a component

By default Bit supports a freeform documentation using your own framework's code. This means that if you are using React, you modify the component documentation using simply React code. To do so first create a `*.docs.tsx` file.

```sh
$ touch path/to/component/<component-name>.doc.tsx
```

The `export default` will be composed to the documentation template.

```typescript
import React from 'react';

export default () => {
  return (
    <h1>New title in component overview</h1>
    <p>And some additional free-form text</p>
  );
};
```

Bit comes with many components you can use for your template:

```typescript
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

### Component abstract description

A component's abstract description is fetched by default from parsing the component's JSDocs. To change it you can either modify your JSDocs annotation in the code or adding this line to the component's `docs` file.

```typescript
export const abstract = 'Your description goes here'
```

### Adding labels to a component

To improve component discoverability and filtering you can set labels for components. Bit will use these labels as part of the component documentation as well as their metadata.

```typescript
export const labels = ['react', 'ui-component', 'label list'];
```
