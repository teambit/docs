---
id: quick-start
title: Tutorial
---

In this tutorial you will use Bit to build a full stack application out of common frameworks and libraries using component driven development and modern technologies.

## Install Bit

TODO

## Create a new workspace

```sh
$ mkdir todos-react
$ cd todos-react
$ bit init --harmony
```

The command creates the Bit workspace which is constructed of:

- `workspace.json` file.
- `components` directory.

## Run the local dev server

Now that the workspace is setup, run Bit development server locally.

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

> When we get `bit create` we'll refactor this part

Components in a Bit workspace must have all their implementation files in the same directory. So to create your first component, add a new directory:

```sh
$ mkdir components/base
$ mkdir components/base/button
```

Bit uses a strict standard for Barrel files, so the first file we'll create is the index file for the component:

```sh
$ touch components/base/button/index.ts
```

Once you have your Barrel file, create the main implementation file for the component.

```sh
$ touch components/base/button/button.tsx
$ touch components/base/button/button.module.scss
```

Add the following line to `components/base/button/index.ts`

```js
export * from './button';
```

Add the following lines to `components/base/button/button.tsx`

```js
// TODO - button impl
```

Add the following lines to `components/base/button/button.module.scss`

```js
// TODO - button styles
```

To have the component managed by Bit, you need to use the following command:

```sh
$ bit add components/base/button
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
