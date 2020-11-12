---
id: document
title: Document
---
For a component to be usable as an independent building block, it must have its own documentation.

Bit automates component documentation by parsing its code and displaying it in a template provided by the Environment in use. The generated documentation is displayed both in the local Workspace UI and in the remote Scope.

In this section we'll focus on the documentation template provided by the React environment. To see the auto-generated docs of our previously-created 'Button' component, head over to the 'Overview' tab in the Workspace UI. 

Our component's documentation already displays a 'Properties' table, detailing the different props it receives. It also shows its title and abstract.

![Properties Table](/img/docs_prop_table.jpg)

The documentation template provided by the React environment can be customized in two ways:

1. Using its API for ad-hoc modifications. This is done to add custom components or to override a section in a specific component documentation.
2. Creating a new React environment by extending the React environment currently in use, and overriding its documentation template.

This tutorial will only cover using the docs API for ad-hoc modifications. To learn how to extend and override the documentation template, [see here](docs/react/overview).


### Create a doc file

Create a doc file in the 'Button' component directory. The name should follow this pattern: `<component>.docs.tsx`.

For example:

```shell
// in the 'Button' component directory
$ touch button.docs.tsx
```

### Add a custom section (component)
Let's say we  want to add a 'guidelines' section to explain how our button should be used UX-wise. We'll create our own section using UI components provided by Bit. This will help us maintain a look and feel that is consistent with the rest of the documentation template and the workspace UI.

We'll start by installing the needed components:

```shell
$ bbit install @teambit/documenter.ui.section @teambit/documenter.theme.theme-contex @teambit/documenter.ui.linked-heading @teambit/documenter.ui.list @teambit/documenter.ui.separator
```

We'll then create a component named 'Overview', and place our content inside (the component should be exported as default):

```tsx
import React from 'react';
import { Button } from './button';
import { Section } from '@teambit/documenter.ui.section';
import { ThemeContext } from '@teambit/documenter.theme.theme-context';
import { LinkedHeading } from '@teambit/documenter.ui.linked-heading';
import { List } from '@teambit/documenter.ui.list';
import { Separator } from '@teambit/documenter.ui.separator';

export default function Overview() {
  return (
    <ThemeContext> 
      <>
        <Section>
          <LinkedHeading link="guidelines">Guidelines</LinkedHeading>
          <List spacing="lg">
            {[
              `Place buttons where expect to find them. Do not force users to "hunt for buttons".`,
              `Do not use generic for your buttons. Use verbs that clearly explain the button's function.`,
              `Size buttons in proportion to their importance.`,
            ]}
          </List>
        </Section>
        <Separator />
      </>
    </ThemeContext>
  );
};
```

Head over to the Workspace UI to see our new section.
### Override the 'abstract' property
The abstract property is automatically parsed from the code. To override it:

```tsx
Overview.abstract = 'An imperfect button.';
```

### Override the 'tags' property

'Tags' are also auto-generated. To override them:

```tsx
Overview.labels = ['react', 'typescript', 'button'];
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
Overview.examples = [
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