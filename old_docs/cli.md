---
id: cli
title: CLI Reference
---

## add

Tracks any set of files as a single or multiple components.

```shell
bit add|a <files> [-i|--id <id>] [-m|--main <main file name>] [-t|--tests <tests>] [-n|--namespace <namespace>] [-e|--exclude <files to exclude>] [-o|--override]
```

**Tracking a single-file component**

You can track a component based on a single file.

```shell
bit add src/foo/bar.js
```

This creates a single component with one file, which is also defined as the main file.
By default, the file name becomes the component name, so the new component's id will be `bar`.

**Tracking a directory as a single component**

You can track a component based on a whole directory

```shell
bit add src/foo/
```

This creates a single component that contains all the files in the directory.
The component name becomes the child directory, so the new component's id will be `foo`.

> **Note**
>
> Bit searches for an `index` file to be defined as the component's main file. If no such file is found, the component won't be tracked and en error message will be displayed. In order to specify a custom main file, use the `--main` flag as mentioned in the next section.

**Tracking a directory as a single component, with a custom main file**

When tracking a component with multiple files, you can specify a custom main file using the `--main` flag. This is useful when:

- There is no `index` file - which means bit has no way of determining which file is the main one.
- You just want to have the last say ;)

```shell
bit add src/foo/ --main bar.js
```

