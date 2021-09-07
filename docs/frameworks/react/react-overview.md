---
id: react-overview
title: React Overview
---

The built-in [React Component Development Env](https://bit.dev/teambit/react/react) is a concrete composition of the [Env Aspect](https://bit.dev/teambit/envs/envs). It compose different tools and configs that fit practices implemented in [Create React App](https://create-react-app.dev). Use it when getting started with React components with Bit and later as a base for any future customization of your React-based workflow.

## Use the React env

To use this environment for your components, add it to any of the `variants` in your `workspace.jsonc` file as follows

```json title="workspace.jsonc"
{
  "teambit.workspace/variants": {
    "{ui}/*": {
      "teambit.react/react": {}
    }
  }
}
```

## Development services

React, like all other Bit Environments must implement a set of Service Handlers. Each service corresponds to a specific tool or stage in the component life-cycle, with a default config as set by the base React environment:

| Service              | Aspect                                                      | Base Configuration                                                                                                                 |
| -------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Compilation          | [TypeScript](https://bit.dev/teambit/typescript/typescript) | [tsconfig.json](https://bit.dev/teambit/react/react/~code/typescript/tsconfig.json)                                                |
| Testing              | **Jest**                                                    | [jest.config.js](https://bit.dev/teambit/react/react/~code/jest/jest.config.js)                                                    |
| Linting              | **ESLint**                                                  | [eslintrc.ts](https://bit.dev/teambit/react/react/~code/eslint/eslintrc.ts)                                                        |
| DevServer            | **Webpack**                                                 | [webpack.config.preview.dev.ts](https://bit.dev/teambit/react/react/~code/webpack/webpack.config.preview.dev.ts)                   |
| Preview (simulation) | **Webpack**                                                 | [webpack.config.preview.ts](https://bit.dev/teambit/react/react/~code/webpack/webpack.config.preview.ts)                           |
| Package              | **PKG**                                                     | Base `package.json` props from [TypeScript Aspect](https://bit.dev/teambit/typescript/typescript/~code/typescript.main.runtime.ts) |
| Bundling             | **Webpack**                                                 | [webpack.config.preview.ts](https://bit.dev/teambit/react/react/~code/webpack/webpack.config.preview.ts)                           |
| Documentation        | _Core implementation_                                       | [Docs template](https://bit.dev/teambit/react/react/~code/docs/index.tsx)                                                          |
| Build pipeline       | [Builder](https://bit.dev/teambit/pipelines/builder)        | [Build pipeline](https://bit.dev/teambit/react/react/~code/react.env.ts)                                                           |
| Dependencies         | _Core implementation_                                       | [Env-dependencies](https://bit.dev/teambit/react/react/~code/react.env.ts)                                                         |
| Component Generator  | [Generator](https://bit.dev/teambit/generator/generator)    | [example template](https://bit.dev/teambit/react/react/~code/templates/react-component.ts)                                         |

## Component templates

React env adds a set of useful component templates to your workspace.

- `react` a basic React UI component.
- `react-context` a react context component.
- `react-hook` a react hook component.
- `mdx-component` an MDX component.
- `react-component-js` a basic React component in JS.
- `react-env` boilerplate for a customized environment configuration.

Use any of these templates with the `bit create` command.

```bash
bit templates # view all available templates.
bit create react ui/my-welcome # create a simple react component called `ui/my-welcome` 
```

## Peer dependencies

By default, components using the React env get a peer dependency range of X for `react` and `react-dom` and Development version of React and React DOM is set to X.

