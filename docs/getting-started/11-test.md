---
id: test
title: Test Components
---

**all testers are created equal in Bit**. Component testing is another service provided by Bit Environments. Even though each environment implements its testing using different test runners and configurations,
they all integrate into Bit processes in a similar way, and get executed using the same commands.

The React environment uses Jest as its default test runner. To use a different Jest configuration or to use a different test runner, [see here](/docs/react/overview).

## Adding Tests

Tests are added by placing test files inside the component's directory. Test files should be named with the following pattern: `*.spec.[ts|tsx|js|jsx]` and `*.test.[ts|tsx|js|jsx]`.

For example, our 'button' component already has a simple test and since tests are run automatically by the dev server, on `bbit start` and
on every change, you can already see its test results in the 'Tests' tab.

![](/img/ws_getting_started_test.png)

## Running Tests

There are several ways for running tests when component changed.

### `bbit start`

You can see each component's test results in the Workspace UI when running `bbit start`. Just head over to the component's "Tests" tab.

![Test results](/img/test_results_ui.jpg)

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

## Tag a Version to Auto-Test Dependants  

Bit constantly runs the component's tests as you make changes in your code, and you can see the results in the workspace UI. When you tag a new component version, Bit will run the build (compile, test, bundle) for all other components in the workspace that depend on the tagged component - to help you learn about the impact of your changes: [Learn more here](https://harmony-docs.bit.dev/docs/getting-started/manage-dependencies).



