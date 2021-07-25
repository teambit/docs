---
id: customizing-env
title: Customizing an Env (composing an env)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You can extend and customize an Env by using it in your own Env extension [component].

This is done by following these steps:

1. Create the a new extension file. 

2. Place in the boilerplate code for the Env extension and use the Env you wish to extend.

3. Use the extended Env API to customize it.

4. Track the extension with Bit.

5. Configure the new Env extension (component) to use the Aspect Env (an Env is just another Bit Aspect and therefore uses the Aspect environment).

6. Set components in your workspace to use your new Env extension.

> This section will go over the steps needed to extend the Env's main runtime environment. To extend the preview runtime (to customized the way 'compositions' are rendered), [see here](#extending-multiple-runtime-environments)

## 1. Create the extension files

```shell
// In the workspace's root directory
mkdir -p extensions/custom-react
touch extensions/custom-react/custom-react.extension.ts
touch extensions/custom-react/index.ts
```

> This section goes through the steps of extending the 'main runtime'.
> See the 'Runtime Environment' section to learn how to extend multiple runtime environments.

> An environment extension is a component that extends an existing environment. An extension file will have the `.extension.ts` suffix as a convention.

> The `*.extensions.ts` pattern should only be used when no other 'runtime environment' is being extended other than the 'main runtime.' For more details, see the 'runtime environments' section.


## 2. Place in the boilerplate for the Env extension and use the Env you wish to extend

> For demonstration purposes, we'll extend the React Env. 


<Tabs
  defaultValue="custom-react.extension"
  values={[
    {label: 'custom-react.extension.ts', value: 'custom-react.extension'},
    {label: 'index.ts', value: 'index'}
  ]}>
<TabItem value="custom-react.extension">

```tsx

// Import from the Environments aspect to register this extension as an environment
import { EnvsMain, EnvsAspect } from '@teambit/envs';
// Import from the React aspect to extend it
import { ReactAspect, ReactMain } from '@teambit/react';

export class CustomReactExtension {
  constructor(private react: ReactMain) {}

  // Set the necessary dependencies to be injected (by Bit) into the following 'provider' function
  static dependencies: any = [EnvsAspect, ReactAspect];

  // The 'provider' method will be executed by Bit. Its (aspect) dependencies will be injected by Bit.
  static async provider([envs, react]: [EnvsMain, ReactMain]) {
    // The 'compose' methods to compose the overrides into a single environment
    const customReactEnv = react.compose([

      // This is where you use the extended Env's API to customize it

    ]);

    // Register this extension as an environment using the "registerEnv" slot (provided by the Environments aspect).
    envs.registerEnv(customReactEnv);

    return new CustomReactExtension(react);
  }
}
```

</TabItem>
<TabItem value="index">

```ts
import { CustomReactExtension } from './custom-react.extension';
export { CustomReactExtension };
export default CustomReactExtension;
```

</TabItem>
</Tabs>


## 3. Use the extended Env API to customize it.

> We'll override the devServer and the TypeScript compiler configurations as an example

```ts
// Import from the Environments aspect to register this extension as an environment
import { EnvsMain, EnvsAspect } from '@teambit/envs';
// Import from the React aspect to extend it and override its DevServer config
import { ReactAspect, ReactMain } from '@teambit/react';

// require the new config files
const newWebpackConfig = require('./webpack/new-webpack-config');
const tsconfig = require('./typescript/tsconfig.json');

export class CustomReactExtension {
  constructor(private react: ReactMain) {}

  // Set the necessary dependencies to be injected (by Bit) into the following 'provider' function
  static dependencies: any = [EnvsAspect, ReactAspect];

  static async provider([envs, react]: [EnvsMain, ReactMain]) {
    // The 'compose' methods to compose the overrides into a single environment
    const customReactEnv = react.compose([

      // Override the Webpack configs for the dev server
      react.overrideDevServerConfig(newWebpackConfig);
      // Override the TS configs
      react.overrideTsConfig(tsconfig)

    ]);

    // Register this extension as an environment using the "registerEnv" slot (provided by the Environments aspect).
    envs.registerEnv(customReactEnv);

    return new CustomReactExtension(react);
  }
}
```

## 4. Track the extension with Bit

```shell
bit add extensions/custom-react -n my-extensions
```

> The `my-extensions` namespace is optional


## 5. Configure the new Env extension (component) to use the Aspect Env

Our extension's component ID is: `my-org.my-extensions/my-extensions/custom-react`.
We'll select it using its namespace.

```json
{
  "teambit.workspace/workspace": {
    "name": "my-workspace",
    "icon": "https://image.flaticon.com/icons/svg/185/185034.svg",
    "defaultScope": "my-org.my-extensions"
  },
  "teambit.workspace/variants": {
    "{my-extensions/*}": {
      "teambit.harmony/aspect": {}
    }
  }
}
```

