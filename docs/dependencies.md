---
id: dependencies
title: Components Dependencies
sidebar_label: Dependencies
---

## Dependencies

A key feature of Bit is the ability to automatically create a dependency graph, based on the component's source code.  
There are two types of dependencies that a javascript can rely on, using a require or import statements:  

- Packages that are installed as node_modules
- Files and directories from inside the project, or referenced in decorators (e.g. in Angular)

For each component, Bit builds a **dependency graph** by analyzing all the dependencies. When a new version of component is tagged, Bit saves the dependency graph together with the component sources. The dependency graph is used to generate a `package.json` file for each component when the component is installed or imported.  

### Package Dependencies

Here's an example for a component with a package dependency:

```bash
.
├── node_modules
|   └── left-pad
├── package.json
└── src
    ├── hello-world.js
    └── index.js
```

`index.js`

```js
export {default} from './hello-world';
```

`hello-world.js`

```js
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

```bash
$ bit add src/hello-world.js src/index.js --id hello/world
tracking component hello/world:
    added src/hello-world.js
    added src/index.js
```

The `hello/world` component now relies on the `left-pad` package. The version Bit sets for the dependency is the same version as defined in the project's `package.json` file. In this case, it's `^2.1.0`.  
If no package version found in the `package.json` file, Bit resolves it from the `node_modules` directory. Bit then sets the exact version - `2.1.0` (assuming that's the actual version installed).

We can see that Bit has resolved the dependency by using [bit show](/docs/apis/cli-all#show) to check which version Bit has resolved for each package dependency:  

```bash
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

### File Dependencies

A component can depend on other files, e.g. `import ./utils.js`. To isolate such components, we need to track these files as well. This is because the component must have these files around if we want to use it in another project.  

When Bit encounters a file that needs to be tracked, it will try to check if the file is already tracked in another component. In this case, Bit will make the other component a dependency of this component.  If The file is not tracked Bit will warn about `untracked file dependencies` when checking the component's status.

In this example, we try to track the hello-world.js file.  

`hello-world.js`

```js
import noop from '../utils/noop';

export default function hello(world) {
    noop();
    return `hello ${world}`;
}
```

`noop.js`

```js
export default () => {};
```

```bash
$ bit add src/index.js src/hello-world --id hello/world
tracking component hello/world:
    added src/hello-world.js
```

