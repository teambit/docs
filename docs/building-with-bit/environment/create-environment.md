---
id: create-environment
title: Creating an Environment
---

## Create an environment extension

An environment extension is a component that extends an existing environment. An extension file will have the `.extension.ts` suffix as a convention.

:::note Extending multiple runtimes
The \*.extensions.ts pattern should only be used when no other 'runtime' is being extended other than the 'main runtime.'  
For more details, see the 'runtime environments' section.
:::

To create and use an environment extension:

1. Create the extension files
2. Use and extend an existing environment
3. Track the new component
4. Use the new extension component ID to set it in the workspace configuration file
5. (Optional) Tag the new component
6. (Optional) Export the component the make it available to be used by others

### 1. Create the environment extension files

We'll start by creating a new extension (in the workspace root-directory):

```shell
mkdir -p extensions/custom-react
touch extensions/custom-react/custom-react.extension.ts
touch extensions/custom-react/index.ts
```

### 2. Use an existing environment to extend it

:::note
The below code uses the React environment as an example.
:::

Our files will have the following code (the code below will only extend the `@teambit.react/react` environment without changing its configurations):

```tsx title="custom-react.extension.ts"
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

```ts title="index.ts"
import { CustomReactExtension } from './custom-react.extension';
export { CustomReactExtension };
export default CustomReactExtension;
```

### 3. Track the extension component

We'll then track the new component (with the 'my-extensions' namespace):

```shell
bit add extensions/custom-react -n my-extensions
```

### 4. Set the extension component in the workspace config file

Our extension component now has a component ID that can be used in our `workspace.jsonc` configuration file:

```json title="workspace.jsonc"
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
  1. Register the new environment
  2. Override a ["service handler"](/building-with-bit/environment/service-handlers). This is done to replace a Bit component used by an environment service.
     For example, to set the "compiler" service handler to use Babel instead of TypeScript (see an example, [here](/building-with-bit/environment/overview)).

### Override the config for a service used by the environment

:::note The current Envs API will soon be replaced
:::

The example below is of a React environment extension. This new environment overrides React's dev server configuration by setting a new Webpack configuration file.

```tsx title="custom-react.extension"
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

      // Override the Webpack configs for the dev server
      react.overrideDevServerConfig(newWebpackRules);

    ]);

    // Register this extension as an environment using the "registerEnv" slot (provided by the Environments aspect).
    envs.registerEnv(customReactEnv);

    return new CustomReactExtension(react);
  }
}
```

```ts title="index.ts"
import { CustomReactExtension } from './custom-react.extension';
export { CustomReactExtension };
export default CustomReactExtension;
```

:::info the provider method
The 'provider' method will be executed by Bit. Its Bit aspects dependencies are set in the `dependencies` variable, and will be injected into the method upon execution.
:::

### Override a 'service handler' to replace an extension used by the environment

The example below is of a React environment extension. This new environment overrides the 'service handler' for the compiler service. It replaces the Bit extension used by it, TypeScript, with another Bit aspect, Babel.

```tsx title="custom-react.extension.ts"
// Import from the Environments aspect to register this extension as an environment
import { EnvsMain, EnvsAspect } from '@teambit/envs';
// Import from the React aspect to extend it and override its DevServer config
import { ReactAspect, ReactMain } from '@teambit/react';
// Import the Babel aspect to configure it and set it as the new compiler
import { BabelAspect, BabelMain } from '@teambit.compilation/babel';

const babelConfig = require('./babel/babel-config');

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

```ts title="index.ts"
import { CustomReactExtension } from './custom-react.extension';
export { CustomReactExtension };
export default CustomReactExtension;
```

:::note
Notice how the Babel aspect is also injected into the provider method.
:::

## Create an environment extension with multiple runtimes

An environment may operate in multiple runtime environments: 'Main', which runs on the server and 'UI' and 'Preview', which run on the browser.
Each runtime environment runs all files that are named with its corresponding file pattern.

An environment extension that runs on multiple runtimes is called "Aspect" an will have the following file structure:

```shell
|-- env-extension
    |-- env-extension.main.ts
    |-- env-extension.ui.tsx
    |-- env-extension.preview.tsx
    |-- env.extension.aspect.ts
```

### Registering an environment as an aspect

Create a `*.aspect.ts` file.

```shell title="Example"
touch path/to/extension/env-extension.aspect.ts
```

Place the following lines to register your environment as a multiple runtime extension (a.k.a, an Aspect):

```ts title="env-extension.aspect.ts"
import { Aspect } from '@teambit/harmony';

export const ReactWithProvidersAspect = Aspect.create({
  // The ID should be your component's ID
  // Make sure to track your extension component before registering it as an Aspect
  id: 'my-scope.react-with-providers',
});
```

## Registering a runtime extension

An aspect is a collection of multiple extensions, each extending a specific runtime.

Register each runtime extension to its corresponding runtime, using the addRuntime method.

```ts title="react-extension.preview.ts"
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

```ts title="react-extension.main.ts"
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
    const reactExtension = envs.compose(react, [
      react.overrideTsConfig(tsconfig),
    ]);
    envs.registerEnv(reactExtension);
    return new ReactWithProvidersMain(react, envs);
  }
}

ReactExtensionAspect.addRuntime(ReactExtensionMain);
```

### UI

`*.ui.runtime.[ts,js,jsx,tsx]`

JSX files that run in the browser, as part of the Workspace/Scope UI bundle that is being served by the development server.

### Preview

`*.preview.runtime.*`

These files are served by the environment's server, as part of the environment's preview bundle (i.e, the component compositions and documentation).
(The 'preview' runtime is rendered in the Workspace/Scope UI using an iframe.)

**Example:**
A new composition provider that will "wrap" every composition using that environment will be added using the preview runtime since it is part of the component compositions
(which are being served to the browser by the environment's server).

```ts title="react-extension.preview.ts"
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
