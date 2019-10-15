---
id: add-and-isolate-components
title: Tracking 
---

## Tracking Components

### Tracking Files

The first step of sharing code with Bit is adding files so Bit can track them as components.

Using [bit add](/docs/apis/cli-all#add) we can track sets of files as components. This is the first step of the component isolation process. Bit then creates a dependency graph for all tracked components. With this data, Bit creates an Isolated Component Environment for each component. In turn, this allows Bit to recreate a working environment for a component in any project.

Apart from [defining the component's file](#track-a-component) and set component's [spec files](#track-a-component-with-testspec-files), `bit add` can track [many components at once](#track-multiple-components-with-test-files-in-a-parallel-directory-tree). You can also determine a component's [entry point](#define-an-entry-point), decide the [component's ID](#component-id) and [namespace](#set-a-components-namespace).  
For more advance cases of tracking many components from the same project with all the above features, read about Bit's [tracking DSL](#tracking-dsl).

Additionally, `bit add` is used to manage the already tracked files of components. For example [adding new files to existing components](#adding-a-file-to-a-component), [removing tracked files from components](#removing-files-from-components), and [renaming tracked files](#moving-and-renaming-files).  

> **Custom Module Definition**
>
> If you are using any sort of Custom Module Definition feature in your project, to use absolute paths in your `import` statements, you'll need to define Bit's [custom paths resolution](#custom-paths) configuration.

#### Track a single component

The simplest component to track, is one that doesn’t require any external package or file. Here’s an example `hello-world` component that contains two files.

```bash
.
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
export default function hello(world) {
    return `hello ${world}`;
}
```

To track `hello-world`, we use [bit add](/docs/apis/cli-all#add), list the files that compose it and set an `ID` for it.

```bash{1}
$ bit add src/hello-world.js src/index.js --id hello/world
tracking component hello/world:
    added src/hello-world.js
    added src/index.js
```

To verify Bit can isolate the component, we use [bit status](/docs/apis/cli-all#status).

```bash{3}
$ bit status
new components
     > hello/world... ok
```

An `ok` status for a component status means that Bit can isolate the tracked component.

#### Track many components

Bit can track many components from structured directory trees using a single command. Bit does it by supporting glob patterns. Bit resolves an the [glob pattern and creates a set of `add` commands](#tracking-dsl). Let’s use a basic example to show how it works:

```bash
.
├── App.js
├── App.test.js
├── favicon.ico
├── index.js
└── src
    └── components
        ├── button
        │   ├── Button.js
        │   ├── Button.spec.js
        │   └── index.js
        ├── login
        │   ├── Login.js
        │   ├── Login.spec.js
        │   └── index.js
        └── logo
            ├── Logo.js
            ├── Logo.spec.js
            └── index.js
```

We can track all the components in the `components` directory with a single command.

```bash
$ bit add src/components/* --namespace user
```

Use [bit status](/docs/apis/cli-all#status) to verify the components' dependency graphs.

```bash{2,3,4}
new components
     > user/signup... ok
     > user/login... ok
     > user/profile... ok
```

#### Track a component with test/spec files

You can classify files as test files. This allows bit to execute component tests and keep the test results. Test results function as quality certificate and documentation for the component. Test-files’ dependencies as `devDependencies`.

To track files as test-file, use `--tests` feature of the [bit add](/docs/apis/cli-all#add) command. For example:

```bash{3}
.
├── specs
    └── hello-world.spec.js
└── src
    ├── hello-world.js
    └── index.js
```

We set a test file for example with the `--tests` flag.

```bash
bit add src/hello-world src/index.js --tests specs/hello-world.spec.js --id hello/world
```

The component hello/world now has a test file. We can tell Bit to run its tests:

```bash
bit test hello/world
```

#### Track multiple components with test files

So far, we've talked about test files being nested along with the component implementation, but it's also common for a project to have total separation between implementation and testing - usually it's manifested as a `src` directory and a `test` directory:

```bash
.
├── App.js
├── App.test.js
├── favicon.ico
├── index.js
├── src
|   └── components
|       ├── button
|       │   ├── Button.js
|       │   └── index.js
|       ├── login
|       │   ├── Login.js
|       │   └── index.js
|       └── logo
|           ├── Logo.js
|           └── index.js
└── test
    └── components
        ├── Button.spec.js
        ├── Login.spec.js
        └── Logo.spec.js
```

Here's how to track these components with their matching test files, using [glob pattern](#glob-patterns):

```bash
bit add src/components/* --tests test/components/{PARENT}.spec.js
```

**Literal translation**: for each directory in `src/components`, look for a matching test file inside `test/components` - its name should the same as each component's directory name + a `spec.js` suffix.

### Component entry point

Bit looks for `index.*` files and set them as entry points for components. A component that contains many files and no `index.js` file needs to be set with an entry point manually. Use `--main` feature of the [bit add](/docs/apis/cli-all#add) command. Here's an example directory tree of a project with a single component that does not have an index file.

```bash
.
├── package.json
└── src
    ├── hello-world
    │   ├── hello-world.js
    |   ├── second-file.js
    └── utils
        └── noop.js
```

We set an entry point (main file) for example with the `--main` flag.

```bash
bit add src/hello-world --main src/hello-world/hello-world.js
```

### Component ID

Each component has a unique ID. We use the component ID when installing and importing components in projects. We can set an ID , or let Bit resolve and define it.  
A component ID may contain a set of nested namespaces. For example, a component ID can be button(without any namespace), `ui\button` or even `ui\forms\button`. This all depends on how we want to organize components and naming conventions.

Set a specific ID for a component by adding the `--id` flag when tracking a new component:

```bash
$ bit add src/utils/noop.js --id whatever/you/want
tracking component whatever/you/want:
    added src/utils/noop.js
```

> **Grouping using the `--id` option**
>
> When we use the `--id` option, Bit assumes all the files added belong to one component with that ID. This means specifying an id groups files into one component.

#### Automatic component ID

Unless specified otherwise, Bit will define the component's name as the tracked directory name or the tracked file name.

Let's take this project as an example:

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

If you track the file `noop.js` under the `utils` directory with [bit add](/docs/apis/cli-all#add) without specifying an ID, Bit will automatically resolve the id as follows:

```bash
$ bit add src/utils/noop.js
tracking component noop:
    added src/utils/noop.js
```

Bit would resolve the ID of the component to `noop` - seeing as `noop` is the added file name.

Now, let's track the `hello-world` directory:

```bash
$ bit add src/hello-world
tracking component hello-world:
    added src/hello-world/hello-world.js
    added src/hello-world/index.js
```

This time the component name is `hello-world` - that's the name of the tracked directory, and not a specific file.

To see the defined component Ids, check out [bit status](/docs/apis/cli-all#status).

```bash
$ bit status
new components
     > noop... ok
     > hello-world... ok
```

### Namespaces

To specify a component's namespaces(s), use the `--namespace` option.  
Set a namespace for a component:

```bash
$ bit add src/utils/noop.js --namespace foo
tracking component foo/noop:
    added src/utils/noop.js
```

Or nest namespaces within each other:

```bash
$ bit add src/utils/noop.js --namespace foo/bar
tracking component foo/bar/noop:
    added src/utils/noop.js
```

#### Set a namespace for multiple components

Bit can set the same namespace for many components at once using the same `add` command.  
The following example tracks two components and puts them in the same namespace.

```bash
$ bit add src/utils/noop.js src/utils/is-string.js --namespace foo
tracking 2 new components
```

We can use our DSL to set dynamic namespaces according to the parent directory. Let’s take the following directory tree as an example:

```bash
.
├── App.js
├── App.test.js
├── favicon.ico
├── index.js
└── src
    ├── ui
    │   ├── button.js
    │   └── login.js
    └── utils
        ├── is-string.js
        └── pad-left.js
```

The project has two directories. Each directory contains two components. We can track all components and set their namespaces with a single command:

```bash
$ bit add src/*/*.js --namespace {PARENT}
tracking 4 new components
```

The components created are: `ui/button`, `ui/login`, `utils/is-string`, `utils/pad-left`. Each component's namespace is its directory name.

### Ignore files  

If we use glob patterns, we may want to exclude some files that may get tracked. For this we use `--exclude`.

```bash
$ bit add src/component/* --namespace user --exclude bad-file.js
```

> **Files excluded by default**
>
> `package.json`, `bit.json`, `node_modules`, `yarn.lock`, `package-lock.json`, `.gitignore`, `.bit.map.json` and `.bitmap` excluded by default. Bit also ignores files according to `.gitignore` file, if available.

### Untrack a component

To untrack a component, use the [bit untrack](/docs/apis/cli-all#untrack) command.

```bash
$ bit untrack hello/world
```

Untracking components is relevant for new components. To remove imported/tagged/exported components use [bit remove](/docs/apis/cli-all#remove).

### Tracking DSL

Bit provides tools for tracking many components at once across complex directory trees.

Tracking components in complex directory trees one by one is not practical. Bit solves this problem with glob patterns and DSL in its `add` command.

#### Glob Patterns

Glob patterns are wildcards whose main usage is describing an 'any' relationship using asterisks (`*`). Read more [here](https://en.wikipedia.org/wiki/Glob_(programming)).

For example, to track all items in a directory, we'd use this command:

```bash
$ bit add src/components/*
```

#### DSL
DSL stands for Domain Specific Language. It's defined by Bit, and used for dynamically matching the main file, tests files or namespaces.

The following variables are available in the DSL.

- **FILE_NAME** represents each of the component's file names.
- **PARENT** represents each of the component's file parent directory names.
- **MAIN_FILE** represents the component's main file name.

#### Track all subdirectories and files as components

Let's take a basic React app as an example:

```bash
.
├── App.js
├── App.test.js
├── favicon.ico
├── index.js
└── src
    └── components
        ├── button
        │   ├── Button.js
        │   ├── Button.spec.js
        │   └── index.js
        ├── login
        │   ├── Login.js
        │   ├── Login.spec.js
        │   └── index.js
        └── logo
            ├── Logo.js
            ├── Logo.spec.js
            └── index.js
```

We can track all these components with a single command, by using a glob pattern.

```bash
bit add src/components/*
```

Bit will go over each directory or file directly under the `components` directory and add it as a component.
To add only the directories, excluding `js` files will usually do the trick. Use the `--exclude` option with a glob pattern for that:

```bash
bit add src/components/* --exclude src/components/*.js
```

#### Track all sub-subdirectories as components

A more complex (but very common) case would be tracking components deeper inside the directory hierarchy. Let's expand out React app:

```bash
.
├── App.js
├── App.test.js
├── favicon.ico
├── index.js
└── src
    ├── utils
    │   ├── left-pad
    │   │   ├── left-pad.js
    │   │   ├── left-pad.spec.js
    │   │   └── index.js
    │   └── is-string
    │       ├── is-string.js
    │       ├── is-string.spec.js
    │       └── index.js
    └── components
        ├── button
        │   ├── Button.js
        │   ├── Button.spec.js
        │   └── index.js
        ├── login
        │   ├── Login.js
        │   ├── Login.spec.js
        │   └── index.js
        └── logo
            ├── Logo.js
            ├── Logo.spec.js
            └── index.js
```

We want to track all subdirectories of `utils` and `components`.

```bash
bit add src/*/* --exclude src/*/*.js
```

#### Track a component with multiple test files

To add a component and mark multiple files as test files, first identify the test files' naming convention - they could be named, for example, `{NAME}.spec.js`, `{NAME}.test.js` or `{NAME}-test.js`. We can leverage those conventions using glob patterns.
Let's take a look at the `button-list` component:

```bash
.
├── App.js
├── App.test.js
├── favicon.ico
├── index.js
└── src
    └── components
        └── button-list
            ├── ButtonList.js
            ├── ButtonList.spec.js
            ├── Button.js
            ├── Button.spec.js
            └── index.js  
```

We can track the entire directory as a component, and look for `.spec.js` files as test files.

```bash
$ bit add src/components/button-list --tests src/components/button-list/*.spec.js
```

#### Track multiple components with non-default main file

When you track a component, Bit needs to know which one of its files is the main file. In case it's not the default (`index.js`), you need to specify it by using the `--main` option.
For more info about setting the component's main file manually, [see here](/docs/add-and-isolate-components.html#defining-an-entry-point).

When you add multiple components with a non-default main file, it's not possible to specify a different main file name for each component.
Instead, use glob patterns and DSL in order to set a dynamic name that fits all the components.

In the following example, each component's main file takes after its directory name.

```bash
.
├── App.js
├── App.test.js
├── favicon.ico
├── index.js
└── src
    └── components
        ├── button
        │   ├── button.js
        │   ├── second-file.js
        ├── login
        │   ├── login.js
        │   ├── second-file.js
        └── logo
            ├── logo.js
            └── second-file.js
```

Tracking these component is done as follows:

```bash
$ bit add src/components/* --main src/components/{PARENT}/{PARENT}.js
```

**Literal translation**: for each parent directory inside `src/components`, the main file's name is the same as the parent directory's name + a `js` suffix.

Now let's add another complexity - each of the implementation files has a matching test file:

```bash
.
├── App.js
├── App.test.js
├── favicon.ico
├── index.js
└── src
    └── components
        ├── button
        │   ├── button.js
        │   ├── second-file.js
        │   ├── second-file.spec.js
        │   ├── button.spec.js
        ├── login
        │   ├── login.js
        │   ├── second-file.js
        │   ├── second-file.spec.js
        │   ├── login.spec.js
        └── logo
            ├── logo.js
            ├── second-file.js
            ├── second-file.spec.js
            └── logo.spec.js
```

Tracking these components with their test files is done as follows:

```bash
$ bit add src/components/* --main src/components/{PARENT}/{PARENT}.js --tests src/components/{PARENT}/{FILE_NAME}.spec.js
```

**Literal translation**: for each parent directory inside `src/components`, the main file's name is the same as the parent directory's name + a `js` suffix, and the test file's name should match one of the implementation file names + a `spec.js` suffix.

#### Track multiple components all in the same directory, with test files

Sometimes multiple components can be in the same directory. Its a common scenario to find a directory with multiple components, where each component consists of an implementation file and a test file:

```bash
.
├── App.js
├── App.test.js
├── favicon.ico
├── index.js
└── src
    └── utils
        ├── leftPad.js
        ├── leftPad.test.js
        ├── curry.js
        ├── curry.test.js
        ├── isString.js
        ├── isString.test.js
        ├── toSlug.js
        ├── toSlug.test.js
        ├── toCamelCase.js
        └── toCamelCase.test.js
```

Tracking the components in this directory is done as follows:

```bash
$ bit add src/utils/*.js --tests src/utils/{MAIN_FILE}.test.js --namespace utils
```

**Literal translation**: add a component for each `js` file in `src/utils` directory, and match a test file in the same path, with the name the same as the component's implementation file, only with a `test.js` suffix.

To see all tracked components with their matched test files, use [bit status](/docs/apis/cli-all#status) or [bit show](/docs/apis/cli-all#show).

```bash
$ bit status
new components
    > utils/left-pad... ok
    > utils/curry... ok
    > utils/is-string... ok
    > utils/to-slug.. ok
    > utils/to-camel-case.. ok
```

#### Track multiple components and setting the namespace dynamically according to parent directory

It's also possible to use the `{PARENT}` DSL when setting a namespace for components using the `--namespace` option.

## Manage Components Files

We use `bit add` to remove, add, move and rename files in and between components.

[bit add](/docs/apis/cli-all#add) is a unique command since we use it several times during a component's lifecycle. We use this command to do many operations on the files of the component.

### Adding a file to a component

To append a file to the component, we use `bit add` and specify the component ID we want to append the file too. For example, let's  append a file named `foo.js` to the existing component `foo/bar`:

```bash
$ bit add src/foo.js --id foo/bar
```

### Removing files from components

When deleting a file (that's part of a component) from the filesystem, Bit detect and handles it. So no further action needed. However, if we want to remove a file from a component without deleting it, we need to tell Bit to exclude it.  
Exclude files from existing components with the `--exclude` feature of the `bit add` command.  
Let's take a look at the following directory tree:

```bash
.
├── package.json
└── src
    └── hello-world
        ├── hello-world.js
        └── index.js
```

Add the `hello-world` directory as a component:

```bash
$ bit add src/hello-world
tracking component src/hello-world:
    added src/hello-world/hello-world.js
    added src/hello-world/index.js
```

Now exclude `index.js` from the component:

```bash
$ bit add src/hello-world --id src/hello-world --exclude src/hello-world/index.js
tracking component src/hello-world:
    added src/hello-world/hello-world.js
```

### Moving and Renaming files

When moving and renaming files, Bit won’t always track the changes. To ensure Bit tracks these changes use [bit move](/docs/apis/cli-all#move), This command is similar to [git mv](https://git-scm.com/docs/git-mv).

To move a file:

```bash
bit move src/foo/bar/index.js src/components/new/location/new-file-name.js
```

To rename a file, use `bit move` from the old to the new file name.

```bash
bit move src/foo/bar/index.js src/foo/bar/new-name.js
```

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
