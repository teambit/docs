---
id: compositions
title: Compositions (rendering in isolation)
---

[Compositions](https://bit.dev/teambit/compositions) are visual examples or instances of a component, rendered in an isolated development environment. They showcase and test a component in different contexts and variations, such as other components that consume and display that component.

For example, as you develop _button_ you can view how changes impact dependant _forms_ or _menus_ in your workspace.

Features:

- _Render with zero configs_ - Render independent components in an isolated development environment with zero configurations.

- _Render in all relevant contexts_ - Render components in the visual context of related and dependant components to learn how changes impact other components during development.

- _Hot-reloading in workspace UI_ - View and render changes in a live playground as you code.
- _Compositions as visual documentation_ - Add compositions to your component documentation to create a rich, visual experience that helps people learn how your components look inside actual usage contexts.

- _Compositions as testing during CI_ - Use compositions as integration and unit testing while running Ripple CI to track and view the impact of changes on all affected components in your different projects.

- _Developer - Designers collaboration_ - Make visual compositions accessible to designers (and everyone else) to include them in the development and release process of web applications, in a visual way.

Composition are rendered by the [environment](/docs/environments/overview) used by the component.

> This document uses React code as snippets.

## Creating compositions

_Component compositions are fully compatible with [CSF](https://storybook.js.org/docs/formats/component-story-format/)._

Writing a composition does not require any configuration. Simply import the component to the component's `*.compositions.tsx` file, use it to build a composition and export the new component (a.k.a, the composition) with a named export.

The name of the export will be converted from PascalCase/camelCase and used for the composition name (e.g, `"CompositionName" --> "Composition name"`).

**For example**, we'll create two compositions, 'Primary button' and 'Secondary button', each of which demonstrates a different instance or usage of that component:

First, we'll create a new composition file in the component's directory:

```sh
$ touch path/to/component/directory/<component-name>.compositions.tsx
```

Then, we'll import the component and use it to create the compositions:

```javascript
import React from 'react';
import { Button } from './button';

export const PrimaryButton = () => {
  return <Button variant="primary">Click Me</Button>;
};

export const SecondaryButton = () => {
  return <Button variant="secondary">Click Me</Button>;
};
```

![](https://res.cloudinary.com/blog-assets/image/upload/v1595938174/Screen_Shot_2020-07-28_at_15.09.05_sningi.png)

## Setting canvas size for compositions

Compositions reveal a component's behavior in different contexts. That also includes, different screen sizes. To do that simply add the `canvas` property to your compositions.

For example:

```tsx
export const PrimaryButton = () => {
  return <Button variant="primary">Click Me</Button>;
};

PrimaryButton.canvas = {
  height: 800,
  width: 400,
};
```

## Loading compositions

Environments automatically detect the composition file for each component and use it to load its compositions to the workspace UI.

## Viewing component compositions

To explore compositions in your Workspace UI, start the local development server for your workspace (`bit start`), browse to a specific component and select the **compositions** tab. There, you will see the full list of compositions available for that component, along with additional component meta-data.

## Using compositions for automated testings

Component compositions can be used in automated testing as well as manual examinations. To do that, simply import the compositions in your test file to run the appropriate tests.

For example, this snapshot test checks the 'Button' component when the 'variant' prop is set to 'primary' (this is obviously for demonstration purposes only. In real-life, this feature will be used for larger and more complex compositions).

```jsx
import React from 'react';
import testRenderer from 'react-test-renderer';
import { PrimaryButton } from './button.compositions.tsx';

describe('Button', () => {
  it('renders correctly as "primary"', () => {
    const component = testRenderer.create(
      <PrimaryButton>test primary variant</PrimaryButton>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
```

## Compositions and storybook

Storybook is a tool designed for managing stories for design systems as a single project and not optimized for individual components. While you can use the storybook extension for Bit (**currently in development**) instead of or alongside compositions, compositions are more efficient when managing individual components as they:

- Use the same configuration pipeline and environments.
- Are rendered using the same build pipelines as the components would during CI.
- Do not require a separate process or configuration to render components.
