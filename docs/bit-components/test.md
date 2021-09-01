---
id: testing-components
title: Adding Tests
---

Tests become even more viable when working in a component based workflow. Components can be composed in many unique use cases, so having tests to check for them can reduce the amount of integration and experimentation needed in the future.

Bit uses open source test runners to execute component tests.

This topic describes how to test a Bit component written in React, with Jest.

## Video Guide

<iframe width="560" height="315" src="https://www.youtube.com/embed/R0LWV2gcbf8?rel=0" title="Testing your Components" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

---

## Prerequisites

To document component, verify you met the following:

1. [Install Bit CLI.](https://TODO)
1. [Create a Bit workspace](https://TODO) on a fresh Git repository.
1. [Create a component.](https://TODO)
1. [Create a composition](https://TODO) (optional).

---

## Add Tests

Add tests to a component by creating a file in the component's directory, using the `*.spec/test.*` pattern.

```bash {3}
└── ui/link
    ├── index.tsx
    ├── link.specs.tsx
    └── link.tsx
```

:::tip Component templates support for tests

All available component templates support testing out of the box. Use `bit create` to get started quickly.

:::

:::info tests are great addition for documentation

A visual test result helps consumers to learn about the different edge cases supported by your component and makes it easy for them to want to adopt your code.

:::

### Install dependencies

Add testing-library as a dependency, as we'll use it for testing our component.

```sh
bit install @testing-library/react
```

### Write your first test

Add a test case for your component.

```js
import React from 'react';
import { render } from '@testing-library/react';
import { BasicLink } from './link.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicLink />);
  const rendered = getByText('About');
  expect(rendered).toBeTruthy();
});
```

### Get visual component test report

To see all component tests start the local dev server and browse the component.

```sh
bit start
```

:::tip

Keep the dev server running! UI will immediately refresh every time you modify your component or its tests.

:::

### Run tests from the CLI

You can run component tests from the CLI either for specific components or your entire workspace.

```bash title="Test specific component"
bit test ui/button
```

```bash title="Test all"
bit test
```

:::tip

Use `bit test --help` or `bit test -h` to get a list of available options for this command.

:::

### Run tests from the CLI in watch mode

The dev server runs tests in watch mode. Bit has the same capability from the CLI.

```bash
bit watch
```

---

## Change tests file pattern

If you use a different filename pattern for tests, you can configure Bit's [Tester aspect](https://TODO) with any pattern.  
To do so, edit the `workspace.jsonc` file and add the following snippet:

```json title="workspace.jsonc"
{
  "teambit.defender/tester": {
    "patterns": ["*.spec.ts", "*.another-extension.ts"]
  }
}
```

---

## Summary

* Bit runs tests for components.
* Results in UI and terminal.

---

## Next Steps

* ???

---

## FAQ

### Can I use different testers?

atm only jest is supported :(