---
id: test
title: Test Components
---

Bit makes the most out of your automated tests to help you maintain code in a network of independent components. It does so by:

- **Testing components in isolated environments:**
  Tests running as part of the build pipeline will test each component in a 'Bit Capsule' which is
  an isolated instance of a component, generated in a separate directory in your filesystem.
  That ensures the validity of your tests as each test runs unaffected by code that is not part of the component itself.

- **Automatically testing the dependents of a modified component:**
  When tagging a component with a new release version, the 'build' and 'tag' processes automatically run on all dependent components, as well.
  Since testing is part of the build process, tests of all dependents component will run as well, to make sure nothing got broken due to that change.

:::note
The React environment uses Jest as its default test runner. To use a different Jest configuration or to use a different test runner, [see here](/docs/react/overview).
:::

## Adding Tests

Tests are added by placing test files inside the component's directory. Test files should be named with the following pattern: `*.spec.[ts|tsx|js|jsx]` and `*.test.[ts|tsx|js|jsx]`.

For example, our 'button' component already has a simple test and since tests are run automatically by the dev server, on `bbit start` and
on every change, you can already see its test results in the 'Tests' tab.

<img src="/img/ws_getting_started_test.png" style={{boxShadow: '3px 3px 15px 3px rgba(0,0,0,0.20)'}}></img>

## Running Tests

There are several ways for running tests when component changed.

### `bbit start`

You can see each component's test results in the Workspace UI when running `bbit start`. Just head over to the component's "Tests" tab.

### `bbit test --watch`

If you choose not to use the Workspace UI, Bit can run tests in `watch` mode, so when a component was modified, Bit will run its tests.

```sh
$bbit test --watch
```

### `bbit test`

You can also run tests manually:

```shell
$ bbit test # Run tests for all components
$ bbit test ui/elements/button # Run tests for a specific component
```
