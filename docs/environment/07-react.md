---
id: react
title: React
---

React is an implementation of the Environments aspect. It is a one-stop-shop for React components in a Bit workspace. It uses various services, provided by other aspects, to handle the life events of React components, managed by Bit. Among these events are: linting, compiling, testing, bundling and more.

The React aspect spares you the overhead of setting up your own React environment and creates a standardized and shareable development environment for you and your team.

## React's default setup

- Test runner: Jest
- Compiler: TypeScript
- Bundler: Webpack: configured to support JSX/TSX, SASS/CSS (incl. CSS modules)

## Workspace configurations

The React aspect can be configured via the workspace.json, on two levels:

1. __root__ sets the default configurations for the entire workspace
2. __teambit.bit/variants__ sets the configurations to a limited set of components, selected by their common directory


```json
{
  'teambit.bit/workspace': {
    name: 'a-ws-using-react',
    icon: 'https://domain.com/my-ws-icon.svg',
    defaultScope: 'my-org.my-scope',
  },
  'teambit.bit/react': {
    compiler: 'babel',
    tester: 'mocha',
    reactVersion: '^16.13.1',
  },
  'teambit.bit/variants': {
    'components/react/ui-primitives': {
      'teambit.bit/react': {
        compiler: 'ts',
        tester: 'jest',
      },
    },
  },
  'teambit.bit/dependency-resolver': {
    packageManager: 'teambit.bit/pnpm',
    policy: {
      peerDependencies: {
        react: '^16.13.1',
        '@babel/runtime': '^7.11.2',
        'react-dom': '^16.13.1',
      },
    },
  },
};
```


## Creating a Custom React Environment

You can use your own customized React environment by creating an extension component and setting your workspace to use it (using its component ID).

### Example
We'll start by creating the necessary files for an extension component.

```bash
$ mkdir -p extensions/custom-react
$ touch extensions/custom-react/custom-react.extension.ts
$ touch extensions/custom-react/index.ts
```

We'll then add the necessary boilerplate for a React extension
<!--DOCUSAURUS_CODE_TABS-->
<!--custom-react.extension-->
```tsx
// Import from the Environments aspect to register this extension as an environment
import { EnvsMain, EnvsAspect } from '@teambit/environments';
// Import from the React aspect to extend it
import { ReactAspect, ReactMain } from '@teambit/react';

export class CustomReactExtension {
  constructor(private react: ReactMain) {}

  // This icon will be shown in the Workspace UI navigation for every component using this extension 
  icon() {
    return this.react.icon;
  }

  // Set the necessary dependencies to be injected (by Harmony) in the following 'provider' function
  static dependencies: any = [EnvsAspect, ReactAspect];

  static async provider([envs, react]: [EnvsMain, ReactMain]) {
    const customReactEnv = react.compose([

      // THIS IS WHERE WE PLACE THE RELEVANT OVERRIDE FUNCTIONS

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

We now have a working extension that does not customize the React aspect at all.

To use it in our workspace, we'll first track it and then set it as an environment.

```bash
bit add extensions/custom-react
```

We are now able to use our new component ID to configure our workspace to use it as an environment.

In the workspace.jsonc file:

```json
{
  'teambit.bit/workspace': {
    name: 'a-demo',
    icon: 'https://domain.com/my-ws-icon.svg',
    defaultScope: 'my-org.a-demo',
  },
  'my-org.a-demo/custom-react': {},
  'teambit.bit/dependency-resolver': {
    packageManager: 'teambit.bit/pnpm',
    policy: {
      peerDependencies: {
        react: '^16.13.1',
        '@babel/runtime': '^7.11.2',
        'react-dom': '^16.13.1',
      },
    },
  },
};
```

To customize React, use any of the following override methods inside the array parameter of the compose method.

For example:

```ts
static async provider([envs, react]: [EnvsMain, ReactMain]) {
const harmonyReactEnv = react.compose([
    react.overrideTsConfig(tsconfig),
    react.overrideJestConfig(require.resolve('./jest/jest.config')),
    react.overrideDevServerConfig(webpackConfig)
]);
```
> The override methods will extend React's default configuration files with the new configuration files they receive. In case of a conflict between the default and the new configuration, the former will be overridden by the latter.

### Available Override Methods

#### overrideTsConfig
```ts
ReactMain.overrideTsConfig(tsconfig: TsConfigSourceFile): EnvTransformer
```
This method overrides the default TypeScript configuration JSON ([tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)) using the configuration JSON it .

#### overridePreviewConfig
```ts
ReactMain.overridePreviewConfig(config: Configuration): EnvTransformer
```
This method receives a Webpack configuration JSON ([webpack.config](https://webpack.js.org/configuration/)) as a parameter. It overrides the Webpack configurations for components rendered in the workspace UI (these are components that are managed by the workspace).

#### overrideDevServerConfig
```ts
ReactMain.overrideDevServerConfig(config: Configuration): EnvTransformer
```
This method receives a Webpack configuration JSON ([webpack.config](https://webpack.js.org/configuration/)) as a parameter. It overrides the Webpack configurations for the overview section in the workspace UI (that does not include the rendering of components managed by the workspace)

#### overrideJestConfig
```ts
ReactMain.overrideJestConfig(jestConfigPath: string): EnvTransformer
```
This method receives a relative path (as a string) to a Jest configuration file ([jest.config](https://jestjs.io/docs/en/configuration)). It overrides the default configurations for the Jest test runner.

#### overrideBuildPipe
```ts
ReactMain.overrideBuildPipe(tasks: BuildTask[]): EnvTransformer
```
This method receives an array of Bit tasks. It  overrides the build pipeline of a component (initiated on a `bbit tag` command).

#### overrideDependencies
```ts
ReactMain.overrideDependencies(dependencyPolicy: DependenciesPolicy): EnvTransformer
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

#### overridePackageJsonProps
```ts
ReactMain.overridePackageJsonProps(props: PackageJsonProps): EnvTransformer
```