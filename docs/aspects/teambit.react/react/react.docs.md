---
id: react
title: React
slug: /aspects/react
description: A Bit development environment for React Components
labels: ['react', 'environment', 'env', 'aspect', 'extension']
---

The built-in React Component Development Environment is a concrete composition of the [Env Aspect](/aspects/envs). It compose different tools and configs that fit practices implemented in [Create React App](https://create-react-app.dev). Use it when getting started with React components with Bit and later as a base for any future customization of your React-based workflow.

## Use React environment

To use this environment for your components, add it to any of the `variants` in your `workspace.jsonc` file as follows:

```json title="workspace.jsonc"
{
  "teambit.workspace/variants": {
    "[some]/[path]": {
      "teambit.react/react": {}
    }
  }
}
```

## Create React components

React implements several component templates:

* `react-component` a bsaic React UI component.
* `react-hook` a basic React Hook component.
* `react-extension` boilerplate for customizing configuration.

Use any of these templates with the `bit create` command:

```sh
bit create <template name> [components...]
```

## Runtime (framework) dependencies

Similar to many Frontend frameworks React must have a singleton instance in your app's runtime. When building reuseable components we need to adhere to that and have `react` and `react-dom` set as `peerDependencies`, thus allowing the consuming app to determine runtime version. React environment implements this via the **Dependencies** service which is used to override [dependency-resolver](/aspects/dependency-resolver) and set your prefered dependencies.  
It is recomended to for you to extend the base React environment and define a semantic version rule to fit your current techstack and guidelines for reuseable React components.

## Default Configuration and Services

React, like all over Environments must implement a set of Service Handlers. For each service, React compose a different tool and config by default.

| Service     | Aspect     | Base Configuration  |
| ----------- | ------------- | ----- |
| Compilation | [TypeScript](/aspects/typescript) | [tsconfig.json](https://bit.dev/teambit/react/react/~code/typescript/tsconfig.json) |
| Testing | **Jest** | [jest.config.js](https://bit.dev/teambit/react/react/~code/jest/jest.config.js) |
| Linting | **ESLint** | [eslintrc.js](https://bit.dev/teambit/react/react/~code/eslint/eslintrc.js) |
| DevServer | **Webpack** | [webpack.config.preview.dev.ts](https://bit.dev/teambit/react/react/~code/webpack/webpack.config.preview.dev.ts) |
| Preview (simulation) | **Webpack** | [webpack.config.preview.ts](https://bit.dev/teambit/react/react/~code/webpack/webpack.config.preview.ts) |
| Package | **PKG** | Base `package.json` props from [TypeScript Aspect](https://bit.dev/teambit/typescript/typescript/~code/typescript.main.runtime.ts) |
| Bundling | **Webpack** | [webpack.config.preview.ts](https://bit.dev/teambit/react/react/~code/webpack/webpack.config.preview.ts) |
| Documentation | *Core implementation* | [Docs template](https://bit.dev/teambit/react/react/~code/docs/index.tsx) |
| Build pipeline | [Builder](aspects/builder) | [Build pipeline](https://bit.dev/teambit/react/react/~code/react.env.ts) |
| Dependencies | *Core implementation*| [Env-dependencies](https://bit.dev/teambit/react/react/~code/react.env.ts) |

### Additional services

Each environment may compose additional services as needed to improve developer experience. React environment is no different and allows for the following features:

| Service     | Aspect     | Base Configuration  |
| ----------- | ------------- | ----- |
| Component Generator | [Generator](/aspects/generator) | [example template](https://bit.dev/teambit/react/react/~code/templates/react-component.ts) |

### Customizing configuration

To simplify the process of extending the base React environment we implemented a template for you to start with.  
This creates a base mock for a customized extension where you can quickly override any of the default configurations for the composed tools and compose different aspects to replace any of the base tools.

#### Create an extension

```shell
bit create react-extension my-react-extension
```

This template comprise of several files. In this case our main focus will be the file ends with `*.extension.ts`. It may look similar to this snippet:

```typescript title="my-react-extension.extension.ts"
import { EnvsMain, EnvsAspect } from '@teambit/envs'
import { ReactAspect, ReactMain } from '@teambit/react'

export class MyReactExtension {
  constructor(private react: ReactMain) {}

  static dependencies: any = [EnvsAspect, ReactAspect]

  static async provider([envs, react]: [EnvsMain, ReactMain]) {
    const myReactEnv = react.compose([
      /*
        Environment customization and trnaformation code goes here
      */
    ])

    envs.registerEnv(myReactEnv)

    return new MyReactExtension(react)
  }
}
```

#### Using Transformers to customize configuration

Similar to all Environments, React implements a set of APIs you can use to merge you prefered configuration with its defaults. In case of a conflict, your config will override the default.  
These APIs are called **transformers** and they all start with the `override` pre-fix. [Available transformers](#transformers-api-docs).

To override any specific configuraiton it's recommended to create a config file for the specific tool and import it to any of the **transformers**. For example:

```typescript {4,13} title="Customized TypeScript configuration"
import { EnvsMain, EnvsAspect } from '@teambit/envs'
import { ReactAspect, ReactMain } from '@teambit/react'

const tsconfig = require('./typescript/tsconfig.json');

export class MyReactExtension {
  constructor(private react: ReactMain) {}

  static dependencies: any = [EnvsAspect, ReactAspect]

  static async provider([envs, react]: [EnvsMain, ReactMain]) {
    const myReactEnv = react.compose([
      react.overrideTsConfig(tsconfig),
    ])

    envs.registerEnv(myReactEnv)

    return new MyReactExtension(react)
  }
}
```

We urge you to explore the different `override` transformers to define your base configuration for your needs.

## Composition Providers

The React environment "wraps" every composition with an array of providers.
These providers can be used to render compositions in a common context such as a theme or data that needs to be globally available.

A Provider is any React component that accepts compositions as children. This component is registered using the `registerProvider`.

:::info
Providers are part of the component compositions and documentation bundle that is served by the environment's server and rendered by the browser.
As such, they run in the environment's Preview runtime and not the Main runtime.
:::

For example, a provider that centers compositions in their rendering page, will look like so:

```tsx title="A composition provider example"
import React, { ReactReact, ReactElement } from 'react'

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
}

export const Center = ({ children }: { children: ReactReact }): ReactElement => {
  return <div style={style}>{children}</div>
}
```

This provider will be registered using the registerProvider method in the React extension `*.preview.runtime.tsx` file:

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

> See the full demo project [here](https://github.com/teambit/react-env-with-providers).

## Transformers API docs

Use these APIs to customize React environment default configuration with your extention. [React more here](#customizing-configuration).
#### `overrideTsConfig(tsconfig: TsConfigSourceFile): EnvTransformer`

Merge the environment's default TypeScript configurations with a new ([tsconfig.json](https://www.typescriptlang.org/handbook/tsconfig-json.html)) configuration file.

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

#### `overridePreviewConfig(config: Configuration): EnvTransformer`

Merge the Webpack configurations for the 'Preview' environment service, with a new ([webpack.config.js](https://webpack.js.org/configuration/)) configuration file.

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

#### `overrideDevServerConfig(config: Configuration): EnvTransformer`

Merge the Webpack configurations for the 'DevServer' environment service, with a new ([webpack.config.js](https://webpack.js.org/configuration/)) configuration file.

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

#### `overrideJestConfig(jestConfigPath: string): EnvTransformer`

This method receives a path (as a string) to a configuration file . Overrides the default configurations for the Jest test runner with a new ([jest.config](https://jestjs.io/en/configuration)) configuration file. This is done by passing the _path_ to the file as an argument.

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

#### `overrideBuildPipe(tasks: BuildTask[]): EnvTransformer`

This method receives an array of Bit tasks. It overrides the build pipeline of a component (initiated either on a `bit tag` or `bit build` command).

```ts
// ...
// Import the task
import { CustomTask } from './custom.task'
export class CustomReact {
  // ...
  static async provider([envs, react]: [EnvsMain, ReactMain]) {
    // Get the environment's default build pipeline using the 'getBuildPipe' service handler
    const reactPipe = react.env.getBuildPipe()
    // Add the custom task to the end of the build tasks sequence.
    const tasks = [...reactPipe, new CustomTask()]
    const newReactEnv = react.compose([react.overrideBuildPipe(tasks)])
    // ...
  }
}
```

#### `overrideDependencies(dependencyPolicy: DependenciesPolicy): EnvTransformer`

This method receives a Bit dependency-policy object. It overrides the default dependency policy for components using this environment.  
Each key-value pair in a dependency-policy object signifies the package and the version to be used. It also uses the `-` notation to signify a module should not be defined as a dependency of a certain type (dev, peer or standard).

```js
// ...
const newDependencies = {
  devDependencies: {
    '@types/jest': '~26.0.9'
  }
}

export class CustomReact {
  // ...
  static async provider([envs, react]: [EnvsMain, ReactMain]) {
    const newReactEnv = react.compose([
      react.overrideDependencies(newDependencies)
    ])
    // ...
  }
}
```

> The above example shows the 'React' library being removed as a (runtime) dependency and added as a peer dependency.

#### `overridePackageJsonProps(props: PackageJsonProps): EnvTransformer`

Overrides the default properties added to the `package.json` file of every package generated from components using this environment.

```ts
// ...
const newPackageProps = {
  main: 'dist/{main}.js',
  types: '{main}.ts'
}

export class CustomReact {
  // ...
  static async provider([envs, react]: [EnvsMain, ReactMain]) {
    const newReactEnv = react.compose([
      react.overridePackageJsonProps(newPackageProps)
    ])
    // ...
  }
}
```
