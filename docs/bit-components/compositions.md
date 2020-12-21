---
id: compositions
title: Compositions (rendering in isolation)
---

Compositions are examples or instances of a component. They're used to exhibit and test a component in different contexts and variations.

* When authoring or modifying a component, compositions serve as a way to validate that a component looks and behaves as expected. Use Bit's [Workspcae UI](/docs/workspace/workspace-ui) to see them rendered live in isolation.

* Compositions play an essential part of the component's documentation. They demonstrate potential behaviors and use cases for that component. Compositions are another step in promoting components' discoverability, both in your local [Bit Workspace](/docs/workspace/overview) and in [Remote Scopes](docs/scope/overview), hosted on Bit servers (e.g, [Bit.dev](https://bit.dev)

* Compositions can be used as test samples in automated testings. These samples can be of different variants of that component or of a larger composition that includes that component. Larger compositions can serve as a way to simulate the behavior of a component in future "real life" widgets, pages and full apps. That can be crucial when delivering components independently as Micro Frontends.

Composition are rendered by the [environment](/docs/environments/overview) used by the component.

> This document uses React code as snippets.

## Creating compositions

_Component compositions are fully compatible with [CSF](https://storybook.js.org/docs/formats/component-story-format/)._

Writing a composition does not require any configuration. Simply import the component to the component's `*.compositions.tsx` file, use it to build a composition and export the new component (a.k.a, the composition) with a named export.

The name of the export will be converted from PascalCase/camelCase and used for the composition name (e.g, `"CompositionName" --> "Composition name"`).

__For example__, we'll create two compositions, 'Primary button' and 'Secondary button', each demonstrates a different instance or usage of that component:

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

Compositions reveal a component's behavior in different contexts. That also includes, different screen sizes. To do that simply add the `canvas` property to your compositions.

For example:

```tsx
export const PrimaryButton = () => {
  return (
    <Button variant="primary">
        Click Me
    </Button>
  );
};

PrimaryButton.canvas = {
  "height": 800,
  "width": 400
}
```

## Loading compositions

["Environments"](main-concepts/04-environment.md) automatically detects the composition file for each component and use it to load its compositions to the workspace UI.

## Viewing component compositions

To explore compositions in your Workspace UI, start the local development server for your workspace (`bit start`), browse to a specific component and choose the **compositions** tab. There, you will see the full list of compositions available for that component with additional component meta-data.

## Using compositions for automated testings

Component compositions can be used in automated testing as well as manual examinations. To do that, simply import the compositions to run the appropriate tests. 

For example, this snapshot test checks the 'Button' component when the 'variant' prop is set to 'primary' (this is obviously for demonstration purposes only. In real-life, this feature will be used for larger and more complex compositions).

```jsx
import React from 'react';
import testRenderer from 'react-test-renderer';
import { PrimaryButton } from './button';

describe('Button', () => {
  it('renders correctly as "primary"', () => {
    const component = testRenderer.create(<PrimaryButton>test primary variant</PrimaryButton>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
```

## Compositions and storybook

Storybook is a tool designed for managing stories for design systems as a single project and not optimized for individual components. While you can use the storybook extension for Bit (**currently in development**) instead of compositions, compositions are more efficient when managing individual components:

* Use the same configuration pipeline and environments.
* They are rendered using the same build pipelines as the components would during CI.
* They do not require a separate process to render components.