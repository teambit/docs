---
id: component-dependencies-and-isolation
title: Component Dependencies and Isolation
---

To properly isolate components in a workspace you need to define the dependency graph for each individual component. This task is mostly automated in Bit, as it creates a dependency graph based on the component's source code. For each component, Bit builds a **dependency graph** by analyzing all the dependencies imported by their files.

Only when Bit is able to generate a complete dependency graph for a component, a component can be marked as "isolated". Isolated components can then be versioned, published and consume by other developers.

Let's use this component as an example:

```sh
login-form
├── index.tsx
├── login-form.composite.tsx
├── login-form.docs.tsx
├── login-form.spec.tsx
├── user-service
|   └── users.tsx
└── login-form.tsx
```

## Runtime dependencies

Bit calculates the runtime dependencies by parsing the component's source code. To do that, Bit starts from the `index.tsx` file that is set as the component's entry point. This file should look something like this:

```typescript
export { default } from './login-form';
```

Bit then understands that `login-form.tsx` is a part of the component's implementation, so it reads it to get its dependencies:

```typescript
import React from 'react';
import { default } from '@acme.base-ui/button';
import { default } from '@acme.base-ui/text-area';
import LeftPad from 'left-pad';
import { default } from './user-service/client'

// Rest of implementation
```

Note that there are several types of dependencies for the `login-form.tsx` file:

1. **Package dependencies**: In this example, both `react` and `lodash` are external dependencies installed from other services to the project's `node_modules` folder. Bit uses the `dependency-resolver` policies defined in the `workspace.json` to set the correct version for them in the component's dependency grpah.
1. **Components**: `button` and `text-area` are two components from the same workspace imported using their Component Module Name. Bit adds them to the component's dependency graph.
1. **Internal file**: `client.tsx` is a part of the component implementation and is not added to the dependency graph as Bit treats it as a part of the component itself. If `client.tsx` has more import statements (for example to a `user-service` SDK library), they will be added to the dependency graph.

## See component dependencies

To see the result dependency graph of a component you can run the `bit show` command.

```sh
$ bit show button

# TODO - outputs
```

## Adding and removing dependencies

Given the fact that Bit is constantly parsing the component's source code and finding dependencies automatically, adding and removing dependencies works by adding or removing `import` calls from your code.

## Development dependencies

In Bit you use different files for different tasks. This means that if you import a dependency in any file type which is used for development purposes only - it's dependencies will be marked as `devDependencies` automatically.

In this example, all imports made from these files:

1. `login-form.composite.tsx` - the component's compositions file to used when rendering components.
1. `login-form.docs.tsx` - the component's documentation file.
1. `login-form.spec.tsx` - file containing the implementation of component tests.

## Setting versions for dependencies

TODO - reference to "Dependency policies" section in workspace.

## Setting dependency type

TODO - reference to "Dependency policies" section in workspace.
