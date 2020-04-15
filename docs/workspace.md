---
id: workspace
title: Bit Workspace
---

Working in Bit revolves around workspaces. A workspace contains information about all the components information and provide the functionality to author, export, import, and install components. It is customary to make each VCS repository a single workspace.  

![Bit Workspace](https://storage.googleapis.com/static.bit.dev/docs/images/workspace.svg)

## Initializing Workspace

Initialize Bit workspace by running [`bit init`](/docs/apis/cli-all#init) command. The folder in which the workspace was initialized, is set as the workspace root.

```shell
$ cd project-directory
$ bit init
```

Initializing Bit workspace adds the following resources to a project:  

- workspace configuration (bit config)
- components map (.bitmap)
- components storage

### Workspace Configuration

The Bit config resides inside the project's `package.json` (if one exists) or in a `bit.json` file. The Bit config contains general information about the project.  Here is an example:

```json
"bit": {
    "env": {
        "compiler": "bit.envs/compilers/react@6.0.0"
    },
    "componentsDefaultDirectory": "components/{name}",
    "packageManager": "npm",
    "overrides": {
        "utils/sort-array": {
            "env": {
                "compiler": "bit.envs/compilers/babel@6.0.0"
            }
        },
        "ui/*": {
            "peerDependencies": {
                "react": "16.8.6",
                "react-dom": "16.8.6"
            }
        }
    }
}
```

The full list of configuration options of Bit workspace is detailed [here](/docs/conf-bit-json). Below you can find about the usage of specific options.  

### Components Map

The component map resides inside the `.bitmap`  file inside the project's root.  
Bit uses this file keep a link between components and the files that comprise them. Bit modifies the bitmap file every time the components are changed. Changes happen when adding files, tagging components, importing, or exporting.

To keep the VCS repository in sync with Bit components, the `.bitmap` file should be committed to the VCS system whenever components are changed. It is important to note that code is persistent on component only after tagging and exporting the component. Any work in progress is stored locally or can be committed to the VCS.  

### Components Storage (scope)

The workspace's component storage contains information about Bit components, such as source files, versions, and dependencies. By default, the components store is an extension to the git repository under `.git/bit` directory, but can be stored elsewhere, such as under a `.bit` folder.

The information in the component storage should not be submitted to the VCS as Bit can rebuild it by importing components that reside on remote collections, or from the component's files.  

To force Bit not to nest the local storage in `.git`, use the `--standalone` flag:

```shell
bit init --standalone
```

If an error caused data corruption, you could reset the component's storage by running:

```shell
bit init --reset
```

Inside a workspace the two types of components are:  

- Authored components
- Imported components

Although authored and imported components are similar in many ways, some key differences exist and worth noticing.

## Authored Components

Components that initiated inside the current workspace are considered "authored" components.  
The component's files retained in their original path, and Bit points to their locations. Therefore, when moving files that are parts of components, you should use the [`bit move`](/docs/apis/cli-all#move) command to specify the new location so that Bit can update the references.  

When Bit calculates the dependency graph for an authored component, it uses the npm packages as defined in  `package.json`. Bit traverses from the file's folder and locates the nearest package.json up to the workspace root. To change the versions of the packages, add packages, or remove packages, you can specify an [override rule](/docs/overrides) that apply to the component.  

### Modules Resolution

Bit also uses the [`resolveModules`](/docs/conf-bit-json#resolvemodules) workspace configuration to resolve modules locations. This configuration has two options:  

```json
"resolveModules": {
  "modulesDirectories": ["src"],
  "aliases": {
    "@": "someDir"
  }
}
```

The `modulesDirectories` option enhances the locations where Bit searches for modules. This configuration is equivalent to [Webpack `resolve.modules`](https://webpack.js.org/configuration/resolve/#resolvemodules) and is similar to [Typescript `rootDirs`](https://www.typescriptlang.org/docs/handbook/module-resolution.html#virtual-directories-with-rootdirs). So if you have any of those defined in the project, this configuration should also be defined in Bit.  

The `aliases` simplify paths for imports by mapping certain alias to a full path. This is equivalent to [Webpack `resolve.alias`](https://webpack.js.org/configuration/resolve/#resolvealias) and to [Typescript `paths`](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping).  

### Tools

Authored components use the compiler and tester defined in the [workspace's env parameter](/docs/conf-bit-json#env). To change this compiler, you can specify an [override rule](/docs/overrides) that changes the defaults.  

### Build files

When building an authored component, the build files reside inside the [dist folder](/docs/conf-bit-json#dist) configured inside the workspace relatively to the workspace root directory. By default this will be `<workspace root>/dist` for all components. Inside this folder, the generated path is relative to the component path in the project.  

## Imported Components

Imported components are components that are added to the workspace using  `bit import` from a remote scope. Note, that when installing the component using a package manager (NPM, Yarn), the components are considered regular `node_modules` packages and not as imported components.

Imported component's structure is different from the authored component. For each imported component, Bit generates a package-like structure. The built structure is similar to a package structure in a mono-repo, with Bit automating the definition.  

### Component Directory  

When a component is imported, Bit places it inside the folder defined in workspace configuration [`componentsdefaultdirectory`](/docs/conf-bit-json#componentsdefaultdirectory). It is defaulted to `components/<folder name>`.  

You can override the location for a specific component during the import statement:  

```shell
bit import username.foo/bar --path /path/to/folder
```

### Package.json

For each imported component, Bit generates a `package.json` file, in the component's root directory. The package.json is generated based on the component information.  

Bit generates the `package.json` to include the `name` and `version` defined in the component. The `main` property points to the generated main file of the component.  
You can add any other properties to the `package.json` file.  

When generating the file, Bit also adds any information defined in the workspace's `overrides` information that applies to the component.  

You may instruct Bit to skip writing the `package.json` for a file by specifying it during the import command:  

```shell
bit import username.foo/bar --ignore-package-json
```

You can also specify that the Bit writes the configuration to a `bit.json` file by specifying a `--conf` option. Add a path to determine the location of the `bit.json` file.  

```shell
bit import username.foo/bar --path /path/to/conf
```

Here is an example of an imported component package.json:  

```json
{
    "name": "@bit/bit.utils.array.diff",
    "version": "1.0.0",
    "homepage": "https://bit.dev/bit/utils/array/diff",
    "main": "dist/src/array/diff.js",
    "dependencies": {},
    "devDependencies": {
        "chai": "^4.1.2"
    },
    "peerDependencies": {},
    "componentRootFolder": "components/array/diff",
    "license": "SEE LICENSE IN LICENSE",
    "bit": {
        "env": {
            "compiler": "bit.envs/compilers/flow@0.0.10",
            "tester": "bit.envs/testers/mocha@0.0.5"
        },
        "overrides": {}
    }
}
```

### Dependencies

A Bit component has two types of [dependencies](/docs/dependencies): regular NPM packages and Bit components.  

When importing a component Bit generates for each component that has dependencies a `node_modules` folder.

Bit uses the [preferred package manager](/docs/conf-bit-json#packagemanager) defined in workspace configuration to install the packages. You can pass additional arguments to the package manager by specifying them in the [arguments configuration](/docs/conf-bit-json#packagemanagerargs) passing twice double dashes to the command that executes the package manager such as: 

```shell
bit import foo -- --no-package-lock
```

You can skip installing the components altogether by using:  

```shell
bit import username.foo/bar --skip-npm-install
```

Also, Bit does not install components when skipping the generation of `package.json`.  

To permanently skip installing packages, set to true the [saveDependenciesAsComponents](/docs/conf-bit-json#savedependenciesascomponents) workspace configuration.  

If the Bit components' dependencies are not installed using package manager, Bit imports them into the workspace. Bit places the dependencies in the directory specified in the [`dependenciesDirectory`](https://docs.bit.dev/docs/conf-bit-json#dependenciesdirectory) option in the configuration.  The default directory is `components/.dependencies`.  

### Source code

Bit generates a folder structure for the component source code in the minimal structure required to imitate the original project's folder structure. If all components reside in the original project in a single folder, the source code in the component resides in a single folder. If the original project has the component files located in sibling folders, Bit creates both folders under the component root folder.  

### Build Directory

By default, Bit imports the built artifacts when importing components and places them under the `dist` folder of the component.  

To skip importing the build files and build them locally run:  

```shell
bit import username.foo/bar --ignore-dist
```

## Workspace statuses

The `bit status` [command](/docs/apis/cli-all#status) displays the state of the tracked components in your project's workspace.

Knowing the state of the workspace's components is always important - which components are staged, modified or have missing dependencies, for example.
It's important to note that we're talking about **the state of components with pending changes** - meaning, components that are pending export - they could be tracked and before their first export, or modified after export.

A component may exist in more than one state. A state that is derived from its code status (such as modified) and a state derived from its dependencies (e.g. pending to be tagged).

Listed here are all possible component states.

### Nothing to tag or export

No components have pending changes. Either no files are tracked in the workspace, or the tracked components are exported or sourced, with no pending changes.

```shell
$ bit status
nothing to tag or export
```

### New components

Components that have been tracked, but not yet tagged.

Bit tries to to validate if a *new component* can be isolated, and will print all isolation issues it finds (if any).  
[Read more about the different isolation issues and how to resolve them](/docs/add-and-isolate-components#isolation-errors).

```shell
$ bit status
new components
  (use "bit tag --all [version]" to lock a version with all your changes)

          > bits/a ... ok
```

### Staged components

All tagged components that are ready to be [exported](/docs/apis/cli-all#export) and shared to a remote Collection.

Staged component are fully isolated by Bit.

```shell
$ bit status
staged components
  (use "bit export <remote_collection> to push these components to a remote Collection")

  > string/index. versions: 0.0.1, 0.0.2, 0.0.3 ... ok
  > string/is-string. versions: 0.0.1 ... ok
  > string/pad-left. versions: 0.0.1, 0.0.2 ... ok
```

### Modified components

Components that have already been staged, exported or sourced, and then modified - meaning there's at least one tagged version, and untagged changes on top of it.
Modified components are meant to be tagged and set as a new version.

Bit tries to to validate if a *modified component* can be isolated, and will print all isolation issues it finds (if any).  
[Read more about the different isolation issues and how to resolve them](/docs/add-and-isolate-components#isolation-errors).

```shell
$ bit status
modified components
  (use "bit tag --all [version]" to lock a version with all your changes)
  (use "bit diff" to compare changes)

> string/pad-left ... ok
```

### Pending updates

Components with newer versions fetched by `bit import` and available to use. Use [bit checkout](/docs/apis/cli-all#checkout) to start using the newer version.

```shell
$ bit status
pending updates
  (use "bit checkout [version] [component_id]" to merge changes)
  (use "bit diff [component_id] [new_version]" to compare changes)
  (use "bit log [component_id]" to list all available versions)

        > string/pad-left current: 0.0.1 latest: 0.0.2
```

### Deleted components

A component's files were physically deleted from the filesystem, but the component is still listed by Bit. The component should be removed using `bit remove`.

```shell
$ bit status
deleted components
  these components were deleted from your project.
  use "bit remove [component_id]" to remove these component from your workspace

         > bits/b ... ok
```

### Component pending to be tagged automatically

Component (not in state new) whose at least one of its dependencies is in modified state.  

```shell
$ bit status
components pending to be tagged automatically (when their dependencies are tagged)
  > string/index ... ok
```

## Errors & Troubleshooting

### Bit Doctor

`bit doctor` is a self diagnosis and healing tool for Bit workspaces. Run:

```shell
bit doctor
```

The output is a list of all diagnosis that Bit currently implements. If any of the checks has failed, Bit suggests a fix for it.

At some cases the maintainers will need additional workspace information in order to debug an issue. Doctor is capable of saving the most important data and logs from the workspace in a shareable format.  
Use this file when opening an issue to the [project repository](https://github.com/teambit/bit).

Note, before submitting the output you can open it an validate that no sensitive information is submitted. You can clear such information from the file.

```shell
bit doctor --save doctor-results
```

### Logs

Some errors and additional information are document in Bit's log files but not displayed in the console output. If you're having problems, it's worth checking the log files.

Bit's log files are stored in:

- For Mac/Linux - `~/Library/Caches/Bit/logs`.
- For Windows - `%LOCALAPPDATA%/Bit/logs`. If `%LOCALAPPDATA%` is not defined, user profile directory will be used instead of `%LOCALAPPDATA%`. Further fallback options are available [here](https://github.com/sindresorhus/os-homedir/blob/master/index.js).

The three different log types in Bit are:

- Debug log - `debug.log`.
- Exceptions log - `exceptions.log`.
- Extensions log - `extensions.log`  

Each log file's size can be maximum 10MB, and there can be maximum 10 log files of each type. They will be numbered as follows: `debug.log`, `debug1.log`, `debug2.log`, etc.
The log files are actually [winston logs](https://github.com/winstonjs/winston), and are [tailable](https://github.com/winstonjs/winston/blob/master/docs/transports.md).

### Cache

If errors occur, it is worth trying to clear Bit's cache in case it got corrupted. You can clear it using the [clear cache command](/docs/apis/cli-all#clear-cache):

```shell
bit clear-cache
```
