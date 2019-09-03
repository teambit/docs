---
id: building-components
title: Building Components
---

Each component has a build task defined. Bit uses it to compile a component in a workspace.

## Basics of Building Components

A component contains source code. Sometimes source code requires a compilation process to be usable. Bit compiles source code using a unique components called Compilers. A Compiler is a component that takes another component’s code and uses other build tools to compile it.

### Where is the code compiled?

Bit builds components in an [isolated component environment](/docs/ext-concepts.html#what-is-an-isolated-component-environment). Bit does it to ensure true isolation of components. If a build process works, Bit can reproduce it anywhere.

## Defining a Compiler

Every component can have a compiler. Bit uses a global compiler configuration for a workspace. Bit propagate the global configuration to each component tracks in that workspace.  
Configured a global compiler with the `--compiler` flag when importing a compiler component.

```bash
$ bit import bit.envs/compilers/babel --compiler
the following component environments were installed
- bit.envs/compilers/babel@0.0.7
```

## Building a component

Use [bit build](/docs/cli-build.html) to build components that have a compiler:

```bash
$ bit build foo/bar
foo/bar
dist/foo/bar.js
dist/foo/bar.js.map
```

> **Set dist target and entry**
>
> It's possible to set `dist` target and entry by editing [bit config](/docs/conf-bit-json.html).

## Compilers maintained by bit.dev

Find a list of Compilers maintained by the [bit.dev](https://bit.dev) [here](https://bit.dev/bit/envs).
