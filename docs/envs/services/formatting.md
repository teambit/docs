---
id: formatting
title: Formatting
---

Runs the environment's selected code formatter (for example, Prettier)

## Using the service (service handler)
```ts
getFormatter?: (context: FormatterContext, transformers: any[]) => Formatter
```

Returns a linter to be used by the Linter service.

For example:

```ts
export class ReactEnv implements Environment {

    // ...
    const prettierConfig = require('./prettier/prettier.config.js');
    ///...
    constructor(){
        // ...

        // The ESLint aspect
        private prettier: PrettierMain
    }

    // ...

    getFormatter(context: FormatterContext, transformers: PrettierConfigTransformer[] = []): Formatter {
        return this.prettier.createFormatter(
        context,
        {
            config: prettierConfig,
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
      react.usePrettier({
        transformers: [
          (config) => {
            config.setKey('tabWidth', 4);
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