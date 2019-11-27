---
id: js-guidelines
title: Javascript Guide
sidebar_label: Javascript
---

Bit is a generic platform that can use with Javascript (as well as ES6) code that encapsulate specific functionality. This section adds Javascript specific best practices on top of [Bit's general Best Practices](/docs/best-practices.html).

The guide is appropriate to use with components that are not library specific. This may be NodeJS code or utility functions used in different frameworks.

## Compilers

To transpile ES6+ code use the [Babel compiler](https://bit.dev/bit/envs/compilers/babel).  
If you need babel version 6, you can revert to the compiler's v6.0.1.  

```bash
bit import bit.envs/compilers/babel --compiler
```

To bundle es6 code use the [webpack bundler](https://bit.dev/bit/envs/bundlers/webpack). The configuration used in this bundler is visible [here](https://bit.dev/bit/envs/bundlers/webpack/~code#webpack.config.js).

### Changing Compiler Configuration

To change the configuration of a compiler, here are the recommended steps to follow:

- Create a new directory and an empty workspace in it
- Import the compiler you want to modify, but without the --compiler flag
- Modify the .babelrc file of the compiler to fit your needs
- Tag and export the new version of the component to your own scope

Now, in your project configuration (`package.json` or `bit.json`), change the default compiler to be the new component.
Run bit status to see that all components properly built. You may also change it to a specific components using [overrides](/docs/overrides)

## Testers

You can use the following testers for plain vanilla code:  

- [Mocha tester](https://bit.dev/bit/envs/testers/mocha)
- [Jest tester](https://bit.dev/bit/envs/testers/jest)

To use those testers run:  

```bash
bit import bit.envs/testers/mocha --testers
```

## Use Path aliases

To avoid backward references as suggested in the [best practices](/docs/best-practices.html#prefer-absolute-paths-and-paths-aliases), use absolute paths for imports. Use the following according to your environment needs:  

- [Webpack resolve](https://webpack.js.org/configuration/resolve/)
- [tsconfig resolving](https://www.typescriptlang.org/docs/handbook/module-resolution.html)
- [Babel module resolver](https://github.com/tleunen/babel-plugin-module-resolver)
- [`NODE_PATH` environment variable](https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders)

## Ensure Bit Components are Exposed via a Single Entry Point

Each shared component should have a single entry point which is the root file of the component. Add a top-level `index.js` file that will expose all of the component’s APIs, e.g. by re-exporting them from the internal file.  
This practice reduces coupling between components as one component does not need to be aware of the internal file structure of another component. Specifically, if the component is bundled (e.g. UMD format) the internal files will not be available.  

## Handling Assets and Styles

Refer to the general guidelines on how to [handle assets](/docs/best-practices#handling-assets) and [styles](/docs/best-practices#handling-styles).
