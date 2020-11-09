---
id: test
title: Test
---

In the ['Choose a development environment'](/docs/bit-basics/choose-dev-env) step we've set all our components to use the [React environment](/docs/react/overview). As you recall, an environment bundles together various services needed to develop, run and maintain an independent component. One of these services is 'testing'.

The React environment uses Jest as its default test runner. To use a different Jest configuration or to use a different test runner, [see here](/docs/react/overview).

We'll be testing our previously created 'Button' component. To simplify our UI testing, we'll also make use of 'React Testing Library':

```shell
$ bbit install @testing-library/react
```

Notice how we didn't set this package as a 'dev dependency'. Bit determines that for us by analyzing the way it is used. In this case, it is only used by a test file (which will not be used in production).

Let's start by creating our test file (in the button component directory)

```shell
$ touch button.spec.js
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

Bit runs a component's tests whenever it is [tagged](/docs/versioning/tracking-changes). If a test fails, the tagging action will be aborted (and changes will not persist in the local scope).

We can also run the tests manually:

```shell
// in the component root directory
$ bbit test
```

Test results are not only available in the terminal but are also shown in the 'Tests' tab, both in the Workspace UI and in the remote scope.

![Test results](/img/test_results_ui.jpg)