This will create a component with the id `foo`, with `bar.js` as the main file (even when there's an `index` file in the same directory).

**Tracking multiple components using a file list**

You can start tracking multiple components at once using a file list - Just mention multiple files with spaces as a separator.

```shell
bit add src/foo/bar.js src/utils/connect.js
```

This will create two components: `bar` and `connect`.

**Tracking a file list as a single component**

You can track files from different places under the same component, by specifying a file list, and the `--id` flag, which specifies a component id.

```shell
bit add src/one/foo.js src/two/bar.js --id name --main src/one/foo.js
```

This will create a single component with the id `name` and the files `bar.js` and `foo.js` (which will be defined as the main file).

> **Note**
>
> The `--id` flag specifies a component id. This means that whenever you use it, bit will try to track a single component with that id.

**Tracking a component with a custom id**

You can just override bit's default naming behavior by specifying the `--id` flag.

```shell
bit add src/foo/bar.js --id whatever
```

This will create a component with the id `whatever`, instead of `bar`.

You can also specify a namespace.

```shell
bit add src/foo/bar.js --id yeah/whatever
```

This will create a component with the id `yeah/whatever`, which is composed of the namespace `yeah` and the name `whatever`. Any number of namespaces can be nested inside the id.

**Tracking an additional file for an existing component**

Forgot to add a file to a component? No worries, just add it a late phase.
Let's say you've got a component whose id is `foo/bar`, with two files: `index.js` and `bar.js`. Now you've got a new file - `new.js`.

```shell
bit add src/foo/new.js --id foo/bar
```

By specifying the existing component id, you've ensured the file will be tracked as part of the already-existing `foo/bar` component, which now contains all the three files together.

**Tracking multiple components with the same namespace**

You can track multiple components at once with the same namespace - just use the `--namespace` flag.

```bit
bit add src/foo/bar.js src/second/hi.js --namespace jaja
```

This will create two components: `jaja/bar`, `jaja/hi`.

**Tracking a single directory as multiple components**

You can use [glob pattern](<https://en.wikipedia.org/wiki/Glob_(programming)>) to track a single directory as multiple components.

```shell
bit add src/foo/*
```

This will create as many components as there are files inside the directory, all with `foo` as their namespace. For example, if `foo` directory contains two files - `bar.js` and `second.js`, two components will be created: `bar` and `second`.

> **Note**
>
> If you want to only track components of a specific file extension, just use the glob pattern as follows: `bit add src/foo/*.js`.

**Tracking a component for each sub-directory**

You can use [glob pattern](<https://en.wikipedia.org/wiki/Glob_(programming)>) to track a each sub-directory as a component.

```shell
bit add src/**/
```

This will create a component for each of src's sub-directories (and files).
For example, let's say this is our file structure:

```shell
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

**Tracking a component for each sub-directory, and setting the main file dynamically**

What happens if the main file in each component has the component/directory name?

For example, let's say this is our file structure:

```shell
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

```shell
bit add src/**/ --main '{PARENT}.js'
```

This will look for a main file with the same name as the parent directory. The components created will be: `one` (with `one.js` as the main file) and `two` (with `two.js` as the main file).

**Tracking a component for each file in each sub-directory**

You can track multiple components for each sub-directory.

```shell
bit add src/**/*
```

This will create a component for each of the files in `src` and in its sub-directories.
For example, let's say this is our file structure:

```shell
└───src
    └───one
        └───first.js
        └───second.js
    └───two
        └───third.js
    └───fourth.js
```

The components created will be: `first`, `second`, `third`, `fourth`.

**Tracking a component with a test file**

You can specify which files are the test files, so bit can later test the component.

```shell
bit add src/foo/bar.js --tests 'src/foo/bar.spec.js'
```

This will create a component with the id `bar`, with two files: `bar.js` as the main file, and `bar.spec.js` as the test file.

Now, let's say this is our file structure:

```shell
└───src
    └───foo
        └───bar.js
        └───index.js
        └───tests
            └───index.spec.js
            └───bar.spec.js
```

You can specify a whole directory of test files.

```shell
bit add src/foo --tests 'src/foo/tests/*'
```

**Tracking components for each sub-directory, and tests from a separate directory tree**

Now this is a common one: your code is under `src` directory, and your tests are under `tests` directory:

```shell
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

```shell
bit add src/**/* --tests 'tests/{PARENT}/{FILE_NAME}.spec.js'
```

This will create four components: `left-pad`, `curry`, `nav-bar`, `button`. Each component will have one main file and one test file - the corresponding one from the tests directory.

**Tracking a component with just the right files**

When you track a component as a whole directory, or when you track multiple components as a subset of directories, you might discover you have some excessive files in there. We want our components to be lean, and contain exactly what we need, and nothing more.
In order to do that, just use the `--exclude` flag, and exclude whatever you (don't) want:

You can exclude a single file.

```shell
bit add src/foo --exclude dont-want.js
```

You can exclude a whole directory.

```shell
bit add src/** --exclude src/utils
```

You can exclude using [glob pattern](<https://en.wikipedia.org/wiki/Glob_(programming)>).

```shell
bit add src/**/* --exclude src/**/*.jpg
```

You can exclude using a comma-separated-list.

```shell
bit add src/foo --exclude 'dont-want.js,thumb.jpg'
```

**Options**

**-i, --id** <name>

Component id - _\[namespaces/\]name_.
Whenever you specify this flag, bit will try to track a single component with the specified id.
The id can contain either just a name, or any number of namespaces nested by `/`, and finally the id, separated by a `/` as well. For example: `namespace1/namespace2/some-name`.

If not specified, the id will be as follows:

- When adding a file: _file_name_
- When adding a directory: _dir_name_

```shell
bit add src/foo/bar.js --id moon/sun/earth
```

Will create a component: `moon/sun/earth`.

**-m, --main** <file>

Main implementation/index file name.
If not specified, bit will look for an `index` file.

```shell
bit add src/foo --main bar.js
```

You can also use our [DSL](https://en.wikipedia.org/wiki/Domain-specific_language), which supports `PARENT` and `FILE_NAME`.

```shell
bit add src/**/ --main 'src/{PARENT}/{PARENT}.js'
```

**-t, --tests** <file...>

Specify a test file, test files directory, or tests path using our [DSL](https://en.wikipedia.org/wiki/Domain-specific_language), which supports `PARENT` and `FILE_NAME`.

Track a component with a test file.

```shell
bit add src/foo/bar.js --tests src/foo/bar.specs.js
```

Track a component with a directory of test files

```shell
bit add src/foo --tests src/foo/tests/*
```

Track a component with a test file from another directory

```shell
bit add src/foo/bar.js --tests "test/{FILE_NAME}.spec.js"
```

Track a component with test files from a parallel directory tree

```shell
bit add src/foo/bar.js --tests "test/{PARENT}/{FILE_NAME}.spec.js"
```

**-n, --namespace** <namespace>

Component(s) namespace(s). Used mainly when adding multiple components of the same namespace(s).
You can specify one namespace or multiple ones, separated by a `/` (e.g `namespace1/namespace2`).

```shell
bit add src/foo/bar.js src/second/other.js --namespace moon
```

Will create two components: `moon/bar`, `moon/other`.

**-e, --exclude** <file...>

Exclude files, directories and patterns.

You can exclude a single file.

```shell
bit add src/foo --exclude dont-want.js
```

You can exclude a whole directory.

```shell
bit add src/** --exclude src/utils
```

You can exclude using [glob pattern](<https://en.wikipedia.org/wiki/Glob_(programming)>).

```shell
bit add src/**/* --exclude src/**/*.jpg
```

You can exclude using a comma-separated-list.

```shell
bit add src/foo --exclude 'dont-want.js,thumb.jpg'
```

**-o, --override** <boolean>

override existing component if exists (default = false)

```shell
bit add src/foo/bar.js --override
```

## build

Builds a component (or all the project's components) with the configured compiler (in [bit config](/docs/conf-bit-json.html)).

```shell
bit build [-v|--verbose] [-c|--no-cache] [id]
```

Build a single component by specifying a component id:

```shell
bit build foo/bar
```

Build all components by not specifying a component id:

```shell
bit build
```

**Options**

**-v, --verbose**

Shows npm verbose output for inspection.

```shell
bit build foo/bar --verbose
```

**-c, --no-cache**

Ignore component dist cache when building component

```shell
bit build --no-cache
```

## checkout

Switch version for components, or restore working component files.

```shell
bit checkout|c [-i|--interactive-merge] [-o|--ours] [-t|--theirs] [-m|--manual] [-r|--reset] [-a|--all] [-v|--verbose] [--skip-npm-install] [--ignore-dist] <version> <component id> <latest>
```

Options:
-i, --interactive-merge when a component is modified and the merge process found conflicts, display options to resolve them
-o, --ours in case of a conflict, override the used version with the current modification
-t, --theirs in case of a conflict, override the current modification with the specified version
-m, --manual in case of a conflict, leave the files with a conflict state to resolve them manually later
-r, --reset remove local changes
-a, --all all components
-v, --verbose showing verbose output for inspection
--skip-npm-install do not install packages of the imported components
--ignore-dist do not write dist files (when exist)

**Switch between component versions in your working tree**

In case a sourced component has a newer version then the one you use in your project, and you want to test it locally before you decide to update.

```shell
$ bit import foo/bar # this will fetch all objects of the component, including newer versions
$ bit checkout 0.0.3 foo/bar # to replace the working tree of the component
```

**Switch between versions of multiple components in your working tree**

You can list a number of components together in order to use the same version for all of them.

```shell
bit checkout 0.0.3 foo/bar sun/moon
```

**Checkout the latest version of a component**

As a quick way to checkout the latest version of a component to the workspace, add the `latest` argument.

```shell
$ bit checkout latest foo/bar
```

**Checkout the latest version of all components**

Use the `--all` to checkout all components in their latest version.

```shell
bit checkout latest --all
```

**Remove local modifications of a component**

Revert all changes to `foo/bar` the version `1.0.0`

```shell
bit checkout 1.0.0 foo/bar --reset
```

**Options**

**-i, --interactive-merge**

Prompt interactive steps to resolve all conflicts.

```shell
bit checkout --interactive-merge <component_id>
```

**-o, --ours**

Triggers the `merge` command to resolve the conflict with the `--ours` flag.

```shell
bit checkout --ours <component_id>
```

**-t, --theirs**

Triggers the `merge` command to resolve the conflict with the `--their` flag.

```shell
bit checkout --theirs <component_id>
```

**-m, --manual**

Triggers the `merge` command to resolve the conflict with the `--manual` flag.

```shell
bit checkout --manual <component_id>
```

**--skip-npm-install**

Do not install package dependencies of a component when doing a checkout.

```shell
bit checkout --skip-npm-install <component_id>
```

**--ignore-dist**

Ignore distribution files of a component when doing a checkout.

```shell
bit checkout --ignore-dist <component_id>
```

**-a, --all**

Checkout all components

```shell
bit checkout latest --all
```

## clear-cache

Clears bit's cache from current working machine

```shell
bit clear-cache|cc
```

```shell
bit cc
```

## config

Manages your global Bit configuration.

```shell
bit config [list] | [get <key>] | [del <key>] | [set <key> <val>]
```

**List all configurations**

```shell
bit config list
```

**Get a specific configuration value**

```shell
bit config get user.name
```

Will return your [bit.dev](https://bit.dev) username.

**Set a configuration value**

```shell
bit config set user.name myUserName
```

**Delete a configuration value**

```shell
bit config del user.name
```

## deprecate

Marks a local/remote component as deprecated

```shell
bit deprecate|d [-r|--remote] <ids...>
```

**Mark a local component as deprecated**

```shell
bit deprecate foo/bar
```

**Mark a remote component as deprecated**

```shell
bit deprecate full.scope-name/foo/bar --remote
```

**Options**

**-r, --remote**

Deprecate a component from a remote scope.

```shell
bit deprecate full.scope-name/foo/bar --remote
```

## diff

Shows difference between components files.

```shell
bit diff <component IDs> [version]
```

**Compare all modified components to their model version**

Runs `diff` for all components in local scope. Comparing local state in the working tree to the component objets in the scope.

```shell
bit diff
```

**Compare the specified components against their modified states**

```shell
bit diff bit.example/string/pad-left
```

**Compare the specified version to used or modified files**

```shell
bit diff bit.example/string/pad-left 1.0.0
```

**Compare between two specific versions of a component**

```shell
bit diff bit.example/string/pad-left 1.0.0 2.0.0
```

## doctor

Diagnose a bit workspace.

```shell
bit doctor [-j|--json] [-s|--save] [--list]
```

**Run all checks on a workspace**

In case you have an error in any of your commands, run a full diagnosis on the workspace. If any issues are found, a set of instructions to resolve them are presented.

```shell
bit doctor
```

**Save workspace state to reproduce an issue**

Bundle all the workspace alongside Bit's logs and state and prepare it to send to the maintainers for debug.

```shell
bit doctor --save doctor-output
```

## eject

Remove components from the local scope and install them by the NPM client.

```shell
bit eject|E <ids...>
```

**Eject a non-modified tagged component and replace it with the corresponding node module**

If you used `bit import` to source a component, and want to replace it with its node module:

```shell
bit eject bit/utils/array/sort
```

**Options**

**-f, --force**  
Ignore local version. remove the components even when they are staged or modified

**-j, --json**  
print the results in JSON format

## export

export components to a remote scope.

```shell
bit export [remote] [id...]
```

**Export all staged components to the same scope**

```shell
bit export scope-name
```

**Export a specific component to a scope**

```shell
bit export scope-name component-id
```

**Export multiple to a scopes**

```shell
bit export scope-name component-id component-id2
```

**Eject component back as a dependency**

Replaces the exported components from the local scope with the corresponding packages

```shell
bit export bit.examples string/pad-left --eject
```

**Options**

**-a, --all**  
Export all components include non-staged components to the remote scope. This includes both authored and imported components.

**-f, --force**

force changing a component remote without asking for a confirmation.

**-e, --eject**

Remove the component from the repository and consume it as a dependency using a common package manager.

**-s, --set-current-scope**  
EXPERIMENTAL  
Change the component primary scope to the exported scope

**-r, --rewire**  
EXPERIMENTAL  
when exporting to a different scope, replace import/require statements in the source code to the new scope

**-d, --include-dependencies**  
EXPERIMENTAL  
when exporting to a different scope, replace import/require statements in the source code to the new scope

## graph

**Experimental** Generates a graphic image of the dependencies graph

> Must have graphviz installed on your machine: [Read instructions](https://graphviz.gitlab.io/download/)

```shell
bit graph <component> [-i --image <image>] [-r | --remote] [--all-versions] [--layout <name>]
```

**-i, --image <image>**

Path to the generated image. use one of the following extensions: [gif, png, svg, pdf]

**-r, --remote [remoteName]**

Remote name (name is optional, leave empty when id is specified)

**--all-versions**

Display all components versions not only latest

**--layout <name>**

[GraphViz layout](https://graphviz.gitlab.io/documentation/) to be applied. `dot` is the default layout. Other options are: circo, dot, fdp, neato, osage, patchwork, sfdp, twopi.

## import

Imports a component to your project from a remote scope.

```shell
bit import|i [-t|--tester]  [-c|--compiler] [-x|--extension] [-e|--environment]  [-p|--path <directory>] [-o|--objects] [-d|--display-dependencies] [-O|--override] [-v|--verbose] [--json] [--dist] [--conf] [--ignore-package-json]  [--skip-npm-install] [-m|--merge] [ids...]
```

**Import a single component from a remote scope**

When importing a component, it will be imported to the default location listed in the [bit config](/docs/conf-bit-json.html).
Component is imported without its [environments](/docs/ext-concepts.html#extensions-vs-environments) by default.

```shell
bit import username.foo/bar
```

In order to import a component to a specific location, use the `--path` flag:

```shell
bit import username.foo/bar --path src/foo
```

In order to import a component with its environments, use the `--environment` flag:

```shell
bit import username.foo/bar --environment
```

In order to import a component's specific version, use the `@` sign:

```shell
bit import username.foo/bar@1.0.4
```

**Import scope**

You can use glob patterns to import an entire scope, or a part of it.

```
bit import bit.utils/*        # import entire scope
bit import bit.utils/array/*  # import entire namespace
```

**Import project's component objects from their remote scope**

The [bit config](/docs/conf-bit-json.html) contains a list of the project's sourced components. In order to import all of their updated objects (similar to running `git fetch`) at once.

```shell
bit import
```

**Import project's environments**

The [bit config](/docs/conf-bit-json.html) contains the project's [environments](/docs/ext-concepts.html#extensions-vs-environments) ([compiler](/docs/building-components.html) and [tester](/docs/testing-components.html)). In order to import those, don't specify a specific component, and use the `--environment` flag:

```shell
bit import --environment
```

**Import a new environment**

In order to import and set a new [environment](/docs/ext-concepts.html#extensions-vs-environments) for your project's components, use the `--tester` and `--compiler` flags:

```shell
$ bit import bit.envs/compilers/babel --compiler
$ bit import bit.envs/testers/mocha --tester
```

**Import an extension**

In order to import a new [extension](/docs/ext-concepts.html#what-is-an-extension) for your project, use the `--extension` flag:

```shell
bit import bit.extensions/commands/pack --extension
```

**Pass an extra arguments to npm**

In order to pass extra arguments to an npm client, place the arguments after `--`.

```shell
bit import -- --production --no-optional
```

**Options**

**-t, --tester**

Import a tester [environment](/docs/ext-concepts.html#extensions-vs-environments) component

```shell
bit import bit.envs/testers/mocha --tester
```

**-v, --verbose**

Show a more verbose output when possible.

```shell
bit import username.foo/bar --verbose
```

**-j, --json**

Return the output as JSON

```shell
bit import username.foo/bar --json
```

**-c, --compiler**

Import a compiler [environment](/docs/ext-concepts.html#extensions-vs-environments) component.

```shell
bit import bit.envs/compilers/babel --compiler
```

**-e, --environment**

Install development [environment](/docs/ext-concepts.html#extensions-vs-environments) dependencies (compiler and tester), or import a component AND its environments.

```shell
bit import -e
bit import username.foo/bar --environment
```

**-p, --path <path>**

Import components into a specific directory.

```shell
bit import username.foo/bar --path src/foo
```

**-d, --display-dependencies**

Display the imported dependencies

```shell
bit import username.foo/bar --display-dependencies
```

**-O, --override**

Ignore local changes (import a component's new version even though it was changed locally).

```shell
bit import username.foo/bar --override
```

**--dist**

Write dist files (when exist) to the configured directory

```shell
bit import username.foo/bar --dist
```

**--conf**

Write the component configuration to another file (`bit.json`).

```shell
bit import username.foo/bar --conf
```

**--ignore-package-json**

Do not generate package.json for the imported component(s).

```shell
bit import username.foo/bar --ignore-package-json
```

**--extension**

Import an extension components.

```shell
bit import bit.extensions/commands/pack --extension
```

## init

Initializes a [bit workspace](/docs/concepts.html#bit-workspace) and creates Bit's configuration, and a `.bit` directory, which will contain Bit's objects & models. You can specify workspace defaults as parameters, that can later be changed in the configuration files.

```shell
bit init [-b|--bare] [-s|--shared <group-name>] [-T|--standalone] [--reset] [--reset-hard] [-c|--compiler] [-t|--tester] [-p|--package-manager] [-d|--default-directory]
```

and create the needed directories.

**Options**

**-b, --bare [name]**

Initializes an empty bit bare scope.

```shell
bit init --bare
```

**-s, --shared <group-name>**

Adds group write permissions to a Scope properly.

```shell
bit init --shared group-name
```

**-T, --standalone**

Creates the [component store](/docs/initializing-bit.html#component-store) outside the `.git` directory.

```shell
bit init --standalone
```

**--reset**

Resets Bit to its initial state. Use this in case you have any corrupted data.

```shell
bit init --reset
```

**--reset-hard**

Removes Bit completely from a local workspace. Use this in case you want to completely remove Bit from your project.

This will delete `.bitmap`, `bit.json` and `.bit`.

```shell
bit init --reset-hard
```

**--compiler `<compiler name>`**

Specifies default compiler to used in the workspace

```shell
bit init --compiler @bit/bit.envs.compilers.react-typescript
```

**--tester `<tester name>`**

Specifies default tester to use in the workspace

```shell
bit init --tester @bit/bit.envs.testers.jest
```

**--package-manager `<npm | yarn>`**
Specifies the default package manager to use when installing components.

```shell
bit init --package-manager yarn
```

**--default-directory `<directory name>`**
Specifies up the default directory to which components will be imported.

```shell
bit init --default-directory src/imports
```

## install

Installs all dependencies for all the sourced components (or for a specific one), whether they were defined in your `package.json` or in each of the sourced components, and [links](/docs/apis/cli-all#link) them.

Install all component package dependencies.

```shell
bit install [-v|--verbose] [id]
```

**Install dependencies for all the sourced components**

```shell
bit install
```

This will install all the dependencies for the sourced components.

**Install dependencies for a specific component**

```shell
bit install foo/bar
```

This will install all the dependencies for a specific component.

**Pass an extra arguments to npm**

In order to pass extra arguments to an npm client, place the arguments after `--`.

```shell
bit import -- --production --no-optional
```

**Options**

**-v, --versbose**

Shows a more verbose output when possible.

```shell
bit install --verbose
```

## link

Generates links to the components in the project's `node_modules`, thus allowing you to import a component using an absolute path. Also generates links to sourced components when they're used as dependencies for other components.

```shell
bit link|b
```

```shell
bit link
```

For more info, see the [Linking components section](/docs/importing-components.html#linking-components).

## list

Shows a list of all available components in a local workspace or a remote scope.

```shell
bit list|ls [-ids|--ids <ids...>] [-r|--raw] [-s|--scope] [-o|--outdated] [-j|--json] [scope]
```

**List all components in local workspace**

```shell
bit list
```

**List all components in a remote scope**

```shell
bit list [scope name]
```

**Show the local and remote versions of all local components**

```shell
bit list --outdated
```

**Options**

**-ids, --ids**

Show only the specified ids (comma-separated list)

```shell
bit ls username.foo --ids 'bar,foo'
```

**-b, --raw**

Shows raw output (more detailed, less pretty).

```shell
bit ls --raw
```

**-o, --outdated**

Shows the local and remote versions of all local components.

```shell
bit ls --outdated
```

**-j, --json**

Shows the output in JSON format.

```shell
bit ls --json
```

## log

Shows the component's [tag](/docs/apis/cli-all#tag) history.

```shell
bit log <id>
```

```shell
bit log foo/bar
```

## login

Log the CLI into Bit.

```shell
bit login |[-p|--port] <port_id> | --npmrc-path | --skip-registry-config | --suppress-browser-launch
```

**Login to an account**

Open an authentication session to a remote, and configure your default `.npmrc` file with `@bit` as a scoped registry.

```shell
$ bit login
Your browser has been opened to visit: http://bit.dev/bit-login?redirect_uri=http://localhost:8085...
```

**Login to an account using a different port**

Open an authentication session to a remote using a different port.

```shell
$ bit login --port 8086
Your browser has been opened to visit: http://bit.dev/bit-login?redirect_uri=http://localhost:8086...
```

**Do not open a browser for login**

```shell
$ bit login --suppress-browser-launch
```

**Do not configure @bit to .npmrc**

```shell
$ bit login --skip-registry-config
```

**Configure scoped registry to a non-default .npmrc file**

```shell
$ bit login --npmrc-path ~/my-configuation
```

**Options**

**-p, --port**

```shell
$ bit login --port 8086
```

## logout

Log the CLI out of Bit.

```shell
bit logout
```

**Logout from an account**

````shell
$ bit logout
succsesfully loged out


## merge

Join two development histories of a component together.

```shell
bit merge [-o|--ours] | [-t|--theirs] | [-m|--manual] <version> <component_ids>
````

**Choose local file modifications to resolve a merge conflict**

```shell
bit merge --ours 0.0.1 foo/bar
```

**Choose remote file modifications to resolve a merge conflict**

```shell
bit merge --their 0.0.1 foo/bar
```

**Set all conflicted modifications of a file to resolve manually**

```shell
bit merge --manual 0.0.1 foo/bar
```

**Options**

**-o, --ours**

```shell
bit merge --ours 0.0.1 foo/bar
```

**-t, --theirs**

```shell
bit merge --theirs 0.0.1 foo/bar
```

**-m, --manual**

```shell
bit merge --manual 0.0.1 foo/bar
```

## move

Moves a file/directory that's part of a tracked component to a new location.
This command will update the [.bitmap file](/docs/initializing-bit.html#bitmap) accordingly.

```shell
bit move|mv <from> <to>
```

**Move a file that's part of a tracked component**

```shell
bit move src/foo/bar/index.js src/components/new/location/new-file-name.js
```

**Move a directory that's part of a tracked component**

```shell
bit move src/foo src/components/new/location/foo
```

**Rename a component**

Similar to Git, you can also use `move` to rename files within a component.

```shell
$ bit move <oldDirName> <newDirName>
$ bit move <oldFileName> <newFileName>
```

## remote

Displays, adds and removes remote scopes.

```shell
bit remote [add <url>] | [rm <name>] [-g|--global]
```

**Display existing remote scopes**

```shell
bit remote
```

**Add a remote**

Add a remote to the local workspace.

```shell
bit remote add <url>
```

Or add a remote globally

```shell
bit remote add <url> --global
```

Remote name will be the remote scope name.

**Remove a remote (from local workspace/global config).**

```shell
bit remote rm <scope-name>
```

## remove

Removes a component - will delete a specific component and all of its versions. Use this with care. If a component has other components depending on it within the same scope, you will be required to change them so they will not use it (or use the --force flag).

```shell
bit remove|rm [-r|--remote] [-f|--force] [-d|--delete-files] [-s|--silent] [-t|--track] <ids...>
```

**Remove a component from its remote Scope**

In order to remove a component from a [remote Scope](/docs/export.html#create-a-remote-scope), just specify the [full component id](/docs/isolating-and-tracking-components.html#automatic-component-id-resolution) and add the remote flag `--remote`.

```shell
bit remove username.your-scope/foo/bar --remote
```

> **Note**
>
> You have to be an [owner or a collaborator](/docs/scopes-on-bitsrc.html#permission-types) on the [remote Scope](/docs/export.html#create-a-remote-scope) in order to be able to remove components from it.

**Remove a component from its remote Scope when other components depend on it**

What happens in case you're trying to remove a component that's already being used by another component?

- When both components are in the same Scope, Bit will prevent you from removing, unless you use the `--force` flag.

```shell
bit remove username.your-scope/foo/bar --force
```

- When the dependent component is in a different Scope, removal will go as planned. That's because a cached version of the removed component will remain on the other Scope, and the dependent component will continue functioning as usual.

**Remove a component from your local Scope**

In order to remove a component from your [local scope](/docs/concepts#scope), just specify the [local component id](/docs/isolating-and-tracking-components.html#automatic-component-id-resolution) (meaning - just namespace and name).

```shell
bit remove foo/bar
```

**Remove a component that other components depend on**

What happens when other components in your local Scope depend on the removed component?

- If an [exported](/docs/apis/cli-all#export) component depends on the removed component, removal will go as planned. That's because a cached version of the removed component will remain.
- If a [new](/docs/workspace#workspace-statuses) component depends on the removed component, removal will go on as planned.
- If a [staged](/docs/workspace#workspace-statuses) component depends on the removed component, Bit will prevent you from removing, unless you use the `--force` flag.

```shell
bit remove foo/bar --force
```

**Remove a modified component from your local Scope**

When you try to remove a [modified](/docs/workspace#workspace-statuses) component from your local Scope, Bit will prevent you from doing it, unless you use the `--force` flag.

```shell
bit remove foo/bar --force
```

> **Note**
>
> Removing a [new](/docs/workspace#workspace-statuses) component is basically just untracking it, so just use the [untrack command](/docs/apis/cli-all#untrack) for that.

**Remove a staged component from your local Scope**

Removing a [staged](/docs/workspace#workspace-statuses) component will remove and untrack it (meaning - it will be removed from the [.bitmap file](/docs/initializing-bit.html#bitmap)).
If you want Bit to also delete the component files, use the `--delete-files` flag:

```shell
bit remove foo/bar --delete-files
```

If, on the other hand, you want to keep tracking it as a [new](/docs/workspace#workspace-statuses) component, use the `--track` flag:

```shell
bit remove foo/bar --track
```

> **Note**
>
> If you've [tracked](/docs/isolating-and-tracking-components.html) and [tagged](/docs/versioning-tracked-components.html) two components, and one depends on the other, removing it will remove its dependency as well.

**Silently approves remove confirmation message**

Accept the `remove` prompt, without using `--force`.

```shell
bit remove foo/bar --silent
```

**Options**

**-r, --remote**

Remove the component from a remote Scope.

```shell
bit remove foo/bar --remote
```

**-f, --force**

Force remove a component, even if Bit prevents it by default.

```shell
bit remove foo/bar --force
```

**-d, --delete-files**

Delete the component's files when removing a staged component that hasn't been exported yet.

```shell
bit remove foo/bar --delete-files
```

**-t, --track**

Keep tracking the component

```shell
bit remove foo/bar --track
```

**-s, --silent**

Skip remove confirmation

```shell
bit remove foo/bar --silent
```

## show

Shows component overview.

```shell
bit show [-j|--json] [-r|--remote] [-v|--versions <version>] [-o|--outdated] [-c|--compare]
```

```shell
bit show foo/bar
```

**Options**

**-j, --json**

Displays a json output.

```shell
bit show foo/bar --json
```

**-v, --versions**

Shows the component overview for a specific version.

```shell
bit show foo/bar --versions 4.3.1
```

**-o, --outdated**

Shows the component's latest version from the remote scope (if exists).

```shell
bit show foo/bar --outdated
```

**-c, --compare**

Compares the component's current file system version to its latest tagged version.

```shell
bit show foo/bar --compare
```

## status

Displays the status of all the components currently under work.
Meaning - displays new, modified and staged components.
Does not display components that have already been exported, and components that have been imported but not modified.

> **Note**
>
> You can find a full description of all possible component statuses [here](/docs/workspace#workspace-statuses.html)

```shell
bit status|s [-j, --json]
```

```shell
bit status
```

Output will be:

```shell
new components
     > foo/bar... ok


no modified components


staged components
     > moon/sun... ok
```

## tag

Locks the version of a 'new' or 'modified' component(s). Component's status will then be 'staged'. Read about [versioning components](/docs/tag-component-version).

```shell
bit tag|t [id] [version] [-m|--message <message>] [-a|--all] [-s|--scope <scope-name>] [-p|--patch] [-mi|--minor] [-ma|--major] [-f|--force] [-v|--verbose] [-i|--ignore-unresolved-dependencies] [--skip-tests]
```

**Options**

**-m, --message <message>**

Log message describing the user changes.

```shell
bit tag foo/bar --message 'changed something, but I wont tell you what...'
```

**-a, --all [version]**

Tag all new and modified components

```shell
bit tag -all
```

**-b, --scope <scope-name>**

Tag all components of the specified scope.

```shell
bit tag --scope foo
```

**-p, --patch**

Increments the patch version number (even though that's the default behavior, so that's practically redundant).

```shell
bit tag foo/bar --patch
```

**-mi, --minor**

Increments the minor version number.

```shell
bit tag foo/bar --minor
```

**-ma, --major**

Increments the major version number.

```shell
bit tag foo/bar --major
```

**-f, --force**

Force tagging even if tests are failing or component hasn't changed.

```shell
bit tag foo/bar --force
```

**-v, --verbose**

Display test results when tagging.

```shell
bit tag foo/bar --verbose
```

**-i, --ignore-missing-dependencies**

Ignore missing package and file dependencies.

```shell
bit tag foo/bar --ignore-unresolved-dependencies
```

**--skip-tests**

Skip testing components when tagging a new version.

```shell
bit tag --skip-tests
```

**--skip-auto-tag**

Skip tagging dependencies of the tagged components

```shell
bit tag --skip-auto-tag
```

## test

Runs the tests of the specified component(s) using the configured tester.

```shell
bit test|t [-a|--all] [--fork-level] [-v|--verbose] [--include-unmodified] [id]
```

**Run tests on all your project's components**

```shell
bit test
```

**Run tests on a specific component**

```shell
bit test foo/bar
```

**Options**

**-v, --verbose**

Shows npm verbose output for inspection.

```shell
bit test foo/bar --verbose
```

**--include-unmodified**

Test all components in the workspace, including components with no modifications.

```shell
bit test --include-unmodified
```

## untag

Reverts tagging of a component(s) - Removes a staged version(s).

```shell
bit untag [id] [version] [-a|--all] [-f|--force]
```

**Untagging a specific component**

Specify a component id.

```shell
bit untag foo/bar
```

This will untag all the staged versions of the component.
You can also specify a specific version to tag.

```shell
bit untag foo/bar 1.0.2
```

**Untag a specific version for all staged components**

Specify the `--all` option and a specific version.

```shell
bit untag --all 0.0.4
```

This will untag all the staged `0.0.4` versions for all the components in the workspace.

**Untag the staged versions for all staged components**

Specify the `--all` option without any further arguments in order to untag all the staged versions for all the components in the workspace.

```shell
bit untag --all
```

**Options**

**-a, --all**

Untag all the staged versions for all staged components.

```shell
bit untag --all
```

Or untag a specific staged version for all staged components.

```shell
bit untag --all 0.0.4
```

## untrack

Untracks a new (not yet tagged) component.

```shell
bit untrack|u [-a|--all] [ids...]
```

**Untrack a specific newly-added component**

```shell
bit untrack foo/bar
```

**Untrack all newly-added components**

```shell
bit untrack --all
```

## watch

Watchs components and perform `build` on changes.

```shell
bit watch|w [-v|--verbose]
```

**Build component upon local modifications**

```shell
bit watch
```
