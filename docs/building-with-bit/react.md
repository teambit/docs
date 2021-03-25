---
id: react
title: React
---

The React environment is an implementation of the Environments aspect. It is a one-stop-shop for React components in a Bit workspace. It uses various services, provided by other aspects, to handle the life events of React components, managed in a Bit workspace. Think of it as a 'create-react-app' for independent React components.

The React environment spares you the overhead of setting up your own React environment and creates a standardized and shareable development environment for you and your team.

## Default configurations

### Tester

- Uses Jest as a test runner
- Test files: `*.spec.*` and `*.test.*`
- `@testing-library/react` pre-configured

### Compiler

- Uses two compilers:
  - TypeScript for `*.ts`, `*.js`, `*.jsx`, `*.tsx`
  - Babel (with MDX-loader) for `*.md`, `*.mdx`

### Bundler (for 'Preview' and 'DevServer')

Uses Webpack.

Includes the following file types:

`*.web.mjs`, `*.mjs`, `*.js`, `*.ts`, `*.tsx`, `*.jsx`, `*.mdx`, `*.md`, `*.(module.)css`, `*.(module.)scss`, `*.(module.)sass`, `*.(module.)less`

### Default dependencies (for components handled by the environment)

```js
{
      dependencies: {
        react: '-',
        'core-js': '3.8.3',
      },
      devDependencies: {
        '@types/node': '12.20.4',
        '@types/react': '16.9.43',
        '@types/jest': '26.0.20',
        '@types/mocha': '-',
        '@types/react-router-dom': '5.1.7',
        '@babel/runtime': '7.12.18',
      },
      peerDependencies: {
        react: '16.13.1',
        'react-dom': '16.13.1',
      },
};

```

> The `-` sign indicates a dependency is removed by the environment. 'react' is configured as a peer dependency instead of a (runtime) dependency.

### Development files

The React environment treats the following files as development files: `*.doc.*`, `*.spec.*`, `*.test.*`, `*.composition.*`, `*.compositions.*`.

Dependencies of development files will be recognized and registered as development dependencies (`devDependencies`).

## Using React

To use the React environment, set it in the `workspace.jsonc` configuration file. React can only be configured using the 'variants' config API.

### Use React as the default environment

Apply the React environment on all components in the workspace, using the wildcard character `*`.

```json title="workspace.jsonc"
{
  "teambit.workspace/variants": {
    "*": {
      "teambit.react/react": {}
    }
  }
}
```

### Use React on a specific group of components

Apply the React environment on a limited set of components. For example, all components inside the components/react-ui directory.

```json title="workspace.jsonc"
{
  "teambit.workspace/variants": {
    "components/react-ui": {
      "teambit.react/react": {}
    }
  }
}
```

- Learn more about configuring a selected set of components, [here](/building-with-bit/workspace).


## Extending React

Use the React environment extension API to create your own customized environment extension. The extension component can then be exported to a remote scope to make it available for reuse by other workspaces. Doing so is not only a way to save time (otherwise lost on setting up a dev environment) but also a way to maintain a consistent development environment for independent React components authored in various decoupled workspaces.

This page lists React's Environment Transformers. These are the 'override' methods that allow to add or override React's default configurations.
**To learn how to create a new environment extension, [see here](/building-with-bit/environments).**

## Environment transformers

React's environment transformers enable merging new configurations for different [Bit aspects used by the React environment](/building-with-bit/environments).

The process of 'merging' or 'overriding' adds new properties to the existing configurations. In case of a conflict between two properties, the extension's configurations will override the extended environment's defaults.

### overrideTsConfig

```ts
overrideTsConfig(tsconfig: TsConfigSourceFile): EnvTransformer
```

Overrides the environment's default TypeScript configurations with a new ([tsconfig.json](https://www.typescriptlang.org/handbook/tsconfig-json.html)) configuration file.

For example:

```ts
// ...

const tsconfig = require('./typescript/tsconfig.json');

export class ReactExtension {

// ...

  static async provider([envs, react]: [EnvsMain, ReactMain]) {
    const newReactEnv = react.compose([
      react.overrideTsConfig(tsconfig)
    ]);


}

// ...
```

### overridePreviewConfig

```ts
overridePreviewConfig(config: Configuration): EnvTransformer
```

