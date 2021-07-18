---
id: show-button
title: Show Button
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
defaultValue="TypeScript"
groupId="langs"
values={[
{label: 'TypeScript', value: 'TypeScript'},
{label: 'JSX', value: 'JSX'},
]}>
<TabItem value="TypeScript">

```bash
  ┌───────────────┬────────────────────────────────────────────────────────────────────┐
  │ id            │ my-scope/ui/button                                                 │
  ├───────────────┼────────────────────────────────────────────────────────────────────┤
  │ scope         │ my-scope                                                           │
  ├───────────────┼────────────────────────────────────────────────────────────────────┤
  │ name          │ ui/button                                                          │
  ├───────────────┼────────────────────────────────────────────────────────────────────┤
  │ env           │ teambit.react/react                                                │
  ├───────────────┼────────────────────────────────────────────────────────────────────┤
  │ package name  │ @my-scope/ui.button                                                │
  ├───────────────┼────────────────────────────────────────────────────────────────────┤
  │ main file     │ index.ts                                                           │
  ├───────────────┼────────────────────────────────────────────────────────────────────┤
  │ files         │ button.composition.tsx                                             │
  │               │ button.docs.mdx                                                    │
  │               │ button.tsx                                                         │
  │               │ button.spec.tsx                                                    │
  │               │ index.ts                                                           │
  ├───────────────┼────────────────────────────────────────────────────────────────────┤
  │ dev files     │ button.docs.mdx (teambit.docs/docs)                                │
  │               │ button.spec.tsx (teambit.defender/tester)                          │
  │               │ button.composition.tsx (teambit.compositions/compositions)         │
  ├───────────────┼────────────────────────────────────────────────────────────────────┤
  │ extensions    │ teambit.react/react                                                │
  │               │ teambit.component/dev-files                                        │
  │               │ teambit.compositions/compositions                                  │
  │               │ teambit.pkg/pkg                                                    │
  │               │ teambit.docs/docs                                                  │
  │               │ teambit.envs/envs                                                  │
  │               │ teambit.dependencies/dependency-resolver                           │
  ├───────────────┼────────────────────────────────────────────────────────────────────┤
  │ dependencies  │ core-js@3.8.3- (package)                                           │
  ├───────────────┼────────────────────────────────────────────────────────────────────┤
  │ dev           │ @testing-library/react@11.2.6- (package)                           │
  │ dependencies  │ @babel/runtime@7.12.18-------- (package)                           │
  │               │ @types/react-router-dom@5.1.7- (package)                           │
  │               │ @types/jest@26.0.20----------- (package)                           │
  │               │ @types/react@16.9.43---------- (package)                           │
  │               │ @types/node@12.20.4----------- (package)                           │
  ├───────────────┼────────────────────────────────────────────────────────────────────┤
  │ peer          │ react@16.13.1----- (package)                                       │
  │ dependencies  │ react-dom@16.13.1- (package)                                       │
  └───────────────┴────────────────────────────────────────────────────────────────────┘
```

  </TabItem>
  <TabItem value="JSX">

```bash
  ┌───────────────┬────────────────────────────────────────────────────────────────────┐
  │ id            │ my-scope/ui/button                                                 │
  ├───────────────┼────────────────────────────────────────────────────────────────────┤
  │ scope         │ my-scope                                                           │
  ├───────────────┼────────────────────────────────────────────────────────────────────┤
  │ name          │ ui/button                                                          │
  ├───────────────┼────────────────────────────────────────────────────────────────────┤
  │ env           │ teambit.react/react                                                │
  ├───────────────┼────────────────────────────────────────────────────────────────────┤
  │ package name  │ @my-scope/ui.button                                                │
  ├───────────────┼────────────────────────────────────────────────────────────────────┤
  │ main file     │ index.js                                                           │
  ├───────────────┼────────────────────────────────────────────────────────────────────┤
  │ files         │ button.composition.jsx                                             │
  │               │ button.docs.mdx                                                    │
  │               │ button.jsx                                                         │
  │               │ button.spec.jsx                                                    │
  │               │ index.js                                                           │
  ├───────────────┼────────────────────────────────────────────────────────────────────┤
  │ dev files     │ button.docs.mdx (teambit.docs/docs)                                │
  │               │ button.spec.jsx (teambit.defender/tester)                          │
  │               │ button.composition.jsx (teambit.compositions/compositions)         │
  ├───────────────┼────────────────────────────────────────────────────────────────────┤
  │ extensions    │ teambit.react/react                                                │
  │               │ teambit.component/dev-files                                        │
  │               │ teambit.compositions/compositions                                  │
  │               │ teambit.pkg/pkg                                                    │
  │               │ teambit.docs/docs                                                  │
  │               │ teambit.envs/envs                                                  │
  │               │ teambit.dependencies/dependency-resolver                           │
  ├───────────────┼────────────────────────────────────────────────────────────────────┤
  │ dependencies  │ core-js@3.8.3- (package)                                           │
  ├───────────────┼────────────────────────────────────────────────────────────────────┤
  │ dev           │ @testing-library/react@11.2.6- (package)                           │
  │ dependencies  │ @babel/runtime@7.12.18-------- (package)                           │
  │               │ @types/react-router-dom@5.1.7- (package)                           │
  │               │ @types/jest@26.0.20----------- (package)                           │
  │               │ @types/react@16.9.43---------- (package)                           │
  │               │ @types/node@12.20.4----------- (package)                           │
  ├───────────────┼────────────────────────────────────────────────────────────────────┤
  │ peer          │ react@16.13.1----- (package)                                       │
  │ dependencies  │ react-dom@16.13.1- (package)                                       │
  └───────────────┴────────────────────────────────────────────────────────────────────┘
```

  </TabItem>
</Tabs>
