---
id: test
title: Test
---

In the ['Choose a development environment'](/docs/getting-started/choose-dev-env) step we've set all our components to use the [React environment](/docs/react/overview). As you recall, an environment bundles together various services needed to develop, run and maintain an independent component. One of these services is 'testing'.

The React environment uses Jest as its default test runner. To use a different Jest configuration or to use a different test runner, [see here](/docs/react/overview).

We'll be testing our previously created 'Button' component. To simplify our UI testing, we'll also make use of 'React Testing Library':

```shell
$ bbit install @testing-library/react
```
> Please install the following, as well:
> ```shell
> $ bbit install @babel/runtime react-dom
>```
> This is a temporary inconvenience that will be resolved in the next few days.

Notice how we didn't set this package as a 'dev dependency'. Bit determines that for us by analyzing the way it is used. In this case, it is only used by a test file (which will not be used in production).

Let's start by creating our test file (in the button component directory)

```shell
$ touch button.spec.jsx
```

And place a simple test to validate that it renders:

```jsx
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

Bit runs a component's tests whenever it is [tagged](/docs/versioning/tracking-changes). If a test fails, the tagging action will be aborted.
We can also run tests manually:

```shell
// to run tests for all components
$ bbit test

// to run tests for a specific component (in this case, 'button')
$ bbit test react-ui/button
```

Test results are not only available in the terminal but are also shown in the 'Tests' tab, both in the Workspace UI and in the remote scope.

![Test results](/img/test_results_ui.jpg)