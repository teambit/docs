---
id: add-components
title: Create/Add Components
---

A Bit component is a JavaScript module that is completely independent and context-agnostic. It can "travel freely" from your local environment to a remote Bit scope and to other repositories. That's possible since each component "carries" with it all the information it needs to function as an isolated building block: its code, history, documentation and its different configurations.

A Bit component can be consumed either as a mutable component, to be developed in a Bit workspace, or as a standard node package. 

> The word “component” is ascribable to any independent feature, whether it is a simple UI primitive, a piece of logic, a data-connected component, or even a full page. 


## Create a UI Component

Let's create a UI 'Button' component:

```shell
$ mkdir -p components/react/ui/button
```

Now create the following files:

```shell
$ touch components/react/ui/button/index.ts
$ touch components/react/ui/button/button.tsx
$ touch components/react/ui/button/button.module.scss
```

And implement the component as follows:

<!--DOCUSAURUS_CODE_TABS-->
<!--index.ts-->

```javascript
export * from './button';
```

<!--button.tsx-->

```javascript
import React, { ButtonHTMLAttributes } from 'react';
import styles from './button.module.scss';
import cs from 'classnames';

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Determines whether button has a primary or secondary type of styling.
   */
  variant: 'primary' | 'secondary';
}

/** 
 *  A simple button component.
*/
export function Button({ children, variant, ...rest }: IButton) {
  return (
    <button className={cs(styles.base, styles[variant])} {...rest}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  variant: 'primary',
};
```

<!--button.module.scss-->

```scss
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap');

.base {
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  padding: 10px;
  color: #fff;
  font-size: 16px;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  outline: none;
  transition: border-radius 0.5s;
  &:active {
    border-color: #313131;
    background-color: #fff;
    color: #000;
  }
  &:hover{
    border-radius: 15px 225px 15px 255px/255px 15px 225px 15px;
  }
  &:disabled {
    border-color: #a5a5a5;
    background-color: #a5a5a5;
    &:hover {
      border-color: #a5a5a5;
      background-color: #a5a5a5;
      border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;;
    }
  }
}

.primary {
  border: solid 7px #ab3636;
  background-color: #ab3636;
  &:hover {
    border-color: #bb5151;
    background-color: #bb5151;
  }
}

.secondary {
  border: solid 7px #2b3186;
  background-color: #2b3186;
  &:hover {
    border-color: #5159cf;
    background-color: #5159cf;
  }
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

> A Bit component must have an entry file (index.ts) with all its files under the same directory.

### Install dependencies

Our 'Button' component uses the `classnames` module. To install it, run the following command:

```bash
$ bbit install classnames
```

> Please install React as well (`bbit install react`) - this is a temporary inconvenience that will be resolved in the next few days.

Bit will make sure to automatically register this package in the workspace configurations file (`workspace.jsonc`). Notice how a Bit workspace does not use a `package.json` file to manage its dependencies. 

Check the `workspace.jsonc` file to make sure the [`dependency-resolver`](/docs/dependencies/overview) section now looks as the snippet below:

```json
  "@teambit.bit/dependency-resolver": {
    "packageManager": "@teambit.bit/pnpm",
    "strictPeerDependencies": true,
    "policy": {
      "dependencies": {
        "classnames": "^2.2.6"
      },
```
As you recall from the ['Set up a workspace'](docs/bit-basics/set-up-workspace) step, rules and policies set on the `workspace.jsonc` file are applied to all relevant components. The above ["policy"](/docs/dependencies/overview#dependency-policies) states that every component with 'classnames' as a dependency will use version 2.X.X.

To select a more limited set of components use the ['variants'](docs/variants/overview) field.

### Track the component

Our 'Button' component does not show up in our Workspace UI yet as it is not tracked by Bit.

To start tracking it:

```shell
$ bbit add components/react/ui/button
```

The 'Button' component will now appear in the Workspace UI navigation bar with an "N" to its right, to signify that it is a new component. (If that fails, please restart your Workspace UI by stopping the dev server and starting it again - `bbit start`)

![New Component](/img/new_component.png)

> #### What happens when Bit starts tracking a component?
> * It determines which files should be be included in that component (see the result inside the .bitmap file)
> * It determines a component ID
> * It determines the component entry point and its dependency graph (see the result inside the node_modules directory)

### Add compositions (render components in isolation)

To examine our Button's look and behavior, let's create 'compositions' - these are different instances or usages of that component. 

Each composition will be rendered in its own isolated environment and displayed in the workspace UI.

Rendering components in an isolated environment gives us a clear understanding of their behavior as they are guaranteed to be un-effected by their context. In addition to that, compositions play a crucial role in the documentation of a component as they demonstrate the various ways of which that component can be used.

We'll start by creating a new 'compositions' file 

```shell
$ touch components/react/ui/button/button.composition.tsx
```

Then, add the following lines to `components/ui/button/button.composition.tsx`

```tsx
import React from "react";
import { Button } from "./button";

export const PrimaryButton = () => {
  return (
    <Button variant="primary" onClick={() => alert("Clicked!")}>
      Primary Button
    </Button>
  );
};

export const SecondaryButton = () => {
  return <Button variant="secondary">Secondary Button</Button>;
};

export const DisabledButton = () => {
  return (
    <Button disabled variant="primary">
      Disabled Button
    </Button>
  );
};
```

Head over to the 'compositions' tab to see the various `Button` compositions being rendered.

![Button Compositions](/img/compositions.png)