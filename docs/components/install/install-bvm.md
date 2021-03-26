--- 
id: install-bvm
title: Install BVM
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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

You should see a progress bar while BVM is installing and once finished you can use BVM to install Bit.
