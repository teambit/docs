---
id: dependency-resolution
title: Dependency Resolution
---
## Component dependency graph

The 'dependency-resolver' parses all `import`/`require` statements in a component's code. It then determines, for each required module, whether it is external (i.e, a library/imported component) or a module used internally, as part of the component. If a module turns out to be external, it checks its version and adds it to the component dependency graph.

External modules can be seen in the component's generated `package.json` (in its package directory, under the workspace `node_module` directory). 

For example:

```json
{
  "name": "@my-org/ui-primitives.button",
  "main": "dist/index.js",
  "componentId": {
    "name": "ui-primitives/button",
    "version": "0.0.1"
  },
  "dependencies": {
    "classnames": "^2.2.6"
  },
  "devDependencies": {
    "@types/react": "16.9.43",
    "@testing-library/react": "10.4.8",
    "react-test-renderer": "17.0.1",
    "@types/classnames": "^2.2.10",
    "@types/react-router-dom": "^5.1.5",
    "@types/jest": "~26.0.9",
    "core-js": "^3.6.5"
  },
  "peerDependencies": {
    "react": "^16.13.1",
    "react-dom": "^16.13.1"
  },
  "license": "SEE LICENSE IN LICENSE",
  "types": "index.ts",
  "private": false
}
```
Internal files can be seen in the `.bitmap` file (located at the workspace root directory):

For example:

```json
"ui-primitives/button": {
        "files": [
            {
                "name": "button.spec.jsx.snap",
                "relativePath": "__snapshots__/button.spec.jsx.snap",
                "test": false
            },
            {
                "name": "button.composition.tsx",
                "relativePath": "button.composition.tsx",
                "test": false
            },
            {
                "name": "button.docs.tsx",
                "relativePath": "button.docs.tsx",
                "test": false
            },
            {
                "name": "button.module.scss",
                "relativePath": "button.module.scss",
                "test": false
            },
            {
                "name": "button.spec.jsx",
                "relativePath": "button.spec.jsx",
                "test": false
            },
            {
                "name": "button.tsx",
                "relativePath": "button.tsx",
                "test": false
            },
            {
                "name": "index.ts",
                "relativePath": "index.ts",
                "test": false
            }
        ],
        "mainFile": "index.ts",
        "rootDir": "components/react/ui-primitives/button",
        "origin": "AUTHORED",
        "exported": false,
        "lanes": []
    }
```

> The package.json file should not be modified directly. Any changes to "dependency policy" should be done in the `workspace.jsonc` configuration file.

### Types of dependencies

The 'dependency-resolver' uses configurations set by the environment in use to determine whether a module is a `dependency`, `devDependency` or `peerDependency`.

For example, for a 'button' component using the `@teambit.react/react` environment:

| Statement                                                | Result         | Explanation   |
| -----------                                              | -----------    |----------- 
| `import cs from 'classnames'`                            | dependency     | The module is used by a runtime file (as oppose to dev file) and is not listed by the environment as a `peerDependency`
| `import React from 'react'`                              | peerDependency | The module 'react' is listed by the environment as a `peerDependency`  |
| `import { render } from '@testing-library/react'`        | devDependency  | The module is required by `button.spec.jsx`, a file type that is listed as a dev file (from that it follows that the module required is also used for development and not for runtime)
## Workspace dependency graph

When all import statements in all components in the workspace have been parsed, Bit creates a complete dependency graph for the workspace. This allows Bit to understand which component in the workspace is affected by a change made to another component and perform the needed actions to handle that (notify of a change in the Workspace UI, test and re-compile affected components, etc.).