---
id: compositions
title: Compositions
---

When you implement a component its important to keep a list of compositions of the component in various cases. This helps you understand how the code modifications are affecting the rendered outcome.

> **Compositions in different frameworks**
>
> This document uses React code in the code snippets. Depending on your framework of choice the composition files might differ. Consul the specific environment documentation to learn how to use compositions for components implemented by it.

## Creating a compositions

Compositions are managed per component in a dedicated set of files - `*.compositions.tsx`. Make sure to create a new file to keep the compositions in the component directory.

```sh
$ touch path/to/component/directory/<component-name>.compositions.tsx
```

Then just write any React code that exports JSX elements. Bit treats each element as a composition.

```typescript
import React from "react";
import { CopyBox } from "./copy-box";

export const BasicTextCopy = () => {
  return (
    <CopyBox>
        here is some text for you to copy
    </CopyBox>
  );
};
```

### Setting canvas size for compositions

Some components should be mobile friendly, look different in some sizes... need to make sure compositions are mocked to fit various sizes.

```typescript
/// TODO - need to get the proper code snippet.
```

## Viewing component compositions

To see component compositions rendered for each component start the local development server for the workspace, browse to a specific component and choose the **compositions** tab.

There you will see the full list of compositions implemented for each component with additional information on them.

## Standardize testing using component compositions

When using UI testing frameworks like Jest that support DOM rendering you can use the component compositions when running your tests. This way whenever you update your code, you use the compositions to see the changes made and later, when running tests, they are preformed on the same compositions you used to implement your code changes.

```typescript
// TODO - snippet
```

## Compositions and storybook

Storybook is a tool designed for managing stories for design systems as a single project and not optimized for individual components. While you can use the [storybook extension for Bit](TODO) instead of compositions, compositions are more efficient when managing individual components:

- Use the same configuration pipeline and environments.
- They are rendered using the same build pipelines as the components would during CI.
- They do not require a separate process to render components.

To render component stories as compositions use the storybook extension:

```json
// TODO - snippet
```
