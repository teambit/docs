---
id: add-and-isolate-components
title: Tracking Files as Components
permalink: docs/add-and-isolate-components.html
redirect_from:
  - "docs/isolating-and-tracking-components.html"
  - "docs/adding-tracking-files-as-components.html"
layout: docs
category: Getting Started
next: tracking-dependencies.html
prev: remote-collection.html
---

The first step of sharing code with Bit is adding files so Bit can track them as components.

Using [bit add](/docs/cli-add.html) we can track sets of files as components. This is the first step of the component isolation process. Bit then creates a dependency graph for all tracked components. With this data, Bit creates an Isolated Component Environment for each component. In turn, this allows Bit to recreate a working environment for a component in any project.

Apart from [defining the component's file](#track-a-component) and set component's [spec files](#track-a-component-with-testspec-files), `bit add` can track [many components at once](#track-multiple-components-with-test-files-in-a-parallel-directory-tree). You can also determine a component's [entry point](#define-an-entry-point), decide the [component's ID](#component-id) and [namespace](#set-a-components-namespace).  
For more advance cases of tracking many components from the same project with all the above features, read about Bit's [tracking DSL](#tracking-dsl).

Additionally, `bit add` is used to manage the already tracked files of components. For example [adding new files to existing components](/docs/manage-component-files.html#adding-a-file-to-a-component), [removing tracked files from components](/docs/manage-component-files.html#removing-files-from-components), and [renaming tracked files](/docs/manage-component-files.html#rename-a-file).  


> **Custom Module Definition**
>
> If you are using any sort of Custom Module Definition feature in your project, to use absolute paths in your `import` statements, you'll need to define Bit's (Custom Module Resolution)[docs/tracking-dependencies.html#custom-module-resolution] configuration.

## Track a component

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

To track `hello-world`, we use [bit add](/docs/cli-add.html), list the files that compose it and set an `ID` for it.

```bash{1}
$ bit add src/hello-world.js src/index.js --id hello/world
tracking component hello/world:
    added src/hello-world.js
    added src/index.js
```

To verify Bit can isolate the component, we use [bit status](/docs/cli-status.html).

```bash{3}
$ bit status
new components
     > hello/world... ok
```

An `ok` status for a component status means that Bit can isolate the tracked component.

## Track many components with a single command

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

Use [bit status](/docs/cli-status.html) to verify the components' dependency graphs.

```bash{2,3,4}
new components
     > user/signup... ok
     > user/login... ok
     > user/profile... ok
```

## Track a component with test/spec files

You can classify files as test files. This allows bit to execute component tests and keep the test results. Test results function as quality certificate and documentation for the component. Test-files’ dependencies as `devDependencies`.

To track files as test-file, use `--tests` feature of the [bit add](/docs/cli-add.html) command. For example:

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
$ bit add src/hello-world src/index.js --tests specs/hello-world.spec.js --id hello/world
```

The component hello/world now has a test file. We can tell Bit to run its tests:

```bash
$ bit test hello/world
```

## Track multiple components, with test files in a parallel directory tree

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
$ bit add src/components/* --tests test/components/{PARENT}.spec.js
```

**Literal translation**: for each directory in `src/components`, look for a matching test file inside `test/components` - its name should the same as each component's directory name + a `spec.js` suffix.

## Define an entry point

Bit looks for `index.*` files and set them as entry points for components. A component that contains many files and no `index.js` file needs to be set with an entry point manually. Use `--main` feature of the [bit add](/docs/cli-add.html) command. Here's an example directory tree of a project with a single component that does not have an index file.

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
$ bit add src/hello-world --main src/hello-world/hello-world.js
```

## Component ID

Each component has a unique ID. We use the component ID when installing and importing components in projects. We can set an ID , or let Bit resolve and define it.  
A component ID may contain a set of nested namespaces. For example, a component ID can be button(without any namespace), `ui\button` or even `ui\forms\button`. This all depends on how we want to organize components and naming conventions.

### Set a component's ID

Set a specific ID for a component by adding the `--id` flag when tracking a new component:

```bash
$ bit add src/utils/noop.js --id whatever/you/want
tracking component whatever/you/want:
    added src/utils/noop.js
```

> **Grouping using the `--id` option**
>
> When we use the `--id` option, Bit assumes all the files added belong to one component with that ID. This means specifying an id groups files into one component.

### Set a component's namespace

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

### Set a namespace for many components

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

## Ignore files when tracking components

If we use glob patterns, we may want to exclude some files that may get tracked. For this we use `--exclude`.

```bash
$ bit add src/component/* --namespace user --exclude bad-file.js
```

> **Files excluded by default**
>
> `package.json`, `bit.json`, `node_modules`, `yarn.lock`, `package-lock.json`, `.gitignore`, `.bit.map.json` and `.bitmap` excluded by default. Bit also ignores files according to `.gitignore` file, if available.

## Untrack a component

To untrack a component, use the [bit untrack](/docs/cli-untrack.html) command.

```bash
$ bit untrack hello/world
```

Untracking components is relevant for new components. To remove imported/tagged/exported components use [bit remove](/docs/cli-remove.html).

## Automatic component ID resolution

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

If you track the file `noop.js` under the `utils` directory with [bit add](/docs/cli-add.html) without specifying an ID, Bit will automatically resolve the id as follows:

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

To see the defined component Ids, check out [bit status](/docs/cli-status.html).

```bash
$ bit status
new components
     > noop... ok
     > hello-world... ok
```

## Tracking DSL

Bit provides tools for tracking many components at once across complex directory trees.

Tracking components in complex directory trees one by one is not practical. Bit solves this problem with glob patterns and DSL in its `add` command.

### Glob Patterns

Glob patterns are wildcards whose main usage is describing an 'any' relationship using asterisks (`*`). Read more [here](https://en.wikipedia.org/wiki/Glob_(programming)).

For example, to track all items in a directory, we'd use this command:

```bash
$ bit add src/components/*
```

### DSL
DSL stands for Domain Specific Language. It's defined by Bit, and used for dynamically matching the main file, tests files or namespaces.

The following variables are available in the DSL.

- **FILE_NAME** represents each of the component's file names.
- **PARENT** represents each of the component's file parent directory names.
- **MAIN_FILE** represents the component's main file name.

### Track all subdirectories and files as components

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
$ bit add src/components/*
```

Bit will go over each directory or file directly under the `components` directory and add it as a component.
To add only the directories, excluding `js` files will usually do the trick. Use the `--exclude` option with a glob pattern for that:

```bash
$ bit add src/components/* --exclude src/components/*.js
```

### Track all sub-subdirectories as components

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

### Track a component with multiple test files

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

### Track multiple components with non-default main file

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

### Track multiple components all in the same directory, with test files

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

To see all tracked components with their matched test files, use [bit status](/docs/cli-status.html) or [bit show](/docs/cli-show.html).

```bash
$ bit status
new components
    > utils/left-pad... ok
    > utils/curry... ok
    > utils/is-string... ok
    > utils/to-slug.. ok
    > utils/to-camel-case.. ok
```

### Track multiple components and setting the namespace dynamically according to parent directory

It's also possible to use the `{PARENT}` DSL when setting a namespace for components using the `--namespace` option.
