---
id: node
title: Node
slug: /aspects/node
description: A Bit development environment for Node Components
labels: ['node', 'environment', 'env', 'aspect', 'extension']
---

The built-in Node Component Development Environment is a concrete composition of the [Env Aspect](https://bit.dev/teambit/envs/envs). Use it when getting started with Node components with Bit and later as a base for any future customization of your Node-based workflow.

Node environment is composed out of the base [React Environment](https://bit.dev/teambit/react/react) with some specific overrides for dependency management.

## Use Node environment

To use this environment for your components, add it to any of the `variants` in your `workspace.jsonc` file as follows:

```json title="workspace.jsonc"
{
  "teambit.workspace/variants": {
    "[some]/[path]": {
      "teambit.harmony/node": {}
    }
  }
}
```

## Create Node components

React implements several component templates:

- `node-env` boilerplate for customizing configuration.

Use any of these templates with the `bit create` command:

```sh
bit create <template name> [components...]
```

## Default Configuration and Services

Node, like all over Environments must implement a set of Service Handlers. For each service, Node compose a different tool and config by default.

> Node is a composition of the React environment with some specific modifications. Most of the links here direct to the actual configs in React environment.

| Service              | Aspect                            | Base Configuration                                                                                                                 |
| -------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Compilation          | [TypeScript](https://bit.dev/teambit/typescript/typescript) | [tsconfig.json](https://bit.dev/teambit/react/react/~code/typescript/tsconfig.json)                                                |
| Testing              | **Jest**                          | [jest.config.js](https://bit.dev/teambit/react/react/~code/jest/jest.config.js)                                                    |
| Linting              | **ESLint**                        | [eslintrc.js](https://bit.dev/teambit/react/react/~code/eslint/eslintrc.js)                                                        |
| DevServer            | **Webpack**                       | [webpack.config.preview.dev.ts](https://bit.dev/teambit/react/react/~code/webpack/webpack.config.preview.dev.ts)                   |
| Preview (simulation) | **Webpack**                       | [webpack.config.preview.ts](https://bit.dev/teambit/react/react/~code/webpack/webpack.config.preview.ts)                           |
| Package              | **PKG**                           | Base `package.json` props from [TypeScript Aspect](https://bit.dev/teambit/typescript/typescript/~code/typescript.main.runtime.ts) |
| Bundling             | **Webpack**                       | [webpack.config.preview.ts](https://bit.dev/teambit/react/react/~code/webpack/webpack.config.preview.ts)                           |
| Documentation        | _Core implementation_             | [Docs template](https://bit.dev/teambit/react/react/~code/docs/index.tsx)                                                          |
| Build pipeline       | [Builder](https://bit.dev/teambit/pipelines/builder)        | [Build pipeline](https://bit.dev/teambit/react/react/~code/react.env.ts)                                                           |
| Dependencies         | _Core implementation_             | [Env-dependencies](https://bit.dev/teambit/harmony/node/~code/node.env.ts)                                                         |
| Component Generator  | [Generator](https://bit.dev/teambit/generator/generator)   | [example template](https://bit.dev/harmony/node/~code/templates/node-component.ts)                                                 |

## Customize environment

All environments are extendible. You can take any pre-existing environment, and create a component to extend it. That component can then use APIs to:

- Override default configurations.
- Replace composed tools with others (for example - use Babel instead of TypeScript).
- Add new services and capabilities.

### Create an extension

The first step is to create a component that extends Node. Use the `node-env` template from React env.

```sh
bit create node-env extensions/custom-node
```

After you created your extension you need configure it to be a Bit Aspect. This is because environments are actually aspects that extends Bit's core functionality to support your development workflow. To do this edit your workspace.jsonc and set `teambit.harmony/aspect` as the environment applied on the extension you created:

```json title="add variant for the extension and set the aspect env"
{
  //...
  "teambit.workspace/variants": {
    //...
    "extensions/custom-node": {
      "teambit.harmony/aspect": {}
    },
    //...
  }
}
```

Validate it by running `bit env` and see that the extension-component has `teambit.harmony/aspect` set as an environment.

Now that you have a base extension to start from, you can already go ahead and configure it for your components in `workspace.json`:

```json title="edit variants and set the new env"
{
  //...
  "teambit.workspace/variants": {
    //...
    "[some]/[variant]": {
      "[yourscope]/extensions/custom-node": {}
    },
    //...
  }
}
```

### Customize configuration

React implements a set of APIs you can use to merge you preferred configuration with its defaults. These APIs are called **transformers** and they all start with the `override` pre-fix. Find all [Available transformers here](#transformers-api-docs).  
In case of a conflict, your config will override the default.

```typescript {4,13} title="Customized TypeScript configuration"
import { EnvsMain, EnvsAspect } from '@teambit/envs';
import { NodeAspect, NodeMain } from '@teambit/node';

const tsconfig = require('./typescript/tsconfig.json');

export class CustomNodeExtension {
  constructor(private node: NodeMain) {}

  static dependencies: any = [EnvsAspect, NodeAspect]

  static async provider([envs, node]: [EnvsMain, NodeMain]) {
    const customReactEnv = node.compose([
      node.overrideTsConfig(tsconfig)
      ]);

    envs.registerEnv(customNodeEnv);

    return new CustomNodeExtension(node);
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
1. Import your Babel config
1. Set the necessary dependencies to be injected (by Bit) into the following 'provider' function
1. Instantiate a new Babel compiler with the 'babelConfig' configurations
1. use the `compose` Env API to register a new Service Hanlder

```typescript {3,5,10-13,15-16,19-21}
import { EnvsMain, EnvsAspect } from '@teambit/envs';
import { NodeAspect, NodeMain } from '@teambit/node';
import { BabelAspect, BabelMain } from '@teambit/babel';

const babelConfig = require('./babel/babel.config');

export class CustomNodeExtension {
  constructor(private node: NodeMain) {}

  static dependencies: any = [EnvsAspect, NodeAspect, BabelAspect];

  static async provider([envs, node, babel]: [
    EnvsMain, NodeMain, BabelMain ]) {

    const babelCompiler = babel.createCompiler({
      babelTransformOptions: babelConfig,
    });

    const customNodeEnv = node.compose([
      node.overrideCompiler(babelCompiler),
      node.overrideCompilerTasks([babelCompiler.createTask()]),
    ]);

    envs.registerEnv(customNodeExtension);
    return new CustomNodeExtension(node);
  }
}
```

### Transformers API docs

Use these APIs to customize React environment default configuration with your extension. [React more here](#customizing-configuration).

#### `overrideTsConfig(tsconfig: TsConfigSourceFile): EnvTransformer`

Merge the environment's default TypeScript configurations with a new ([tsconfig.json](https://www.typescriptlang.org/handbook/tsconfig-json.html)) configuration file.

```ts
// ...
const tsconfig = require('./typescript/tsconfig.json');
export class NodeExtension {
// ...

  static async provider([envs, node]: [EnvsMain, NodeMain]) {
    const newNodeEnv = node.compose([
      node.overrideTsConfig(tsconfig)
    ]);
}
// ...
```

#### `overridePreviewConfig(config: Configuration): EnvTransformer`

Merge the Webpack configurations for the 'Preview' environment service, with a new ([webpack.config.js](https://webpack.js.org/configuration/)) configuration file.

```ts
// ...
const webpackConfig = require('./webpack/webpack.config');
export class NodeExtension {
// ...
  static async provider([envs, node]: [EnvsMain, NodeMain]) {
    const newNodeEnv = node.compose([
      node.overridePreviewConfig(webpackConfig)
    ]);
}
// ...
```

#### `overrideDevServerConfig(config: Configuration): EnvTransformer`

Merge the Webpack configurations for the 'DevServer' environment service, with a new ([webpack.config.js](https://webpack.js.org/configuration/)) configuration file.

```ts
// ...
const webpackConfig = require('./webpack/webpack.config');
export class NodeExtension {
// ...
  static async provider([envs, node]: [EnvsMain, NodeMain]) {
    const newNodeEnv = node.compose([
      node.overrideDevServerConfig(webpackConfig)
    ]);
}
// ...
```

#### `overrideJestConfig(jestConfigPath: string): EnvTransformer`

This method receives a path (as a string) to a configuration file . Overrides the default configurations for the Jest test runner with a new ([jest.config](https://jestjs.io/en/configuration)) configuration file. This is done by passing the _path_ to the file as an argument.

```ts
// ...
export class NodeExtension {
// ...
  static async provider([envs, node]: [EnvsMain, NodeMain]) {
    const newNodeEnv = node.compose([
      node.overrideJestConfig(require.resolve('./jest/jest.config'))
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
export class CustomNode {
  // ...
  static async provider([envs, node]: [EnvsMain, NodeMain]) {
    // Get the environment's default build pipeline using the 'getBuildPipe' service handler
    const nodePipe = node.env.getBuildPipe()
    // Add the custom task to the end of the build tasks sequence.
    const tasks = [...nodePipe, new CustomTask()]
    const newNodeEnv = node.compose([node.overrideBuildPipe(tasks)])
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

export class CustomNode {
  // ...
  static async provider([envs, node]: [EnvsMain, NodeMain]) {
    const newNodeEnv = node.compose([
      node.overrideDependencies(newDependencies)
    ])
    // ...
  }
}
```

> The above example shows the 'Node' library being removed as a (runtime) dependency and added as a peer dependency.

#### `overridePackageJsonProps(props: PackageJsonProps): EnvTransformer`

Overrides the default properties added to the `package.json` file of every package generated from components using this environment.

```ts
// ...
const newPackageProps = {
  main: 'dist/{main}.js',
  types: '{main}.ts'
}

export class CustomNode {
  // ...
  static async provider([envs, node]: [EnvsMain, NodeMain]) {
    const newNodeEnv = node.compose([
      node.overridePackageJsonProps(newPackageProps)
    ])
    // ...
  }
}
```

### Service providers API docs

Use these APIs to customize React environment default configuration with your extension. [Read more here](#composing-tools-and-services).

#### `getTester(...args : any[]): Tester`

Returns a test runner to be used by the Tester service.

```ts
export class NodeEnv implements Environment {
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
export class NodeEnv implements Environment {
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
export class NodeEnv implements Environment {
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
export class NodeEnv implements Environment {
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
export class NodeEnv implements Environment {
  // ...
  getDocsTemplate() {
    return require.resolve('./docs')
  }
}
```

#### `getPackageJsonProps(...args : any[]): object`

Returns an object that defines the `package.json` properties of the packages generated for components handled by this environment. This configuration is used by the Packager service.

```ts
export class NodeEnv implements Environment {
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
export class NodeEnv implements Environment {
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
export class NodeEnv implements Environment {
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
