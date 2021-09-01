---
id: compiling
title: Compiling
---

Runs the environment's selected compiler (for example, TypeScript).

## Using the service (service handler)

```ts
getCompiler: () => Compiler
```

Returns a compiler to be used by the Compiler service.


For example:

```ts
// ...

export class ReactEnv implements Environment {

constructor(
    // ...

    // The TypeScript aspect
    private tsAspect: TypescriptMain
){}

// ...

getCompiler() {
    const tsConfig = require.resolve('./typescript/tsconfig.json')
    return this.tsAspect.createCompiler(tsConfig);
}
```

