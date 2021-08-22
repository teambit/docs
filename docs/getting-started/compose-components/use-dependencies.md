---
title: Use Dependencies
id: use-dependencies
---

import depImg from './deps.png';
import depGraphImg from './dep-graph.png';


Now that we have our first Component created, let's add the first dependency. Dependencies allow to compose components together and use them from each other. 

Go to `my-welcome.ts` and add the following `import` statement just below the `react` import statement.

```ts
import React from 'react';
import { Heading } from '@bitorg/experience.templates.ui.heading';
```

Congrats you have added a new dependency for your component! You can view your new component dependency with `bit show`. Bit now recognizes `templates/ui/heading` as a dependency of your component.

```bash
$ bit show ui/my-welcome
┌───────────────────┬────────────────────────────────────────────────────────────────┐
│ id                │ bitorg.experience/ui/my-welcome                                │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ scope             │ bitorg.experience                                              │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ name              │ ui/my-welcome                                                  │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ env               │ bitorg.experience/templates/envs/my-react                      │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ package name      │ @bitorg/experience.ui.my-welcome                               │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ main file         │ index.ts                                                       │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ files             │ index.ts                                                       │
│                   │ my-welcome.composition.tsx                                     │
│                   │ my-welcome.docs.mdx                                            │
│                   │ my-welcome.spec.tsx                                            │
│                   │ my-welcome.tsx                                                 │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ dev files         │ my-welcome.spec.tsx (teambit.defender/tester)                  │
│                   │ my-welcome.composition.tsx (teambit.compositions/compositions) │
│                   │ my-welcome.docs.mdx (teambit.docs/docs)                        │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ extensions        │ teambit.react/react                                            │
│                   │ ...                                                            │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ dependencies      │ @bitorg/experience.templates.ui.heading@latest- (component)    │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ dev dependencies  │ @types/node@12.20.4 (package)                                  │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ peer dependencies │ react@^16.8.0 || ^17.0.0------ (package)                       │
└───────────────────┴────────────────────────────────────────────────────────────────┘
```

<img src={depImg} />

Congrats! You have added the your first dependency for your component!
Now, we will add a second dependency, `ui/card` and the initial implementation for our new component.

```ts
import React from 'react';
import { Heading } from '@bitorg/experience.templates.ui.heading';
import { Card } from '@bitorg/experience.templates.ui.card';

export type MyWelcomeProps = {
  /**
   * a text to be rendered in the component.
   */
  title?: string
};

export function MyWelcome({ title }: MyWelcomeProps) {
  return (
    <>
      <Heading>
        {title}
      </Heading>
      <Card
          link="https://harmony-docs.bit.dev/building-with-bit/removing-components"
          heading="Remove"
          text="remove components and their files"
          command={`bit remove "ui/*" --delete-files`}
        />
    </>
  );
}

MyWelcome.defaultProps = {
  text: 'My Welcome Page'
}
```

Going to to the `Dependencies` UI tab computes and shows the evolved dependency graph including the entire dependency graph of  your component rather not just the direct ones.

<img src={depGraphImg} />

A list of the component's direct dependencies can be seen using `bit show` or in the [Code UI tab](/code/ui).

```bash
$ bit show ui/my-welcome
┌───────────────────┬────────────────────────────────────────────────────────────────┐
│ id                │ bitorg.experience/ui/my-welcome                                │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ scope             │ bitorg.experience                                              │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ name              │ ui/my-welcome                                                  │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ env               │ bitorg.experience/templates/envs/my-react                      │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ package name      │ @bitorg/experience.ui.my-welcome                               │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ deprecated        │ false                                                          │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ main file         │ index.ts                                                       │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ files             │ index.ts                                                       │
│                   │ my-welcome.composition.tsx                                     │
│                   │ my-welcome.docs.mdx                                            │
│                   │ my-welcome.spec.tsx                                            │
│                   │ my-welcome.tsx                                                 │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ dev files         │ my-welcome.spec.tsx (teambit.defender/tester)                  │
│                   │ my-welcome.composition.tsx (teambit.compositions/compositions) │
│                   │ my-welcome.docs.mdx (teambit.docs/docs)                        │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ extensions        │ teambit.react/react                                            │
│                   │ ...                                                            │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ dependencies      │ @bitorg/experience.ui.card@latest---- (component)              │
│                   │ @bitorg/experience.ui.templates.ui.heading@latest- (component) │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ dev dependencies  │ @types/node@12.20.4 (package)                                  │
│                   │ ...                                                            │
├───────────────────┼────────────────────────────────────────────────────────────────┤
│ peer dependencies │ @testing-library/react@12.0.0- (package)                       │
│                   │ react-dom@^16.8.0 || ^17.0.0-- (package)                       │
│                   │ react@^16.8.0 || ^17.0.0------ (package)                       │
└───────────────────┴────────────────────────────────────────────────────────────────┘
```

## Peer dependencies

Bit helps to standardize component dependencies.

## Controlling dependencies

