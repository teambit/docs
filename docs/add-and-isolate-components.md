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

Additionally, `bit add` is used to manage the already tracked files of components. For example [adding new files to existing components](/docs/manage-component-files.html#adding-a-file-to-a-component), [removing tracked files from components](/docs/manage-component-files.html#removing-files-from-components), and [renaming tracked files](/docs/manage-component-files.html#rename-a-file).  

> **Custom Module Definition**
>
> If you are using any sort of Custom Module Definition feature in your project, to use absolute paths in your `import` statements, you'll need to define Bit's [Custom Module Resolution](/docs/tracking-dependencies#custom-module-resolution) configuration.

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
$ bit add src/*/* --exclude src/*/*.js
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

## Tracking Dependencies

Bit manages a component's package and file dependencies.

A component may use packages or `import` files/components to work. Bit reads through all `require` and `import` statements for the components it tracks.  
There are two dependencies a component may have, [Package Dependencies](#package-dependencies) and [File Dependencies](#file-dependencies). You can read more about Bit's [automated component dependency resolution](/docs/add-and-isolate-components#component-dependencies)

- Bit creates `package.json` for all package dependencies.
- Bit should track all file dependencies. They can be a part of the same component or another one.

> **Note**
>
> If a project uses absolute imports or aliases, we need to [configure](#custom-module-resolution) it.

### Package Dependencies

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

Verify Bit has resolved all dependencies using [bit status](/docs/apis/cli-all#status).

```bash{3}
$ bit status
new components
     > component/hello-world... ok
```

Use [bit show](/docs/apis/cli-all#show) to check which version Bit has resolved for each package dependency.

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

#### Handling missing package dependencies

In some cases, Bit prompts the message 'missing package dependencies' when running [bit status](/docs/apis/cli-all#status) or [bit tag](/docs/apis/cli-all#tag).

```bash{3,4}
$ bit status
new components
     > hello/world... missing dependencies
       missing packages dependencies: left-pad
```

Bit prompts the `missing package dependencies` if it is unable to resolve all package dependencies. Bit is unable to isolate such components. To resolve this issue, we need to verify all required packages are in the repository’s `package.json` file.

### Peer Dependencies

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

### File Dependencies

A component can depend on other files. To isolate such components, we need to track these files as well. This is because the component must have these files around if we want to use it in another project.  
Bit recognizes these files by reading the `import` and `require` statements. Once Bit has the list of files, it tries to figures out whether it tracks them. There are several cases for this situation:

- Bit already tracks a required file as part of the tracked component.
- A required file can be part of another component in your project. Bit creates a dependency relationship between the two components.
- If Bit does not track the file at all, it warns about `untracked file dependencies` on [bit status](/docs/apis/cli-all#status) or [bit tag](/docs/apis/cli-all#tag)

#### Untracked file dependencies

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

When running [bit status](/docs/apis/cli-all#status), an `untracked file dependencies` warning appears.

```bash{3,4}
$ bit status
new components
     > hello/world... missing dependencies
       untracked file dependencies: src/utils/noop.js
```

Bit has read the `require` statement for `src/utils/noop.js`. However, Bit does not track the file. So Bit is unable to isolate the `hello/world` component. The error forbids it.  
There are two ways to resolve this isolation issue.

#### Add an untracked file dependency to an existing component

We can add untracked file dependencies to an existing component.  
Let's continue the flow from the [previous section](#untracked-file-dependencies) and append `src/utils/noop.js` to the component. Rerun `bit add`. Track the selected file and set the `--id` to the preexisting component.

```bash
$ bit add src/utils/noop.js --id hello/world
tracking component hello/world:
    added src/hello-world.js
    added src/index.js
    added src/utils/noop.js
```

Rerun [bit status](/docs/apis/cli-all#status) and see that Bit can isolate the component.

```bash
$ bit status
new components
    > component/hello-world... ok
```

#### Track an untracked file dependency as a new component

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

After defining the custom module resolution, Bit can find `utils/noop`. Since we haven't tracked `src/utils/noop` yet, Bit marks it as an untracked file dependency. Resolving this issue is explained [above](#untracked-file-dependencies).

## Component Dependencies

A JavaScript file has two types of dependencies it can require. They are either **Packages** that are installed as node modules by tools like npm or yarn or other **files and directories** from the project.  
Bit automates the process of managing these dependencies for the components you track. It does so by parsing all `import` or `require` statements and building a **dependency graph** for each component. When we tag a version for a component Bit saves the dependency graph. It uses it to create a `package.json` for each component.

### Dependency resolution flow

These are the steps Bit does to create a dependency graph for each component. The process starts when we track a set fo files as a component.

1. Bit reads through all tracked files to find all `import` and `require` statements.
2. Bit splits the list of required modules to packages and files (and directories).
3. Bit parses the `package.json` file at the root of the project (and all nested `package.json` files, if available), to get a complete list of the installed packages.
4. A matching process for each required package starts:
    1. If a package is required by an implementation file, but is configured as `peerDependency` in the `package.json`, Bit sets it as a `peerDependency` for the component.
    2. If the package is required by a [test file](/docs/add-and-isolate-components.html#tracking-a-component-with-testspec-files)) of the component, Bit defines it as `devDependency`.
    3. For any other case, Bit defines the package as a `dependency`.
    4. If a package is not found, Bit triggers an error about [missing package dependencies](/docs/add-and-isolate-components#missing-package-dependencies).
5. The package version is the one currently installed and required by the file.
6. Another matching process starts for each required file:
    1. If a required file is already tracked by another component, Bit sets it as a `dependency` (or a `devDependency` if the file is required by a test file), otherwise it prompts an error for [untracked file dependencies](/docs/add-and-isolate-components#untracked-file-dependencies).
    2. If the file is not found, it prompts an error for [non existing dependency file](/docs/add-and-isolate-components#non-existing-dependency-files).
7. When the parsing process completes successfully Bit can create an immutable dependency graph for the component.

> **Dependencies Edge Cases and Gotchas**
>
> * A package listed both as a `peerDependency` and a `dependency` or `devDependency` in the `package.json`,  will be considered as a `peerDependency`.
> * A package required by both test-file and implementation-file is a `dependency`.
> * A file required using a absolute path feature like Webpack resolve, tsconfig resolving, etc requires configuring [custom module resolution](/docs/add-and-isolate-components#custom-module-resolution) for Bit.

#### Working with the automated dependency resolution

The value fo using Bit's ability to manage component dependencies is that you don't need to modify the component's `package.json` file. By modifying the component's actual implementation, Bit updates the dependency graph.  
This means that in order to add/remove a dependency you need only to add/remove a `require` statement from the code. For changing the version of the dependency, install the version you'd like the component to use.

### Overriding component dependencies

Use `overrides` to bypass Bit's automated dependency definition. Add the `overrides` key. You can use it either in the [component configuration](/docs/conf-files.html#component-configuration) or the [workspace configuration](/docs/conf-files.html#workspace-configuration):

#### `overrides` in component configuration

it generates a `package.json` file in the root folder of each imported component. Open it and locate the `bit` key. Add an object named `overrides`.  
For example:

```json
{
    "bit" : {
        "overrides" : {}
    }
}
```

Now you can modify the component's `dependencies`, `devDependencies` and `peerDependencies`.

#### `overrides` in workspace configuration

Components don't have their own `package.json` files their original project. To manage them use `overrides` in the [workspace configuration](/docs/conf-files.html#workspace-configuration) file.  
In your project's `package.json` locate the `bit` configuration key (or your project's `bit.json`). Add select which component you want to override dependencies for.  
For example:

```json
{
    "bit" : {
        "overrides" : {
            "utils/is-string" : {},
            "utils/*" : {}
        }
    }
}
```

> **Overriding groups of components**
>
> You can either specify explicit component, and even glob patterns, to control groups of components.

#### Manually set dependency version

To set a version manually, use `overrides` and set any specific version or a SemVer range.  
For example:

```json
{
    "overrides" : {
        "dependencies" : {
            "lodash" : "2.3.1"  # set a specific package version
        },
        "devDependencies" : {
            "@bit.utils/is-string" : "2.1.1"   # set a specific component version
        }
    }
}
```

#### Manually add dependency

You can manually add dependencies for components using `overrides`. You can either set a specific version, or let Bit set the version of the package.  
For example:

- Add `@bit.utils/is-string` as a `devDependency` in version `1.2.3`.
- Add `react-dom` as a `peerDependency`, and let Bit define its version according the version in the project.

```json
{
    "overrides" : {
        "devDependencies" : {
            "@bit.utils/is-string" : "1.2.3"   # add a specific version of dependency
        },
        "peerDependencies" : {
            "react-dom" : "+"                  # add a dependency, and let Bit define the version
        }
    }
}
```

> **`peerDependencies` for components**
>
> Some `peerDependencies` are not required by neither the implementation or test files of a component. This means that Bit is unable to define them as such. For example, `react-dom` is never explicitly imported but is required as a dependency for any react component to work. Use the `overrides` feature to define `peerDependencies` for such cases.

#### Manually remove a dependency

To force Bit to remove any dependency from being either `dependency`, `peerDependency` or `devDependency`, add the specific dependency type to the `overrides` object. In it, write the name of the dependency to remove, and set the version number to `-`.  
For example:

- Remove the dependency for the file `./src/enums.js`.
- Remove the dependency for the component `@bit.utils/is-string`.
- Remove the dependency to the package `react`.

```json
{
    "overrides" : {
        "dependencies" : {
            "file://./src/enums.js" : "-"
        },
        "devDependencies" : {
            "@bit.utils/is-string" : "-"
        },
        "peerDependencies" : {
            "react" : "-"
        }
    }
}
```

> **Be careful!**
>
> While Bit fully supports the manual removal of dependencies, be careful when doing so. This may harm the consumers of your components, as they will lack dependencies.

## Isolation Errors

Here are some common errors and their resolution when trying to isolate a component. 

> **TIP**
>
> To validate a dependency issue is resolved, rerun `bit status`.

### Missing package dependencies

This error mainly occur on two distinct isolation issues. It may be that some of the project's package dependencies are not installed, or that you are using Custom Module Definition, or `NODE_PATH` environment variable in your project and Bit is unaware of that.

#### Installing missing packages dependencies

As described in [this section](/docs/isolating-and-tracking-components.html#tracking-a-component-with-package-dependencies), Bit has different strategies to determine a package dependency version. If all of them fail, Bit will prompt you to install the missing package dependencies.  
Use your package manager of choice to resolve the issue.

```sh
npm install
```

#### Configuring Custom Module Resolution

Bit issues a `missing package dependency` error for tracked components, in a project, that have file dependencies to absolute paths, using Custom Module Definition feature. See here how to configure Bit with your project's [Custom Module Resolution](/docs/add-and-isolate-components#custom-module-resolution).

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
