--- 
id: create-extensions
title: Create Extensions
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="React"
  values={[
    {label: 'React', value: 'React'},
    {label: 'ReactNative', value: 'ReactNative'},
    {label: 'Node', value: 'Node'},
  ]}>
  <TabItem value="React">

```shell
bit create react-extension my-react-extension
```

:arrow_right: Learn more about [React Environment](/aspects/react) and it's APIs.

  </TabItem>
  <TabItem value="ReactNative">

```shell
bit create react-native-extension my-react-native-extension
```

:arrow_right: Learn more about [React Native Environment](/aspects/react-native) and it's APIs.

  </TabItem>
  <TabItem value="Node">

```shell
bit create node-extension my-node-extension
```

:arrow_right: Learn more about [Node Environment](/aspects/node) and it's APIs.

  </TabItem>
</Tabs>
