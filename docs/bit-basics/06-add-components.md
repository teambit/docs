---
id: add-components
title: Create/Add Components
---

A Bit component is a JavaScript module that is completely independent and context-agnostic. It can "travel freely" from your local environment to a remote Bit scope and to other repositories. 

A Bit component can be consumed either as a mutable component, to be developed in a Bit workspace, or as a standard node package. 

A Bit component contains the following elements:

* Distributable code
* Source-code
* Test files
* Component version history
* Dependency graph
* Documentation
* Information regarding the [environment](/docs/environments/overview) it needs
* 'Compositions': various instances of that component as it's being used in different contexts and variations

> The word “component” is ascribable to any independent feature, whether it is a simple UI primitive, a piece of logic, a data-connected component, or even a full page. 


Let's create a UI 'button' component:

```sh
$ mkdir components/react/ui/button
```

Now create the following files:

```sh
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

> A Bit component should have an entry file (index.ts) and all its files under the same directory.

### Install dependencies

The above button component uses the `classnames` library. To install it, run the following command:

```bash
$ bbit install classnames
```

Bit will make sure to automatically register this package in the workspace configurations file (`workspace.jsonc`), under the `dependency-resolver` entry (a Bit workspace has no `package.json` file). Check the `workspace.jsonc` file to make sure the `dependency-resolver` section now looks like this:

```json
  "@teambit.bit/dependency-resolver": {
    "packageManager": "@teambit.bit/pnpm",
    "strictPeerDependencies": true,
    "policy": {
      "dependencies": {
        "classnames": "^2.2.6"
      },
```

### Track the Component

If you head over to the Workspace UI [http://localhost:3000]() you will see the Button component is not displayed. That is because Bit is not tracking it yet. 

To start tracking the Button component:

```sh
$ bit add components/react/ui/button
```

The Button component should now appear in the Workspace UI navigation bar with an "N" to its right, to signify a new component. 

To examine our Button, let's create 'compositions' - instances of that component. It will be rendered in its own isolated environment and displayed in the workspace UI.

We'll start by creating a new 'compositions' file 

```sh
$ touch components/ui/button/button.composition.tsx
```

And add the following lines to `components/ui/button/button.composition.tsx`

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

Head over to the [compositions tab](https://localhost:3000/base/button/~compositions) to see all of the `button` compositions we just created.
