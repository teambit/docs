---
id: bit-create-component-card
title: Component Card
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
defaultValue="TypeScript"
values={[
{label: 'TypeScript', value: 'TypeScript'},
{label: 'JSX', value: 'JSX'},
]}>
<TabItem value="TypeScript">

```bash
bit create react-component ui/card
```

  </TabItem>
  <TabItem value="JSX">

```bash
bit create react-component-jsx ui/card
```

  </TabItem>
</Tabs>

is the same as

<Tabs
defaultValue="TypeScript"
values={[
{label: 'TypeScript', value: 'TypeScript'},
{label: 'JSX', value: 'JSX'},
]}>
<TabItem value="TypeScript">

```bash
bit create react-component card --namespace ui
```

  </TabItem>
  <TabItem value="JSX">

```bash
bit create react-component card-jsx --namespace ui
```

  </TabItem>
</Tabs>

The following message will appear in the terminal and your component will be created at the location specified and using the [env](/aspect/envs) that has been set in your `workspace.jsonc`.

```bash
the following 1 component(s) were created

my-scope/ui/card
    location: my-scope/ui/card
    env:      teambit.react/react
```
