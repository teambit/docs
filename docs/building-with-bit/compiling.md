--- 
id: compiling
title: Compiling
--- 

Compilation is a crucial step in making a component an independent module that can be used by other web projects as well as internally, by other components in the same workspace.
When Bit starts tracking a component, a new directory is created for it inside the workspace' `node_modules` directory. When a component gets compiled, the output of that process is placed inside the root of that directory.

For example:

```sh
├── node_modules
    ├── @my-org
        ├── react-ui.button
          ├── dist
              ├── index.js
              ├── index.js.map
              ├── button.js
              ├── button.js.map
          ├── ...
```

- __Compile in the workspace__ - Components are compiled in 'watch mode' (on every change) when running Bit's dev server (`bit start`) and on various compilations commands.


- __Compile as a build task__ - 
Components are compiled as part of the component build pipeline (on `bit build` and `bit tag`).
The compilation task runs on the component's 'capsule' (generated as part of the build process) and not on the workspace.
Since the build pipeline runs not only on the modified components but also on all dependents of that component, so does the the compilation process.


## Choosing a Compiler

Bit's Compiler is an [Environment Service](/building-with-bit/environments).
The type of compiler (Babel, TypeScript, etc.) as well as its configurations, are set by the various [environments](/building-with-bit/environments) that use it as a service.
That means, the (specific) compiler is never run directly but only via the Compiler service. That also means, a single workspace may run different compilers for different components, each according to its own environment.
To customize an environment's compiler, [see here](/building-with-bit/environments).

## Running the compiler manually

To manually run the compiler on a specific component use its [component ID](/building-with-bit/components):

```shell
$ bit compile <component-id>
```

For example:

```shell
$ bit compile ui-primitives/button
```

To manually run the compiler on the entire workspace:

```shell
$ bit compile
```

### Options

#### `--changed` `-c`

Compiles only new or modified components.

```shell
$ bit compile --changed
```

#### `--verbose` `-v`

Outputs data regarding the compilation. For example, the `dist` paths.

```shell
$ bit compile --verbose
```

#### `--json` `-j`

Outputs (to the terminal) the compiled results in a JSON format.

```shell
$ bit compile --json
```

## Bit processes that use the compiler

### Local dev server

Bit's local dev server (which also runs the Workspace UI) re-compiles components on each modification. This happens whenever a file is 'saved'.

```shell
$ bit start
ENVIRONMENT NAME        URL                      STATUS
react              http://localhost:3101         Running
node               http://localhost:3102         Running

You can now view bad-jokes components in the browser
Main UI server is running on http://localhost:3000

Waiting for component changes... (10:17:20)
```

### Compile in `watch` mode

Alongside the local dev server, Bit features a watch mode that runs different operations for modified components. Component compilation is one of these tasks.

```sh
$ bit watch
```

### Compile in the Build Pipeline

Compilation is also part of a component's build pipeline. As with any other Build Task, the compilation task also happens in a 'component capsule', which is an isolated instance of a component. When executed as a Build Task, the compiler processes all new or changed dependencies of that component.

When a component's build pipeline is run as part of the tagging of a new release version, the output of the compilation process is stored in the component's new version.


## Customizing the Compiler


The Compiler is an [Environment Service](/building-with-bit/environments) that enables environments to integrate a specific compiler into various Bit features, processes and events.

For example, the React environment (`@teambit.react/react`) uses the Compiler Environment Service to configure the TypeScript extension component as its compiler. The TypeScript compiler will be used (for components using this environment) when running the `bit compile` command, when Bit's development server re-compiles modified components, and when running the build process (just to name a few examples).

To customize your environment's compiler, first [create an environment extension](/building-with-bit/environments). This will be a new Bit component the uses an existing environment to extend and customize it to your own needs.

> As an example, we'll extend Bit's out-of-the-box React environment (`@teambit.react/react`).

## Create a new extension component

### Create the environment extension files

```shell
// In the workspace's root directory
$ mkdir -p extensions/custom-react
$ touch extensions/custom-react/react.extension.ts
$ touch extensions/custom-react/index.ts
```

### Option #1: Override the environment's default compiler configurations

Import the environment to be extended and customize its compiler configurations.

In this example, we'll extend the React environment and customize its TypeScript compiler configurations. We will set new TypeScript configurations by creating a new `tsconfig.json` configuration file to override the one used by the environment.

> Different environments may expose different Environment Transformers (i.e., 'override' methods) to customize the configurations set on the specific compiler used by them. <br /> <br />
> For a list of all available Transformers see your environment's documentation.

