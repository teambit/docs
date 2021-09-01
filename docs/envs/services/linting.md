---
id: linting
title: Linting
---

Runs the environment's selected linter (for example, ESLint)

```ts
getLinter?: (context: LinterContext, transformers: any[]) => Linter
```

Returns a linter to be used by the Linter service.

For example:

```ts
export class ReactEnv implements Environment {
    // ...
    const eslintConfig = require('./eslint/eslintrc');
    // ...
    constructor(){
        // ...

        // The ESLint aspect
        private eslint: ESLintMain
    }

    // ...

    getLinter(context: LinterContext, transformers: EslintConfigTransformer[] = []): Linter {
        return this.eslint.createLinter(
        context,
        {
            config: eslintConfig,
            // resolve all plugins from the react environment.
            pluginPath: __dirname,
        },
        transformers
        );
    }
}
```

## Overriding the service config in an Env extension (env transformer)

```ts
import { EnvsMain, EnvsAspect } from '@teambit/envs';
import { ReactAspect, ReactMain } from '@teambit/react';

export class CustomEnvExtension {
  constructor(private react: ReactMain) {}

  static dependencies: any = [EnvsAspect, ReactAspect];

  static async provider([envs, react]: [EnvsMain, ReactMain]) {
    const CustomEnvEnv = react.compose([
      react.useEslint({
        transformers: [
          (config) => {
            config.setRule('no-console', ['error']);
            return config;
          },
        ],
      }),
    ]);

    envs.registerEnv(CustomEnvEnv);

    return new CustomEnvExtension(react);
  }
}

```