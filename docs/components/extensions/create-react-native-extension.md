--- 
id: create-react-native-extension
title: Create ReactNative Extension
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Start by creating a new component

```sh
mkdir -p extensions/custom-react-native
touch extensions/custom-react-native/react-native.extension.ts
touch extensions/custom-react-native/index.ts
```

<Tabs
  defaultValue="index.ts"
  values={[
    {label: 'index.ts', value: 'index.ts'},
    {label: 'custom-react-native.extension.ts', value: 'custom-react-native.extension.ts'},
  ]}>
  <TabItem value="index.ts">

```ts title="index.ts"
import { CustomReactNativeExtension } from './custom-react-native.extension'
export { CustomReactNativeExtension }
export default CustomReactNativeExtension
```

  </TabItem>
  <TabItem value="custom-react-native.extension.ts">

```ts title="custom-react-native.extension.ts"
import { EnvsMain, EnvsAspect } from '@teambit/envs'
import { ReactNativeAspect, ReactNativeMain } from '@teambit/react-native'

export class CustomReactNativeExtension {
  constructor(private react-native: ReactNativeMain) {}

  static dependencies: any = [EnvsAspect, ReactNativeAspect]

  static async provider([envs, react-native]: [EnvsMain, ReactNativeMain]) {
    const customReactNativeEnv = react-native.compose([
      /*
        Compose ReactNative here
      */
    ])

    envs.registerEnv(customReactNativeEnv)

    return new CustomReactNativeExtension(react-native)
  }
}
```

  </TabItem>
</Tabs>

After you created the component, use `bit add` to track it to Bit.

```sh
bit add extensions/custom-react-native
```

After you created your extension you need configure it to be a Bit Aspect. This is because environments are actually aspects that extends Bit's core functionality to support your development workflow. To do this edit your workspace.jsonc and set `teambit.harmony/aspect` as the environment applied on the extension you created:

```json title="workspace.jsonc"
{
  "teambit.workspace/variants": {
    "extensions/custom-react-native": {
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
