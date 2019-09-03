---
id: cli-import
title: Import
---

Imports a component to your project from a remote Collection.

## Synopsis

```bash
bit import|i [-t|--tester]  [-c|--compiler] [-x|--extension] [-e|--environment]  [-p|--path <directory>] [-o|--objects] [-d|--display-dependencies] [-O|--override] [-v|--verbose] [--json] [--dist] [--conf] [--ignore-package-json]  [--skip-npm-install] [-m|--merge] [ids...] 
```

## Examples

### Import a single component from a remote Collection

When importing a component, it will be imported to the default location listed in the [bit config](/docs/conf-bit-json.html).
Component is imported without its [environments](/docs/ext-concepts.html#extensions-vs-environments) by default.

```bash
bit import username.foo/bar
```

In order to import a component to a specific location, use the `--path` flag:

```bash
bit import username.foo/bar --path src/foo
```

In order to import a component with its environments, use the `--environment` flag:

```bash
bit import username.foo/bar --environment
```

In order to import a component's specific version, use the `@` sign:

```bash
bit import username.foo/bar@1.0.4
```

### Import collection

You can use glob patterns to import an entire collection, or a part of it.

```
bit import bit.utils/*        # import entire collection
bit import bit.utils/array/*  # import entire namespace
```

### Import project's component objects from their remote Collection

The [bit config](/docs/conf-bit-json.html) contains a list of the project's sourced components. In order to import all of their updated objects (similar to running `git fetch`) at once.

```bash
bit import
```

### Import project's environments

The [bit config](/docs/conf-bit-json.html) contains the project's [environments](/docs/ext-concepts.html#extensions-vs-environments) ([compiler](/docs/building-components.html) and [tester](/docs/testing-components.html)). In order to import those, don't specify a specific component, and use the `--environment` flag:

```bash
bit import --environment
```

### Import a new environment

In order to import and set a new [environment](/docs/ext-concepts.html#extensions-vs-environments) for your project's components, use the `--tester` and `--compiler` flags:

```bash
$ bit import bit.envs/compilers/babel --compiler
$ bit import bit.envs/testers/mocha --tester
```

### Import an extension

In order to import a new [extension](/docs/ext-concepts.html#what-is-an-extension) for your project, use the `--extension` flag:

```bash
bit import bit.extensions/commands/pack --extension
```

### Pass an extra arguments to npm

In order to pass extra arguments to an npm client, place the arguments after `--`.

```bash
bit import -- --production --no-optional
```

## Options

**-t, --tester**

Import a tester [environment](/docs/ext-concepts.html#extensions-vs-environments) component

```bash
bit import bit.envs/testers/mocha --tester
```

**-v, --verbose**

Show a more verbose output when possible.

```bash
bit import username.foo/bar --verbose
```

**-j, --json**

Return the output as JSON

```bash
bit import username.foo/bar --json
```


**-c, --compiler**

Import a compiler [environment](/docs/ext-concepts.html#extensions-vs-environments) component.

```bash
bit import bit.envs/compilers/babel --compiler
```

**-e, --environment**

Install development [environment](/docs/ext-concepts.html#extensions-vs-environments) dependencies (compiler and tester), or import a component AND its environments.

```bash
bit import -e
bit import username.foo/bar --environment
```

**-p, --path <path>**

Import components into a specific directory.

```bash
bit import username.foo/bar --path src/foo
```

**-d, --display-dependencies**

Display the imported dependencies

```bash
bit import username.foo/bar --display-dependencies
```

**-O, --override**

Ignore local changes (import a component's new version even though it was changed locally).

```bash
bit import username.foo/bar --override
```

**--dist**

Write dist files (when exist) to the configured directory

```bash
bit import username.foo/bar --dist
```

**--conf**

Write the component configuration to another file (`bit.json`).

```bash
bit import username.foo/bar --conf
```

**--ignore-package-json**

Do not generate package.json for the imported component(s).

```bash
bit import username.foo/bar --ignore-package-json
```

**--extension**

Import an extension components.

```bash
bit import bit.extensions/commands/pack --extension
```