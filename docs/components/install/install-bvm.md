--- 
id: install-bvm
title: Install BVM
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[BVM](/aspects/bvm) is a version manager for Bit.
Using BVM makes it easier to install and manage multiple versions of Bit in a single environment.

<Tabs
  defaultValue="NPM"
  values={[
    {label: 'NPM', value: 'NPM'},
    {label: 'Yarn', value: 'Yarn'},
  ]}>
  <TabItem value="NPM">

```shell
npm i -g @teambit/bvm
```

  </TabItem>
  <TabItem value="Yarn">

```shell
yarn global add @teambit/bvm
```

  </TabItem>
</Tabs>
