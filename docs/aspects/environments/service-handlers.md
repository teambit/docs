---
id: service-handlers
title: Service Handlers
---

Service Handlers are the link that binds an environment to the various Environment Services. They are methods in the Environment class that set an Environment Service to use a specific Bit extension component or a configuration file.

For example, the React environment uses the Service Handler `getCompiler()` to configure the Compiler Environment Service to run the TypeScript extension component.

Environment services run on various events. Whenever a service runs, it executes its corresponding service handler which consequently runs the configured aspect (in the previous example, that would be TypeScript).

Different components in a Bit workspace may use different environments. That means environment services need to execute their corresponding service handlers in the specific environment applied on the component currently being processed.

For example, if _component A_ uses the Node environment then the Compiler service processing that component, will execute the Service Handler (in that case, `getCompiler`) found in the Node environment.

## List of service handlers

### getTester

```ts
getTester(...args : any[]): Tester
```

Returns a test runner to be used by the Tester service.

For example:

```ts
export class ReactEnv implements Environment {
  constructor(
    // ...

    // The Jest Aspect
    private jestAspect: JestMain
  ) {}

  // ...

  getTester(jestConfigPath: string, jestModule = jest): Tester {
    const jestConfig = require.resolve('./jest/jest.config');
    return this.jestAspect.createTester(jestConfig);
  }
}
```

### getCompiler

```ts
getCompiler(...args : any[]): Compiler
```

Returns a compiler to be used by the Compiler service.

For example:

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

### getLinter

```ts
getLinter(...args : any[]): Linter
```

Returns a linter to be used by the Linter service.

For example:

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

### getDevServer

```ts
getDevServer(...args : any[]): DevServer
```

Returns a DevServer to be used by the DevServer service. (A DevServer is essentially the combination of the bundler configurations, together with a specified 'listen' port number)

For example:

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
      entry: context.entry.concat([require.resolve('./docs')]),
    });
    return this.webpack.createDevServer(withDocs, webpackConfig);
  }
}
```

> The above example runs the dev server with the environment's documentation template.

### getDocsTemplate

```ts
getDocsTemplate(...args : any[]): string
```

Returns the path to the documentation template files, to be used by the Documentation service.

For example (see docs files [here](https://github.com/teambit/bit/tree/master/scopes/react/react/docs)):

```ts
export class ReactEnv implements Environment {
  // ...

  getDocsTemplate() {
    return require.resolve('./docs');
  }
}
```

### getPackageJsonProps

```ts
getPackageJsonProps(...args : any[]): object
```

Returns an object that defines the `package.json` properties of the packages generated for components handled by this environment. This configuration is used by the Packager service.

Learn more about overriding the `package.json` properties [here](/packages/publish-to-npm#packagejson)

```ts
export class ReactEnv implements Environment {
  // ...

  getPackageJsonProps() {
    return {
      main: 'dist/{main}.js',
      types: '{main}.ts',
    };
  }
}
```

> As with any other 'merging' process, the properties defined in the above returned object will be added to the default configurations. Conflicting properties will be overridden by the properties set here.

### getDependencies

```ts
getDependencies(component: any): Promise<DependencyList>
```

Returns an object that defines the default dependencies for components handled by this environment. The returned object is used by the Dependencies service.

For example:

```ts
export class ReactEnv implements Environment {
  // ...

  async getDependencies() {
    return {
      dependencies: {
        react: '-',
      },
      devDependencies: {
        '@types/react': '16.9.43',
        '@types/jest': '~26.0.9',
      },
      peerDependencies: {
        react: '^16.13.1',
        'react-dom': '^16.13.1',
      },
    };
  }
}
```

> The `-` sign removes a dependency. In the example above, 'react' is removed from the list of (runtime) `dependencies` and added to the list of `peerDependencies`.

### getBuildPipe

```ts
getBuildPipe(...args : any[]): BuildTask[]
```

Returns an array of build tasks to be used by the Builder service. Tasks will be added after and before Bit's pre-configured build tasks. Learn more about it [here](/build-pipeline/overview).

For example:

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
      this.tester.task,
    ];
  }
}
```
