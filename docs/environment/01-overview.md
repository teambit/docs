---
id: overview
title: Overview
---

```sh
$ bit build
$ bit test
$ bit start
$ bit create card
$ bit ci
```

Wouldn't it be nice that regardless of a project setup, framework and configuration, all development workflow operations will be standardize? You will be able to jump right in to any project and just *know* how to start a dev server, *know* how to run build and test, so you can just focus on writing the lines of code required to complete your task as efficiently as possible?

Bit uses **Environments** as a way to define development environments for components and projects. Environments define how a component is built, tested and published.

## Set default environment for a workspace

Use the `bit use` to configure an environment for your workspace:

```sh
$ bit use @teambit.core/workspace --workspace
```

This adds the following configuration snippet to the `workspace.json`.

```json
{
    "@teambit.core/workspace": {
        "extensions": {
            "@teambit.environments/react": {}
        }
    }
}
```

Now components in the workspace will have `@teambit.environments/react` defined as their environment by default.

## Configuring an environment

Use the environment configuration object to set specifics for components. When applied, these configurations will be attached to the component, alongside the environment itself. This means that you can modify the configuration for each variant and component.

```json
{
    "@teambit.core/workspace": {
        "extensions": {
            "@teambit.environments/react": {
                "config": {
                    "engine": "typescript"
                }
            }
        }
    }
}
```

### Set framework version for component

> TODO - compose

## Building, testing and linting components

Each environments in the workspace registers itself to specific lifecycle commands in Bit. For example: `build`, `test` and `lint`. Whenever you trigger any of these commands, and environments that is hooked to the event will be triggered. Each triggered environment will then gather all components that are registered for it and run the requested operation.

```sh
# TODO - add list of all triggers?
```

Regardless of the framework and workspace, all components are being build and tested just the same, make it easier for you to collaborate with other developers on components.

## Using component templates

An important lifecycle operation the environment can register is the `bit create` command. This way you can define and use templates when adding implementing new components in the workspace.

```sh
$ bit create ...
# TODO - i don't think we have proper syntax atm...
```

## Multiple environments in a workspace

If your workspace contains components from various frameworks you can use the `variant` extension and set different environments for components according to their location in the workspace. You can set an environment for a variant with this command:

```sh
$ bit use @teambit.environments/stencil --variant components/generics-ui
```

Bit updates `workspace.json` and either create a new variant or update your variant with the environment to apply.

```json
{
    "@teambit.core/variants": {
        "components/generics-ui": {
            "@teambit.environments/stencil": {}
        }
    }
}
```

By creating more variants, each with its own environment, you can set a multi-framework workspace. This means that if you have multiple environments, a single command like `bit build` triggers a build process for all components, regardless of their framework.
