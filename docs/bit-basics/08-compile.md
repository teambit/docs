---
id: compile
title: Compile
---

You now have an environment configured for your workspace and a tracked component.

## Workspace component compilation

In a Bit workspace, each component is a separate module and needs to be compiled for other components in the workspace to use it. This is one of the jobs that the environment that you [chose earlier](/docs/bit-basics/choose-dev-env) will do for you. All environment defines how your components gets compiled; both in terms of which compiler is used and its configuration.

There are several ways to trigger the **compile** step defined in the Component Development Environment.

### Local dev server

Bit's local dev server compiles each component that you modify. This happens on every "save" operation for a file you edit.

```sh
$ bit start
ENVIRONMENT NAME        URL                      STATUS
react              http://localhost:3101         Running
node               http://localhost:3102         Running

You can now view bad-jokes components in the browser
Main UI server is running on http://localhost:3000

Waiting for component changes... (10:17:20)
```

### Manual compilation

You can manually trigger component compilation using the `bit compile` command.

```sh
$ bit compile

  STATUS        COMPONENT ID
✔ SUCCESS       primitives/button

✔ 1\1 components compiled successfully.
```

### Compile in `watch` mode

Alongside the local dev server, Bit features a watch mode that runs differnet opertaions for modified components. Component compilation is one of these tasks.

```sh
$ bit watch
```

## Component `dist` outputs

Bit generate a `dist` directory for each component in the root `node_modules` directory of your project. Each directory is named per the component's name. This is so when you `import { ... } from <component>` in a Bit workspace you can use the component module name, as generated in `node_modules` instead of relative paths.

## Multiple component types

It's possible to have several environments configured in your workpsace, one for each set of components. This allows you to define speciifc compilation steps for React components that differ from Node components. By defining a different environments you can better control each component's configuration
