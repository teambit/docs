---
slug: adding-theme-provider
title: Component development environment with providers
description: A customized React development environment for building and rendering modular and reusable MFEs. Using this customized environment you can override
author: Debbie O'Brien
author_title: Head Developer Advocate at Bit
author_url: https://github.com/debs-obrien
author_image_url: https://avatars.githubusercontent.com/u/13063165?v=4
tags: ['env', 'extension', 'example', 'providers', 'context']
draft: true
---

import { Image } from '@site/src/components/image'

## Overview

A customized React development environment for building and rendering modular and reusable MFEs. Using this customized environment you can override
environment configs such as tsconfig or even build tasks, as well as add wrapping contexts for the compositions of components which use this environment.

### Usage instructions

Create a **variant** in project's `workspace.json` file.
Set this extension as the variant's environment, for instance for the variant "any components in the 'ui' namespace":

```json
{
  "teambit.workspace/variants": {
    "{ui/**}": {
      // applies this environment for all components with ui namespace and sub-namespaces
      "org-name.scope-name/namespace/s/debbie": {}
    }
  }
}
```

### Environment config

To configure the config variables (which can be used, for instance, to configure your providers including api contexts and more) add your new environment at the **_workspace level_** and
add the configuration as below.  
Note - these configuration settings apply at the workspace level, so any component using this
environment **in this workspace** will have this config applied to the environment. This config will not persist outside of the local workspace, e.g. on bit.dev.  
To use a non-default config on bit.dev please supply a config in your `scope.jsonc` file (coming soon) per scope that you wish to configure.

```json title="workspace.json"
{
  "org-name.scope-name/namespace/s/debbie": {
    "config1": "value1" // override the config1 default value in your custom env's config
  },
  "teambit.workspace/variants": {
    "{ui/**}": {
      // applies this environment for all components with ui namespace and sub-namespaces, with custom config as set in the preceding lines
      "org-name.scope-name/namespace/s/debbie": {}
    }
  }
}
```

### Theming

The environment template adds the design theme [Theme](https://bit.dev/teambit/use-case-examples/design/theme-context) to all compositions of the components that use this example env.
Apply your own theme instead to see your component compositions with your theme

### Other context providers

In the `.preview.runtime.tsx` file you will find a simple example of a provider, which applies a background style via a wrapping div.
This is an example for how to apply wrapping components which will surround all your components, e.g. for supplying contexts to your components as if
they were being consumed by an application.

### Read more about Bit Environments and their customisation

Please see the following docs entries for more details on Bit Environments and customization:

1. https://harmony-docs.bit.dev/building-with-bit/environments
1.

### Important reminder

As with all aspects that you create, make sure to apply the `teambit.harmony/aspect` environment in order for this component to be built as a bit environment.

```json
{
   "teambit.workspace/variants": {
     ...
     "extensions/debbie": { // if you put your new env inside the extensions folder. Adjust as needed for your directory structure.
       "teambit.harmony/aspect": {}
     }
     ...
   }
}
```
