---
id: testing-components
title: Testing Components
permalink: docs/testing-components.html
layout: docs
category: Building and Testing
prev: building-components.html
next: tag-component-version.html
---

Bit can run tests for components with a test task defined.

## Basics of testing Components

A component can contain test files. Bit executes them using test runners. Bit tests components using a unique component called Testers. A Tester is a component that takes another component's test files and executes them using other test runners.

### Where are the tests being executed?

Bit tests components in an [isolated component environment](/docs/ext-concepts.html#what-is-an-isolated-component-environment). Bit does it to ensure true isolation of components. If a test process works, Bit can reproduce it anywhere.

## Defining a Tester

Every component can have a tester. Bit uses a global tester configuration for a workspace. Bit propagate the global configuration to each component tracks in that workspace.  
Configured a global tester with the `--tester` flag when importing a compiler component.

```bash
$ bit import bit.envs/testers/mocha --tester
the following component environments were installed
- bit.envs/testers/mocha@0.0.7
```

## Adding test/spec files to your components

We mark component's test files by using the `--tests` option for `bit add`:

```bash
bit add src/foo.js --tests test/foo-test.js
```

For more details about marking files as test files, see [here](/docs/cli-add.html#tracking-a-component-with-a-test-file).

## Testing a component

Use [bit test](/docs/cli-test.html) to test components that have a tester and test files:

```bash
$ bit test foo/bar
foo/bar
tests passed
file: dist/test/bar.test.js
total duration - 4ms

✔   bar should do nothing - 1ms
```

> **Note**
>
> If a component has a [compiler](/docs/building-components.html), Bit will trigger it prior to running its tests.

## Testers maintained by bit.dev

Find a list of Testers maintained by the [bit.dev](https://bit.dev) [here](https://bit.dev/bit/envs).

- [Mocha](https://bit.dev/bit/envs/testers/mocha).
- [Jest](https://bit.dev/bit/envs/testers/jest).