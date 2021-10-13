---
id: scope-api
title: Scope API
---

```ts
get(id: ComponentID): Promise<Component | undefined>
```

```ts title="Example"

import { ScopeMain } from '@teambit/scope'



  async get(id: ComponentID): Promise<Component | undefined> {
    return this.componentLoader.get(id);
  }
```

```ts
import { MainRuntime } from '@teambit/cli';
import { ScopeMain, ScopeAspect } from '@teambit/scope';
import { GetCompAspect } from './get-comp.aspect';

export class GetCompMain {
  static slots = [];
  static dependencies = [ScopeAspect];
  static runtime = MainRuntime;
  static async provider([scope]: [ScopeMain]) {
    const compID = await scope.resolveComponentId('my-comp');
    const myComp = await scope.get(compID);
    console.log('myComp', myComp);
    return new GetCompMain();
  }
}

GetCompAspect.addRuntime(GetCompMain);
```
