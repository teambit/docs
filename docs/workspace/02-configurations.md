---
id: configurations
title: Configurations
---

The workspace configuration file (`workspace.jsonc`) is where rules and settings are applied to the workspace itself, and to every component managed by it.

The workspace configuration JSON reflects the way Bit is designed and built - that is, using Bit extension components. Each of these components exposes a workspace configuration API. That means, your "workspace configurations" are set across multiple Bit components.

As you will see, the names of these JSON fields, each representing an component, follow Bit's component name pattern `<scope-owner>.<scope-name>/<component-name>`, for example: `teambit.workspace/variants`.

Examine a demo workspace configuration file, [here](https://github.com/teambit/bad-jokes-workspace/blob/main/workspace.jsonc).

## Main workspace config APIs

### teambit.workspace/workspace

`teambit.workspace/workspace` receives configurations for the workspace itself, as well as default values for components managed by the workspace.

- **name** - the workspace name. <br/>Example: `"name": "my-workspace"`

- **icon** - the workspace icon (displayed in the workspace UI). <br/>Example: `"icon": "https://path/to/icon.svg"`

- **description** - a description of the workspace. <br/>Example: `"description": "a design system for my organization."`

- **defaultScope** - the default scope to all components (when used with bit.dev, specify both owner and scope name) <br/>Example: `"defaultScope": "my-org"."my-scope-name"`

- **defaultOwner** - the default owner of the workspace (relevant only to bit.dev)

- **extensions** - component extensions to apply, by default, on all components.

- **defaultDirectory** - the default directory for components. <br/>Example: `"defaultDirectory": "components\ui"`

- **vendor**

Example:

```json
"teambit.workspace/workspace": {
  "name": "my-org-design-system",
  "icon": "https://my-org.com/images/icon.svg",
  "defaultScope": "my-org.design-system"
}
```

### [teambit.dependencies/dependency-resolver](/docs/dependencies/overview)

`teambit.dependencies/dependency-resolver` receives rules and settings for component dependencies and package management. Dependency configurations alter and augment the existing dependency graph auto-generated for each component (by this extension).

`teambit.dependencies/dependency-resolver` can be used at the JSON root-level, to set configurations fot the workspace itself and default policies to all components managed by the workspace. It can also be used under `teambit.workspace/variants` to set rules and policies to specific sets of components, and even "forcibly" add new dependencies to their dependency graph.

Example (used at the JSON root-level):

```json
  "teambit.dependencies/dependency-resolver": {
    /**
     * A package manager for this workspace. This package manger is set to use Bit's pnpm component extension.
     **/
    "packageManager": "teambit.dependencies/pnpm",
    "policy": {
      /**
       * Dependency type is defined by the file that import it.
       * For example, a module will be considered a devDependency when the file that imports it is a test file.
       **/
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

Learn more about the `dependency-resolver` [here](/docs/dependencies/overview).

### [teambit.workspace/variants](/docs/workspace/cascading-rules)

`teambit.workspace/variants` adds elegancy and simplicity to our workspace configurations by enabling a cascading, CSS-like, setting of rules. Sets of components can be selected to apply rules and policies on them without effecting the rest of the workspace. These configurations will also override any conflicting policies set on a more general group of components and will propagate downwards to more specific sub-sets of components (similarly to the way CSS behaves).

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

**Example #2:** Applies the 'node' environment on all components, and overrides this configuration by applying the 'react' environment on components in the `components/react` directory:

```json
"teambit.workspace/variants": {
  /** Set the 'Node' environment on all components */
  "*": {
    "teambit.harmony/node": {}
  },
  /** Override the previous rule and apply the 'React' environment on components located in the 'components/react' directory */
  "components/react": {
    "teambit.react/react": {}
  }
}
```
