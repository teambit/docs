---
id: testing-components
title: Testing Components
---

## Adding Tests

Tests are added by placing test files inside the component's directory. Test files should be named with the pattern set by the component environment.

For example, the React environment runs tests in files named with the following pattern: `*.spec.[ts|tsx|js|jsx]` and `*.test.[ts|tsx|js|jsx]`

```bash {5}
├── ui/button
    ├── index.tsx
    ├── button.compositions.tsx
    ├── button.docs.mdx
    ├── button.spec.tsx
    └── button.tsx
```

It is highly recommended to use the component compositions as test samples.
For example:

```tsx title="button.tsx"
import React from 'react'
import { render } from '@testing-library/react'
import { expect } from 'chai'

import { BasicButton } from './button.composition'
describe('button', () => {
  it('should render', () => {
    const { getByText } = render(<BasicButton />)
    const rendered = getByText('click me')

    expect(rendered).to.exist
  })
})
```

## Choosing a test runner

Bit's Tester is an Environment Service. The type of test runner (Jest, Mocha, etc.) as well as its configurations, are set by the various environments that use it as a service. That means test runners are never run directly but only via the Tester service. That also means, a single workspace may run different test runners for different components, each according to its own environment.

To choose a test runner, choose an environment that uses it or extend an environment to have it run your preferred test runner.

## Executing the tester manually

To manually run the tester on a specific component use its component ID

```bash
bit test <component-id>
```

For example:

```bash
bit test ui/button
```

To manually run the tester on the entire workspace:

```bash
bit test
```

### Options

#### `--watch` `-w`

Starts the tester in 'watch mode' (re-tests when changes are made to a component).

```bash
bit test --watch
```

#### `--debug` `-d`

Starts the tester in 'debug mode'.

```bash
bit test --debug
```

#### `--env` `-e`

Tests all components that use a specific environment.

```bash
bit test --env <component-id>
```

For example:

```bash
bit test --env teambit.react/react
```

#### `--scope` `-s`

Tests all components in a specific scope.

```bash
bit test --scope <scope-name>
```

For example:

```bash
bit test --scope my-org.react-design-system
```

## Bit processes that use the tester

### Local dev server

Bit's local dev server (which also runs the Workspace UI) re-tests components on each modification. This happens whenever a file is 'saved'.

Test results will be shown in the terminal, as well as in the 'Tests' tab in your workspace.

### Tests in `watch` mode

Alongside the local dev server, Bit features a watch mode that runs different operations for modified components. Component testing is one of these tasks.

```bash
bit watch
```

### Tests in the Build Pipeline

Testing is also part of a component's build pipeline. As with any other Build Task, the testing task also happens in a 'component capsule', which is an isolated instance of a component. When executed as a Build Task, the tester runs tests for all new or changed dependencies of that component.

When a component's build pipeline is run as part of the tagging of a new release version, the tests output is stored in the component's new version.

## Tester workspace configurations

The Tester can be configured in the `workspace.jsonc` configuration file.

### watchOnStart

Determines whether to run the Tester in 'watch mode' when the running the development server.

For example:

```json
{
  "$schema": "https://static.bit.dev/teambit/schemas/schema.json",
  "teambit.workspace/workspace": {
    "name": "my-workspace-name",
    "icon": "https://static.bit.dev/bit-logo.svg",
    "defaultScope": "my-org.my-scope"
  },
  "teambit.defender/tester": {
    "watchOnStart": false
  }
}
```

### patterns

Determines the file extensions for test files.

For example:

```json
{
  "$schema": "https://static.bit.dev/teambit/schemas/schema.json",
  "teambit.workspace/workspace": {
    "name": "my-workspace-name",
    "icon": "https://static.bit.dev/bit-logo.svg",
    "defaultScope": "my-org.my-scope"
  },
  "teambit.defender/tester": {
    "patterns": ["*.spec.ts", "*.another-extension.ts"]
  }
}
```

## Testing Dependent Components

Bit makes the most out of your automated tests to help you maintain code in a network of independent components. It does so by:

- **Testing components in isolated environments:**
  Tests running as part of the build pipeline will test each component in a 'Bit Capsule' which is
  an isolated instance of a component, generated in a separate directory in your filesystem.
  That ensures the validity of your tests as each test runs unaffected by code that is not part of the component itself.

- **Automatically testing the dependents of a modified component:**
  When tagging a component with a new release version, the 'build' and 'tag' processes automatically run on all dependent components, as well.
  Since testing is part of the build process, tests of all dependent components run as well, to make sure nothing got broken due to that change.  
  Use the `bit status` command to check the expected ripple effect of modifying a component.

  For example:

```bash
modified components
(use "bit tag --all [version]" to lock a version with all your changes)
(use "bit diff" to compare changes)

     > ui/button ... ok

components pending to be tagged automatically (when their dependencies are tagged)
     > ui/card/ ... ok
```
