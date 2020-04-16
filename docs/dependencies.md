---
id: dependencies
title: Components Dependencies
sidebar_label: Dependencies
---

A key feature of Bit is the ability to automatically create a dependency graph, based on the component's source code.  
Javascript can rely on two types of dependencies using a require or import statements:  

- Packages that are installed as node_modules
- Files and directories from inside the project, or referenced in decorators (e.g. in Angular)

For each component, Bit builds a **dependency graph** by analyzing all the dependencies. When a new version of component is tagged, Bit saves the dependency graph together with the component sources. The dependency graph is used to generate a `package.json` file for each component when the component is installed or imported.  

## Package Dependencies

Here's an example for a component with a package dependency:

```shell
.
├── node_modules
|   └── left-pad
├── package.json
└── src
    ├── hello-world.js
    └── index.js
```

`index.js`

```javascript
export {default} from './hello-world';
```

`hello-world.js`

```javascript
import leftPad from 'left-pad';

export default function hello(world) {
    return leftPad(`hello ${world}`, 20, '-');
}
```

`package.json`

```json
{
  "dependencies": {
    "left-pad": "^2.1.0"
  }
}
```

In this example, the package `left-pad` is in the project's `node_modules` directory. The package version range is in the project's `package.json` file. The file `hello-world.js` requires the package `left-pad`.  

we track the `hello/world` component:  

```shell
$ bit add src/hello-world.js src/index.js --id hello/world
tracking component hello/world:
    added src/hello-world.js
    added src/index.js
```

The `hello/world` component now relies on the `left-pad` package. The version Bit sets for the dependency is the same version as defined in the project's `package.json` file. In this case, it's `^2.1.0`.  
If no package version found in the `package.json` file, Bit resolves it from the `node_modules` directory. Bit then sets the exact version - `2.1.0` (assuming that's the actual version installed).

We can see that Bit has resolved the dependency by using [bit show](/docs/apis/cli-all#show) to check which version Bit has resolved for each package dependency:  

```shell
$ bit show hello/world
┌───────────────────┬─────────────────────────────────────────────────────────────────────┐
│        ID         │                            hello/world                              │
├───────────────────┼─────────────────────────────────────────────────────────────────────┤
│     Language      │                             javascript                              │
├───────────────────┼─────────────────────────────────────────────────────────────────────┤
│     Main File     │                      src/hello-world/index.js                       │
├───────────────────┼─────────────────────────────────────────────────────────────────────┤
│     Packages      │                           left-pad@^2.1.0                           │
├───────────────────┼─────────────────────────────────────────────────────────────────────┤
│       Files       │       src/hello-world/hello-world.js, src/hello-world/index.js      │
└───────────────────┴─────────────────────────────────────────────────────────────────────┘
```

If Bit cannot resolve all package's dependencies, it will prompt for `missing package dependencies`. We need to verify that all packages actually exist in package.json.  

The following diagram describes the packages (i.e. node_modules) resolution flow:  

![Package Resolution Flow](https://storage.googleapis.com/static.bit.dev/docs/images/package_resolution.png)

## File Dependencies

A component can depend on other files, e.g. `import ./utils.js`. To isolate such components, we need to track these files as well. This is because the component must have these files around if we want to use it in another project.  

> Bit is using static code analysis, so only static imports are supported. 

When Bit encounters a file that needs to be tracked, it will try to check if the file is already tracked in another component. In this case, Bit will make the other component a dependency of this component.  If The file is not tracked Bit will warn about `untracked file dependencies` when checking the component's status.

In this example, we try to track the hello-world.js file.  

`hello-world.js`

```javascript
import noop from '../utils/noop';

export default function hello(world) {
    noop();
    return `hello ${world}`;
}
```

`noop.js`

```javascript
export default () => {};
```

```shell
$ bit add src/index.js src/hello-world --id hello/world
tracking component hello/world:
    added src/hello-world.js
```

When running [bit status](/docs/apis/cli-all#status), an `untracked file dependencies` warning appears.

```shell{3,4}
$ bit status
new components
     > hello/world... missing dependencies
       untracked file dependencies: src/utils/noop.js
```

Bit has identified the `require` statement for `src/utils/noop.js`, but the file is not yet contained in any component. Therefore, Bit cannot isolate the `hello/world` component. To resolve the isolation problem you can:

- Add the untracked file dependency to the existing component
- Track the file as a new component

The decision on the approach to take is based on the context of the file. If this file is used by multiple other components, it makes sense to make it into a separate component. However, if this file is internal to the tracked file, it can be added as the component's file.  

To **add the file to an existing component**, we should run `bit add` pointing to the Id of the component to which we want to add the file:  

```shell
$ bit add src/utils/noop.js --id hello/world
tracking component hello/world:
    added src/hello-world.js
    added src/index.js
    added src/utils/noop.js
```

When running [bit status](/docs/apis/cli-all#status) we see that Bit can isolate the component:

```shell
$ bit status
new components
    > component/hello-world... ok
```

To **track the file as a new component** we can run `bit add` with the new component.

```shell
$ bit add src/utils/noop.js --namespace utils
tracking component utils/noop:
    added src/utils/noop.js
```

The result is a new component, which is now a dependency of the `hello/world` component. No need to explicitly tell Bit that about a new component. Bit identifies that the file is tracked as a new component and resolves the status of the requiring component.

```shell
› bit status
new components
     > hello/world... ok
     > utils/noop... ok
```

The following diagram describes the flow to resolve dependency for relative files:  

![Package Resolution Flow](https://storage.googleapis.com/static.bit.dev/docs/images/file_resolution.png)

## Overriding Dependencies

It is possible to change the component's dependencies, by using the [overrides](/docs/overrides) option in Bit. Overrides can be used for the following:  

- Add dependencies that are not explicit in the code
- Remove dependencies that are in the code, but we want to be provided by the consuming project, such as generic styles
- Change dependency classification from dependencies to peerDependencies, so they will be provided in the consuming project and not by the component. This is sometimes required for frameworks packages such as react and angular that needs to exist only once in the project, or to reduce the bundle size.

## Custom Paths

Some projects use a custom aliases to resolve relative paths. Some common examples are:  

- [Webpack resolve](https://webpack.js.org/configuration/resolve/)
- [tsconfig resolving](https://www.typescriptlang.org/docs/handbook/module-resolution.html)
- Vue absolute paths
- [Babel module resolver](https://github.com/tleunen/babel-plugin-module-resolver)
- `NODE_PATH` environment variable

When using Custom Module Definition, your code requires files using absolute paths. Bit assumes that requiring absolute paths means that you require a package and not a file. This is why Bit triggers a `missing package dependency` warning.  
Let's use this example, and update it to use custom module resolution.

```shell
.
├── package.json
└── src
    ├── hello-world
    │   ├── hello-world.js
    │   └── index.js
    └── utils
        └── noop.js
```

In the `hello-world.js` file we may import the `noop.js` file as follow: `import noop from '@/utils/noop';`  
For Bit to be able to resolve the `@/utils` path, we need to configure it as an resolve alias path. In order to do that we should configure the [Bit configuration](/docs/conf-bit-json#resolvemodules) to point to the module resolution path as bellow:

```json
"resolveModules": {
    "aliases": {
        "@": "src"
    }
}
```

> It is highly recommended to use custom paths instead of backward references (i.e. `../../my-file.js`). Using custom paths makes the component more portable between environments, and avoids the need to reproduce the full directory structure, and Bit can simply redirect the paths to another location.
