---
id: compositions
title: Compositions
---

Components may appear in different states or forms across many applications. It's important to keep track on them as the various use cases for components, as you can use them as a reference when you create new, or update existing components.

When you implement a component its important to keep a list of compositions of the component in various cases. This helps you understand how the code modifications are affecting the rendered outcome.

> This document uses React code as snippets.

## Basic composition

Component compositions are fully compatible with [CSF](https://storybook.js.org/docs/formats/component-story-format/).

```javascript
import React from "react";
import { CopyBox } from "./copy-box";

export const BasicBox = () => {
  return (
    <CopyBox>
        here is some text for you to copy
    </CopyBox>
  );
};
```

The named export defines `copy-box`s composition name.

## Creating compositions

Compositions are managed per component in a dedicated set of files - `*.compositions.tsx`. Make sure to create a new file to keep the compositions in the component directory.

```sh
$ touch path/to/component/directory/<component-name>.compositions.tsx
```

Then just write any React code that exports JSX elements. Bit treats each element as a composition.

## Setting canvas size for compositions

Some components should be mobile friendly, look different in some sizes... need to make sure compositions are mocked to fit various sizes.

```javascript
/// TODO - need to get the proper code snippet.
```

## Loading compositions

Environments automatically detect all composition files of each component and use it to automatically load compositions to the workspace web UI.

## Viewing component compositions

To see component compositions rendered for each component start the local development server for the workspace, browse to a specific component and choose the **compositions** tab.

There you will see the full list of compositions implemented for each component with additional information on them.

## Standardize testing using component compositions

When using UI testing frameworks like Jest that support DOM rendering you can use the component compositions when running your tests. This way whenever you update your code, you use the compositions to see the changes made and later, when running tests, they are preformed on the same compositions you used to implement your code changes.

```javascript
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
