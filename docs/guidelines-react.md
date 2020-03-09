---
id: react-guidelines
title: React Guidelines
sidebar_label: React
---

Bit is a generic platform that can use any type of Javascript (and its flavors) code that encapsulate specific functionality. This section adds React specific best practices on top of [Bit's general Best Practices](/docs/best-practices.html).

*Note: Try the [Bit for React tutorial](https://docs.bit.dev/docs/tutorials/bit-react-tutorial).*

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

## React Tester

Recommended tester for react components is based on [jest](https://bit.dev/bit/envs/testers/jest).  

## Add React Libraries as Peer Dependencies with Relaxed Versions

React libraries, such as `react` and `react-dom`, should be singletons during run time. To ensure only a single instance exists, you need to make sure that the component relies on the consuming project's `react` runtime and does not "bring" it's own. To do so, you can specify the runtime packages as peerDependencies in the original project, or use the [overrides](/docs/overrides) configuration.  

You should also make sure that the version specified in the peerDependencies is as relaxed as possible. So if you are using React 16 you can specify the dependencies for React as follow:  

```json
"peerDependencies": {
  "react": "^16.9.0",
  "react-dom": "^16.9.0"
}
```

Relaxing the version is required due to the way package managers work.  If a specific version is defined (e.g. `16.8.4`), but the containing project has a slightly different version installed (e.g. `16.8.5`), NPM still installs another instance of the package, and duplication occurs.  

You can run `bit show` to view the components dependencies before tagging and tracking the component. There you can see the exact dependencies the component has.  

## Sharing Components with Redux or Mobx

Read [here](/docs/best-practices#state-managers) for suggestion on how to share components that use state managers.  

## Handling Assets and Styles

Refer to the general guidelines on how to [handle assets](/docs/best-practices#handling-assets) amd [styles](/docs/best-practices#handling-styles).

## Server Side Rendering

When using SSR framework like Nextjs with Typescript, the application is running using Nodejs. Node does not yet support the ES6 module format and you will get errors like:  

```bash
SyntaxError: Cannot use import statement outside a module
SyntaxError: Unexpected identifier
```

The React typescript compiler should be compiled as "CommonJS". You should use the [overriding](/docs/overrides) option to include the following in the compiler options:  

This is because Node is not supporting ES Modules format. To do so, you need to override the compiler Typescript options to include:  

```json
"bit.envs/compilers/react-typescript@[version]": {
    "rawConfig": {
        "tsconfig": {
            "compilerOptions": {
              "module": "CommonJS"
            },
        }
    }
}
```

## Testing with CRA

If you are using CRA (Create React App) with Jest, and you are installing Bit components (using NPM/Yarn/bit install), the component resides under `node_modules`. The format of the component is using ES Modules (i.e. `import` syntax). In CRA, Jest is instructed not to attempt to compile modules under the `node_modules` folder. 

If you want to tell Jest NOT to ignore Bit components but without the need to eject CRA, you can change the scripts section in the pacakge.json as follow: 

```json
"test:raw": "react-scripts test",
"test": "yarn test:raw -- --transformIgnorePatterns \"node_modules/(?!(@bit)/)\"",
```

The CLI parameters is the only way  to override a parameter in Jest with no ejection. Now running `yarn test` or `npm test` runs and excludes the components under `node_modules/@bit`.
