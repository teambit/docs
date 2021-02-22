---
id: test
title: Test Components
---

Component testing is another service provided by Bit Environments. Even though each environment implements its testing using different test runners and configurations,
they all integrate into Bit processes in a similar way, and get executed using the same commands.

The React environment uses Jest as its default test runner. To use a different Jest configuration or to use a different test runner, [see here](/docs/react/overview).

## Add Tests

We'll be testing our previously created 'Button' component. To simplify our UI testing, we'll also make use of 'React Testing Library':

```shell
$ bbit install @testing-library/react
```

Notice how we didn't set this package as a 'dev dependency'. Bit determines that for us by analyzing the way it is used. In this case, it is only used by a test file (which will not be used in production).

Let's start by creating our test file (in the button component directory)

```shell
$ touch components/ui/button/button.spec.jsx
```

And place a simple test to validate that it renders:

```jsx title="components/ui/button/button.spec.jsx"
import React from 'react';
import { render } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('should render a test button', () => {
    const { getByText } = render(<Button>test button</Button>);
    const testButton = getByText(/test button/i);
    expect(testButton).toBeInTheDocument();
  });
});
```

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
$ bbit test react-ui/button # Run tests for a specific component
```
