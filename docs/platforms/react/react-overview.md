---
id: react-overview
title: React Overview
---

Bit's out-of-the-box [React Component Development Environment](https://bit.dev/teambit/react/react) ('React env') is  a concrete implementation of [Envs](https://bit.dev/teambit/envs/envs). It composes together different tools and configs that conform to best practices implemented by [Create React App](https://create-react-app.dev).

Use the React env to start developing your React components. You may also use it as a base for your own customized React-based development workflow.

## Using the React env

To use this environment, add it to any of the `variants` (component selections) in your `workspace.jsonc` file. For example, the below config sets all components with the `ui` namespace to use the React Env.

```json title="workspace.jsonc"
{
  "teambit.workspace/variants": {
    "{ui/*}": {
      "teambit.react/react": {}
    }
  }
}
```

## Creating components

React env provides a set of component templates that can be used to speed-up and standardize your component development:

- `react` a basic React UI component.
- `react-context` a react context component.
- `react-hook` a react hook component.
- `mdx-component` an MDX component.
- `react-component-js` a basic React component in JS.
- `react-env` boilerplate for a customized environment configuration.

Use any of these templates with the `bit create` command.

```bash
bit templates # view all available templates.
bit create react ui/my-welcome # create a simple react component with the full name: `ui/my-welcome` 
```

## Development services and configurations

The table below lists services that are provided by the React env. Each service handles a specific component development operation. Each is implemented by the React env, using a specific Bit Aspect and a set of configurations.

To customize and extend the React env, [create you own React env extension](/envs/pre-configured-envs/react/extending-react#using-your-own-react-env-extension). You can replace the Aspects used by the env, or override their configurations (use the links provided in the 'customization' column).


| Service                                    | Aspect                                                      | Default config                                                                                                                     |Customization|
| ------------------------------------------ | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Compilation](/compiler/overview)          | [TypeScript](https://bit.dev/teambit/typescript/typescript) | [tsconfig.json](https://bit.dev/teambit/react/react/~code/typescript/tsconfig.json)                                                | [Override config for development](/envs/pre-configured-envs/react/extending-react#override-ts-config-for-workspace-compilation) / [Override config for build](http://localhost:3001/envs/pre-configured-envs/react/extending-react#override-ts-config-for-build-compilation) / Replace Compiler  |
| [Testing](/tester/overview)                | **Jest**                                                    | [jest.config.js](https://bit.dev/teambit/react/react/~code/jest/jest.config.js)                                                    | [Override config](/envs/pre-configured-envs/react/extending-react#override-jest-config) / Replace Tester |
| [Linting](/linter/overview)                | **ESLint**                                                  | [eslintrc.ts](https://bit.dev/teambit/react/react/~code/eslint/eslintrc.ts)                                                        | [Override config](#) / Replace Linter    |
| [Formatting](/formatter/overview)          | **Prettier**                                                | [prettier.config.ts](https://bit.dev/teambit/react/react/~code/prettier/prettier.config.js)                                        | Override config / Replace Formatter      |
| DevServer                                  | **Webpack**                                                 | [webpack.config.preview.dev.ts](https://bit.dev/teambit/react/react/~code/webpack/webpack.config.preview.dev.ts)                   | Override config                          |
| Preview (simulation)                       | **Webpack**                                                 | [webpack.config.preview.ts](https://bit.dev/teambit/react/react/~code/webpack/webpack.config.preview.ts)                           | Override config                          |
| Package                                    | **PKG**                                                     | See the [TypeScript Aspect](https://bit.dev/teambit/typescript/typescript/~code/typescript.main.runtime.ts) config                 | Override config                          |
| Bundling                                   | **Webpack**                                                 | [webpack.config.preview.ts](https://bit.dev/teambit/react/react/~code/webpack/webpack.config.preview.ts)                           | Override config                          |
| Documentation                              | _Core implementation_                                       | [Docs template](https://bit.dev/teambit/react/react/~code/docs/index.tsx)                                                          | N/A                                      |
| Build pipeline                             | [Builder](https://bit.dev/teambit/pipelines/builder)        | [Build pipeline](https://bit.dev/teambit/react/react/~code/react.env.ts)                                                           | Customize the build pipeline             |
| Dependencies                               | _Core implementation_                                       | [Env-dependencies](https://bit.dev/teambit/react/react/~code/react.env.ts)                                                         | Override Env dependencies                |
| Component Generator                        | [Generator](https://bit.dev/teambit/generator/generator)    | [example template](https://bit.dev/teambit/react/react/~code/templates/react-component.ts)                                         | Add a component template                 |

### Default React versions
By default, the React env sets the following dependency versions for components using it:

* __react__ (peer dependency): `^16.8.0 || ^17.0.0`
* __react-dom__ (peer dependency): `^16.8.0 || ^17.0.0`
* __@types/react__: `^17.0.8`
* __@types/react-dom__: `^17.0.5`