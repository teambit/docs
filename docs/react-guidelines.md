---
id: react-guidelines
title: React Guidelines
---

Bit is a generic platform that can use any type of Javascript (and its flavors) code that encapsulate specific functionality. This section adds React specific best practices on top of [Bit's general Best Practices](/docs/best-practices.html).

## React Compiler

Each Bit component is linked with a compiler. The Bit compiler is compiling or transpiling the source code to build files that can run in another project.  

The following compilers exist:

- [React+TypeScript](https://bit.dev/bit/envs/compilers/react-typescript)
- [React](https://bit.dev/bit/envs/compilers/react) - supports jsx  
- [Flow](https://bit.dev/bit/envs/compilers/flow) - supports jsx+flow
- [Preact](https://bit.dev/bit/envs/compilers/preact)  

The practices described bellow are aimed to work best with this Bit team compiler.  

To install the React Typescript compiler run:  

```bash
$ bit import bit.envs/compilers/react-typescript --compiler
the following component environments were installed
- bit.envs/react@0.1.3
```

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

## Add React Libraries as Peer Dependencies with Relaxed Versions

React cannot run when multiple instances of the react runtime libraries exist, such as `react`, `react-dom`.  

To avoid this situation, you need to make sure that the component relies on the consuming project's `react` runtime and does not "bring" it's own. To do so, you can specify the runtime packages as peerDependencies in the original project, or use the [overrides](/docs/overrides) configuration.  

You should also make sure that the version specified in the peerDependencies is as relaxed as possible. So if you are using React 16 you can specify the dependencies for React as follow:  

```json
"peerDependencies": {
  "react": "^16.9.0",
  "react-dom": "^16.9.0"
}
```

Relaxing the version is required due to the way package managers work.  If a specific version is defined (e.g. `16.8.4`), but the containing project has a slightly different version installed (e.g. `16.8.5`), NPM still installs another instance of the package, and duplication occurs.  

You can run `bit show` to view the components dependencies before tagging and tracking the component. There you can see the exact dependencies the component has.  
