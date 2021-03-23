---
id: installing-components
title: Installing Components
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Once you have exported your component you can now install it in your applications. Use any existing app or start a new one with `create-react-app`. 

## Installing your component

In your component workspace click on the **Use** dropdown, select the **Install** tab to copy your component scope name and id. You can then choose between NPM or Yarn to install your component in your app.


<Tabs
  defaultValue="NPM"
  values={[
    {label: 'NPM', value: 'NPM'},
    {label: 'Yarn', value: 'Yarn'},
  ]}>
  <TabItem value="NPM">

```shell
npm install @YourScopeName/componentScopeName.componentID
```

  </TabItem>
  <TabItem value="Yarn">

```shell
yarn add @YourScopeName/componentScopeName.componentID
```

  </TabItem>
</Tabs>

## Configure your Scoped Registry

To install components with npm or yarn we first need to configure @YourScopeName as a [scoped registry](https://docs.npmjs.com/misc/scope#associating-a-scope-with-a-registry).

```shell
npm config set '@YourScopeName:registry' https://node.bit.dev
```

## Install Dependencies

Install dependencies for all the imported components.

```shell
bit install
```

## Use your Component

You can now use the component in your app by importing it from your node modules and then using it in your component function.

```js title="app.js"
import { Button } from '@YourScopeName/componentScopeName.componentID';
```

```js title="app.js"
<Button>Click Me</Button>
```
