---
id: testing
title: Testing
---

Set the environment's Tester implementation (for example, Jest)

## Using the service (service handler)

```ts
getTester: (path: string, tester: any) => Tester;
```

For example:

```ts
export class ReactEnv implements Environment {
  constructor(
    // ...

    // The Jest Aspect
    private jestAspect: JestMain
  ) {}

  // ...

  getTester(jestConfigPath: string, jestModule = jest): Tester {
    const jestConfig = require.resolve('./jest/jest.config');
    return this.jestAspect.createTester(jestConfig);
  }
}
```
