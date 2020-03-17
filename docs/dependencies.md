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

### Overriding Dependencies

It is possible to change the component's dependencies, by using the [overrides](/docs/overrides) option in Bit. Overrides can be used for the following:  

- Add dependencies that are not explicit in the code
- Remove dependencies that are in the code, but we want to be provided by the consuming project, such as generic styles
- Change dependency classification from dependencies to peerDependencies, so the consuming project provides the dependencies and not the component. For packages that must be singletons, such as Angular and React framework packages, this is a mandatory step to avoid errors.  
  
## File Dependencies

Component dependencies can take the form of relative paths, i.e.: 

```bash
import {} from '../utils';
```

> Bit is using static code analysis, so only static imports are supported. 

To ensure component completeness, Bit analyzes relative path dependencies and identifies these cases: 

![relative resolution](https://storage.googleapis.com/static.bit.dev/docs/images/relative_resolution.png)

### Same component files

For files that belong to the same component, Bit is checking that all files are under the component tracked folder. See [here] regarding cross folders component. 

### File tracked in another component

For files that tracked under other components, you should change the relative path to a module import. You can adjust the import statement manually, or use the `link --rewire` command for Bit to replace the imports automatically.  
Bit marks the new component as a dependency of the original component.

### Untracked files

Bit generates an untracked file dependency error if the component imports a file that is not tracked by any component:  

```bash
$ bit status
new components
     > hello/world... missing dependencies
       untracked file dependencies: src/utils/noop.js
```

To resolve the isolation problem, you should track the file as a new component; Run `bit add` command to track the new component.  Then change the import to point to a module import.  

To support backwards compatibility with versions prior to 15, you can enforce the use of relative paths to other components during the tag command. Use the `bit tag --allow-relative-paths` option to indicate Bit that relative paths are allowed. The result is a component that uses full paths names which may result harder to reuse issues.  

## Aliases

Some projects use a aliases to resolve relative paths. Some common examples are:  

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

> It is highly recommended to use custom paths instead of backward references (i.e. `../../my-file.js`). Using custom paths makes the component more portable between environments, and avoids the need to reproduce the full directory structure, and Bit can simply redirect the paths to another location.
