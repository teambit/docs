---
id: quick-start
title: Tutorial
---

In this tutorial you will use Bit to create an app, bottom up, from elementary components to full (component) pages, and finally to a single app component. 

The components you'll create will be independent and shareable. You'll make them available for other projects by sharing them to a remote scope.

Last, but definitely not least, you will import and reuse a component from a remote scope.

## Install Bit

```sh
$ npm install bit-bin@15.0.0-beta --global
```

## Create a new workspace

```sh
$ mkdir bad-jokes-app
$ cd bad-jokes-app
$ bit init --harmony
```

This will initialize a Bit workspace, with two new important additions to notice:

- A `workspace.json` file to manage the entire workspace configurations. 

- A `components` directory for all soon-to-be-tracked components.

## Run the local dev server
Now that you've set up a Bit workspace, run Bit's local server to see your workspace UI.

```sh
$ bit start
```

## Configure your development environment

Bit automates your development workflow using Environments.... TODO

To configure your project to use react:

1. Open `workspace.json` file.
2. Locate the `@teambit/worksapce` entry and add:

```json
TODO
```

## Add a component

Components in a Bit workspace must have all their files in the same directory:

```sh
$ mkdir components/ui/button
```

Bit uses a strict standard for Barrel files, so the first file we'll create is the index file for the component:

```sh
$ touch components/ui/button/index.ts
```

Once you have your Barrel file, create the main implementation file for the component.

```sh
$ touch components/ui/button/button.tsx
$ touch components/ui/button/button.module.scss
```

Inside your `index.ts` file, export everything from you `button.tsx` file:

```js
export * from './button';
```

Add the following code to `components/base/button/button.tsx`

```tsx
import React, {ButtonHTMLAttributes} from 'react'
import styles from './button.module.scss'


export interface IButton extends  ButtonHTMLAttributes<HTMLButtonElement> {
    /** Choose between primary and secondary styling. */
    variant?: 'primary' | 'secondary';
}


export const Button = ({children, variant = 'primary', ...rest} : IButton) => {
    return (
        <button className={styles[variant]} {...rest}>
            {children}
        </button>
    )
}
```

Add the following lines to `components/base/button/button.module.scss`

```scss
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@700&display=swap');

.primary {
    border: solid 7px #ab3636;
    background-color: #ab3636;
      &:hover {
        border-color: #8b1b1b;
        background-color: #8b1b1b;
      }
  }
  
  .secondary {
    border: solid 7px #363eab;
    background-color: #363eab;
      &:hover {
        border-color: #434cc5;
        background-color: #434cc5;
      }
  }

  .base {
    border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
    padding: 10px;
    color: #fff;
    font-size: 16px;
    font-family: 'Ubuntu', sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    outline: none;
    transition: background-color 0.5s, border 0.5s;
      &:active {
        border-color: #313131;
        background-color: #fff;
        color: #000;
      }
      &:disabled{
        border-color: #a5a5a5;
        background-color: #a5a5a5;
    }
  }
```

To have the component managed by Bit, you need to use the following command:

```sh
$ bit add components/ui/button
```

Now browse to the local development server at [http://localhost:300](http://localhost:3000) to see that the component is managed by Bit.

> **Component Overview**
>
> Learn more about the component overview and it's features.

## Adding compositions to a component

Use Compositions to render the component in isolation and test is in various cases.

Create the `compositions` file as part of the component:

```sh
$ touch components/base/button/button.composition.tsx
```

Add the following lines to `components/base/button/button.composition.tsx`

```javascript
import { button } from './index.ts'
import React from "react";

export const SimpleButton = () => {
  return (
    <button></button>
  );
};

export const LargeButton = () => {
  return (
    <button size="large"></button>
  );
};
```

Head over to the [compositions tab](https://localhost:3000/base/button/~compositions) to see all component compositions.

1. Each named export is a composition.
1. Composition name is a prettified version of the export name.

> **Compositions**
>
> Learn more about component compositions

## Add tests

TODO - need to get tests working in Bit.... should also utilize compositions for testing and write about it

## Edit component documentation

// TODO explain about docs template, automation and overrides

1. add docs file
1. add labels
1. edit abstract
1. add examples (playground)
1. default export

> **Documentation**
>
> Learn more about component documentation

## Add a page component

In a component driven development each part of an application is a component....
TODO

1. add new directory
1. create a new component called `homepage` (including compositions)
1. add files, docs...

### Use a component

- note about absolute imports for components
- have `homepage` import `button`
- update `compositions`

## Get affected components

1. explain all componetns are connected via deps
1. modify button
1. show that hompage is marked as modified

## Add react hook

1. add directory for hooks
1. create hook
1. connect hook to homepage

## Compose an application

write that apps are compositions

1. add `apps` directory
1. add variant
1. configure react to bundle components in the apps folder
1. add "marketing" app.

## Version components

## Push to github

### Set up a bit.dev account

### Create remote scope

### Configure scope in workspace

### Connect bit.dev account to the github repo

## Reuse components in another project

## vendor component
