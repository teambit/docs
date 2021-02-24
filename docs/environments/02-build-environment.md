---
id: build-environment
title: Creating an Environment
---

> Environments can be built as new [Bit Aspects](TODO) or as extensions of existing environments. This tutorial will only cover the latter.

## Create an environment extension

An environment extension is a component that extends an existing environment. An extension file will have the `.extension.ts` suffix as a convention.

To create and use an environment extension:

1. Create the extension files
2. Use and extend an existing environment
3. Track the new component
4. Use the new extension component ID to set it in the workspace configuration file
5. (Optional) Tag the new component
6. (Optional) Export the component the make it available to be used by others

### 1. Create the environment extension files

We'll start by creating a new extension:

```shell
// In the workspace's root directory
$ mkdir -p extensions/custom-react
$ touch extensions/custom-react/custom-react.extension.ts
$ touch extensions/custom-react/index.ts
```

### 2. Use an existing environment to extend it

> The below code uses the React environment as an example.

Our files will have the following code (the code below will only extend the `@teambit.react/react` environment without changing its configurations):

<!--DOCUSAURUS_CODE_TABS-->
<!--custom-react.extension-->

```tsx
// Import from the Environments aspect to register this extension as an environment
import { EnvsMain, EnvsAspect } from "@teambit/envs";
// Import from the React aspect to extend it
import { ReactAspect, ReactMain } from "@teambit/react";

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

<!--index.ts-->

```ts
import { CustomReactExtension } from "./custom-react.extension";
export { CustomReactExtension };
export default CustomReactExtension;
```

<!--END_DOCUSAURUS_CODE_TABS-->

### 3. Track the extension component

We'll then track the new component (with the 'my-extensions' namespace):

```shell
$ bbit add extensions/custom-react -n my-extensions
```

### 4. Set the extension component in the workspace config file

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

## The anatomy of an environment extension

An environment extension uses the following Bit components to extend an existing environment, and to register itself as an environment:

- The **"base" environment** (e.g, `@teambit/react`) is extended and customized using its override methods. Each override method, or "environment transformer", corresponds to a Bit extension component used by the environment (e.g, the TypeScript component). Using an 'environment transformer' will add new configurations to the relevant Bit component and will override any conflicting ones.<br /> The full list of available 'environment transformers' can be seen in the specific environment's documentation (see: React, React Native, Node).

- The **'Environments' component** (`@teambit/envs`) is used to:
  1. Register the new environment using its [slot](TODO)
  2. Override a ["service handler"](TODO). This is done to replace a Bit component used by an environment service. For example, to set the "compiler" service handler to use Babel instead of TypeScript (see an example, [here](/docs/environments/build-environment#override-a-service-handler)).

### Override the config for a Bit component used by the environment

The example below is of a React environment extension. This new environment overrides React's DevServer configuration by setting a new Webpack configuration file.

<!--DOCUSAURUS_CODE_TABS-->
<!--custom-react.extension-->

```tsx
// Import from the Environments aspect to register this extension as an environment
import { EnvsMain, EnvsAspect } from '@teambit/envs';
// Import from the React aspect to extend it and override its DevServer config
import { ReactAspect, ReactMain } from '@teambit/react';

const newWebpackConfig = require('./webpack/new-webpack-config');

export class CustomReactExtension {
  constructor(private react: ReactMain) {}

  // Set the necessary dependencies to be injected (by Bit) into the following 'provider' function
  static dependencies: any = [EnvsAspect, ReactAspect];

  static async provider([envs, react]: [EnvsMain, ReactMain]) {
    // The 'compose' methods to compose the overrides into a single environment
    const customReactEnv = react.compose([

      // Override the Webpack configs of the DevServer aspect
      react.overrideDevServerConfig(newWebpackRules);

    ]);

    // Register this extension as an environment using the "registerEnv" slot (provided by the Environments aspect).
    envs.registerEnv(customReactEnv);

    return new CustomReactExtension(react);
  }
}
```

<!--index.ts-->

```ts
import { CustomReactExtension } from "./custom-react.extension";
export { CustomReactExtension };
export default CustomReactExtension;
```

<!--END_DOCUSAURUS_CODE_TABS-->

> The 'provider' method will be executed by Bit. Its Bit aspects dependencies are set in the `dependencies` variable, and will be injected into the method upon execution.

### Override a 'service handler' to replace a component used by the environment

The example below is of a React environment extension. This new environment overrides the 'service handler' for the compiler service. It replaces the Bit aspect used by it, TypeScript, with another Bit aspect, Babel.

<!--DOCUSAURUS_CODE_TABS-->
<!--custom-react.extension-->

```tsx
// Import from the Environments aspect to register this extension as an environment
import { EnvsMain, EnvsAspect } from "@teambit/envs";
// Import from the React aspect to extend it and override its DevServer config
import { ReactAspect, ReactMain } from "@teambit/react";
// Import the Babel aspect to configure it and set it as the new compiler
import { BabelAspect, BabelMain } from "@teambit.compilation/babel";

const babelConfig = require("./babel/babel-config");

export class CustomReactExtension {
  constructor(private react: ReactMain) {}

  // Set the necessary dependencies to be injected (by Bit) into the following 'provider' function
  static dependencies: any = [EnvsAspect, ReactAspect, BabelAspect];

  static async provider([envs, react, babel]: [
    EnvsMain,
    ReactMain,
    BabelMain
  ]) {
    // Create a new Babel compiler with the 'babelConfig' configurations
    const babelCompiler = babel.createCompiler({
      babelTransformOptions: babelConfig,
    });

    // Use the 'override' method provided by the 'environments' aspect (not the React aspect)
    const compilerOverride = envs.override({
      getCompiler: () => {
        return babelCompiler;
      },
    });

    // Compose the overrides into a single environment
    const customReactEnv = react.compose([compilerOverride]);

    // Register this extension as an environment using the "registerEnv" slot (provided by the 'environments' aspect).
    envs.registerEnv(customReactEnv);

    return new CustomReactExtension(react);
  }
}
```

<!--index.ts-->

```ts
import { CustomReactExtension } from "./custom-react.extension";
export { CustomReactExtension };
export default CustomReactExtension;
```

<!--END_DOCUSAURUS_CODE_TABS-->

> Notice how the Babel aspect is also injected into the provider method.

### Bit's out-of-the-box "base" environments

Choose one of the following Bit environments to extend and customize it.

#### -> [React](/docs/react/extending-react)

#### -> [NodeJS](/docs/react/extending-node)

#### -> [React Native](/docs/react/extending-react-native)
