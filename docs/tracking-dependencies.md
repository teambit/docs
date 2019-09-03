---
id: tracking-dependencies
title: Tracking Component's Dependencies
permalink: docs/tracking-dependencies.html
layout: docs
category: Getting Started
prev: add-and-isolate-components.html
next: manage-component-files.html
---

Bit manages a component's package and file dependencies.

A component may use packages or `import` files/components to work. Bit reads through all `require` and `import` statements for the components it tracks.  
There are two dependencies a component may have, [Package Dependencies](#package-dependencies) and [File Dependencies](#file-dependencies). You can read more about Bit's [automated component dependency resolution](/docs/component-dependencies.html)

* Bit creates `package.json` for all package dependencies.
* Bit should track all file dependencies. They can be a part of the same component or another one.

> **Note**
>
> If a project uses absolute imports or aliases, we need to [configure](#custom-module-resolution) it.

## Package Dependencies

Components can `import` external packages. Bit resolves those dependencies.  
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

```js{1}
import leftPad from 'left-pad';

export default function hello(world) {
    return leftPad(`hello ${world}`, 20, '-');
}
```

`package.json`

```js{3}
{
  "dependencies": {
    "left-pad": "^2.1.0"
  }
}
```

In this example, the package `left-pad` is in the project's `node_modules` directory. The package version range is in the project's `package.json` file. The file `hello-world.js` requires the package `left-pad`.   
Let's track the `hello/world` component and follow Bit's steps to resolve dependencies.

```bash
$ bit add src/hello-world.js src/index.js --id hello/world
tracking component hello/world:
    added src/hello-world.js
    added src/index.js
```

We get one component that depends on the package `left-pad`. The version Bit sets for the dependency is the same version as defined in the project's `package.json` file. In this case, it's `^2.1.0`.  
If no package version found in the `package.json` file, Bit resolves it from the `node_modules` directory. Bit then sets the exact version - `2.1.0` (assuming that's the actual version installed).

Verify Bit has resolved all dependencies using [bit status](/docs/cli-status.html).

```bash{3}
$ bit status
new components
     > component/hello-world... ok
```

Use [bit show](/docs/cli-show.html) to check which version Bit has resolved for each package dependency.

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

### Handling missing package dependencies

In some cases, Bit prompts the message 'missing package dependencies' when running [bit status](/docs/cli-status.html) or [bit tag](/docs/cli-tag.html).

```bash{3,4}
$ bit status
new components
     > hello/world... missing dependencies
       missing packages dependencies: left-pad
```

Bit prompts the `missing package dependencies` if it is unable to resolve all package dependencies. Bit is unable to isolate such components. To resolve this issue, we need to verify all required packages are in the repository’s `package.json` file.

## Peer Dependencies

Some peer dependencies are not explicitly required by tracked files, so Bit does not log them as `peerDepedndencies`. To work around this issue we use [overrides](/docs/conf-bit-json.html#overrides) to force them as such.  
For this example, we'll assume that a project has react components, so we need to add `react-dom` as a peer dependency. Open the [workspace configuration](/docs/conf-files.html#workspace-configuration) and locate `bit`. Now add the `overrides` section as follows:

```js
"bit": {
    "overrides": {
        "ui/*": {
            "peerDependencies": {
                "react-dom": "16.8.6"
            }
        }
    }
```

This tells Bit to add `react-dom` as a peer dependency for all components that their name matches `ui/*`. You also set a specific component ID, or any other glob patten to match a set of components.

## File Dependencies

A component can depend on other files. To isolate such components, we need to track these files as well. This is because the component must have these files around if we want to use it in another project.  
Bit recognizes these files by reading the `import` and `require` statements. Once Bit has the list of files, it tries to figures out whether it tracks them. There are several cases for this situation:

* Bit already tracks a required file as part of the tracked component.
* A required file can be part of another component in your project. Bit creates a dependency relationship between the two components.
* If Bit does not track the file at all, it warns about `untracked file dependencies` on [bit status](/docs/cli-status.html) or [bit tag](/docs/cli-tag.html)

### Untracked file dependencies

If we encounter an `untracked file dependencies` error, we need to resolve it to isolate the component. First, let's view this example:

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

`index.js`

```js
export {default} from './hello-world';
```

`hello-world.js`

```js{1}
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

Let's track the `hello/world` component:

```bash
$ bit add src/index.js src/hello-world --id hello/world
tracking component hello/world:
    added src/hello-world.js
    added src/index.js
```

When running [bit status](/docs/cli-status.html), an `untracked file dependencies` warning appears.

```bash{3,4}
$ bit status
new components
     > hello/world... missing dependencies
       untracked file dependencies: src/utils/noop.js
```

Bit has read the `require` statement for `src/utils/noop.js`. However, Bit does not track the file. So Bit is unable to isolate the `hello/world` component. The error forbids it.  
There are two ways to resolve this isolation issue.

### Add an untracked file dependency to an existing component

We can add untracked file dependencies to an existing component.  
Let's continue the flow from the [previous section](#untracked-file-dependencies) and append `src/utils/noop.js` to the component. Rerun `bit add`. Track the selected file and set the `--id` to the preexisting component.

```bash
$ bit add src/utils/noop.js --id hello/world
tracking component hello/world:
    added src/hello-world.js
    added src/index.js
    added src/utils/noop.js
```

Rerun [bit status](/docs/cli-status.html) and see that Bit can isolate the component.

```bash
$ bit status
new components
    > component/hello-world... ok
```

### Track an untracked file dependency as a new component

We can choose to create a new component from an untracked file dependency. To do this, we need to track the untracked files as a new component. This resolves the missing file dependency issue. Bit then creates a dependency relationship for components with file dependencies between them.  
Let’s try resolving the prior untracked file dependency, but this time by adding a new component.

```bash
$ bit add src/utils/noop.js --namespace utils
tracking component utils/noop:
    added src/utils/noop.js
```

The result is a new component, which is now a dependency of the `hello/world` component.

```bash
› bit status
new components
     > hello/world... ok
     > utils/noop... ok
```

### Custom Module Resolution

Some projects use a Custom Module Definition feature. We need to define them to Bit for it to resolve the dependencies.  
Some examples for common frameworks that allow Custom Module Definition:

* [Webpack resolve](https://webpack.js.org/configuration/resolve/)
* [tsconfig resolving](https://www.typescriptlang.org/docs/handbook/module-resolution.html)
* Vue absolute paths
* [Babel module resolver](https://github.com/tleunen/babel-plugin-module-resolver)
* `NODE_PATH` environment variable

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

`index.js`

```js
export {default} from './hello-world';
```

`hello-world.js`

```js{1}
import noop from '@/utils/noop';

export default function hello(world) {
    noop();
    return `hello ${world}`;
}
```

`noop.js`

```js
export default () => {};
```

Now we track the component using this command:

```bash
$ bit add src/index.js src/hello-world --id hello/world
tracking component hello/world:
    added src/hello-world.js
    added src/index.js
```

The output of `bit status` notifies on a missing package dependency for `@/utils/noop`. This is not a package. To resolve this issue, we need to edit the project's `bit` object and configure the following `resovleModules` configuration:

```js
"resolveModules": {
    "aliases": {
        "@": "src"
    }
}
```

After defining the custom module resolution, Bit can find `utils/noop`. Since we haven't tracked `src/utils/noop` yet, Bit marks it as an untracked file dependency. Resolving this issue is explained [above](##untracked-file-dependencies).