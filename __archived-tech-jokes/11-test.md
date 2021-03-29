---
id: test
title: Test Components
---

import { Image } from '@site/src/components/image';

Bit makes the most out of your automated tests to help you maintain code in a network of independent components. It does so by:

- **Testing components in isolated environments:**
  Tests running as part of the build pipeline will test each component in a 'Bit Capsule' which is
  an isolated instance of a component, generated in a separate directory in your filesystem.
  That ensures the validity of your tests as each test runs unaffected by code that is not part of the component itself.

- **Automatically testing the dependents of a modified component:**
  When tagging a component with a new release version, the 'build' and 'tag' processes automatically run on all dependent components, as well.
  Since testing is part of the build process, tests of all dependents component will run as well, to make sure nothing got broken due to that change.

:::note
The React environment uses Jest as its default test runner. To use a different Jest configuration or to use a different test runner, [see here](/building-with-bit/react).
:::

## Adding Tests

Tests are added by placing test files inside the component's directory. Test files should be named with the following pattern: `*.spec.[ts|tsx|js|jsx]` and `*.test.[ts|tsx|js|jsx]`.

For example, our 'button' component already has a simple test and since tests are run automatically by the dev server, on `bit start` and
on every change, you can already see its test results in the 'Tests' tab.

<Image src="/img/ws_getting_started_test.png" />

## Running Tests

### Run all tests

Runs tests on all components in the workspace.  
`bit test`

### Run all tests in 'watch mode'

Runs tests in 'watch mode' (test on every change). Use it if you choose not to use the Workspace UI.

```shell
bit test --watch
```

### Run tests of a specific component

```shell
bit test <component-id>
```

For example:

```shell
bit test ui/elements/button
```

:::info processes that involve testing
In addition the above commands, tests are also run by the dev server (`bit start`) and by the build pipeline (`bit build` and `bit tag`)
