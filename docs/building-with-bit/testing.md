--- 
id: testing
title: Testing
--- 

import { Image } from '@site/src/components/image';

## Adding Tests

Tests are added by placing test files inside the component's directory. Test files should be named with the pattern set by the component environment.

For example, the [React environment](/building-with-bit/react) runs tests in files named with the following pattern: `*.spec.[ts|tsx|js|jsx]` and `*.test.[ts|tsx|js|jsx]` 

```shell {5}
├── account/login-form 
    ├── index.tsx                
    ├── use-jokes.compositions.tsx 
    ├── use-jokes.docs.mdx     
    ├── use-jokes.spec.tsx      
    └── use-jokes.tsx          
```

It is highly recommended to use the component compositions as test samples.
For example:

```tsx title="use-jokes.spec.tsx"
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { RetrieveJokes } from './use-jokes.compositions';

describe('use-jokes', () => {
  it('should retrieve jokes', async () => {
    const { getByTestId } = render(<RetrieveJokes />);
    const fetchJokesBtn = getByTestId('fetch-button');
    const jokesContainer = getByTestId('jokes-container');
    fireEvent.click(fetchJokesBtn);
    await waitFor(() => expect(jokesContainer.innerHTML).toBeTruthy());
    const jokesContainerSnapshot = jokesContainer.innerHTML;
    fireEvent.click(fetchJokesBtn);
    await waitFor(() =>
      expect(jokesContainer.innerHTML).not.toEqual(jokesContainerSnapshot)
    );
  });
});

```



## Choosing a test runner

Bit's Tester is an [Environment Service](/building-with-bit/environments). 
The type of test runner (Jest, Mocha, etc.) as well as its configurations, are set by the various [environments](/building-with-bit/environments) that use it as a service.
That means test runners are never run directly but only via the Tester service. That also means, a single workspace may run different test runners for different components, each according to its own environment.

To choose a test runner, choose an environment that uses it or [extend an environment](/building-with-bit/testing/customize-the-tester) to have it run your preferred test runner.

## Executing the tester manually

To manually run the tester on a specific component use its [component ID](/building-with-bit/components):

```shell
bit test <component-id>
```

For example:

```shell
bit test ui-primitives/button
```

To manually run the tester on the entire workspace:

```shell
bit test
```

### Options

#### `--watch` `-w`

Starts the tester in 'watch mode' (re-tests when changes are made to a component).

```shell
bit test --watch
```

#### `--debug` `-d`

Starts the tester in 'debug mode'.

```shell
bit test --debug
```

#### `--env` `-e`

Tests all components that use a specific environment.

```shell
bit test --env <component-id>
```

For example:
```shell
bit test --env teambit.react/react
```
#### `--scope` `-s`

Tests all components in a specific scope.

```shell
bit test --scope <scope-name>
```
For example:
```shell
bit test --scope my-org.react-design-system
```

## Bit processes that use the tester

### Local dev server

Bit's local dev server (which also runs the Workspace UI) re-tests components on each modification. This happens whenever a file is 'saved'.

```shell
$ bit start
ENVIRONMENT NAME        URL                      STATUS
react              http://localhost:3101         Running
node               http://localhost:3102         Running

You can now view bad-jokes components in the browser
Main UI server is running on http://localhost:3000

Waiting for component changes... (10:17:20)
```

Test results will be shown in the terminal, as well as in the 'Tests' tab.

<Image src="@site/img/ws_getting_started_test.png" />

### Tests in `watch` mode

Alongside the local dev server, Bit features a watch mode that runs different operations for modified components. Component testing is one of these tasks.

```sh
bit watch
```

### Tests in the Build Pipeline

Testing is also part of a component's build pipeline. As with any other Build Task, the testing task also happens in a 'component capsule', which is an isolated instance of a component. When executed as a Build Task, the tester runs tests for all new or changed dependencies of that component.

When a component's build pipeline is run as part of the tagging of a new release version, the tests output is stored in the component's new version.

## Tester workspace configurations

The Tester can be configured in the `workspace.jsonc` configuration file.

### watchOnStart

Determines whether to run the Tester in 'watch mode' when the running the development server.

For example:

```json
{
  "$schema": "https://static.bit.dev/teambit/schemas/schema.json",
  "teambit.workspace/workspace": {
    "name": "my-workspace-name",
    "icon": "https://static.bit.dev/bit-logo.svg",
    "defaultScope": "my-org.my-scope"
  },
  "teambit.defender/tester": {
    "watchOnStart": false
  }
}
```

### patterns

Determines the file extensions for test files.

For example:

```json
{
  "$schema": "https://static.bit.dev/teambit/schemas/schema.json",
  "teambit.workspace/workspace": {
    "name": "my-workspace-name",
    "icon": "https://static.bit.dev/bit-logo.svg",
    "defaultScope": "my-org.my-scope"
  },
  "teambit.defender/tester": {
    "patterns": ["*.spec.ts", "*.another-extension.ts"]
  }
}
```

## Testing Dependent Components

Bit makes the most out of your automated tests to help you maintain code in a network of independent components. It does so by:

- **Testing components in isolated environments:**
  Tests running as part of the build pipeline will test each component in a 'Bit Capsule' which is
  an isolated instance of a component, generated in a separate directory in your filesystem.
  That ensures the validity of your tests as each test runs unaffected by code that is not part of the component itself.

- **Automatically testing the dependents of a modified component:**
  When tagging a component with a new release version, the 'build' and 'tag' processes automatically run on all dependent components, as well.
  Since testing is part of the build process, tests of all dependent components run as well, to make sure nothing got broken due to that change.  
  Use the `bit status` command to check the expected ripple effect of modifying a component.

  For example:

```
modified components
(use "bit tag --all [version]" to lock a version with all your changes)
(use "bit diff" to compare changes)

     > ui/elements/button ... ok

components pending to be tagged automatically (when their dependencies are tagged)
     > ui/widgets/login-form ... ok
```

## Customize the Tester

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

