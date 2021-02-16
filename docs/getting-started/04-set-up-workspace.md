---
id: set-up-workspace
title: Set Up a Workspace
---

A Bit Workspace offers a user-experience that feels much like working on a monolith.  that hides the complexity of managing individual components and separated modules. Create and manage any number of independent components in a single place using two essential features:

1. __A workspace configuration file__ that sets rules and policies for the workspace and components. Configurations are set for components in a CSS-like cascading way, from the most universal selector (all components) to the very specific one (a single component).
2. [__A Workspace UI__](/docs/workspace-ui/overview) is a tool designed to assist you in developing and examining components as isolated and independent building blocks. It renders documentation and compositions for each components, runs test and explore components' dependnecy graphs.
  
To get started, clone this simple ['getting-started'](https://github.com/teambit/getting-started-harmony) project and initialize a new Bit workspace for it:

```shell
$ git clone https://github.com/teambit/getting-started-harmony.git
$ cd getting-started-harmony

$ bbit init --harmony
Initialized an empty Bit workspace
```

> Explore the ['end-result' branch](https://github.com/teambit/getting-started-harmony/tree/end-result) and see this workspace in after all steps in this tutorial have been followed.

Bit creates the following files when initialized for a project:

1. `workspace.jsonc` - The Workspace configuration file (mentioned above).
2. `.bitmap` - An auto-generated mapping between tracked components in the workspace and their physical location on the file system.
3. `.bit` (directory) - Your local scope, where Bit uses as an internal storage (see more about [scopes](TODO).)

## Worksapce UI

To run the [Workspace UI](/docs/workspace-ui/overview), run the following command:

```shell
$ bbit start
ENVIRONMENT NAME        URL                      STATUS
react              http://localhost:3101         Running

You can now view bad-jokes components in the browser
Main UI server is running on http://localhost:3000

Waiting for component changes... (10:17:20)
```

This will open-up your browser on [localhost:3000](http://localhost:3000) (or any other available port) and display your workspace in its components.

Only components added to Bit are visible on the UI. Right now our worksapce has no component yet, next on the toturial we'll cover adding components and use the Workspace UI to explore and manage them.

## Workspace Configuration

Bit workspaces are designed to manage many independent components. Having a configuration file per component will be very complicated task to manage. Instead you can use a single `workspace.jsonc` file to manage all components using cascading rules, as well as some Workspace-specific configuraitons.  

**You should track and commit the `workspace.jsonc` file to Git**

```json title="Basic view of a workspace.jsonc"
{
  "teambit.workspace/workspace": { // Main workspace configuration section
    "name": "documenter", // Workspace name
    "icon": "https://static.bit.dev/bit-logo.svg", // Icon
    "defaultScope": "teambit.documenter", // Default scope for components created in the workspace.
  },
  "teambit.dependencies/dependency-resolver": { // Define dependency-resolution for the workspace
    "packageManager": "teambit.dependencies/pnpm",
    "policy": { // dependency definition policy
      "dependencies": { },
      "peerDependencies": { }
    },
  },
  "teambit.workspace/variants": { // Cascading configuration rules for components
    "*": { // default rules for all components
    },
    "components/": { // rules to be applied for components nested in 'components' dir
    },
    "[pages]": { // rules to be applied for components nested in 'pages' namespace
    }
  }
}
```

In this toturial we'll cover some aspects of the main configuration file. Learn more about it [here](/docs/workspace/configurations).

## Component Mappings

Bit features a flexible "monorepo" like workspace for components. Bit treats each component as an individual module, but doesn't force you to any rigid directory tree layout. Instead you can create directories and sort your workspace how you see fit for your dev-experience. Later, when adding components to Bit you dynamically mark specific directories as components.  
Bit logs this information in the `.bitmap` file.

**You should track and commit the `.bitmap` file to Git**

```json title=".bitmap file with components"
{
    "my-org.bad-jokes/react/primitives/button@1.0.5": { // component name and version
        "mainFile": "index.ts", // main entry file for the component
        "rootDir": "ui-primitives/button" // component location on your workspace
    },
    "my-org.bad-jokes/react/authentication/login-form@3.6.1": {
        "mainFile": "index.ts",
        "rootDir": "components/login-form"
    },
}
```

Bit manages this file automatically; generally you should not manually edit it.
