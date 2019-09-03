---
id: cli-add
title: add
permalink: docs/cli-add.html
layout: docs
category: CLI Reference
next: cli-build.html
prev: bitdev-sla.html
---

Tracks any set of files as a single or multiple components.

## Synopsis

```bash
bit add|a <files> [-i|--id <id>] [-m|--main <main file name>] [-t|--tests <tests>] [-n|--namespace <namespace>] [-e|--exclude <files to exclude>] [-o|--override]
```

## Examples

### Tracking a single-file component

You can track a component based on a single file.

```bash
bit add src/foo/bar.js
```

This creates a single component with one file, which is also defined as the main file.
By default, the file name becomes the component name, so the new component's id will be `bar`.

### Tracking a directory as a single component

You can track a component based on a whole directory

```bash
bit add src/foo/
```

This creates a single component that contains all the files in the directory.
The component name becomes the child directory, so the new component's id will be `foo`.

> **Note**
>
> Bit searches for an `index` file to be defined as the component's main file. If no such file is found, the component won't be tracked and en error message will be displayed. In order to specify a custom main file, use the `--main` flag as mentioned in the next section.

### Tracking a directory as a single component, with a custom main file

When tracking a component with multiple files, you can specify a custom main file using the `--main` flag. This is useful when:

- There is no `index` file - which means bit has no way of determining which file is the main one.
- You just want to have the last say ;)

```bash
bit add src/foo/ --main bar.js
```

