---
id: react-native
title: React Native
---

The React Native environment is an implementation of the Environments aspect. It is a one-stop-shop for React components in a Bit workspace. It uses various services, provided by other aspects, to handle the life events of React components, managed in a Bit workspace.

The React Native environment spares you the overhead of setting up your own React environment and creates a standardized and shareable development environment for you and your team.



## Default configurations

### Tester
* Uses Jest as a test runner
* Test files: `*.spec.*` and `*.test.*`

### Compiler
TypeScript for `*.ts`, `*.js`, `*.jsx`, `*.tsx`

### Bundler (for 'Preview' and 'DevServer')
Uses Webpack. 

Includes the following file types:

`*.web.mjs`, `*.mjs`, `*.js`, `*.ts`, `*.tsx`, `*.jsx`, `*.mdx`, `*.md`, `*.(module.)css`, `*.(module.)scss`, `*.(module.)sass`, `*.(module.)less`

### Default dependencies (for components handled by the environment)

```js
{
    dependencies: {
      react: '-',
      'react-native': '-',
    },
    devDependencies: {
      '@types/react-native': '^0.63.2',
      '@types/jest': '~26.0.9',
      '@types/mocha': '-',
    },
    peerDependencies: {
      react: '^16.13.1',
      'react-native': '^0.63.3',
    },
  };

```
> The `-` sign indicates a dependency is removed by the environment. 'react' is configured as a peer dependency instead of a (runtime) dependency. 

### Development files
The React environment treats the following files as development files: `*.doc.*`, `*.spec.*`, `*.test.*`, `*.composition.*`, `*.compositions.*`.

Dependencies of development files will be recognized and registered as development dependencies (`devDependencies`).

## Using React Native

To use the React Native environment, set it in the `workspace.jsonc` configuration file. React Native can only be configured using the 'variants' config API.

## Apply React Native on a group of components

The example below shows React Native being applied on all components in the workspace, using the wildcard character `*`. To use React Native on a more limited set of components, [see here](/building-with-bit/workspace)

```json
{
  "teambit.workspace/workspace": {
    "name": "react-native-design-system",
    "icon": "https://image.flaticon.com/icons/svg/185/185034.svg"
  },
  "teambit.workspace/variants": {
    "*": {
      "teambit.react-native/react-native": {}
    }
  }
}
```

## Extending React Native

Use the React Native environment extension API to create your own customized environment extension. The extension component can then be exported to a remote scope to make it available for reuse by other workspaces. Doing so is not only a way to save time (otherwise lost on setting up a dev environment) but also a way to maintain a consistent development environment for independent React Native components authored in various decoupled workspaces.

This page lists React Native's Environment Transformers. These are the 'override' methods that allow to add or override React Native's default configurations.
**To learn how to create a new environment extension, [see here](/building-with-bit/environments).**

## Environment transformers

React Native's environment transformers enable merging new configurations for different [Bit aspects used by the React Native environment](/building-with-bit/environments).

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

export class ReactNativeExtension {

// ...

  static async provider([envs, reactNative]: [EnvsMain, ReactNativeMain]) {
    const newReactNative = reactNative.compose([
      reactNative.overrideTsConfig(tsconfig)
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

export class ReactNativeExtension {

// ...

  static async provider([envs, reactNative]: [EnvsMain, ReactNativeMain]) {
    const newReactNative = reactNative.compose([
      React Native.overridePreviewConfig(webpackConfig)
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

export class ReactNativeExtension {

// ...

  static async provider([envs, reactNative]: [EnvsMain, ReactNativeMain]) {
    const newReactNative = reactNative.compose([
      reactNative.overrideDevServerConfig(webpackConfig)
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

export class ReactNativeExtension {

// ...

  static async provider([envs, reactNative]: [EnvsMain, ReactNativeMain]) {
    const newReactNative = reactNative.compose([
      reactNative.overrideJestConfig(require.resolve('./jest/jest.config'))
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

export class CustomReact Native {

  // ...

  static async provider([envs, reactNative]: [EnvsMain, ReactNativeMain]) {

    // Get the environment's default build pipeline using the 'getBuildPipe' service handler
    const ReactNativePipe = reactNative.env.getBuildPipe();

    // Add the custom task to the end of the build tasks sequence.
    const tasks = [...ReactNativePipe, new CustomTask()];

    const newReactNative = reactNative.compose([
      reactNative.overrideBuildPipe(tasks)
    ]);

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
      'react-native': '-',
    },
    devDependencies: {
      '@types/react-native': '^0.63.2',
      '@types/jest': '~26.0.9',
      '@types/mocha': '-',
    },
    peerDependencies: {
      react: '^16.13.1',
      'react-native': '^0.63.3',
    },
  };
}

export class CustomReactNative {

  // ...

  static async provider([envs, reactNative]: [EnvsMain, ReactNativeMain]) {

    const newReactNative = React Native.compose([
      reactNative.overrideDependencies(newDependencies)
    ]);

    // ...

  }
}
```

> The above example shows the 'react-native' library being removed as a (runtime) dependency and added as a peer dependency.

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

export class CustomReactNative {
  // ...

  static async provider([envs, reactNative]: [EnvsMain, ReactNativeMain]) {
    const newReactNative = reactNative.compose([
      reactNative.overridePackageJsonProps(newPackageProps),
    ]);

    // ...
  }
}
```