## 6. Set components in your workspace to use your new Env extension

> As an example, we'll select all component using the namespace `ui`

```json
{
  "teambit.workspace/workspace": {
    "name": "my-workspace",
    "icon": "https://image.flaticon.com/icons/svg/185/185034.svg",
    "defaultScope": "my-org.my-extensions"
  },
  "teambit.workspace/variants": {
    "{my-extensions/*}": {
      "teambit.harmony/aspect": {}
    },
    "{ui/*}": {
        "my-org.my-extensions/my-extensions/custom-react"
    }
  }
}
```

## Extending multiple runtime environments

An environment may operate in multiple runtime environments: 'Main', which runs on the server and 'UI' and 'Preview', which run on the browser.
Each runtime environment runs all files that are named with its corresponding file pattern.

An environment extension that runs on multiple runtimes is called "Aspect" an will have the following file structure:

```
|-- env-extension
    |-- env-extension.main.ts
    |-- env-extension.ui.tsx
    |-- env-extension.preview.tsx
    |-- env.extension.aspect.ts
```

### Registering an environment as an aspect

Create a `*.aspect.ts` file:

For example:

```shell
touch path/to/extension/env-extension.aspect.ts
```

Place the following lines to register your environment as a multiple runtime extension (a.k.a, an Aspect):

```ts
// env-extension.aspect.ts

import { Aspect } from '@teambit/harmony';

export const ReactWithProvidersAspect = Aspect.create({
  // The ID should be your component's ID
  // Make sure to track your extension component before registering it as an Aspect
  id: 'my-scope.react-with-providers',
});
```

### Registering a runtime extension

An aspect is a collection of multiple extensions, each extending a specific runtime.

Register each runtime extension to its corresponding runtime, using the `addRuntime` method.

For example:

```typescript
// react-extension.preview.ts

import { PreviewRuntime } from '@teambit/preview';
import { ReactAspect, ReactPreview } from '@teambit/react';
import { ReactExtensionAspect } from './react-with-providers.aspect';

export class ReactExtensionPreview {
  static runtime = PreviewRuntime;

  static dependencies = [ReactAspect];

  static async provider([react]: [ReactPreview]) {
    return new ReactExtensionPreview();
  }
}

ReactExtensionAspect.addRuntime(ReactExtensionPreview);
```

### Runtime environments

#### Main

`*.main.runtime.ts`

Node files that run in a node runtime environments and outputs to the terminal.

**Example:**
The React environment TypeScript compiler will be extended in the main runtime.

```typescript
// react-extension.main.ts

import { MainRuntime } from '@teambit/cli';
import { EnvsAspect, EnvsMain } from '@teambit/envs';
import { ReactAspect, ReactMain } from '@teambit/react';
import { ReactExtensionAspect } from './react-extension.aspect';

const tsconfig = require('./typescript/tsconfig.json');

export class ReactExtensionMain {
  constructor(private react: ReactMain, private envs: EnvsMain) {}

  icon() {
    return 'https://static.bit.dev/extensions-icons/react.svg';
  }

  static runtime = MainRuntime;

  static dependencies = [ReactAspect, EnvsAspect];

  static async provider([react, envs]: [ReactMain, EnvsMain]) {
    const reactExtension = envs.compose(react, [react.overrideTsConfig(tsconfig)]);
    envs.registerEnv(reactExtension);
    return new ReactWithProvidersMain(react, envs);
  }
}

ReactExtensionAspect.addRuntime(ReactExtensionMain);
```

#### UI

`*.ui.runtime.[ts,js,jsx,tsx]`

JSX files that run in the browser, as part of the Workspace/Scope UI bundle that is being served by the development server.

#### Preview

`*.preview.runtime.*`

These files are served by the environment's server, as part of the environment's preview bundle (i.e, the component compositions and documentation).
(The 'preview' runtime is rendered in the Workspace/Scope UI using an iframe.)

**Example:**
A new composition provider that will "wrap" every composition using that environment will be added using the preview runtime since it is part of the component compositions (which are being served to the browser by the environment's server).

```typescript
// react-extension.preview.ts

import { PreviewRuntime } from '@teambit/preview';
import { ReactAspect, ReactPreview } from '@teambit/react';
import { ReactExtensionAspect } from './react-with-providers.aspect';
import { Center } from './my-providers/center';

export class ReactExtensionPreview {
  static runtime = PreviewRuntime;

  static dependencies = [ReactAspect];

  static async provider([react]: [ReactPreview]) {
    react.registerProvider(Center);

    return new ReactExtensionPreview();
  }
}

ReactExtensionAspect.addRuntime(ReactExtensionPreview);
```