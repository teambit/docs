---
id: extending-react
title: Extending React
---

Use the React environment extension API to create your own customized environment extension. The extension component can then be exported to a remote scope to make it available for reuse by other workspaces. Doing so is not only a way to save time (otherwise lost on setting up a dev environment) but also a way to maintain a consistent development environment for independent React components authored in various decoupled workspaces.

__To learn how to create a new environment extension, [see here](/docs/environments/build-environment).__
## Environment transformers
React's environment transformers enable merging new configurations for the different [Bit aspects used by the React environment](/docs/environments/environment-services).

The process of 'merging' or 'overriding' adds new properties to the existing configurations. In case of a conflict between two properties, the extension's configurations will override the extended environment's defaults.
### overrideTsConfig
```ts
overrideTsConfig(tsconfig: TsConfigSourceFile): EnvTransformer
```
This method overrides the default TypeScript configuration JSON ([tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)) using the configuration JSON it .

### overridePreviewConfig
```ts
overridePreviewConfig(config: Configuration): EnvTransformer
```
This method receives a Webpack configuration JSON ([webpack.config](https://webpack.js.org/configuration/)) as a parameter. It overrides the Webpack configurations for components rendered in the workspace UI (these are components that are managed by the workspace).

### overrideDevServerConfig
```ts
overrideDevServerConfig(config: Configuration): EnvTransformer
```
This method receives a Webpack configuration JSON ([webpack.config](https://webpack.js.org/configuration/)) as a parameter. It overrides the Webpack configurations for the overview section in the workspace UI (that does not include the rendering of components managed by the workspace)

### overrideJestConfig
```ts
overrideJestConfig(jestConfigPath: string): EnvTransformer
```
This method receives a relative path (as a string) to a Jest configuration file ([jest.config](https://jestjs.io/docs/en/configuration)). It overrides the default configurations for the Jest test runner.

### overrideBuildPipe
```ts
overrideBuildPipe(tasks: BuildTask[]): EnvTransformer
```
This method receives an array of Bit tasks. It overrides the build pipeline of a component (initiated either on a `bbit tag` or `bbit build` command). To create your own Build Task, [see here](/docs/build-pipeline/create-build-task).

### overrideDependencies
```ts
overrideDependencies(dependencyPolicy: DependenciesPolicy): EnvTransformer
```
This method receives a Bit dependency-policy JSON. It overrides the default dependency policy for each component.

Each key-value pair in a dependency-policy JSON signifies the package and the version to be used. It also uses the '-' notation to signify a module should not be defined as a dependency of a certain type (dev, peer or standard)

For example:

```json
{
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
```

### overridePackageJsonProps
```ts
ReactMain.overridePackageJsonProps(props: PackageJsonProps): EnvTransformer
```

### Dev files