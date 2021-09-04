---
id: multiple-envs
title: Components are not using the env set for them
---


## Extending multiple runtime environments

An environment may operate in multiple runtime environments: 'Main', which runs on the server and 'UI' and 'Preview', which run on the browser.
Each runtime environment runs all files that are named with its corresponding file pattern.

An environment extension that runs on multiple runtimes is called "Aspect" an will have the following file structure:

```
|-- env-extension
    |-- env-extension.main.ts
    |-- env-extension.ui.tsx
    |-- env-extension.preview.tsx
    |-- env.extension.aspect.ts
```

### Registering an environment as an aspect

Create a `*.aspect.ts` file:

For example:

```shell
touch path/to/extension/env-extension.aspect.ts
```

Place the following lines to register your environment as a multiple runtime extension (a.k.a, an Aspect):

```ts
// env-extension.aspect.ts

import { Aspect } from '@teambit/harmony';

export const ReactWithProvidersAspect = Aspect.create({
  // The ID should be your component's ID
  // Make sure to track your extension component before registering it as an Aspect
  id: 'my-scope.react-with-providers',
});
```

### Registering a runtime extension

An aspect is a collection of multiple extensions, each extending a specific runtime.

Register each runtime extension to its corresponding runtime, using the `addRuntime` method.

For example:

```typescript
// react-extension.preview.ts

import { PreviewRuntime } from '@teambit/preview';
import { ReactAspect, ReactPreview } from '@teambit/react';
import { ReactExtensionAspect } from './react-with-providers.aspect';

export class ReactExtensionPreview {
  static runtime = PreviewRuntime;

  static dependencies = [ReactAspect];

  static async provider([react]: [ReactPreview]) {
    return new ReactExtensionPreview();
  }
}

ReactExtensionAspect.addRuntime(ReactExtensionPreview);
```

### Runtime environments

#### Main

`*.main.runtime.ts`

Node files that run in a node runtime environments and outputs to the terminal.

**Example:**
The React environment TypeScript compiler will be extended in the main runtime.

```typescript
// react-extension.main.ts

import { MainRuntime } from '@teambit/cli';
import { EnvsAspect, EnvsMain } from '@teambit/envs';
import { ReactAspect, ReactMain } from '@teambit/react';
import { ReactExtensionAspect } from './react-extension.aspect';

const tsconfig = require('./typescript/tsconfig.json');

export class ReactExtensionMain {
  constructor(private react: ReactMain, private envs: EnvsMain) {}

  icon() {
    return 'https://static.bit.dev/extensions-icons/react.svg';
  }

  static runtime = MainRuntime;

  static dependencies = [ReactAspect, EnvsAspect];

  static async provider([react, envs]: [ReactMain, EnvsMain]) {
    const reactExtension = envs.compose(react, [react.overrideTsConfig(tsconfig)]);
    envs.registerEnv(reactExtension);
    return new ReactWithProvidersMain(react, envs);
  }
}

ReactExtensionAspect.addRuntime(ReactExtensionMain);
```

#### UI

`*.ui.runtime.[ts,js,jsx,tsx]`

JSX files that run in the browser, as part of the Workspace/Scope UI bundle that is being served by the development server.

#### Preview

`*.preview.runtime.*`

These files are served by the environment's server, as part of the environment's preview bundle (i.e, the component compositions and documentation).
(The 'preview' runtime is rendered in the Workspace/Scope UI using an iframe.)

**Example:**
A new composition provider that will "wrap" every composition using that environment will be added using the preview runtime since it is part of the component compositions (which are being served to the browser by the environment's server).

```typescript
// react-extension.preview.ts

import { PreviewRuntime } from '@teambit/preview';
import { ReactAspect, ReactPreview } from '@teambit/react';
import { ReactExtensionAspect } from './react-with-providers.aspect';
import { Center } from './my-providers/center';

export class ReactExtensionPreview {
  static runtime = PreviewRuntime;

  static dependencies = [ReactAspect];

  static async provider([react]: [ReactPreview]) {
    react.registerProvider(Center);

    return new ReactExtensionPreview();
  }
}

ReactExtensionAspect.addRuntime(ReactExtensionPreview);
```

## Troubleshooting

**Problem:** Components that are configured to use a specific environment, use the workspace's default environment, instead.

For example:

```json
{
  "teambit.workspace/variants": {
    "*": {
      "teambit.react/react": {}
    },
    "components/utils": {
      "teambit.harmony/node": {}
    }
  }
}
```

In the above example, components in the `components/utils` directory are set to use the Node environment.
Since that selection is more specific than the one done using the `*` wildcard selector, it is expected to override it.

**Understanding the problem:**
To select the right configurations for each component, the 'Variants' aspect sorts all workspace configurations, from the most specific to the most general.
The first configuration set on an aspect (the most specific one) will be the one that is selected for that aspect.
That means, once Variants encounters configurations for an aspect, it stops looking for additional configurations for that specific aspect.

Each environment is considered as a different aspect, even though they are all under the "environments" category and can only be used once per component.
'Variants' does not understand categories, only individual aspects and therefore, cannot override one environment with a different environment.

**Solution #1:**

Remove the `*` general selection and use only specific and exclusive selectors to configure environments
(that means your workspace directories/ namespaces need to be structured in a way that enables complete selection of all components using selectors that are exclusive).

For example:

```json
{
  "teambit.workspace/variants": {
    "components/react": {
      "teambit.react/react": {}
    },
    "components/utils": {
      "teambit.harmony/node": {}
    }
  }
}
```

**Solution #2:**
Configure the environment using the Envs config API.

Example:

```json
{
  "teambit.workspace/variants": {
    "*": {
      "teambit.react/react": {}
    },
    "components/utils": {
      "teambit.harmony/node": {},
      "teambit.envs/envs": {
        "env": "teambit.harmony/node"
      }
    }
  }
}
```

> Notice how the Node environment was added also as a standalone aspect, to ensure that it is registered as a dependency of the selected components.
