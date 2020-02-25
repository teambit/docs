---
id: building-components
title: Building
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

See [full collection of officially maintained compilers](https://bit.dev/bit/envs). Issues regarding any of the compilers can bre [reported here](https://github.com/teambit/envs).

## Building a component

Use [bit build](/docs/apis/cli-all#build) to build components that have a compiler:

```bash
$ bit build foo/bar
foo/bar
dist/foo/bar.js
dist/foo/bar.js.map
```

> **Set dist target and entry**
>
> It's possible to set `dist` target and entry by editing [bit config](/docs/conf-bit-json.html).

## Forking a compiler

Bit compilers provide some default configuration. If you need to change the configuration of a compiler, here are the recommended steps to follow:  

1) Create a new directory and an empty workspace in it
2) Import the compiler you want to modify, but without the --compiler flag
3) Modify the .babelrc file of the compiler to fit your needs
4) Tag and export the new version of the component to your own scope

Now, in your project configuration (`package.json` or `bit.json`), change the default compiler to be the new component.  
Run bit status to see that all components properly built. 