This will create a component with the id `foo`, with `bar.js` as the main file (even when there's an `index` file in the same directory).

### Tracking multiple components using a file list

You can start tracking multiple components at once using a file list - Just mention multiple files with spaces as a separator.

```bash
bit add src/foo/bar.js src/utils/connect.js
```

This will create two components: `bar` and `connect`.

### Tracking a file list as a single component

You can track files from different places under the same component, by specifying a file list, and the `--id` flag, which specifies a component id.

```bash
bit add src/one/foo.js src/two/bar.js --id name --main src/one/foo.js
```

This will create a single component with the id `name` and the files `bar.js` and `foo.js` (which will be defined as the main file).

> **Note**
>
> The `--id` flag specifies a component id. This means that whenever you use it, bit will try to track a single component with that id.

### Tracking a component with a custom id

You can just override bit's default naming behavior by specifying the `--id` flag.

```bash
bit add src/foo/bar.js --id whatever
```

This will create a component with the id `whatever`, instead of `bar`.

You can also specify a namespace.

```bash
bit add src/foo/bar.js --id yeah/whatever
```

This will create a component with the id `yeah/whatever`, which is composed of the namespace `yeah` and the name `whatever`. Any number of namespaces can be nested inside the id.

### Tracking an additional file for an existing component

Forgot to add a file to a component? No worries, just add it a late phase.
Let's say you've got a component whose id is `foo/bar`, with two files: `index.js` and `bar.js`. Now you've got a new file - `new.js`.

```bash
bit add src/foo/new.js --id foo/bar
```

By specifying the existing component id, you've ensured the file will be tracked as part of the already-existing `foo/bar` component, which now contains all the three files together.

### Tracking multiple components with the same namespace

You can track multiple components at once with the same namespace - just use the `--namespace` flag.

```bit
bit add src/foo/bar.js src/second/hi.js --namespace jaja
```

This will create two components: `jaja/bar`, `jaja/hi`.

### Tracking a single directory as multiple components

You can use [glob pattern](https://en.wikipedia.org/wiki/Glob_(programming)) to track a single directory as multiple components.

```bash
bit add src/foo/*
```

This will create as many components as there are files inside the directory, all with `foo` as their namespace. For example, if `foo` directory contains two files - `bar.js` and `second.js`, two components will be created: `bar` and `second`.

> **Note**
>
> If you want to only track components of a specific file extension, just use the glob pattern as follows: `bit add src/foo/*.js`.

### Tracking a component for each sub-directory

You can use [glob pattern](https://en.wikipedia.org/wiki/Glob_(programming)) to track a each sub-directory as a component.

```bash
bit add src/**/
```

This will create a component for each of src's sub-directories (and files).
For example, let's say this is our file structure:

```bash
└───src
    └───one
        └───index.js
    └───two
        └───index.js
    └───single.js
```

The components created will be: `single`, `one`, `two`.

> **Note**
>
> If you want to exclude some of the files or directories, use the [--exclude flag](#tracking-a-component-with-just-the-right-files).

### Tracking a component for each sub-directory, and setting the main file dynamically

What happens if the main file in each component has the component/directory name?

For example, let's say this is our file structure:

```bash
└───src
    └───one
        └───one.js
        └───not-main.js
        └───README.md
    └───two
        └───two.js
        └───not-main.js
        └───README.md
```

If we'll just track each sub-directory as a component (`bit add src/**/`), bit will have no way of determining which file is the main one.

Fortunately enough, you can use our [DSL](https://en.wikipedia.org/wiki/Domain-specific_language), which supports `PARENT` and `FILE_NAME`.

```bash
bit add src/**/ --main '{PARENT}.js'
```

This will look for a main file with the same name as the parent directory. The components created will be: `one` (with `one.js` as the main file) and `two` (with `two.js` as the main file).

### Tracking a component for each file in each sub-directory

You can track multiple components for each sub-directory.

```bash
bit add src/**/*
```

This will create a component for each of the files in `src` and in its sub-directories.
For example, let's say this is our file structure:

```bash
└───src
    └───one
        └───first.js
        └───second.js
    └───two
        └───third.js
    └───fourth.js
```

The components created will be: `first`, `second`, `third`, `fourth`.

### Tracking a component with a test file

You can specify which files are the test files, so bit can later test the component.

```bash
bit add src/foo/bar.js --tests 'src/foo/bar.spec.js'
```

This will create a component with the id `bar`, with two files: `bar.js` as the main file, and `bar.spec.js` as the test file.

Now, let's say this is our file structure:

```bash
└───src
    └───foo
        └───bar.js
        └───index.js
        └───tests
            └───index.spec.js
            └───bar.spec.js
```

You can specify a whole directory of test files.

```bash
bit add src/foo --tests 'src/foo/tests/*'
```

### Tracking components for each sub-directory, and tests from a separate directory tree

Now this is a common one: your code is under `src` directory, and your tests are under `tests` directory:

```bash
└───src
    └───utils
        └───left-pad.js
        └───curry.js
    └───components
        └───NavBar.js
        └───Button.js
└───tests
    └───utils
        └───left-pad.spec.js
        └───curry.spec.js
    └───components
        └───NavBar.spec.js
        └───Button.spec.js
```

Fortunately enough, you can use our [DSL](https://en.wikipedia.org/wiki/Domain-specific_language), which supports `PARENT` and `FILE_NAME`.

```bash
bit add src/**/* --tests 'tests/{PARENT}/{FILE_NAME}.spec.js'
```

This will create four components: `left-pad`, `curry`, `nav-bar`, `button`. Each component will have one main file and one test file - the corresponding one from the tests directory.

### Tracking a component with just the right files

When you track a component as a whole directory, or when you track multiple components as a subset of directories, you might discover you have some excessive files in there. We want our components to be lean, and contain exactly what we need, and nothing more.
In order to do that, just use the `--exclude` flag, and exclude whatever you (don't) want:

You can exclude a single file.

```bash
bit add src/foo --exclude dont-want.js
```

You can exclude a whole directory.

```bash
bit add src/** --exclude src/utils
```

You can exclude using [glob pattern](https://en.wikipedia.org/wiki/Glob_(programming)).

```bash
bit add src/**/* --exclude src/**/*.jpg
```

You can exclude using a comma-separated-list.

```bash
bit add src/foo --exclude 'dont-want.js,thumb.jpg'
```

## Options

**-i, --id** <name>

Component id - *\[namespaces/\]name*.
Whenever you specify this flag, bit will try to track a single component with the specified id. 
The id can contain either just a name, or any number of namespaces nested by `/`, and finally the id, separated by a `/` as well. For example: `namespace1/namespace2/some-name`.

If not specified, the id will be as follows:

- When adding a file: *file_name*
- When adding a directory: *dir_name*

```bash
bit add src/foo/bar.js --id moon/sun/earth
```

Will create a component: `moon/sun/earth`.

**-m, --main** <file>

Main implementation/index file name.
If not specified, bit will look for an `index` file.

```bash
bit add src/foo --main bar.js
```

You can also use our [DSL](https://en.wikipedia.org/wiki/Domain-specific_language), which supports `PARENT` and `FILE_NAME`.

```bash
bit add src/**/ --main 'src/{PARENT}/{PARENT}.js'
```

**-t, --tests** <file...>

Specify a test file, test files directory, or tests path using our [DSL](https://en.wikipedia.org/wiki/Domain-specific_language), which supports `PARENT` and `FILE_NAME`.

Track a component with a test file.

```bash
bit add src/foo/bar.js --tests src/foo/bar.specs.js
```

Track a component with a directory of test files

```bash
bit add src/foo --tests src/foo/tests/*
```

Track a component with a test file from another directory

```bash
bit add src/foo/bar.js --tests "test/{FILE_NAME}.spec.js"
```

Track a component with test files from a parallel directory tree

```bash
bit add src/foo/bar.js --tests "test/{PARENT}/{FILE_NAME}.spec.js"
```

**-n, --namespace** <namespace>

Component(s) namespace(s). Used mainly when adding multiple components of the same namespace(s).
You can specify one namespace or multiple ones, separated by a `/` (e.g `namespace1/namespace2`).

```bash
bit add src/foo/bar.js src/second/other.js --namespace moon
```

Will create two components: `moon/bar`, `moon/other`.

**-e, --exclude** <file...>

Exclude files, directories and patterns.

You can exclude a single file.

```bash
bit add src/foo --exclude dont-want.js
```

You can exclude a whole directory.

```bash
bit add src/** --exclude src/utils
```

You can exclude using [glob pattern](https://en.wikipedia.org/wiki/Glob_(programming)).

```bash
bit add src/**/* --exclude src/**/*.jpg
```

You can exclude using a comma-separated-list.

```bash
bit add src/foo --exclude 'dont-want.js,thumb.jpg'
```

**-o, --override** <boolean>

override existing component if exists (default = false)

```bash
bit add src/foo/bar.js --override
```