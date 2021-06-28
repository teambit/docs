## Prerequisite
This document assumes you already know what is [bit environment](https://harmony-docs.bit.dev/building-with-bit/environments)
And know at least one specific environment API like the [react env](https://harmony-docs.bit.dev/aspects/react)
And familiar with creating custom env (add link here)
It also assumes knowledge about [component docs](https://harmony-docs.bit.dev/aspects/mdx) - and [component compositions](https://harmony-docs.bit.dev/aspects/compositions)
It also assume basic knowledge about webpack and its configuration
## Background
Bit workspace/scope ui used to show your components docs and compositions in the browser. 
In order to do so, bit uses bundler (webpack only at the moment) to bundle: 
- your envs’ ui (for example the docs template and composition mount point)
- Your components docs files
- Your components composition files
Bit has some default webpack configuration with default loaders and plugins. However bit can’t support out of the box any type of file type / syntax and features supported by any webpack load / plugin / config. As it will dramatically affect bundle size / performance.
So sometime you might use something in your component that it’s not supported by the default config of the core bit environment. 
That’s the reason bit envs provided an API to mutate the default webpack config to support your own need.
This done by creating a custom env which mutate the config provided by the env your extend.

## Existing configs / bundles 
Before jumping into the way to change the webpack config, it’s important to understand what type of webpack config already exists in bit, and what they are used to.

Bit used webpack to bundle different parts of the ui, using different config and context.
Also for each usage of the bundler there are dev config and prod config.

The first section that bit bundle is the bit ui itself. This contain for example the left component tree. And the top bar (the different tabs like overview, compositions, tests, dependencies) - only the tabs themself, not the content of the tabs.
This managed by the ui aspect, you can find the aspect code [here](https://github.com/teambit/bit/tree/master/scopes/ui-foundation/ui) and it’s webpack config under the webpack folder.
This is usually not very relevant for you unless you are working on changing bit ui itself. This is not the main purpose of this document, so we won’t getting deeper on this topic.

The next think is what we called the preview iframe, this is what exists under the overview and the composition tabs.
As this is the user code, this is managed by the env itself to bundle. 
The base / default config can be found under the specific env, for example for the [react env](https://github.com/teambit/bit/tree/master/scopes/react/react/webpack)
This is also merged with the [config found under the webpack aspect](https://github.com/teambit/bit/tree/master/scopes/webpack/webpack/config)

The env webpack, actually responsible for bundling 2 different things:
1. Ui code which are part of the env code - for example the docs app/template, for example the [react docs app](https://github.com/teambit/bit/tree/master/scopes/react/ui/docs-app) 
1. UI code which are part of the components code - the component itself, the component docs files, the component compositions files.

At the moment, these 2 things are bundled together into the same bundle, but it is expected to be changed in the future (see future plan below). 
At the configuration level, they are already separated into different files. As you can see in the [react webpack config](https://github.com/teambit/bit/tree/master/scopes/react/react/webpack)

## Dev vs Prod mode
As a simple state machine, these are the modes used by bit
Bit start: ui -  prod mode, preview - dev mode
Bit start --dev: ui - dev mode, preview -dev mode
Bit build / bit tag - ui prod mode, preview prod mode

## API
As we mentioned before, bit or more accurate to say, bit’s core envs. Provided an API to mutate their webpack config by creating a custom env which extend the core env.

The main API to mutate the webpack config called `useWebpack` .

The `useWebpack` API looks like this:
```js
useWebpack(modifiers?: UseWebpackModifiers): EnvTransformer

export type UseWebpackModifiers = {
  previewConfig?: WebpackConfigTransformer[];
  devServerConfig?: WebpackConfigTransformer[];
};
```
It is basically get a modifier to change the dev server config, and to change the prod config (`previewConfig`) using [webpack transformers](#transformers)
The value is an array of transformers, so you can use multiple transformers. 
This allow you to write your transformers in a more modular way where each transformer only add specific feature, then you can compose the different transformers you want to apply.

### Transformers
A transformer is a function that's gets an instance of [config mutator](#config-mutator) and a [context](#transformer-context), and returns a config mutator.
It look like this
```js
export type WebpackConfigTransformContext = {
  mode: BundlerMode;
};
export type WebpackConfigTransformer = (
  config: WebpackConfigMutator,
  context: WebpackConfigTransformContext
) => WebpackConfigMutator;
```
Inside the transformer you can change the config mutator instance (or create a completely new one) which holds the actual config, then once you return it, bit will pass the mutated instance to the next transformer.

### Config mutator
Config mutator is a simple wrapper around webpack config, which just adding some helper methods to easily do common mutation of the config it holds.
The config has basically to parts:
1. the `raw` member which holds the raw webpack config.
2. list of methods which changes this raw config.
The mutator API is a working on progress and new API for common mutation will be added in the future.
When using the mutator you can also mutate the `raw` member manually in case you are missing helper method.
Here you can find the [mutator API and it's tests](https://bit.dev/teambit/webpack/modules/config-mutator) You can also visit it's code by clicking the `{}` icon on the top bar.
Its code is very simple.

One API that worth mentioning is the `mutator.merge` which uses [webpack merge](https://www.npmjs.com/package/webpack-merge) behind the scene to merge other configs with the raw config of the mutator.
(There is also `mergeWithCustomize` and `mergeWithRules` which uses the equivalent functions from webpack merge)

### Transformer context
Transformer context is a context provided by bit to your transformer function and aim to help you making transformers based on the context.
At the moment it looks like this and only contain the mode.
```js
export type WebpackConfigTransformContext = {
  mode: BundlerMode;
};
export type BundlerMode = 'dev' | 'prod';
```
In the future we will add more data to the context like the component id, component main file, or even the entire component object.

## Debugging/Developing tips
- When starting to develop a transformer, first log the `config.raw` you get, to see exactly what you got. bit merges as described above different configs before it gets to you. so the best way to see what you got, is to log it to the console.
- When logging using `console.log` you might get the config in a non readable way, then you might tempt to use something like `JSON.stringify(config.raw, null, 2)` to pretty log it. In that case you should know that the webpack config, under module contain regex for the `test` property, which is not printed when using `JSON.stringify`. an alternative is to use something like `require('util').inspect(config.raw, {depth: 5})` (or any other depth). (this is a [built in node API](https://nodejs.org/api/util.html#util_util_inspect_object_options))

## Examples
As an example project, you can see the [react-tailwind workspace](https://github.com/teambit/react-tailwind-env), which adds support for tailwind to bit.
Especially take a look on the [transformers](https://github.com/teambit/react-tailwind-env/blob/main/components/envs/tailwind-bit/envs/tailwind-react/webpack/transformers.ts) and how we [use them in the custom env](https://github.com/teambit/react-tailwind-env/blob/main/components/envs/tailwind-bit/envs/tailwind-react/tailwind-react.extension.ts) 

## Future plans
### React config mutator
At the moment the config mutator is a generic object which will work on every webpack config. how ever as generic API it knows nothing about an internal structure of specific envs config. therefor it can't give you helpers for mutating common stuff on specific env config.
For example in order to add a post-css plugin, it should be aware to a specific location of the post css config / rules which is not possible for generic wrapper.
In order to solve it, we plan to provide a sub instance of the mutator for each env, which is aware to the specific env config structure, and add more helpers to mutate parts on the specific env config.

### Module Federation
At the moment, we are working to natively support [webpack module federation](https://webpack.js.org/concepts/module-federation/) in bit.
You can track the progress on this [issue](https://github.com/teambit/bit/issues/4338) and this [pull request](https://github.com/teambit/bit/pull/4334)
As part of this process we will separate the bundle of the env itself (like docs app/template) from the bundle of the component code.
This most likely will affect this APIs (you might have 3 or 4 transformer options instead of 2).

