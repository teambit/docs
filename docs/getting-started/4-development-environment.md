---
id: development-environment
title: Environments
---

Component Environments define all operations on components. It is very beneficial for you to use environments as a method to standardize component development in the company. For example, how components are structured, their runtime framework versions, tests and lint rules.

## Define environment for a component

Use the `workspace.json` to set an environment as one of the default extensions for your components. A component can have only one environment applied for it, as the environment defines the component development workflow.

```json
{
    "@teambit.core/workspace": {
        "extensions": {
            "@teambit.environments/react": {}
        }
    }
}
```

Now all components in the workspace will have `@teambit.environments/react` defined as their environment.

### Configuring an environment

Use the environment configuration object to set specifics for components. When applied, these configurations will be attached to the component, alongside the environment itself. This means that you can modify the configuration for each variant and component.

```json
// TODO - example for complicated env configuration
```

### Set framework version for component

Components can be implemented using a verity of frameworks like React, Angular or Vue. Each of these frameworks has has different runtime requirements and versions. It's the job of the environment to define all runtime requirements for components and let you override and configure it to your needs.

You can define the specific runtime version of your framework for the workspace.

```json
{
    "@teambit.environments/react": {
        "version": "16.0.0"
    }
}
```

In addition to that, any other runtime requirements are handled by the environment, per your configuration. For example, a React environment would define `react` and `react-dom` as `peerDependencies`, and if you decide to use TypeScript it would add `@types/react` and `types/react-dom`. All this according to your pre-selected version of React.

## Standardize component development

Environments streamline the development experience. You don't need to worry about figuring out the company best practices for building, testing and linit rules. Everything is a part of their Environment. Additionally, when using environments you don't need to fuss around with setting up npm-scripts. Each environment registers itself to a specific lifecycle commands in Bit, and does the setup for you.

### Building, testing and linting components

Each environments in the workspace registers itself to specific lifecycle commands in Bit. For example: `build`, `test` and `lint`. Whenever you trigger any of these commands, and environments that is hooked to the event will be triggered. Each triggered environment will then gather all components that are registered for it and run the requested operation.

```sh
# TODO - add list of all triggers?
```

Regardless of the framework and workspace, all components are being build and tested just the same, make it easier for you to collaborate with other developers on components.

### Using component templates

An important lifecycle operation the environment can register is the `bit create` command. This way you can define and use templates when adding implementing new components in the worksapce.

```sh
$ bit create ...
# TODO - i don't think we have proper syntax atm...
```

## Multiple environments in a workspace

If your workspace contains components from various frameworks you can use the `variant` extension and set different environments for components according to their location in the workspace.

```json
{
    "@teambit.core/variants": {
        "components/generics-ui": {
            "extensions": {
                "@teambit.environments/stencil": {}
            }
        }
    }
}
```

By creating more variants, each with its own environment, you can set a multi-framework workspace. This means that if you have multiple environments, a single command like `bit build` triggers a build process for all components, regardless of their framework.
