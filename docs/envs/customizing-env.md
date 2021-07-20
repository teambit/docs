---
id: customizing-env
title: Customizing an Env (composing an env)
---



> This section goes through the steps of extending the 'main runtime'.
> See the 'Runtime Environment' section to learn how to extend multiple runtime environments.

An environment extension is a component that extends an existing environment. An extension file will have the `.extension.ts` suffix as a convention.

> The `*.extensions.ts` pattern should only be used when no other 'runtime environment' is being extended other than the 'main runtime.' For more details, see the 'runtime environments' section.

To create and use an environment extension:

1. Create the extension files
2. Use and extend an existing environment
3. Track the new component
4. Use the new extension component ID to set it in the workspace configuration file
5. (Optional) Tag the new component
6. (Optional) Export the component the make it available to be used by others

#### 1. Create the environment extension files

We'll start by creating a new extension:

```shell
// In the workspace's root directory
mkdir -p extensions/custom-react
touch extensions/custom-react/custom-react.extension.ts
touch extensions/custom-react/index.ts
```

#### 2. Use an existing environment to extend it

> The below code uses the React environment as an example.

Our files will have the following code (the code below will only extend the `@teambit.react/react` environment without changing its configurations):

```tsx
// custom-react.extension.ts

// Import from the Environments aspect to register this extension as an environment
import { EnvsMain, EnvsAspect } from '@teambit/envs';
// Import from the React aspect to extend it
import { ReactAspect, ReactMain } from '@teambit/react';

export class CustomReactExtension {
  constructor(private react: ReactMain) {}

  // Set the necessary dependencies to be injected (by Bit) into the following 'provider' function
  static dependencies: any = [EnvsAspect, ReactAspect];

  static async provider([envs, react]: [EnvsMain, ReactMain]) {
    // The 'compose' methods to compose the overrides into a single environment
    const customReactEnv = react.compose([
      // This is were the environment's 'transformers' will be used to customize it
    ]);

    // Register this extension as an environment using the "registerEnv" slot (provided by the Environments aspect).
    envs.registerEnv(customReactEnv);

    return new CustomReactExtension(react);
  }
}
```

```ts
// index.ts

import { CustomReactExtension } from './custom-react.extension';
export { CustomReactExtension };
export default CustomReactExtension;
```

#### 3. Track the extension component

We'll then track the new component (with the 'my-extensions' namespace):

```shell
bit add extensions/custom-react -n my-extensions
```

#### 4. Set the extension component in the workspace config file

Our extension component now has a component ID that can be used in our `workspace.jsonc` configuration file:

```json
{
  "teambit.workspace/workspace": {
    "name": "my-workspace",
    "icon": "https://image.flaticon.com/icons/svg/185/185034.svg",
    "defaultScope": "my-org.my-extensions"
  },
  "teambit.workspace/variants": {
    "*": {
      "my-org.my-extensions/custom-react": {}
    }
  }
}
```