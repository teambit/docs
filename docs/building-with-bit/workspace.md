--- 
id: workspace
title: Workspace
--- 

import BitInit from '@site/docs/components/commands/bit-init.md'

A Bit workspace enables a single repository to author, export, import and manage multiple independent components.

## Initialize a new workspace

(Run the following command in the root directory of your project)

<BitInit />

:::note Initializing a Bit workspace in an existing project
A Bit workspace can be initialized on an empty directory, to create a new modular project from scratch.
It can also be initialized on an existing project to modularize it and export its components to a remote scope.
:::

:::note the --harmony option
The `--harmony` option creates a Bit Harmony workspace. Omitting it will create Bit's legacy workspace.
Harmony components and Bit legacy components cannot switch workspace.
:::

## Reset a Bit workspace

```shell
bit init --reset-hard
```

## The anatomy of a workspace

1. [**Workspace configurations**](/building-with-bit/workspace) (the `workspace.jsonc` file).
   This is where rules and policies are set for the workspace itself but also for each component managed by it.
   These rules include component dependencies, development environments, default scopes, and so on.

2. **Files-to-component mapping** (the `.bitmap` file). This is where Bit maps multiple files to single units, components. This process happens once a component is tracked by Bit (`bit add path/to/component`). This mapping will also include the following information:

   - The component entry point (usually, the `index.js/ts` file).
   - The component version (if a component has been versioned).
   - Whether this component is [pending to be versioned](/building-with-bit/components#soft-and-hard-tags-component-collaboration) by the CI.

     <br />

   ```json title="An example .bitmap file"
   {
     "org.extensions/environment/custom-react@0.0.9": {
       "mainFile": "index.ts",
       "rootDir": "cet/environment/dell-react"
     },
     "org.design/base-ui/search-box-with-button@0.0.5": {
       "mainFile": "index.ts",
       "rootDir": "design/base-ui/searchBoxWithButton",
       "exported" false,
       "nextVersion": {
           "version": "0.0.7",
           "message": "add debouncing",
           "username": "John",
           "email": "john@my-mail.com"
       }
     },
     "version": "14.8.9-dev.298"
   }
   ```

3. [**Local scope**](/building-with-bit/scope/overview#local-scope) (the `.bit` or `.git/.bit` directory). This is where versioned or tagged components (either authored or imported) are stored.

4. **Component packages** (located in the `node_modules/@scope-name` directory). This is where the distributable, compiled, code of a component is placed. Components in the workspace refer to each other only via their packages. This is crucial to keeping each component independent and context-agnostic.

5. **Workspace UI**. The workspace UI is a visual real-time representation of the workspace.
   Components managed by the workspace can be views as they are rendered in isolation.
   In addition to that, different aspects of a component, such as its history, documentation and even test logs, can be explored to get a better understanding of it and assist in developing it as and independent building block.

## Run the workspace UI / development server

Se the Workspace UI at https://localhost:3000

```shell
bit start
```

## Get the most out of a Bit Workspace

While components can be added and managed by a Workspace on an ad-hoc basis, we envisage workspaces as the interface between your code repo and the Bit eco-system. By creating a Bit workspace at the root of your repo file system for instance, you can then manage each component as a separate module - with it's own versioning, build and CI, and much more; all the while keeping the existing file structure of your repo or mono repo (Bit is entirely agnostic to how you organise and track your code). That way Bit works seamlessly with your source control, while providing entirely isolated control over the individual components the repo contains.

Bit Workspaces are focused on composing applications with components. We recommend breaking down your frontend application to its most basic building blocks (buttons, text inputs, etc) and then successively composing pages, data-flows, forms, and applications using your components and APIs they expose. Components can be implemented in React, Angular, Vue, Stencil, and Node.

## Bit workspace and Git

Make sure to track the following files with your SCM:

- `.bitmap`
- `worksapce.jsonc`

> You should not track the local scope (`.bit` or `.git/bit`) with Git.


## Configurations

The workspace configuration file (`workspace.jsonc`) is where rules and settings are applied to the workspace itself, and to every component managed by it.

The workspace configuration JSON reflects the way Bit is designed and built - that is, using Bit extension components. Each of these components exposes a workspace configuration API. That means, your "workspace configurations" are set across multiple Bit components.

As you will see, the names of these JSON fields, each representing an component, follow Bit's component name pattern `<scope-owner>.<scope-name>/<component-name>`, for example: `teambit.workspace/variants`.

## Main workspace config APIs

### teambit.workspace/workspace

`teambit.workspace/workspace` receives configurations for the workspace itself, as well as default values for components managed by the workspace.

- **name** - the workspace name. <br/>Example: `"name": "my-workspace"`
- **icon** - the workspace icon (displayed in the workspace UI). <br/>Example: `"icon": "https://path/to/icon.svg"`
- **description** - a description of the workspace. <br/>Example: `"description": "a design system for my organization."`
- **defaultScope** - the default scope to all components (when used with bit.dev, specify both owner and scope name) <br/>Example: `"defaultScope": "my-org"."my-scope-name"`
- **extensions** - component extensions to apply, by default, on all components.
- **defaultDirectory** - the default directory for components. <br/>Example: `"defaultDirectory": "components\ui"`

Example:

```json
"teambit.workspace/workspace": {
  "name": "my-org-design-system",
  "icon": "https://my-org.com/images/icon.svg",
  "defaultScope": "my-org.design-system"
}
```

### [teambit.dependencies/dependency-resolver](/building-with-bit/dependencies)

`teambit.dependencies/dependency-resolver` receives rules and settings for component dependencies and package management. Dependency policies alter and augment the existing dependency graph that was auto-generated.

`teambit.dependencies/dependency-resolver` can be used at the JSON root-level, to set configurations fot the workspace itself and default policies to all components managed by the workspace. It can also be used under `teambit.workspace/variants` to set rules and policies to specific sets of components, and even "forcibly" add new dependencies to their dependency graph.

Example (used at the JSON root-level):

```json
  "teambit.dependencies/dependency-resolver": {
    /**
     * A package manager for this workspace. This package manger is set to use Bit's pnpm component extension.
     **/
    "packageManager": "teambit.dependencies/pnpm",
    "policy": {
      "dependencies": {
        "@testing-library/react": "10.4.8",
        "@types/classnames": "^2.2.10",
        "classnames": "^2.2.6"
      },
      "peerDependencies": {
        "react": "^16.13.1",
        "react-dom": "^16.13.1"
      }
    }
  }
```

Learn more about the `dependency-resolver` [here](/building-with-bit/dependencies).

### [teambit.workspace/variants](/building-with-bit/workspace)

`teambit.workspace/variants` adds elegancy and simplicity to our workspace configurations by enabling a cascading, CSS-like, setting of rules.
Groups of components can be selected to have rules and policies applied on them without affecting the rest of the workspace.
These configurations will also override any conflicting policies set on a more general group of components and will propagate downwards to more specific sub-sets of components (similarly to the way CSS behaves).

**Example #1:** Sets dependency configurations on a set of components (located in the `components/react/ui` directory):

```json
"teambit.workspace/variants": {
  "components/react/ui": {
    "teambit.dependencies/dependency-resolver": {
      "policy": {
        "dependencies": {
          "classnames": "^2.2.6",
          "@testing-library/react": "^11.2.2"
        }
      }
    }
  }
}
```

**Example #2:** Applies the 'node' environment on all components, and overrides this configuration by applying the 'react' environment on components in the `components/ui/react` directory:

```json
{
  "teambit.workspace/variants": {
    "*": {
      "teambit.envs/envs": {
        "env": "teambit.harmony/node"
      }
    },
    "components/ui/react": {
      "teambit.harmony/node": {},
      "teambit.envs/envs": {
        "env": "teambit.react/react"
      }
    }
  }
}
```


## Cascading Rules and Settings (variants)

The `teambit.workspace/variants` extension enables a cascading, CSS-like, selection of components in the [workspace configuration](/building-with-bit/workspace). It provides order and simplicity to the way we apply rules and settings to large number of independent components - all in a single workspace.

Configurations set on a specific set of components will:

1. Affect only that selected set of components
2. Inherit policies set on a more general set of components (that includes the workspace default configs)
3. Override conflicting configurations inherited from more general component selections
4. Propagate configurations downwards to more specific sub-sets of components ([this behavior can be modified](/building-with-bit/workspace#variants-configurations)).

### Selecting components

#### Selecting all components

To select all components in the workspace use the `*` wildcard. This is especially useful when configuring extensions that can only be used inside the `variants` field (for example, the different environments). For example:

```json
"teambit.workspace/variants": {
    "*": {
        "teambit.harmony/node": {}
    },
}
```

#### Selecting using a directory path

To select using a directory path, use the relative path to the components' common directory. For example:

```json
"teambit.workspace/variants": {
    "components/utility-functions": {
        "teambit.harmony/node": {}
    },
}
```

#### Selecting using a namespace

This option is recommended as it decouples your components' configurations from the workspace's file structure. It handles components using fundamental definitions that pertain to function and purpose. For example:

```json
"teambit.workspace/variants": {
    "{utility-functions/*}": {
        "teambit.harmony/node": {}
    },
}
```

#### Selecting multiple sets of components

Multiple directory paths:

```json
"teambit.workspace/variants": {
    "components/utils,components/react-ui": {
        "teambit.harmony/node": {}
    },
}
```

Multiple namespaces:

```json
"teambit.workspace/variants": {
    "{utility-functions/*},{react-ui/*}": {
        "teambit.harmony/node": {}
    },
}
```

### Variants configurations

#### propagate

Configurations set on one group of components are inherited by its sub-groups (in a CSS-like manner). For example, `components/react/ui` will inherit configurations from `components/react`. To prevent this from happening, set the `propogate` value of the parent group of components to `false`.

```json
"teambit.workspace/variants": {
    "components/react": {
        "propagate": false
        }
}
```

#### maxSpecificity

Determines the number of levels to propagate configurations downwards. For example, the number of levels to go from `components/react` to `components/react/button` is 3.

```json
"teambit.workspace/variants": {
    "components/react": {
        "maxSpecificity": 3
        }
    },
    "components/react/button": {
    }
```

### exclude

Determines which components to exclude from a selected set.

```json
"teambit.workspace/variants": {
    "components/react": {
        "exclude": ["ui-primitives/button", "ui-primitives/app-bar"]
    }
}
```

### defaultScope

Determines the default scope for the selected components:

```json
"teambit.workspace/variants": {
    "components/react": {
        "defaultScope": "my-org.react-app"
    }
}
```

<!-- 
## Eject component configurations (component.json)

A component can have its configuration ejected to stop receiving configurations from various Bit extensions, with the exclusion of the `@teambit/workspace.variants` extension.

```shell
bit eject-conf <component-id>
```

This will create a `component.json` file in the component's directory.

Set `propagate` to `false` to disable merging of properties set by 'variants'.

The `component.json` can be configured [directly] much like the `workspace.jsonc`.

```json title="path/to/component/component.json"
{
  "componentId": {
    "name": "component-name",
    "scope": "owner.scope"
  },
  "propagate": false,
  "extensions": {}
} -->


## Workspace UI 


Bit enhances your development experience with a rich visual UI for components (i.e. "Workspace UI").  
This visual interface is how you can view and manage every part of your component development workflow in real time.

Through this UI you can can track the exact status of every component in your project at any given moment, in a visual way.  
While you develop your components, Bit's UI will provide an exact picture of every part of your components' development:

### Explore and browse all components in your project

<Image src="/img/tech_jokes.png" />

### [Explore the applied environments and configurations for every component](/building-with-bit/componentss)

<Image src="/img/pkg_config.png" width="60%" />

### [Browse each component's version history and see its changelog](/building-with-bit/components)

<Image src="/img/log_example.png" width="60%" padding={20} />

### [View the component's documentation](/building-with-bit/documenting)

<Image src="/img/ws_getting_started_docs.png" width="60%" />

### [View live (hot-reloading) visual examples for each component](/building-with-bit/compositions)

<Image src="/img/ws_getting_started_compositions.png" />

### [View the component's dependency graph](/building-with-bit/components)

<Image src="/img/explore_deps_2.png" />

### [Run and view the tests of each component](/building-with-bit/testing)

<Image src="/img/ws_getting_started_test.png" />



