---
id: testing
title: Testing
---

Runs the environment's selected test runner (for example, Jest)

## Using the service (service handler)

```ts
getTester(...args : any[]): Tester
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
