---
id: react-guidelines
title: React Guidelines
---

Bit is a generic platform that can use any type of Javascript (and its flavors) code that encapsulate specific functionality. This section adds React specific best practices on top of [Bit's general Best Practices](/docs/best-practices.html).

## React Compiler

Each Bit component is linked with a compiler. The Bit compiler is compiling or transpiling the source code to build files that can run in another project. There are different flavours of react compilers: 

- [React](https://bit.dev/bit/envs/compilers/react) - supports jsx  
- [React+TypeScript](https://bit.dev/bit/envs/compilers/react-typescript) - supports tsx  
- [Flow](https://bit.dev/bit/envs/compilers/flow) - supports jsx+flow

Also, a Preact compiler exists:

- [Preact](https://bit.dev/bit/envs/compilers/preact)  

The practices described bellow are aimed to work best with this Bit team compiler.  

## Changing Compiler Configuration

To change the configuration of a compiler, here are the recommended steps to follow: 

1) Create a new directory and an empty workspace in it
2) Import the compiler you want to modify, but without the --compiler flag
3) Modify the .babelrc file of the compiler to fit your needs
4) Tag and export the new version of the component to your own scope

Now, in your project configuration (`package.json` or`bit.json`), change the default compiler to be the new component.  
Run bit status to see that all components properly built.  

## React Tester

Recommended tester for react components is based on [jest](https://bit.dev/bit/envs/testers/jest).  

## Add React Libraries as Peer Dependencies

In the origin project, the React run time dependencies (`react`, `react-dom` etc.) should be defined both as project dependencies and project peer dependencies.

React will err if multiple instances of the runtime libraries exist. Therefore, we want our components to only exist in the consuming project and not in the components project. When Bit extracts component dependencies, peer dependencies definitions get higher priority, and the react libraries will be defined as peer dependencies, even if they are also defined as dependencies.
