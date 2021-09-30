---
id: extending-env
title: Extending an Env
---

Any env aspect can provide an API from its runtimes, to extend or customize the env.
For example, an env can add an API to change its tsconfig.

The core / builtin envs used to provide such APIs which follows a common pattern.
Different services of the env, can be mutate using a mutation function, which basically get the current config, and let you change it via regular js API.
Some of these mutators include some sugar API for common mutations. for example the webpack config mutator have an API to easliy add aliases to the webpack config.
The core envs standard is to call this API in the form of `use<ToolName>` for example `useTypescript`, `useWebpack`.

<!-- TODO: maybe move it to be first, or moving to another doc (maybe in the envs aspect)-->
The envs aspect provide some usuful API to override, merge and compose envs using the following APIs:

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

## Replace services
