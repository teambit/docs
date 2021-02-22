---
id: set-up-workspace
title: Set Up a Workspace
---

A Bit Workspace enables you to author and manage multiple independent components in a simple and elegant way.
It does so by offering:

1. **The workspace configuration file** - a single file that sets rules and policies for the workspace and all its components.
   Configurations are set for components in a CSS-like cascading way, from the most universal selector (all components) to the very specific one (a single component).  
   Each field in the configuration file is a Bit extension component. That means a single workspace configuration is actually a composition of configurations set on various Bit extensions.
2. [**The Workspace UI**](/docs/workspace-ui/overview) - a graphic interface that assists you in authoring and examining components.
   The Workspace UI displays the component's dependency graph, documentation, examples, configurations, and more.

## Clone a demo project and initialize a Bit workspace

To get started, clone this ['getting-started'](https://github.com/teambit/getting-started) project and initialize a new Bit workspace for it:

```shell
$ git clone https://github.com/teambit/getting-started.git
$ cd getting-started
$ bbit init --harmony
```

Bit creates the following files when initialized for a project:

1. `workspace.jsonc` - The Workspace configuration file (mentioned above).
2. `.bitmap` - An auto-generated mapping between tracked components in the workspace and their physical location on the file system.
   The file-structure of your workspace is entirely up to you.
3. `.bit` (directory) - Your local scope, where Bit uses as an internal storage (see more about scopes.)

:::note
Explore the ['getting-started-result'](https://github.com/teambit/getting-started-result) repository to see the workspace after all steps in this tutorial have been followed.
:::

## Set a default scope for all components

Open the `workspace.jsonc` file and find the line `"defaultScope": "my-org.my-scope"`. Edit it to fit your [username/organization name and scope name](docs/getting-started/bit-account) ('demo-scope').

For example:

```json title="workspace.jsonc"
{
  "teambit.workspace/workspace": {
    "defaultScope": "demo-org.demo-scope"
  }
}
```

:::info
By using ['Variants'](/docs/workspace/cascading-rules), different components in the same workspace may use different scopes.
:::

## Run the Workspace UI

```shell
$ bbit start
```

This will open-up your browser on [localhost:3000](http://localhost:3000) (or any other available port) and display your workspace and tracked (added) components (right now, no components are tracked).
