--- 
id: create-node-extension
title: Create Node Extension
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Start by creating a new component

```sh
mkdir -p extensions/custom-node
touch extensions/custom-node/node.extension.ts
touch extensions/custom-node/index.ts
```

<Tabs
  defaultValue="index.ts"
  values={[
    {label: 'index.ts', value: 'index.ts'},
    {label: 'custom-node.extension.ts', value: 'custom-node.extension.ts'},
  ]}>
  <TabItem value="index.ts">

```ts title="index.ts"
import { CustomNodeExtension } from './custom-node.extension'
export { CustomNodeExtension }
export default CustomNodeExtension
```

  </TabItem>
  <TabItem value="custom-node.extension.ts">

```ts title="custom-node.extension.ts"
import { EnvsMain, EnvsAspect } from '@teambit/envs'
import { NodeAspect, NodeMain } from '@teambit/node'

export class CustomNodeExtension {
  constructor(private node: NodeMain) {}

  static dependencies: any = [EnvsAspect, NodeAspect]

  static async provider([envs, node]: [EnvsMain, NodeMain]) {
    const customNodeEnv = node.compose([
      /*
        Compose Node here
      */
    ])

    envs.registerEnv(customNodeEnv)

    return new CustomNodeExtension(node)
  }
}
```

  </TabItem>
</Tabs>

After you created the component, use `bit add` to track it to Bit.

```sh
bit add extensions/custom-node
```

After you created your extension you need configure it to be a Bit Aspect. This is because environments are actually aspects that extends Bit's core functionality to support your development workflow. To do this edit your workspace.jsonc and set `teambit.harmony/aspect` as the environment applied on the extension you created:

```json title="workspace.jsonc"
{
  "teambit.workspace/variants": {
    "extensions/custom-node": {
      "teambit.harmony/aspect": {}
    },
  }
}
```

Validate it by running `bit env` and see that the extension-component has `teambit.harmony/aspect` set as an environment.

> Bit is lacking an automated mechanism for rebuilding extensions on configuration and code changes. You need to run the `compile` command to have Bit rebuild your extension:
>
> ```sh
> bit compile
> ```
