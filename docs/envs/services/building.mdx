---
id: building
title: Building
---

import BuildDefinition from '@site/docs/mdx-components/definitions/bit-build.md'

<BuildDefinition />


The build service returns an array of build tasks to be used by the Builder service. Tasks will be added after and before Bit's pre-configured build tasks.

## Using the service (service handler)

```ts
getBuildPipe?: (tsconfig?: TsConfigSourceFile) => BuildTask[];
```

For example:

```ts
// ...
export class ReactEnv implements Environment {
  constructor(
    // ...
    private tester: TesterMain
  ) {}

  // ...

  getBuildPipe(): BuildTask[] {
    return [this.tester.task];
  }
}
```

## Overriding the service config in an Env extension (env transformer)

```ts
overrideBuildPipe(tasks: BuildTask[]): EnvTransformer
```

For example:

```ts
import { EnvsMain, EnvsAspect } from '@teambit/envs';
import { ReactAspect, ReactMain } from '@teambit/react';
// import the task
import { CustomTask } from './custom.task';

export class CustomReact {
  // ...

  static async provider([envs, react]: [EnvsMain, ReactMain]) {
    // Get the environment's default build pipeline using the 'getBuildPipe' service handler
    const reactPipe = react.env.getBuildPipe();

    // Add the custom task to the end of the build tasks sequence.
    const tasks = [...reactPipe, new CustomTask()];

    const newReactEnv = react.compose([react.overrideBuildPipe(tasks)]);

    // ...
  }
    
    envs.registerEnv(CustomEnvEnv);

    return new CustomEnvExtension(react);
}
```