Overrides the Webpack configurations for the [Preview](/building-with-bit/environments#preview) environment service, with a new ([webpack.config.js](https://webpack.js.org/configuration/)) configuration file.

For example:

```ts
// ...

const webpackConfig = require('./webpack/webpack.config');

export class ReactExtension {

// ...

  static async provider([envs, react]: [EnvsMain, ReactMain]) {
    const newReactEnv = react.compose([
      react.overridePreviewConfig(webpackConfig)
    ]);


}

// ...
```

### overrideDevServerConfig

```ts
overrideDevServerConfig(config: Configuration): EnvTransformer
```

Overrides the Webpack configurations for the [DevServer](/building-with-bit/environments#devserver) environment service, with a new ([webpack.config.js](https://webpack.js.org/configuration/)) configuration file.

For example:

```ts
// ...

const webpackConfig = require('./webpack/webpack.config');

export class ReactExtension {

// ...

  static async provider([envs, react]: [EnvsMain, ReactMain]) {
    const newReactEnv = react.compose([
      react.overrideDevServerConfig(webpackConfig)
    ]);


}

// ...
```

### overrideJestConfig

```ts
overrideJestConfig(jestConfigPath: string): EnvTransformer
```

This method receives a path (as a string) to a configuration file . Overrides the default configurations for the Jest test runner with a new ([jest.config](https://jestjs.io/en/configuration)) configuration file. This is done by passing the _path_ to the file as an argument.

For example:

```ts
// ...

export class ReactExtension {

// ...

  static async provider([envs, react]: [EnvsMain, ReactMain]) {
    const newReactEnv = react.compose([
      react.overrideJestConfig(require.resolve('./jest/jest.config'))
    ]);


}

// ...
```

### overrideBuildPipe

```ts
overrideBuildPipe(tasks: BuildTask[]): EnvTransformer
```

This method receives an array of Bit tasks. It overrides the build pipeline of a component (initiated either on a `bit tag` or `bit build` command). To create your own Build Task, [see here](/building-with-bit/build-pipeline).

For example:

```ts
// ...

// Import the task
import { CustomTask } from './custom.task';

export class CustomReact {
  // ...

  static async provider([envs, react]: [EnvsMain, ReactMain]) {
    // Get the environment's default build pipeline using the 'getBuildPipe' service handler
    const reactPipe = react.env.getBuildPipe();

    // Add the custom task to the end of the build tasks sequence.
    const tasks = [...reactPipe, new CustomTask()];

    const newReactEnv = react.compose([react.overrideBuildPipe(tasks)]);

    // ...
  }
}
```

### overrideDependencies

```ts
overrideDependencies(dependencyPolicy: DependenciesPolicy): EnvTransformer
```

This method receives a Bit dependency-policy object. It overrides the default dependency policy for components using this environment.

Each key-value pair in a dependency-policy object signifies the package and the version to be used. It also uses the `-` notation to signify a module should not be defined as a dependency of a certain type (dev, peer or standard).

For example:

```js
// ...

const newDependencies = {
      dependencies: {
        react: '-',
      },
      devDependencies: {
        '@types/react': '16.9.43',
        '@types/jest': '~26.0.9',
        '@types/mocha': '-',
        '@types/react-router-dom': '^5.1.5',
      },
      peerDependencies: {
        react: '^16.13.1' || this.config.reactVersion,
        'react-dom': '^16.13.1',
      },
    };
}

export class CustomReact {

  // ...

  static async provider([envs, react]: [EnvsMain, ReactMain]) {

    const newReactEnv = react.compose([
      react.overrideDependencies(newDependencies)
    ]);

    // ...

  }
}
```

:::note removing a dependency
The above example shows the 'react' library being removed as a (runtime) dependency and added as a peer dependency.
:::

#### Handling multiple peer dependencies in a workspace with multiple environments

Peer dependencies assume a single “hosting code”, a single application. A Bit workspace is not a single “host”.
It may create multiple “hosts” as each "application" is generated by a different Bit environment (that's what gives us the freedom to author and explore components of all sorts of types in one single workspace).
That means different "hosts", different environments, may have the same package defined as a peer dependency only with different versions. To prevent such conflicts, set the `resolveFromEnv` property of that dependency as `true`.
This will make sure to install the needed peer dependency in a directory set by the environment. It will then resolve the path to the env's installed package, and create a symlink to it in the `node_modules` directory of each component requiring it (this ensures a single and common instance for all components using that env).
Each component will only use the package relevant to its environment.

For example:

```js
const newDependencies = {
      peerDependencies: {
        'enzyme': {
          version: '^3.11.0',
          resolveFromEnv: true
        }
      },
    };
}
```

### overridePackageJsonProps

```ts
overridePackageJsonProps(props: PackageJsonProps): EnvTransformer
```

Overrides the default properties added to the `package.json` file of every package generated from components using this environment. Learn more about setting package properties [here](/building-with-bit/packages).

For example:

```ts
// ...

const newPackageProps = {
  main: 'dist/{main}.js',
  types: '{main}.ts',
};

export class CustomReact {
  // ...

  static async provider([envs, react]: [EnvsMain, ReactMain]) {
    const newReactEnv = react.compose([
      react.overridePackageJsonProps(newPackageProps),
    ]);

    // ...
  }
}
```

## Composition Providers

The React environment "wraps" every [composition](/building-with-bit/compositions) with an array of providers.
These providers can be used to render compositions in a common context such as a theme or data that needs to be globally available.

A Provider is any React component that accepts compositions as children. This component is registered using the `registerProvider`.

:::info
Providers are part of the component compositions and documentation bundle that is served by the environment's server and rendered by the browser.
As such, they run in the environment's Preview runtime and not the Main runtime. To learn more about runtime environments, [see here](/building-with-bit/environment/create-environments)
:::

For example, a provider that centers compositions in their rendering page, will look like so:

```tsx title="A composition provider example"
import React, { ReactNode, ReactElement } from 'react';

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

export const Center = ({ children }: { children: ReactNode }): ReactElement => {
  return <div style={style}>{children}</div>;
};
```

This provider will be registered using the registerProvider method in the React extension `*.preview.runtime.tsx` file:

```tsx title="react-with-providers.preview.runtime.tsx"
import { PreviewRuntime } from '@teambit/preview';
import { ReactAspect, ReactPreview } from '@teambit/react';
import { ReactWithProvidersAspect } from './react-with-providers.aspect';
import { Center } from './composition-providers/center';

export class ReactWithProvidersPreview {
  static runtime = PreviewRuntime;
  static dependencies = [ReactAspect];

  static async provider([react]: [ReactPreview]) {
    react.registerProvider([Center]);

    return ReactWithProvidersPreview;
  }
}

ReactWithProvidersAspect.addRuntime(ReactWithProvidersPreview);
```

- See the full demo project [here](https://github.com/teambit/react-env-with-providers).

