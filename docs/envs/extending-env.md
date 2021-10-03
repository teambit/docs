---
id: extending-env
title: Extending an Env
---

Any env aspect can provide an API from its runtimes, to extend or customize the env.
For example, an env can add an API to change its tsconfig.

The core / builtin envs used to provide such APIs which follows a common pattern.
Different services of the env, can be mutate using a mutation function, which basically get the current config, and let you change it via regular js API.
Some of these mutator include some sugar API for common mutations. for example the webpack config mutator have an API to easily add aliases to the webpack config.
The core envs standard is to call this API in the form of `use<ToolName>` for example `useTypescript`, `useWebpack`.

<!-- TODO: maybe move it to be first, or moving to another doc (maybe in the envs aspect)-->

The envs aspect provide some useful API to override, merge and compose envs using the following APIs:

## Abstract Env API <!-- TODO: change the title - this is APIs provided by the envs.main.runtime the generic one -->

## EnvTransformer

An env transformer is just a function that get an env and return a new env.

```js
type EnvTransformer = (env: Environment) => Environment;
```

## merge

merge two environments into one.
This will take property exist on the source env and will add it to the target env in case the target env doesn't have it.

```js
merge<T>(targetEnv: Environment, sourceEnv: Environment): T {
```

## override

create an env transformer which overrides specific env properties.
This function use the `merge` API and basically return a function that get an env, and merge the propsToOverride with the provided env.

```js
override(propsToOverride: Environment): EnvTransformer
```

## compose

This function allow you to compose a new environment from a list of environment transformers
it will apply the transformers one by one and returns the new env after all the transformers

```js
compose(targetEnv: Environment, envTransformers: EnvTransformer[]): Environment
```

## Env extension templates

<!-- TODO: decide where to write about extending env when there is no tempalte-->

Some of the env you will want to extend provide a template to create a new aspect which extend the env.
These templates will generate all the boilerplate code required in order to create a new env which extend the current env.
It's very recommend that you will provide such a template when implementing your own env.
That way anyone else can easily extend your env and add his own features for it.
All the core envs provide such templates.

For example to create a custom react env you can just run:

```bash
bit create react-env my-env
```

This will generate the following files:

```bash
scope/my-env
├── index.ts
├── jest
│   └── jest.config.js
├── my-env.aspect.ts
├── my-env.docs.mdx
├── my-env.main.runtime.ts
├── my-env.preview.runtime.ts
├── typescript
│   └── tsconfig.json
└── webpack
    └── webpack-transformers.ts
```

## Override and extend service configs

In many cases when extending an env, you don't want to replace a service, but only to mutate a service config.
For example you want the react compile (that uses TS) but you want to provide it a different webpack config.
Or provide a different config for webpack or jest.
When implementing your own env, it's recommend to let your users a way to easily change your config. you can provide different APIs for merge configs, override configs. and even APIs to do specific stuff.
For example you can add an API which change the target you are compiling to.
The core envs aspects, provides APIs in the form of overrideX or useX which let you easily change a specific config.
Any useX API gets an array of transform functions. each function gets the previous config change it, and return the new configs.
That way you can create small transformer functions, and even share as their own components, and reuse them in different envs.
An example of such transformer might be a function that change the TS config target. or add a loader to webpack.
The core transformer gets as argument a config mutator. a config mutator is a simple wrapper which holds the original config in a `raw` member of the mutator, and provide a sugar API to do common mutations.
You can see for example the [webpack config mutator](https://bit.dev/teambit/webpack/modules/config-mutator) it provide easy APIs to add plugin or alias.
Basically it just go to `this.raw.resolve.alias` and add the alias you want.
It's a way to encapsulate the internal structure of the config to let you do common changes.
For example:

```js
react.useWebpack({
  previewConfig: [
    (config) => config.addAliases({ react: 'custom-react-path' }),
  ],
});
```

:::note
The usxX APIs internally use the `override` API from the envs aspect to override a specific service handler.
:::

## Replace services

Sometime you want to completely replace a service implementation.
For example in case you want to change the compiler in the workspace from using TS to use babel.
The way to do it is to implement your own env instance, and merge it (the entire instance) with the base env you extend.
This merge is important, as usually you don't want to re-implement all the services implemented in the base env.
In order to do this, you can create your own `.env` file which implements one or more of the (env services)[https://bit.dev/teambit/envs/envs/~code/environment.ts] (see xEnv interfaces).
For example the `CompilerEnv` interface.
Later you can merge your env with the base env, using the `merge` API from the envs aspect.
You can see an example in the [core node env](https://bit.dev/teambit/harmony/node/~code/node.main.runtime.ts), which re-implement the `getDependencies` API of the core react env.
See the merge done using `const nodeEnv: NodeEnv = envs.merge(new NodeEnv(), react.reactEnv);`
And the [node env implementation](https://bit.dev/teambit/harmony/node/~code/node.env.ts) (also notice the `implements DependenciesEnv`).

:::note
You can of course combine both technics of mutate config of the base env, along with replace some other service handler completely. utilizing the `merge`, `override` and `compose` APIs provided by the envs aspect.
:::
