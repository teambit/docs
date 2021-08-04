---
id: workspace-configuration
title: Workspace Configuration
---

The workspace configuration file (`workspace.jsonc`) is where rules and settings are applied to the workspace itself, and to every component managed by it.

The workspace configuration JSON reflects the way Bit is designed and built - that is, using Bit Aspect components. Each of these components exposes a workspace configuration API. That means, your "workspace configurations" are set across multiple Bit components.

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

### [teambit.dependencies/dependency-resolver](/dependencies/overview)

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

Learn more about the `dependency-resolver` [here](/dependencies/overview).

### [teambit.workspace/variants](/workspace/cascading-rules)

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
