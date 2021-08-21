---
id: install-components
title: Installing Components
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Component packages are installed using their package name. The package name usually correlates to the component ID.

In your component workspace click on the **Use** dropdown, select the **Install** tab to copy your component scope name and component ID. You can then choose between NPM or Yarn to install your component in to another Bit workspace or into a React application.

<Tabs
defaultValue="NPM"
values={[
{label: 'NPM', value: 'NPM'},
{label: 'Yarn', value: 'Yarn'},
]}>
<TabItem value="NPM">

```bash
npm install @bit/YourUserName.componentScopeName.componentID
```

  </TabItem>
  <TabItem value="Yarn">

```bash
yarn add @bit/YourUserName.componentScopeName.componentID
```

  </TabItem>
</Tabs>
