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

- `react-component` a bsaic React UI component.
- `react-hook` a basic React Hook component.
- `react-extension` boilerplate for customizing configuration.

Use any of these templates with the `bit create` command:

```sh
bit create <template name> [components...]
```

## Runtime (framework) dependencies

Similar to many Frontend frameworks React must have a singleton instance in your app's runtime. When building reuseable components we need to adhere to that and have `react` and `react-dom` set as `peerDependencies`, thus allowing the consuming app to determine runtime version. React environment implements this via the **Dependencies** service which is used to override [dependency-resolver](/aspects/dependency-resolver) and set your preferred dependencies.  
It is recommended to for you to extend the base React environment and define a semantic version rule to fit your current tech stack and guidelines for reuseable React components.

## Development services

React, like all over Environments must implement a set of Service Handlers. For each service, React compose a different tool and config by default.

| Service              | Aspect                            | Base Configuration                                                                                                                 |
| -------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Compilation          | [TypeScript](/aspects/typescript) | [tsconfig.json](https://bit.dev/teambit/react/react/~code/typescript/tsconfig.json)                                                |
| Testing              | **Jest**                          | [jest.config.js](https://bit.dev/teambit/react/react/~code/jest/jest.config.js)                                                    |
| Linting              | **ESLint**                        | [eslintrc.js](https://bit.dev/teambit/react/react/~code/eslint/eslintrc.js)                                                        |
| DevServer            | **Webpack**                       | [webpack.config.preview.dev.ts](https://bit.dev/teambit/react/react/~code/webpack/webpack.config.preview.dev.ts)                   |
| Preview (simulation) | **Webpack**                       | [webpack.config.preview.ts](https://bit.dev/teambit/react/react/~code/webpack/webpack.config.preview.ts)                           |
| Package              | **PKG**                           | Base `package.json` props from [TypeScript Aspect](https://bit.dev/teambit/typescript/typescript/~code/typescript.main.runtime.ts) |
| Bundling             | **Webpack**                       | [webpack.config.preview.ts](https://bit.dev/teambit/react/react/~code/webpack/webpack.config.preview.ts)                           |
| Documentation        | _Core implementation_             | [Docs template](https://bit.dev/teambit/react/react/~code/docs/index.tsx)                                                          |
| Build pipeline       | [Builder](/aspects/builder)       | [Build pipeline](https://bit.dev/teambit/react/react/~code/react.env.ts)                                                           |
| Dependencies         | _Core implementation_             | [Env-dependencies](https://bit.dev/teambit/react/react/~code/react.env.ts)                                                         |
| Component Generator  | [Generator](/aspects/generator)   | [example template](https://bit.dev/teambit/react/react/~code/templates/react-component.ts)                                         |

## Customize environment

All environments are extendible. You can take any pre-existing environment, and create a component to extend it. That component can then use APIs to:

- Override default configurations.
- Replace composed tools with others (for example - use Babel instead of TypeScript).
- Add new services and capabilities.

### Create an extension

The first step is to create a component that extends React.

import CreateReactExtension from '@site/docs/components/extensions/create-react-extension.md'

<CreateReactExtension />

### Customize configuration

React implements a set of APIs you can use to merge you preferred configuration with its defaults. These APIs are called **transformers** and they all start with the `override` pre-fix. Find all [Available transformers here](#transformers-api-docs).  
In case of a conflict, your config will override the default.

```typescript {4,13} title="Customized TypeScript configuration"
import { EnvsMain, EnvsAspect } from '@teambit/envs'
import { ReactAspect, ReactMain } from '@teambit/react'

const tsconfig = require('./typescript/tsconfig.json')

export class MyReactExtension {
  constructor(private react: ReactMain) {}

  static dependencies: any = [EnvsAspect, ReactAspect]

  static async provider([envs, react]: [EnvsMain, ReactMain]) {
    const myReactEnv = react.compose([react.overrideTsConfig(tsconfig)])

    envs.registerEnv(myReactEnv)

    return new MyReactExtension(react)
  }
}
```

> To override any specific configuration it's recommended to create a config file for the specific tool and import it to any of the **transformers**.

### Composing tools and services

Environments use Environment Services by implementing a special class of methods called Service Handlers.  
You can override an environment's compiler replacing its Compiler Service Handler with the method `getCompiler()`.  
[Find all service handlers here](#service-providers-api-docs).

The below example uses a Service Handler to change compilation service.

1. Import the Babel extension component to configure it and set it as the new compiler
1. Set the necessary dependencies to be injected (by Bit) into the following 'provider' function
1. Instantiate a new Babel compiler with the 'babelConfig' configurations

```typescript {3,10-12,14-16}
import { EnvsMain, EnvsAspect } from '@teambit/envs'
import { ReactAspect, ReactMain } from '@teambit/react'
import { BabelAspect, BabelMain } from '@teambit.compilation/babel'

const babelConfig = require('./babel-config')

export class CustomReactExtension {
  constructor(private react: ReactMain) {}

  static dependencies: any = [EnvsAspect, ReactAspect, BabelAspect]

  static async provider([envs, react, babel]: [
    EnvsMain,
    ReactMain,
    BabelMain
  ]) {
    const babelCompiler = babel.createCompiler({
      babelTransformOptions: babelConfig
    })

    const compilerOverride = envs.override({
      getCompiler: () => {
        return babelCompiler
      }
    })

    const customReactEnv = react.compose([compilerOverride])
    envs.registerEnv(customReactEnv)
    return new CustomReactExtension(react)
  }
}
```

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

export const Center = ({
  children
}: {
  children: ReactReact
}): ReactElement => {
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

Use these APIs to customize React environment default configuration with your extension. [React more here](#customizing-configuration).

### `overrideTsConfig(tsconfig: TsConfigSourceFile): EnvTransformer`

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

## Service providers API docs

Use these APIs to customize React environment default configuration with your extension. [Read more here](#composing-tools-and-services).

### `getTester(...args : any[]): Tester`

Returns a test runner to be used by the Tester service.

```ts
export class ReactEnv implements Environment {
  constructor(
    // ...

    // The Jest Aspect
    private jestAspect: JestMain
  ) {}
  // ...
  getTester(jestConfigPath: string, jestModule = jest): Tester {
    const jestConfig = require.resolve('./jest/jest.config')
    return this.jestAspect.createTester(jestConfig)
  }
}
```

#### `getCompiler(...args : any[]): Compiler`

Returns a compiler to be used by the Compiler service.

```ts
export class ReactEnv implements Environment {
constructor(
    // ...
    // The TypeScript aspect
    private tsAspect: TypescriptMain
){}
// ...
getCompiler() {
    const tsConfig = require.resolve('./typescript/tsconfig.json')
    return this.tsAspect.createCompiler(tsConfig);
}
```

#### `getLinter(...args : any[]): Linter`

Returns a linter to be used by the Linter service.

```ts
export class ReactEnv implements Environment {
    constructor(){
        // ...
        // The ESLint aspect
        private eslint: ESLintMain
    }
    // ...
    getLinter() {
        const eslintConfig = require.resolve('./eslint/eslintrc')
        return this.eslint.createLinter({
            config: eslintConfig,
            // resolve all plugins from the react environment
            pluginPath: __dirname,
        });
    }
}
```

#### `getDevServer(...args : any[]): DevServer`

Returns a DevServer to be used by the DevServer service. (A DevServer is essentially the combination of the bundler configurations, together with a specified 'listen' port number)

```ts
export class ReactEnv implements Environment {
  constructor(
    // ...
    // The Webpack aspect
    private webpack: WebpackMain
  ) {}
  // ...
  getDevServer(): DevServer {
    const withDocs = Object.assign(context, {
      entry: context.entry.concat([require.resolve('./docs')])
    })
    return this.webpack.createDevServer(withDocs, webpackConfig)
  }
}
```

> The above example runs the dev server with the environment's documentation template.

#### `getDocsTemplate(...args : any[]): string`

Returns the path to the documentation template files, to be used by the Documentation service.

For example (see docs files [here](https://github.com/teambit/bit/tree/master/scopes/react/react/docs)):

```ts
export class ReactEnv implements Environment {
  // ...
  getDocsTemplate() {
    return require.resolve('./docs')
  }
}
```

#### `getPackageJsonProps(...args : any[]): object`

Returns an object that defines the `package.json` properties of the packages generated for components handled by this environment. This configuration is used by the Packager service.

```ts
export class ReactEnv implements Environment {
  // ...
  getPackageJsonProps() {
    return {
      main: 'dist/{main}.js',
      types: '{main}.ts'
    }
  }
}
```

> As with any other 'merging' process, the properties defined in the above returned object will be added to configurations set by Bit.
> Conflicting properties will be overridden by the properties that are set here.
> Configurations that are set here may also be overridden, either by the 'pkg aspect' or by workspace configurations set using the 'variants API'.

#### `getDependencies(component: any): Promise<DependencyList>`

Returns an object that defines the default dependencies for components handled by this environment. The returned object is used by the Dependencies service.

```ts
export class ReactEnv implements Environment {
  // ...
  async getDependencies() {
    return {
      dependencies: {
        react: '-'
      },
      devDependencies: {
        '@types/react': '16.9.43',
        '@types/jest': '~26.0.9'
      },
      peerDependencies: {
        react: '^16.13.1',
        'react-dom': '^16.13.1'
      }
    }
  }
}
```

> As with any other 'merging' process, the properties defined in the above returned object will be added to configurations set by Bit.
> Conflicting properties will be overridden by the properties that are set here.
> Configurations that are set here may also be overridden, either by the 'Dependency Resolver aspect' or by workspace configurations set using the 'variants API'.

#### `getBuildPipe(...args : any[]): BuildTask[]`

Returns an array of build tasks to be used by the Builder service. Tasks will be added after and before Bit's pre-configured build tasks.

```ts
export class ReactEnv implements Environment {
  constructor(
    // ...
    // The Compiler aspect
    private compiler: CompilerMain,
    // The Tester aspect
    private tester: TesterMain
  ) {}
  getBuildPipe(): BuildTask[] {
    return [
      this.compiler.createTask('StencilCompiler', this.getCompiler()),
      this.tester.task
    ]
  }
}
```
