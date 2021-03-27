---
id: import-components
title: Import Components
---

import { Image } from '@site/src/components/image';

Once you initialize a Bit workspace your project essentially becomes part of one virtual monorepo.
A vast number of independent components instantly become available for you to use and maintain in your local workspace.
These could be either private components, maintained by your own organization, or public components maintained by the open-source community.

Components are imported using their component ID, which can be found in their component page, under the 'Use' drop menu.

Let's import the 'dots-loader' component from Bit's 'teaching' scope.

```
bit import teambit.teaching/ui/elements/dots-loader
```

Head back to your workspace UI to explore the new imported component.

<Image src="/img/dots_loader.png" />

<br />

- #### To learn more about 'importing' [see here](/building-with-bit/importing-components)

## Using the imported component

The imported component is now in our `components` directory but, much like components authored in our workspace,
it will also have a package generated for it in the `node_modules` directory, and its code compiled and saved in the nested `dist` directory.

Our button shows a 'Loading...' text whenever its `isLoading` prop is set to `true`.
Let's replace that text with the newly imported 'dots loader' component.

```tsx title="button.tsx"
import { DotsLoader } from '@teambit/teaching.ui.elements.dots-loader'
```

In that same file we'll change this:

```jsx title="button.tsx (old)"
isLoading ? 'Loading...' : children
```

to this:

```jsx title="button.tsx (new)"
isLoading ? <DotsLoader /> : children
```

Head over to the 'Button is loading' composition in the 'button' page to see it rendered.

<div style={{textAlign: 'center'}}>
    <img src="/img/button_dots_loader.png" width="90%" style={{boxShadow: '3px 3px 15px 3px rgba(0,0,0,0.20)'}}></img>
</div>
