---
id: bit-create-multiple-components
title: Bit Create Multiple Components
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Create multiple components by adding more component names after the command.

<Tabs
defaultValue="TypeScript"
values={[
{label: 'TypeScript', value: 'TypeScript'},
{label: 'JSX', value: 'JSX'},
]}>
<TabItem value="TypeScript">

```bash
bit create react-component ui/component1 ui/component2 design/component1
```

  </TabItem>
  <TabItem value="JSX">

```bash
bit create react-component-jsx ui/component1 ui/component2 design/component1
```

  </TabItem>
</Tabs>
