---
id: implement-new-env
title: Implementing a New Env
---

For most cases, [extending and customizing an existing Env](/extendingp-env), will provide a good solution for your component development needs.  
If, however, Env customization is not enough, it's also possible to implement a new Env from scratch.

An Env is a specific case of an Aspect component. [See here](#) <!-- TODO --> to learn more about the structure and logic of an Aspect.

## Create a new Env

The quickest way to start implementing a new Env is by creating an Env component using a template:

```bash
bti create env my-env
```

### The env implementation file

The Envs implementation file implements different Env Services using their corresponding Service Handlers.

For example, the `getLinter` Service Handler is implemented here using the ESLint Aspect:

```ts title="my-env.env.ts"
// ...
  getLinter(context: LinterContext, transformers: EslintConfigTransformer[] = []): Linter {
    const defaultTransformer: EslintConfigTransformer = (configMutator) => {
      configMutator.addExtensionTypes(['.md', '.mdx']);
      return configMutator;
    };

    const allTransformers = [defaultTransformer, ...transformers];

    return this.eslint.createLinter(
      context,
      {
        config: eslintConfig,
        // resolve all plugins from the react environment.
        pluginPath: __dirname,
      },
      allTransformers
    );
  }

// ...
```

### The main runtime file

The main runtime file should return a class that returns an instance of the Env class, and provides an API for extending it.
The main runtime is also where the Env registers to different Aspects. For example, it is where an Env registers its workspace and component templates to the Generator Aspect.

```ts title="my-env.main.runtime.ts"
// ...

  static async provider(
    [
        // ...
    ]: ReactDeps,
    config: ReactMainConfig
  ) {
    const myEnv = new MyEnv(
        // ...
    );
    const env = new MyEnvMain(reactEnv, envs, application, workspace);
    envs.registerEnv(env);
    generator.registerComponentTemplate(componentTemplates);
    generator.registerWorkspaceTemplate(workspaceTemplates);
    return env;
  }
}

ReactAspect.addRuntime(ReactMain);
```

Use the Env [`compose`](#compose), [`merge`](#merge) and [`override`](#override) functions to provide your environment with extension support.

For example, the following method provides users of that Env with a way to extend it and customize its ESLinter configurations. Internally, it uses the `override` method

```ts title="my-env.main
  useEslint(modifiers?: UseEslintModifiers): EnvTransformer {
    const transformers = modifiers?.transformers || [];
    return this.envs.override({
      getLinter: (context: LinterContext) => this.reactEnv.getLinter(context, transformers),
    });
  }
```

#### merge

```js
merge<T>(targetEnv: Environment, sourceEnv: Environment): T
```

Merges two environments into one.
This will take a property that exists on the source Env and add it to the target Env if such property does not already exist.

#### override

```js
override(propsToOverride: Environment): EnvTransformer
```

- `EnvTransformer = (env: Environment) => Environment`

Create an env transformer which overrides specific env properties.
This function uses the `merge` API and returns a function that gets an env, and merges the `propsToOverride` with that provided env.

#### compose

```js
compose(targetEnv: Environment, envTransformers: EnvTransformer[]): Environment
```

This function enables you to compose a new environment from a list of environment transformers
it applies the transformers one by one and returns the new env.

## The preview runtime file

## The UI runtime file
