---
id: compiling-components
title: Compiling Components
---

//TODO compiler as an aspect should be added this is more a tutorial on how to compile components
// simplify to bit start bit watch and bit compile 3 ways of compiling components - build pipeline should not be there.

## Choosing a Compiler

Bit's Compiler is an [Environment Service](/building-with-bit/environments).
The type of compiler (Babel, TypeScript, etc.) as well as its configurations, are set by the various [environments](/building-with-bit/environments) that use it as a service.
That means, the (specific) compiler is never run directly but only via the Compiler service. That also means, a single workspace may run different compilers for different components, each according to its own environment.
To customize an environment's compiler, [see here](/building-with-bit/environments).

## Running the compiler manually

To manually run the compiler on a specific component use its [component ID](/building-with-bit/compilingcomponents):

```shell
bit compile <component-id>
```

For example:

```shell
bit compile ui-primitives/button
```

To manually run the compiler on the entire workspace:

```shell
bit compile
```

### Options

#### `--changed` `-c`

Compiles only new or modified components.

```shell
bit compile --changed
```

#### `--verbose` `-v`

Outputs data regarding the compilation. For example, the `dist` paths.

```shell
bit compile --verbose
```

#### `--json` `-j`

Outputs (to the terminal) the compiled results in a JSON format.

```shell
bit compile --json
```

## Bit processes that use the compiler

### Local dev server

Bit's local dev server (which also runs the Workspace UI) re-compiles components on each modification. This happens whenever a file is 'saved'.

```shell
bit start
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
bit watch
```

### Compile in the Build Pipeline

Compilation is also part of a component's build pipeline. As with any other Build Task, the compilation task also happens in a 'component capsule', which is an isolated instance of a component. When executed as a Build Task, the compiler processes all new or changed dependencies of that component.

When a component's build pipeline is run as part of the tagging of a new release version, the output of the compilation process is stored in the component's new version.
