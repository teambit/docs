--- 
id: install-components
title: Installing Components
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Component packages are installed using their package name. The package name usually correlates to the component ID.

In your component workspace click on the **Use** dropdown, select the **Install** tab to copy your component scope ID. You can then choose between NPM or Yarn to install your component in your app.

<Tabs
  defaultValue="NPM"
  values={[
    {label: 'NPM', value: 'NPM'},
    {label: 'Yarn', value: 'Yarn'},
  ]}>
  <TabItem value="NPM">

```shell
npm install @YourUserName/componentScopeName.componentID
```

  </TabItem>
  <TabItem value="Yarn">

```shell
yarn add @YourUserName/componentScopeName.componentID
```

  </TabItem>
</Tabs>