```typescript
import { EnvsMain, EnvsAspect } from '@teambit/envs';
import { ReactAspect, ReactMain } from '@teambit/react';

export class CustomReactExtension {
  constructor(private react: ReactMain) {}

  // The new TS configuration for this extension
  newTsConfig = require('./tsconfig.json');

  static dependencies: any = [EnvsAspect, ReactAspect];

  static async provider([envs, react]: [EnvsMain, ReactMain]) {
    const customReactEnv = react.compose([
      // Override the environment's default TypeScript configuration
      react.overrideTsConfig(newTsConfig),
    ]);

    envs.registerEnv(customReactEnv);

    return new CustomReactExtension(react);
  }
}
```

```json
{
  "compilerOptions": {
    "target": "ES3"
  }
}
```

```ts
import { CustomReactExtension } from './custom-react.extension';
export { CustomReactExtension };
export default CustomReactExtension;
```

The above example overrides the ["target"](https://www.typescriptlang.org/tsconfig#target) property for the TypeScript compiler configuration file (`tsconfig.json`) used by the environment.

The new `tsconfig.json` file does not replace the default one but merges into it (and therefor only configures the properties to override). Since the "target" property conflicts with the one set by the environment, it replaces it. In cases where there is no conflict between two properties, the override property will simply be added to the default configuration file.

### Option #2: Replace the compiler used by the environment

Environments use Environment Services by implementing a special class of methods called [Service Handlers](/building-with-bit/environments).

An environment's compiler can be replaced by overriding its [Compiler Service Handler](/building-with-bit/environments#getcompiler) method (`getCompiler()`).

For example, the code below shows a React environment extension that replaces its default compiler, TypeScript, with Babel.

```tsx
import { EnvsMain, EnvsAspect } from '@teambit/envs';
import { ReactAspect, ReactMain } from '@teambit/react';
// Import the Babel extension component to configure it and set it as the new compiler
import { BabelAspect, BabelMain } from '@teambit.compilation/babel';

const babelConfig = require('./babel-config');

export class CustomReactExtension {
  constructor(private react: ReactMain) {}

  // Set the necessary dependencies to be injected (by Bit) into the following 'provider' function
  static dependencies: any = [EnvsAspect, ReactAspect, BabelAspect];

  static async provider([envs, react, babel]: [
    EnvsMain,
    ReactMain,
    BabelMain
  ]) {
    // Instantiate a new Babel compiler with the 'babelConfig' configurations
    const babelCompiler = babel.createCompiler({
      babelTransformOptions: babelConfig,
    });

    const compilerOverride = envs.override({
      getCompiler: () => {
        return babelCompiler;
      },
    });

    const customReactEnv = react.compose([compilerOverride]);

    envs.registerEnv(customReactEnv);

    return new CustomReactExtension(react);
  }
}
```

```ts
import { CustomReactExtension } from './custom-react.extension';
export { CustomReactExtension };
export default CustomReactExtension;
```

#### Multi-Compiler

The Multi-compiler is a Bit extension component that enables the use of multiple compilers in a single environment.

For example:

```typescript
import { EnvsMain, EnvsAspect } from '@teambit/envs';
import { ReactAspect, ReactMain } from '@teambit/react';
// Import the Babel extension component
import { BabelAspect, BabelMain } from '@teambit.compilation/babel';
// Import the TypeScript extension component
import {
  TypeScriptAspect,
  TypeScriptMain,
} from '@teambit.typescript/typescript';
// Import the multi-compiler extension
import {
  MultiCompilerAspect,
  MultiCompilerMain,
} from '@teambit.compilation/multi-compiler';

export class CustomReactExtension {
  constructor(private react: ReactMain) {}

  // Set the necessary dependencies to be injected (by Bit) into the following 'provider' function
  static dependencies: any = [
    EnvsAspect,
    ReactAspect,
    BabelAspect,
    TypeScriptAspect,
    MultiCompilerAspect,
  ];

  static async provider([envs, react, babel, typescript, multiCompiler]: [
    EnvsMain,
    ReactMain,
    BabelMain,
    TypeScriptMain,
    MultiCompilerMain
  ]) {
    // Create a new composition of compilers
    const compilers = multiCompiler.createCompiler([
      createBabelCompiler(),
      createTsCompiler(),
    ]);

    // Override the environment's Compiler Service Handler
    const compilerOverride = envs.override({
      getCompiler: () => {
        return compilers;
      },
    });

    // Compose all Environment Transformers into a single environment
    const customReactEnv = react.compose([compilerOverride]);

    envs.registerEnv(customReactEnv);

    return new CustomReactExtension(react);
  }
}
```

> When using multiple compilers, make sure they target exclusive sets of file types. This is done using the compilers' `isFileSupported()` API.
