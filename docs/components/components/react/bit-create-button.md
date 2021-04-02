---
id: bit-create-button
title: Bit Create
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

We can use `bit create` to create an example button component with the namespace of `ui`. This will also create a package in your workspace `node_modules` directory and add your component to the workspace UI.

<Tabs
defaultValue="TypeScript"
groupId="langs"
values={[
{label: 'TypeScript', value: 'TypeScript'},
{label: 'JSX', value: 'JSX'},
]}>
<TabItem value="TypeScript">

```bash
bit create react-button ui/button
```

  </TabItem>
  <TabItem value="JSX">

```bash
bit create react-button-jsx ui/button
```

  </TabItem>
</Tabs>

is the same as

<Tabs
defaultValue="TypeScript"
groupId="langs"
values={[
{label: 'TypeScript', value: 'TypeScript'},
{label: 'JSX', value: 'JSX'},
]}>
<TabItem value="TypeScript">

```bash
bit create react-button button --namespace ui
```

  </TabItem>
  <TabItem value="JSX">

```bash
bit create react-button-jsx button --namespace ui
```

  </TabItem>
</Tabs>

The following message will appear in the terminal and your component will be created at the location specified and using the [env](/aspect/envs) that has been set in your `workspace.jsonc`.

```bash
the following 1 component(s) were created

my-scope/ui/button
    location: my-scope/ui/button
    env:      teambit.react/react
```
