---
id: overview
title: Overview
---

Compilation is a crucial step in making a component an independent module that can be used by other repositories as well as internally, by other components in the same workspace.

When Bit starts tracking a component, a new directory is created for it inside the workspace' `node_modules` directory. When a component gets compiled, the output of that process is placed inside the root of that directory.

For example:

```sh
├── node_modules
    ├── @my-org
        ├── react-ui.button
          ├── dist
              ├── index.js
              ├── index.js.map
              ├── button.js
              ├── button.js.map
          ├── ...
```

Bit's Compiler is an [Environment Service](/environments/environment-services). The type of compiler (Babel, TypeScript, etc.) as well as its configurations, are set by the various [environments](/environments/overview) that use it as a service. That means, a single workspace may run different compilers for different components, each according to its own environment.
To customize an environment's compiler, [see here](/environments/environment-services).

## Running the compiler manually

To manually run the compiler on a specific component use its [component ID](/bit-components/overview#component-id):

```shell
$ bbit compile <component-id>
```

For example:

```shell
$ bbit compile ui-primitives/button
```

To manually run the compiler on the entire workspace:

```shell
$ bbit compile
```

### Options

#### `--changed` `-c`

Compiles only new or modified components.

```shell
$ bbit compile --changed
```

#### `--verbose` `-v`

Outputs data regarding the compilation. For example, the `dist` paths.

```shell
$ bbit compile --verbose
```

#### `--json` `-j`

Outputs (to the terminal) the compiled results in a JSON format.

```shell
$ bbit compile --json
```

## Bit processes that use the compiler

### Local dev server

Bit's local dev server (which also runs the Workspace UI) re-compiles components on each modification. This happens whenever a file is 'saved'.

```shell
$ bbit start
ENVIRONMENT NAME        URL                      STATUS
react              http://localhost:3101         Running
node               http://localhost:3102         Running

You can now view bad-jokes components in the browser
Main UI server is running on http://localhost:3000

Waiting for component changes... (10:17:20)
```

### Compile in `watch` mode

Alongside the local dev server, Bit features a watch mode that runs different operations for modified components. Component compilation is one of these tasks.

```sh
$ bbit watch
```

### Compile in the Build Pipeline

Compilation is also part of a component's build pipeline. As with any other Build Task, the compilation task also happens in a 'component capsule', which is an isolated instance of a component. When executed as a Build Task, the compiler processes all new or changed dependencies of that component.

When a component's build pipeline is run as part of the tagging of a new release version, the output of the compilation process is stored in the component's new version.