When running [bit status](/docs/apis/cli-all#status), an `untracked file dependencies` warning appears.

```bash{3,4}
$ bit status
new components
     > hello/world... missing dependencies
       untracked file dependencies: src/utils/noop.js
```

Bit has read the `require` statement for `src/utils/noop.js`. However, Bit does not track the file. So Bit is unable to isolate the `hello/world` component. There are two ways to resolve this isolation issue:

- Add the untracked file dependency to the existing component
- Track the file as a new component

The decision on the approach to take is based on the context of the file. If this file is used by multiple other components, it makes sense to make it into a separate component. However, if this file is internal to the tracked file, it can be added as the component's file.  

To **add the file to an existing component**, we should run `bit add` pointing to the Id of the component to which we want to add the file:  

```bash
$ bit add src/utils/noop.js --id hello/world
tracking component hello/world:
    added src/hello-world.js
    added src/index.js
    added src/utils/noop.js
```

When running [bit status](/docs/apis/cli-all#status) we see that Bit can isolate the component:

```bash
$ bit status
new components
    > component/hello-world... ok
```

To **track the file as a new component** we can run `bit add` with the new component.

```bash
$ bit add src/utils/noop.js --namespace utils
tracking component utils/noop:
    added src/utils/noop.js
```

The result is a new component, which is now a dependency of the `hello/world` component. There is no need to explicitly tell Bit that there is a new component. Bit identifies that the file is tracked as a new component and resolves the status of the requiring component.

```bash
› bit status
new components
     > hello/world... ok
     > utils/noop... ok
```

The following diagram describes the flow to resolve dependency for relative files:  

![Package Resolution Flow](https://storage.googleapis.com/static.bit.dev/docs/images/file_resolution.png)

### Overriding Dependencies

It is possible to change the component's dependencies, by using the [overrides](/docs/overrides) option in Bit. Overrides can be used for the following:  

- Add dependencies that are not explicit in the code
- Remove dependencies that are in the code, but we want to be provided by the consuming project, such as generic styles
- Change dependency classification from dependencies to peerDependencies, so they will be provided in the consuming project and not by the component. This is sometimes required for frameworks packages such as react and angular that needs to exist only once in the project, or to reduce the bundle size.

### Custom Paths

Some projects use a custom aliases to resolve relative paths. Some common examples are:  

- [Webpack resolve](https://webpack.js.org/configuration/resolve/)
- [tsconfig resolving](https://www.typescriptlang.org/docs/handbook/module-resolution.html)
- Vue absolute paths
- [Babel module resolver](https://github.com/tleunen/babel-plugin-module-resolver)
- `NODE_PATH` environment variable

When using Custom Module Definition, your code requires files using absolute paths. Bit assumes that requiring absolute paths means that you require a package and not a file. This is why Bit triggers a `missing package dependency` warning.  
Let's use this example, and update it to use custom module resolution.

```bash
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

> It is highly recommended to use custom paths instead of backward references (i.e. `../../my-file.js`). Using custom paths makes the component more portable between environments, as there is no need to reproduce the full directory structure, and Bit can simply redirect the paths to another location.

## Common Isolation Errors

Here are some common errors and their resolution when trying to isolate a component.  

> **TIP**
>
> To validate a dependency issue is resolved, rerun `bit status`.

### Missing package dependencies

This error mainly occur on two distinct isolation issues. It may be that some of the project's package dependencies are not installed, or that you are using Custom Module Definition, or `NODE_PATH` environment variable in your project and Bit is unaware of that.

As described [above](#package-dependencies), Bit has different strategies to determine a package dependency version. If all of them fail, Bit will prompt you to install the missing package dependencies.  
Use your package manager of choice to resolve the issue.

```sh
npm install
```

Alternatively, Bit issues a `missing package dependency` error for tracked components, in a project, that have file dependencies to absolute paths, using Custom Module Definition feature. See here how to configure Bit with your project's [custom paths resolution](#custom-paths).

### Components with Relative Import Statements

Bit expects the dependency tree of components to be defined using absolute `require` or `import` statements. This is because Bit create and manage a set of link files (bindings) between imported components. So when you are using an imported component from another tracked component, or modifying an imported component, and adding an `import` statement to another imported component, Bit will trigger this isolation issue.

In order to resolve this, you need to understand that Bit creates a link file for each of the project's imported component within the `node_modules` directory. This allows you to require a component just as you would require a Bit package dependency with the same name, as [shown here](/docs/installing-components.html#package-naming-convention).

To resolve this issue you will need to refactor the `import` or `require` statement in your code to the component dependencies, using Bit's package naming convention, and save the changes.

```js
require ('@bit/<owner>.<collection>.<namespace>.<component-name>')
```

### Missing Components

This issue happens if some (or all) of your project component dependencies are missing. To resolve it you need to either run `bit import` or `npm install` (depends how your project depends on the component).

### Non-existing Dependency Files

When Bit tracks files in your project, it evaluates their dependency tree. If one of the files in the component's dependency tree is not found within your project, Bit will throw this isolation error. To resolve this issue, open the file, and ensure that the `import` or `require` statement points to the correct file.  
If you encounter this issue, this indicates that there's a high probability that this is because an error within your project that affects your project's stability.

### Missing Links

When Bit installs components, it creates a set of binding files to ensure that all imported component's dependency trees are working correctly. If any of these files is missing, Bit will prompt this isolation error. To fix this, you need to run the `bit link` command. Bit will ensure all link files are in place.
