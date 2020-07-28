---
id: compositions
title: Compositions
---

Compositions are examples or instances of a component. They're used to exhibit and test a component in different contexts and variations.

* Compositions play an essential part of the component's documentation. They demonstrate potential behaviors and use cases for that component. Compositions are another step in promoting components' discoverability, both in your local [Bit Workspace]() and in remote component-sharing platforms like [Bit.dev](https://bit.dev).

* When creating or modifying a component in Bit's workspace, compositions serve as a way to validate that a component looks and behaves as expected, in different scenarios. Use Bit's [Workspcae UI]() to see them render in "controlled environments".

* Compositions can be used as test samples, in automated testings.

> This document uses React code as snippets.

## Creating compositions

_Component compositions are fully compatible with [CSF](https://storybook.js.org/docs/formats/component-story-format/)._

Writing a composition does not require any configuration. Simply import the component to the component's `*.compositions.tsx` file, use it to build a composition and export the new component (a.k.a, the composition) with a named export. 

The name of the export will be converted from PascalCase/camelCase and used for the composition name (e.g, `"CompositionName" --> "Composition name"`).

__For example__, we'll create two compositions, 'Primary button' and 'Secondary button', that demonstrate two uses of the 'Button' component:

First, we'll create a new composition file in the component's directory:

```sh
$ touch path/to/component/directory/<component-name>.compositions.tsx
```
Then, we'll import the component and  use it to create the compositions:

```javascript
import React from "react";
import { Button } from "./button";

export const PrimaryButton = () => {
  return (
    <Button variant="primary">
        Click Me
    </Button>
  );
};


export const SecondaryButton = () => {
  return (
    <Button variant="secondary">
        Click Me
    </Button>
  );
};
```
![](https://res.cloudinary.com/blog-assets/image/upload/v1595938174/Screen_Shot_2020-07-28_at_15.09.05_sningi.png)
## Setting canvas size for compositions

Some components should be mobile friendly, look different in some sizes... need to make sure compositions are mocked to fit various sizes.

```javascript
/// TODO - need to get the proper code snippet.
```

## Loading compositions

["Environments"](main-concepts/04-environment.md) automatically detects the composition file for each component and use it to load its compositions to the workspace UI.

## Viewing component compositions

To explore compositions in your Workspace UI, start the local development server for your workspace (`bit start`), browse to a specific component and choose the **compositions** tab. There, you will see the full list of compositions available for that component with additional component meta-data. 

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
