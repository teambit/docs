---
id: react
title: React
slug: /aspects/react
description: A Bit development environment for React Components
labels: ['react', 'environment', 'env', 'aspect', 'extension']
---

The built-in React Component Development Environment is a concrete composition of the [Env Aspect](/aspects/envs). It compose different tools and configs that fit practices implemented in [Create React App](https://create-react-app.dev). Use it when getting started with React components with Bit and later as a base for any future customization of your React-based workflow.

## Default Environment Services

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

## Runtime (framework) dependencies

Similar to many Frontend frameworks React must have a singleton instance in your app's runtime. When building reuseable components we need to adhere to that and have `react` and `react-dom` set as `peerDependencies`, thus allowing the consuming app to determine runtime version. React environment implements this via the **Dependencies** service which is used to override [dependency-resolver](/aspects/dependency-resolver) and set your prefered dependencies.  
It is recomended to for you to extend the base React environment and define a semantic version rule to fit your current techstack and guidelines for reuseable React components.

## Extending base React environment

To simplify the process of extending the base React environment we implemented a template for you to start with.  
This creates a base mock for a customized extension where you can quickly override any of the default configurations for the composed tools and compose different aspects to replace any of the base tools.

### Generate an extension using a template

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

### Override default configuration

Similar to all Environments, React implements a set of APIs you can use to merge you prefered configuration with its defaults. In case of a conflict, your config will override the default.  
These APIs are called **transformers** and they all start with the `override` pre-fix.

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

### Override base tools

You can choose to compose any Aspect to your customized environment to either replace current composed aspects or add additional functionality.  
For example, this is how you can replace [TypeScript](/aspects/typescript) with [Babel](/aspects/babel).

1. Import the `@teambit.compilation/babel` aspect.
1. Create and import a Babel configuration file.
1. Set `BabelAspect` as an aspect dependency.
1. Create an instance of the compiler.
1. Override compiler using `getCompiler(...)`.

```typescript {3,5,10-14,16-18,20-24,26} title="Replace Typescript-aspect with Babel aspect"
import { EnvsMain, EnvsAspect } from '@teambit/envs'
import { ReactAspect, ReactMain } from '@teambit/react'
import { BabelAspect, BabelMain } from '@teambit.compilation/babel'

const babelConfig = require('./babel/babel.config.json')

export class CustomReactExtension {
   constructor(private react: ReactMain) {}

  static dependencies: any = [EnvsAspect, ReactAspect, BabelAspect]

  static async provider([envs, react, babel]: [
    EnvsMain, ReactMain, BabelMain
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
import React, { ReactNode, ReactElement } from 'react'

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'
}

export const Center = ({ children }: { children: ReactNode }): ReactElement => {
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

- See the full demo project [here](https://github.com/teambit/react-env-with-providers).
