---
id: mutate-webpack-config
title: Custom Webpack Config
---

Depending on the [Component Development Environments](https://harmony-docs.bit.dev/building-with-bit/environments) configured for components, a different default Webpack config is applied on each component. You can customize any Webpack config by creating an Environment and use the available APIs to mutate the provided configuration. Bit uses the Envs' WebPack configuration for the contents of the **overview** tab and **compositions**.

## `useWebpack`

All base environments support the `useWebpack` function to mutate their base Webpack configuration.

```js
useWebpack(modifiers?: UseWebpackModifiers): EnvTransformer

export type UseWebpackModifiers = {
  devServerConfig?: WebpackConfigTransformer[]; // Used for the 'bit start' command.
  previewConfig?: WebpackConfigTransformer[]; // Used for 'build' and 'tag' commands.
};
```

Each of the Webpack configs accepts an array of `WebpackConfigTransformer`. This is so you can build a transformer for specific features and compose them together. Each transformer can change the mutator instance (or create a new one). When returned, Bit passes the mutated instance to the next transformer in the array.

## `WebpackConfigTransformer`

The `WebpackConfigTransformer` is the main function that mutates an instance of a Webpack configuration.

```js
export type WebpackConfigTransformer = (
  config: WebpackConfigMutator,
  context: WebpackConfigTransformContext
) => WebpackConfigMutator;
```

`WebpackConfigMutator` is a class that holds the `raw` webpack config (as a member) and a set of built-in mutator functions for common tasks. [Learn more about the mutator API](https://bit.dev/teambit/webpack/modules/config-mutator).

`WebpackConfigTransformContext` is a context provided by Bit. It's purpose is to help you build transformers based on the configs' context. At the moment it supports a basic `BundleMode`.

```js
export type WebpackConfigTransformContext = {
  mode: BundlerMode;
};
export type BundlerMode = 'dev' | 'prod';
```

## Debug Prints for Config

* When building a transformer, print `config.raw` to see what was passed to the transformer.
* `config.raw` is a webpack config, which means there are cases where `JSON.stringify` will no print something which is human readable.
* Use `require('util').inspect(config.raw, {depth: 5})` (or any other depth) as an alternative way for printing `config.raw`. [Learn more](https://nodejs.org/api/util.html#util_util_inspect_object_options)).

## Upcoming Changes and Improvements

Below are changes to be introduce to Bit's support for Webpack configuration customization.

### Module Federation

We are working to natively support for [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/). Track the progress on this [issue](https://github.com/teambit/bit/issues/4338) and this [pull request](https://github.com/teambit/bit/pull/4334).

As part of this process Bit is likely to introduce additional transformers.

### Improve `WebpackConfigTransformContext`

Currently the context is pretty thin. We aim to provide additional context like component-id, entry file and the entire component object.

### Specific Env mutator

Each Env will implement its own instance for a `WebpackConfigMutator` that will be aware of the different features and rules already available as defaults for the Env. This will allow each env to provide more specific mutator methods, as the mutator will be aware fo the internal structure of the config.
