---
id: overview
title: Overview
---

The Compier aspect simplifies and standardized the process of the compiling components.

Modern apps in the JS ecosystem are usually compiled using compilers like [Babel](/), [TypeScript](/) and others into a standard format which is compatible and acceptable by browsers, bundlers (such as [Webpack](/) and [Rollup](/)) and JS execution engines such as [NodeJS](/) and [Deno](/) through standards like [ES2015](/), [ESM](/), [CommonsJS](/) and others.

The responsibility of the Bit `Compiler` aspect is standardize this process among component, by providing a simple and standard dev experience for compiling components during development and distribution.

If a compiler is configured in an env, Bit resolves the component's main file from its distribution which is ny default in the `dist` directory of the component's package by changing the `main` property in the generated `package.json`.

```bash
├── node_modules
    ├── @my-org
        ├── ui.button
          ├── dist
              ├── index.js -> `package.json` points here if `index.js` is the main file.
              ├── index.js.map
              ├── button.js
              ├── button.js.map
          ├── ...
```

## Compiling for development

Bit simplifies and standardizes compilation of components in the development [Workspace](/) for all components, regardless of the specific env configured for each, and as a result the compiler and the configuration applied, through a single command.

Compilation of components in the [Workspace](/) optimized for dev experience, performance and debugging by default.
This means [Source Maps](/) are generated and components are just transpiled (without types) into in the `node_modules` directory to ensure consistency between using a component for development or consumption purposes.

```bash
bit compile
```

Components can be watched for changes and recompiled with a single command as well.

```bash
bit watch
```

To learn more on compilation during development, please refer to [Workspace Compilation](/).

## Compiling for distribution

Compiling components for distribution is done during `build` by the Bit [Builder](/).

Component build can be simulated with `bit build` and done through [Tag](/) or [Snap](/)

```bash
bit build
```

By default, Bit includes a [Build Task](/) for compiling components in the [Build Pipeline](/) using the Compiler of your choice which is configured in the [Env](/). Compilation for distribution is optimized for runtime performance, consistency and reusability. This means [Source Maps](/) are not being generated, target is preferred to be compatible with vast majority of browsers, bundlers and JS execution engines and Types are generated for the component, which can be costly in performance.

To learn more on compilation for distribution, please refer to [Compiling for distribution](/).

## Configuring and Implementing Compilers

Compilers are configured in the [Env](/) which is configured on your [Component](/). Customizing the Compiler can be done by [customizing an existing env with your compiler](/) or by [implementing your own Env](/).

Compilers can also be implemented into Bit through few interfaces. For more information on implementing your own Compiler please refer to [Implement a Compiler](/).
