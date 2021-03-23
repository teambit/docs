---
id: explore-dependencies
title: Explore Dependencies
---

import { Image } from '@site/src/components/image';

### Explore Dependencies Using the Workspace UI

In the component's 'Dependencies' tab in the workspace UI, you can see a diagram of the `tech-jokes-viewer` dependency graph. As you'll see, it has two dependencies: 'button' and 'use-jokes'.

:::note
The dependency graph diagram does not include packages.
:::

<Image src="/img/explore_deps_2.png" />

### Explore Dependencies Using the CLI

To examine dependencies (packages and Bit components) use the `bit show` command:

```shell
bit show ui/widgets/tech-jokes-viewer
```

```shell {16,17,19}

  ├──────────────┼──────────────────────────────────────────────────────────────┤
  │ dev files    │ tech-jokes-viewer.docs.md (teambit.docs/docs)                │
  │              │ tech-jokes-viewer.composition.tsx                            │
  │              │ (teambit.compositions/compositions)                          │
  ├──────────────┼──────────────────────────────────────────────────────────────┤
  │ extensions   │ teambit.react/react                                          │
  │              │ teambit.component/dev-files                                  │
  │              │ teambit.compositions/compositions                            │
  │              │ teambit.pkg/pkg                                              │
  │              │ teambit.docs/docs                                            │
  │              │ teambit.envs/envs                                            │
  │              │ teambit.dependencies/dependency-resolver                     │
  │              │ teambit.pipelines/builder                                    │
  ├──────────────┼──────────────────────────────────────────────────────────────┤
  │ dependencies │ @demo-org/tech-jokes.hooks.use-jokes@0.0.1- (component)      │
  │              │ @demo-org/tech-jokes.ui.elements.button@0.0.1-(component)    │
  ├──────────────┼──────────────────────────────────────────────────────────────┤
  │ dev          │ @demo-org/tech-jokes.ui.elemets.app-bar@0.0.1- (component)   │
  │ dependencies │ @babel/runtime@^7.11.2---------------- (package)             │
  │              │ @types/react-router-dom@^5.1.5-------- (package)             │
  │              │ @types/jest@~26.0.9------------------- (package)             │
  │              │ @types/react@16.9.43------------------ (package)             │
  │              │ core-js@^3.6.5------------------------ (package)             │
  │              │ @types/node@^12.12.27----------------- (package)             │
  ├──────────────┼──────────────────────────────────────────────────────────────┤
  │ peer         │ react-dom@^16.13.1-------------------- (package)             │
  │ dependencies │ react@16.14.0------------------------- (package)             │
  └──────────────┴──────────────────────────────────────────────────────────────┘
```

A few things to notice here:

1. The 'app-bar' component is listed as a dev dependency. That is because it is only used by `tech-jokes-viewer.compositions.tsx` which is a dev file.

2. The 'extensions' section lists all dependencies of that component that are Bit extensions.
   These are components that provide component development functionality such as documentation (`teambit.docs/docs`), compositions (`teambit.compositions/compositions`) and even packaging (`teambit.pkg/pkg`).
   Different components may use different extensions for their development. Storing this information in the component itself enables it to be maintained anywhere without having to think of all the required tooling.
   These extensions are not added in any way to the final distributable code.

3. Some of the listed dependencies such as `core-js`, were not manually installed by us. These dependencies are set by the various extensions used by this component. In this case, they are configured by the React Environment (`teambit.react/react`).
