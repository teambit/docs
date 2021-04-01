---
id: creating-components
title: Creating Components
---

import ReactEnvironment from '@site/docs/components/workspace/react-environment.md'
import ExampleButton from '@site/docs/components/examples/react/button.md'
import BitCreateComponent from '@site/docs/components/components/react/bit-create-component.md'
import BitCreateButton from '@site/docs/components/components/react/bit-create-button.md'
import Styles from '@site/docs/components/components/styles.md'
import BitTemplates from '@site/docs/components/commands/bit-templates.md'
import NameSpaces from '@site/docs/components/components/namespaces.md'
import BitShow from '@site/docs/components/components/bit-show.md'
import BitmapExample from '@site/docs/components/components/bitmap-example.md'

import TestDependencies from '@site/docs/components/components/react/test-dependencies.md'

Once you have [initialized a Bit workspace](/getting-started/initializing-workspace) you can:

1. Configure the workspace variant to use the correct environment
2. Use `bit create` to create an example component and add it to the workspace
3. Use `bit install` to install dependencies for test files

Alternatively you can add [pre-existing components](/building-with-bit/pre-existing-components) using the `bit add` command.

## Setting a React Environment

<ReactEnvironment />

## Use Bit Create

<BitCreateButton />

### Namespaces

<NameSpaces />

### Created Files

The following files will have been created for you:

<ExampleButton />

<Styles />

## Bitmap File

<BitmapExample />

## Install Dependencies

<TestDependencies />

## Show Component

<BitShow />

```bash
  ┌───────────────────────┬────────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ id                    │ my-scope/ui/button                                                                                 │
  ├───────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ scope                 │ my-scope                                                                                           │
  ├───────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ name                  │ ui/button                                                                                          │
  ├───────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ env                   │ teambit.react/react                                                                                │
  ├───────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ package name          │ @my-scope/ui.button                                                                                │
  ├───────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ main file             │ index.ts                                                                                           │
  ├───────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ files                 │ button.composition.tsx                                                                             │
  │                       │ button.docs.mdx                                                                                    │
  │                       │ button.spec.tsx                                                                                    │
  │                       │ button.tsx                                                                                         │
  │                       │ index.ts                                                                                           │
  ├───────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ dev files             │ button.docs.mdx (teambit.docs/docs)                                                                │
  │                       │ button.spec.tsx (teambit.defender/tester)                                                          │
  │                       │ button.composition.tsx (teambit.compositions/compositions)                                         │
  ├───────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ extensions            │ teambit.react/react                                                                                │
  │                       │ teambit.component/dev-files                                                                        │
  │                       │ teambit.compositions/compositions                                                                  │
  │                       │ teambit.pkg/pkg                                                                                    │
  │                       │ teambit.docs/docs                                                                                  │
  │                       │ teambit.envs/envs                                                                                  │
  │                       │ teambit.dependencies/dependency-resolver                                                           │
  ├───────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ dependencies          │ core-js@3.8.3- (package)                                                                           │
  ├───────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ dev dependencies      │ @testing-library/react@11.2.6- (package)                                                           │
  │                       │ @babel/runtime@7.12.18-------- (package)                                                           │
  │                       │ @types/react-router-dom@5.1.7- (package)                                                           │
  │                       │ @types/jest@26.0.20----------- (package)                                                           │
  │                       │ @types/react@16.9.43---------- (package)                                                           │
  │                       │ @types/node@12.20.4----------- (package)                                                           │
  ├───────────────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ peer dependencies     │ react@16.13.1----- (package)                                                                       │
  │                       │ react-dom@16.13.1- (package)                                                                       │
  └───────────────────────┴────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

## Creating more Components

<BitCreateComponent />

## Bit Templates

<BitTemplates />

## What's Next?

Once you have created and added your component to the workspace the next step is to [render the Workspace UI](workspace-ui) so you can see the component locally.

Learn more about [tracking components](/building-with-bit/tracking-components) and [removing components](building-with-bit/removing-components)
