---
id: setting-remote-scope
title: Setting a Remote Scope
---

A remote scope is where the shared versions of components are stored. It is where components are made available to be consumed and maintained in other workspaces.

Setting up a remote scope is done in two steps:

1. Create a scope on [Bit.dev](https://bit.dev) or self-host on your own server.

2. Configure your workspace to export components to one or more scopes

## Create a scope on Bit.dev

[Bit.dev](https://bit.dev) is a cloud service built by the maintainers of Bit. This cloud service offers a multitude of features necessary for collaborating on independent components. That includes hosting and organizing Bit scopes, great search capabilities, a cross-repository CI for independent components, and much more.

## Configure remotes scopes in the workspace

As with (almost) any other type of workspace configuration, scopes can be set as the workspace default (for all components) or as a property of specific sets of components.

### Set a remote scope as the workspace default

The default scope is defined in the `workspace.jsonc` inside the `teambit.workspace/workspace` field. The default scope will be overridden by more specific scope configurations.

A scope hosted on Bit.dev will always have the following pattern: `<scope-owner>.<scope-name>`. A scope owner can be either a user or an organization.

```jsonc
{
  "$schema": "https://static.bit.dev/teambit/schemas/schema.json",
  "teambit.workspace/workspace": {
    "name": "my-workspace",
    "icon": "https://static.bit.dev/bit-logo.svg",
    "defaultScope": "my-org.my-scope"
  },
```

### Set multiple scopes to different groups of components

A single workspace can export components to multiple scopes. To achieve that, use `@teambit.workspace/variants` (in the `workspace.jsonc`)

```json
"teambit.workspace/variants": {
    // Select all components in the following directory
    "components/react/ui": {
        // Set the following scope
        "defaultScope": "my-org"."my-design-system"
    },
    // Select all components with the 'toolbox' namespace
        "{toolbox/*}": {
        // Set the following scope
        "defaultScope": "my-org"."my-toolbox"
    }
}
```

## Change component scope

In case you want to export a component to a different scope you will need to modify its configuration. This configuration operation changes the component module name, so you will have to run the `bit link` command. This command creates the new component module name in your project's `node_modules`.