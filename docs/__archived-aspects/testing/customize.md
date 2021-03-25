---
id: customize-the-tester
title: Customizing the Tester
---

//TODO should be in react env docs

The Tester is an [Environment Service](/building-with-bit/environments) that enables environments to integrate a specific test runner into various Bit features, processes and events.

For example, the React environment (`@teambit.react/react`) uses the Tester Environment Service to configure the Jest extension component as its test runner. Jest will be used (for components using this environment) when running the `bit test` command, when running the build process and will even display its results in the Workspace UI (just to name a few examples).

To customize your environment's test runner, first [create an environment extension](/building-with-bit/environments). This will be a new Bit component the uses an existing environment to extend and customize it to your own needs.

> As an example, we'll extend Bit's out-of-the-box React environment (`@teambit.react/react`).

## Create a new extension component

### Create the environment extension files

```shell
// In the workspace's root directory
$ mkdir -p extensions/custom-react
$ touch extensions/custom-react/react.extension.ts
$ touch extensions/custom-react/index.ts
```

### Option #1: Override the environment's default tester configurations

Import the environment to be extended and customize its tester configurations.

In this example, we'll extend the React environment and customize its test runner configurations. We will set new Jest configurations by creating a new [`jest.config.js`](https://jestjs.io/en/configuration) configuration file to override the one used by the environment.

> Different environments may expose different Environment Transformers (i.e., 'override' methods) to customize the configurations set on the specific test runner used by them. <br /> <br />
> For a list of all available Transformers see your environment's documentation.


```typescript title="custom-react.extension"
import { EnvsMain, EnvsAspect } from '@teambit/envs';
import { ReactAspect, ReactMain } from '@teambit/react';

export class CustomReactExtension {
  constructor(private react: ReactMain) {}

  static dependencies: any = [EnvsAspect, ReactAspect];

  static async provider([envs, react]: [EnvsMain, ReactMain]) {
    const customReactEnv = react.compose([
      // Override the environment's default Jest configuration by providing the path to its config file.
      react.overrideJestConfig(require.resolve('./jest.config')),
    ]);

    envs.registerEnv(customReactEnv);

    return new CustomReactExtension(react);
  }
}
```

```js title="jest.config.js"
module.exports = {
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss|less)$',
  ],
};
```

```ts title="index.ts"
import { CustomReactExtension } from './custom-react.extension';
export { CustomReactExtension };
export default CustomReactExtension;
```



The above example overrides the ["transformIgnorePatterns"](https://jestjs.io/en/configuration#transformignorepatterns-arraystring) property for Jest's configuration file (`jest.config.js`) used by the environment.

The new `jest.config.js` file does not replace the default one but merges into it (and therefor only configures the properties to override). Since the "transformIgnorePatterns" property conflicts with the one set by the environment, it replaces it. In cases where there is no conflict between two properties, the override property will simply be added to the default configuration file.

> Do not use the configuration file to set the pattern for your test files names. Instead, use the Tester [workspace config API](/building-with-bit/testing#patterns).

### Option #2: Replace the test runner used by the environment

Environments use Environment Services by implementing a special class of methods called [Service Handlers](/building-with-bit/environments).

An environment's test runner can be replaced by overriding its [Tester Service Handler](/building-with-bit/environments#getTester) method (`getTester()`).

For example, the code below shows a React environment extension that replaces its default compiler, Jest, with Mocha.

```tsx title="custom-react.extension"
import { EnvsMain, EnvsAspect } from '@teambit/envs';
import { ReactAspect, ReactMain } from '@teambit/react';
// Import the Mocha extension component to configure it and set it as the new test runner
import { MochaAspect, MochaMain } from '@teambit.defender/mocha';

export class CustomReactExtension {
  constructor(private react: ReactMain) {}

  // Set the necessary dependencies to be injected (by Bit) into the following 'provider' function
  static dependencies: any = [EnvsAspect, ReactAspect, MochaAspect];

  static async provider([envs, react, mocha]: [
    EnvsMain,
    ReactMain,
    MochaMain
  ]) {
    // Create a new Mocha tester
    const mochaTestRunner = mocha.createTester({});

    const testerOverride = envs.override({
      getTester: () => {
        return mochaTestRunner;
      },
    });

    const customReactEnv = react.compose([testerOverride]);

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
