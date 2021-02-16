---
id: install-components
title: Install Components
---

Components exported to Bit can be installed as standard node packages, either in a Bit workspace or even in a non-Bit project.

## Create a Consumer Project

For the porpuse of this task, start by creating a new project and set up a Create React App:

```sh
$ cd ..
$ npx create-react-app my-consumer
$ cd my-consumer
```

## Configure Package Manager

To install components we need to ensure your package manager knows to fetch Bit components from the Bit.dev component registry.  
As part of the iniital `bbit login` process, Bit has created an `~/.npmrc` file and configured it to your account. As Bit.dev sets a dedicated component registry for each account we'll need to configure it for your machine.  
Open the `~/.npmrc` file and add the following line (replace `<account>` with the account name part of the `defaultScope`):

```sh title="~/.npmrc"
@<account>=https://node.bit.dev
```

## Use Installed Components

Now that your pacakge manager has your component registry configured, you can install the component.

Head back to your component overview page on bit.dev and copy the **package name**. Use it for this command:

```sh title="different install methods"
npm install <package name>
yarn add <package name>
pnpm install <package name>
```

The package manager will keep the installed component in the `node_modules` directly and add it as a dependnecy.

To use the component in the code, import the code as follow:

```js
import { Something } from '@owner/demo.react.ui.button';
```

### Render component

Past this snippet in the `index.ts` file for the CRA app we just created:

```js
// SNIPPET GOES HERE
```

Now start the app and see the button rendred.

```sh
$ yarn start
```
