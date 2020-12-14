---
id: build-environment
title: Creating an Environment
---

> Environments can be built as new [Bit Aspects](TODO) or as extensions of existing environments. This tutorial will only cover the latter.
## Create an environment extension
An environment extension is a component that extends an existing environment. An extension file will have the `.extension.ts` suffix as a convention. 

To use an extension, track it (`$ bbit add path/to/component`) and use its component ID in the `workspace.jsonc` configuration file. For example:

```json
{
  "teambit.workspace/workspace": {
    "name": "my-workspace",
    "icon": "https://image.flaticon.com/icons/svg/185/185034.svg",
    "defaultScope": "my-org.my-extensions"
  },
  "teambit.workspace/variants": {
    "*": {
        "my-org.my-extensions/react": {}
        }
    }
}
```
An environment extension uses the following aspects to extend an existing environment, and to register itself as an environment:
* The __"base" environment__ (e.g, `@teambit/react`) is extended and customized using its override methods. Each override method, or "environment transformer", corresponds to a Bit aspect used by the environment (e.g, the TypeScript aspect). Using an 'environment transformer' will add new configurations to the relevant Bit aspect and will override any conflicting ones.<br /> The full list of available 'environment transformers' can be seen in the specific environment's documentation (see: React, React Native, Node).

* The __environments aspect__ (`@teambit/envs`) is used to: 
  1. Register the new environment using its [slot](TODO)
  2. Override a ["service handler"](TODO). This is done to replace a Bit Aspect used by an environment service. For example, to set the "compiler" service handler to use Babel instead of TypeScript (see an example, [here](/docs/environments/build-environment#override-a-service-handler)). 

### Override the config for a Bit aspect used by the environment

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

  // This icon will be shown in the Workspace UI navigation for every component using this extension 
  icon() {
    return this.react.icon;
  }

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
import { CustomReactExtension } from './custom-react.extension';
export { CustomReactExtension };
export default CustomReactExtension;
```
<!--END_DOCUSAURUS_CODE_TABS-->


> The 'provider' method will be executed by Bit. Its Bit aspects dependencies are set in the `dependencies` variable, and will be injected into the method upon execution.

### Override a 'service handler'
The example below is of a React environment extension. This new environment overrides the 'service handler' for the compiler service. It replaces the Bit aspect used by it, TypeScript, with another Bit aspect, Babel.

<!--DOCUSAURUS_CODE_TABS-->
<!--custom-react.extension-->
```tsx
// Import from the Environments aspect to register this extension as an environment
import { EnvsMain, EnvsAspect } from '@teambit/envs';
// Import from the React aspect to extend it and override its DevServer config
import { ReactAspect, ReactMain } from '@teambit/react';
// Import the Babel aspect to configure it and set it as the new compiler
import { BabelAspect, BabelMain } from '@teambit.compilation/babel';

const babelConfig = require('./babel/babel-config');

export class CustomReactExtension {
  constructor(private react: ReactMain) {}

  // This icon will be shown in the Workspace UI navigation for every component using this extension 
  icon() {
    return this.react.icon;
  }

  // Set the necessary dependencies to be injected (by Bit) into the following 'provider' function
  static dependencies: any = [EnvsAspect, ReactAspect, BabelAspect];

  static async provider([envs, react, babel]: [EnvsMain, ReactMain, BabelMain]) {
    
    // Create a new Babel compiler with the 'babelConfig' configurations
    const babelCompiler = babel.createCompiler({ babelTransformOptions: babelConfig });

    // Use the 'override' method provided by the 'environments' aspect (not the React aspect)
    const compilerOverride = envs.override({
      getCompiler: () => {
        return babelCompiler;
      },
    });

    // Compose the overrides into a single environment
    const customReactEnv = react.compose([
      compilerOverride
    ]);

    // Register this extension as an environment using the "registerEnv" slot (provided by the 'environments' aspect).
    envs.registerEnv(customReactEnv);

    return new CustomReactExtension(react);
  }
}
```
<!--index.ts-->
```ts
import { CustomReactExtension } from './custom-react.extension';
export { CustomReactExtension };
export default CustomReactExtension;
```
<!--END_DOCUSAURUS_CODE_TABS-->

> Notice how the Babel aspect is also injected into the provider method.
### Bit's out-of-the-box "base" environments
Choose one of the following Bit environments to extend and customize it.

#### [React](/docs/react/extending-react)
#### [NodeJS](/docs/react/extending-node)
### [React Native](/docs/react/extending-react-native) 


