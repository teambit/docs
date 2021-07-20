---
id: runtime-globals
title: How to set runtime globals
---

## Background

The JS compilation process often involves adding polyfills to the output compiled code. These polyfills are required and added only at the compilation phase so as to reduce duplication in the compiled code (which could be the result if we would import them separately into every dependent module).

## The Problem

Components authored in Bit workspace are set, as default, to compile without the added polyfills. This is done in order to preserve the same logic that was introduced earlier - that is, to avoid code duplications in the application's compiled code.

Even though components in a Bit workspace are authored as independent building blocks, they still need to go though the bundling process to be able to get rendered in the Workspace UI and Scope UI. This bundling is done using two services provided by the environment, 'Preview' and 'DevServer'. This makes the bundled output, produced by each environment, the analog of a bundled application.

The bundling output will not have the required polyfills since it uses the compiled output of each independent component.

## The Solution

Add the required polyfill as part of the bundling process. This is done by the extending the environment and customizing its bundler configurations. This new configurations will have the needed polyfills added by setting new entry files.

For example, to add `regeneratorRuntime` to the Webpack configurations of the `@teambit.react/react` environment, we'll do the following:

1. Create a new [environment extension](/building-with-bit/environments).

2. In the same directory of the new `*.extension.ts` file, create the file, `regenerator-runtime.js`, to import the polyfills into:

```ts
// regenerator-runtime.js

import regeneratorRuntime from 'regenerator-runtime';
import 'regenerator-runtime/runtime.js';
```

2. Create a new Webpack configuration file:

```ts
// webpack.config.ts

module.exports = {
  entry: [require.resolve('./regenerator-runtime')],
};
```

Set both environment services, the ['Preview'](/building-with-bit/environments#preview) and ['DevServer'](/building-with-bit/environments#devserver), to use the new Webpack configurations (these new configurations will be the result of the merge between the new configurations set in the extension, with the previous configurations).

```tsx
// custom-react.extension.ts

import { EnvsMain, EnvsAspect } from '@teambit/envs';
import { ReactAspect, ReactMain } from '@teambit/react';

const webpackConfig = require('./webpack.config');

export class CustomReactExtension {
  constructor(private react: ReactMain) {}

  static dependencies: any = [EnvsAspect, ReactAspect];

  static async provider([envs, react]: [EnvsMain, ReactMain]) {

    const customReactEnv = react.compose([
      // Use these environment transformers to merge the new dependency configurations
      // with the environment's default ones
      react.overridePreviewConfig(webpackConfig);
      react.overrideDevServerConfig(webpackConfig);
    ]);

    envs.registerEnv(customReactEnv);

    return new CustomReactExtension(react);
  }
}
```
