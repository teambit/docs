---
id: packaging
title: Packaging
---

Generates the node module package for components, with properties set by the environment.

## Using the service (service handler)

```ts
getPackageJsonProps(...args : any[]): object
```

For example:

```ts
export class ReactEnv implements Environment {
  // ...

  getPackageJsonProps() {
    return {
      main: 'dist/{main}.js',
      types: '{main}.ts',
    };
  }
}
```

> As with any other 'merging' process, the properties defined in the above returned object will be added to configurations set by Bit.
> Conflicting properties will be overridden by the properties that are set here.
> Configurations that are set here may also be overridden, either by the 'pkg aspect' or by workspace configurations set using the 'variants API'.

## Overriding the service config in an Env extension (env transformer)

```ts
overridePackageJsonProps(props: PackageJsonProps): EnvTransformer
```

For example:

```ts
import { EnvsMain, EnvsAspect } from '@teambit/envs';
import { ReactAspect, ReactMain } from '@teambit/react';

const newPackageProps = {
  main: 'dist/{main}.js',
  types: '{main}.ts',
};

export class CustomEnvExtension {
  constructor(private react: ReactMain) {}

  static dependencies: any = [EnvsAspect, ReactAspect];
  static async provider([envs, react]: [EnvsMain, ReactMain]) {
    const newReactEnv = react.compose([
      react.overridePackageJsonProps(newPackageProps),
    ]);

    envs.registerEnv(CustomEnvEnv);

    return new CustomEnvExtension(react);
  }
}
```
