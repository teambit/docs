---
id: customizing-react-env
title: Customizing the React Env
---

## Using your own React env extension
### 1. Create a React env extension

The first step is to create a component that extends React. Use the `react-env` template from React env.

```sh
bit create react-env extensions/custom-react
```

### 2. Set the React extension to use the Aspect Env
As with any component, Envs also need a development environment. Bit has a special environment for Envs: `teambit.harmony/aspect`.

Set the newly created React env extension to use the `teambit.harmony/aspect` Env.

```json title="add variant for the extension and set the aspect env"
{
  //...
  "teambit.workspace/variants": {
    //...
    "extensions/custom-react": {
      "teambit.harmony/aspect": {}
    }
    //...
  }
}
```

Validate the above by running `bit env` and see that the extension-component has `teambit.harmony/aspect` set as its environment.

### 3. Set components to use the React env extension
Now that you have a basic customized extension to start from, you can go ahead and configure it for your components in `workspace.json`:

```json title="edit variants and set the new env"
{
  //...
  "teambit.workspace/variants": {
    //...
    "[some]/[variant]": {
      "[yourscope]/extensions/custom-react": {}
    }
    //...
  }
}
```


## Customizing configs and services

### Overview

The React env offers an API that enables you to extend it, in two ways:

1. You can merge new configs with React's default configs. For example, merge React's default `tsconfig.json` with your own `tsconfig.json` file. The merging process adds new properties and overrides existing ones.

2. You can replace the default Aspect used to implement each service. For example, choose the 'Babel' Aspect for compilation, instead of the default 'TypeScript' Aspect.

### Override TS config for workspace compilation

`overrideTsConfig(tsconfig: TsConfigSourceFile): EnvTransformer`

Merges the environment's default TypeScript configuration with the contents of your [typescript configuration file](https://www.typescriptlang.org/handbook/tsconfig-json.html).
This config affects the transpilation carried out when rendering components on the local dev UI. To override the config used when building components, use `overrideBuildTsConfig` below.

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

### Override TS config for build compilation

`overrideBuildTsConfig(tsconfig: TsConfigSourceFile): EnvTransformer`

Merges the environment's default TypeScript configuration with the contents of your [typescript configuration file](https://www.typescriptlang.org/handbook/tsconfig-json.html).
This config affects transpilation of component code during the build process, i.e. in preparation for packaging and exporting the component. To override the local ts config used when rendering components in the local UI, please use `overrideTsConfig` above.

```ts
// ...
const tsconfig = require('./typescript/tsconfig.json');
export class ReactExtension {
// ...

  static async provider([envs, react]: [EnvsMain, ReactMain]) {
    const newReactEnv = react.compose([
      react.overrideBuildTsConfig(tsconfig)
    ]);
}
// ...
```

### Override Webpack config for versioned docs and compositions

`overridePreviewConfig(config: Configuration): EnvTransformer`

Merges the Webpack configuration for the 'Preview' environment service, with the contents of your [webpack configuration file](https://webpack.js.org/configuration/).
This webpack configuration is used for building and rendering your components for production (during `bit tag` or `bit build`).

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

### Override Webpack config for docs and compositions in development

`overrideDevServerConfig(config: Configuration): EnvTransformer`

Merges the Webpack configuration for the 'DevServer' environment service, with the contents of your [webpack configuration file](https://webpack.js.org/configuration/).
This configuration is used for building and rendering your components in the local dev server.

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

### Override Jest config

`overrideJestConfig(jestConfigPath: string): EnvTransformer`

Merges the default configuration for the Jest test runner with the contents of your ([jest.config configuration file](https://jestjs.io/en/configuration)).

```ts
// ...
const jestConfig = require.resolve('./jest/jest.config');
export class ReactExtension {
// ...
  static async provider([envs, react]: [EnvsMain, ReactMain]) {
    const newReactEnv = react.compose([
      react.overrideJestConfig(jestConfig)
    ]);
}
// ...
```

### Customize the build pipeline

`overrideBuildPipe(tasks: BuildTask[]): EnvTransformer`

This method receives an array of build tasks. It merges the provided tasks with the environment's default build pipeline (initiated either on a `bit tag` or `bit build` command).

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

### Override Env dependencies
 
`overrideDependencies(dependencyPolicy: DependenciesPolicy): EnvTransformer`

This method receives a dependency-policy object and merges it with the environment's default dependency policy for components using this environment.
Each key-value pair in a dependency-policy object signifies the package and the version to be used. Use also the `-` and `+` notation to signify a module should moved between dependency types (dev, peer or standard).

```ts
// ...
const newDependencies = {
  dependencies: {
    react: '-'
  },
  devDependencies: {
    '@types/jest': '~26.0.9'
  },
  peerDependencies: {
    react: '^17.0.2'
  }
};

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

> The above example shows the 'React' library being removed as a (runtime) dependency and added as a peer dependency.

### Override default package.json properties

`overridePackageJsonProps(props: PackageJsonProps): EnvTransformer`

Merges the provide props with the default properties added to the `package.json` file of every package generated from components using this environment.

```ts
// ...
const newPackageProps = {
  main: 'dist/{main}.js',
  types: '{main}.ts'
};

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

## Customizing the composition context


The React environment is able to "wrap" component compositions with an array of providers, each of which is simply a component which wraps its `children` with functionality, such as a context, styling, theme, etc.

When Bit renders your component compositions and previews, it wraps each one with with the providers you configure.
These providers can be used to render compositions with a theme or a react context such as an api context.

These provider components are registered using the `registerProvider`.

:::info
Providers are added by Bit to the component compositions and documentation bundle that is served by the environment's server and rendered by the browser.
As such, they run in the environment's Preview runtime and not the Main runtime.
:::

For example, a provider that centers compositions in their rendering page, will look like this:

```tsx title="A composition provider example"
import React, { ReactReact, ReactElement } from 'react'

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
}

export const Center = ({
  children
}: {
  children: ReactReact
}): ReactElement => {
  return <div style={style}>{children}</div>
}
```

This `Center` provider component will be registered using the registerProvider method in the React extension's `*.preview.runtime.tsx` file:

```tsx title="react-with-providers.preview.runtime.tsx"
import { PreviewRuntime } from '@teambit/preview'
import { ReactAspect, ReactPreview } from '@teambit/react'
import { ReactWithProvidersAspect } from './react-with-providers.aspect'
import { Center } from './composition-providers/center'

export class ReactWithProvidersPreview {
  static runtime = PreviewRuntime
  static dependencies = [ReactAspect]

  static async provider([react]: [ReactPreview]) {
    react.registerProvider([Center])

    return ReactWithProvidersPreview
  }
}

ReactWithProvidersAspect.addRuntime(ReactWithProvidersPreview)
```

> See the full demo project [here](https://github.com/teambit/react-env-with-providers)