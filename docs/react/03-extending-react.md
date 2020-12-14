---
id: extending-react
title: Extending React
---

Use the React environment extension API to create your own customized environment extension. The extension component can then be exported to a remote scope to make it available for reuse by other workspaces. Doing so is not only a way to save time (otherwise lost on setting up a dev environment) but also a way to maintain a consistent development environment for independent React components authored in various decoupled workspaces.

This page lists React's Environment Transformers. These are the 'override' methods that allow to add or override React's default configurations.
__To learn how to create a new environment extension, [see here](/docs/environments/build-environment).__
## Environment transformers
React's environment transformers enable merging new configurations for different [Bit aspects used by the React environment](/docs/environments/environment-services).

The process of 'merging' or 'overriding' adds new properties to the existing configurations. In case of a conflict between two properties, the extension's configurations will override the extended environment's defaults.
### overrideTsConfig
```ts
overrideTsConfig(tsconfig: TsConfigSourceFile): EnvTransformer
```
Overrides the environment's default TypeScript configurations with a new ([tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)) configuration file.

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
Overrides the Webpack configurations for the [Preview](/docs/environments/environment-services#preview) environment service, with a new ([webpack.config.js](https://webpack.js.org/configuration/)) configuration file.

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
Overrides the Webpack configurations for the [DevServer](/docs/environments/environment-services#devserver) environment service, with a new ([webpack.config.js](https://webpack.js.org/configuration/)) configuration file.

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
This method receives a path (as a string) to a configuration file . Overrides the default configurations for the Jest test runner with a new ([jest.config](https://jestjs.io/docs/en/configuration)) configuration file. This is done by passing the *path* to the file as an argument.

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
This method receives an array of Bit tasks. It overrides the build pipeline of a component (initiated either on a `bbit tag` or `bbit build` command). To create your own Build Task, [see here](/docs/build-pipeline/create-build-task).

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

    const newReactEnv = react.compose([
      react.overrideBuildPipe(tasks)
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
> The above example shows the 'react' library being removed as a (runtime) dependency and added as a peer dependency.
### overridePackageJsonProps
```ts
overridePackageJsonProps(props: PackageJsonProps): EnvTransformer
```
Overrides the default properties added to the `package.json` file of every package generated from components using this environment. Learn more about setting package properties [here](/docs/packages/publish-to-npm#packagejson).

For example:

```ts
// ...

const newPackageProps = {
      main: 'dist/{main}.js',
      types: '{main}.ts',
    }

export class CustomReact {

  // ...
  
  static async provider([envs, react]: [EnvsMain, ReactMain]) {

    const newReactEnv = react.compose([
      react.overridePackageJsonProps(newPackageProps)
    ]);

    // ...
  }
}
```