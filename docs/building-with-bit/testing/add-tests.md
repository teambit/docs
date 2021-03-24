---
id: add-tests
title: Adding Tests
---

Tests are added by placing test files inside the component's directory. Test files should be named with the pattern set by the component environment.

For example, the [React environment](/building-with-bit/react/overview) runs tests in files named with the following pattern: `*.spec.[ts|tsx|js|jsx]` and `*.test.[ts|tsx|js|jsx]` 

```shell {5}
├── account/login-form 
    ├── index.tsx                
    ├── use-jokes.compositions.tsx 
    ├── use-jokes.docs.mdx     
    ├── use-jokes.spec.tsx      
    └── use-jokes.tsx          
```

It is highly recommended to use the component compositions as test samples.
For example:

```tsx title="use-jokes.spec.tsx"
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { RetrieveJokes } from './use-jokes.compositions';

describe('use-jokes', () => {
  it('should retrieve jokes', async () => {
    const { getByTestId } = render(<RetrieveJokes />);
    const fetchJokesBtn = getByTestId('fetch-button');
    const jokesContainer = getByTestId('jokes-container');
    fireEvent.click(fetchJokesBtn);
    await waitFor(() => expect(jokesContainer.innerHTML).toBeTruthy());
    const jokesContainerSnapshot = jokesContainer.innerHTML;
    fireEvent.click(fetchJokesBtn);
    await waitFor(() =>
      expect(jokesContainer.innerHTML).not.toEqual(jokesContainerSnapshot)
    );
  });
});

```