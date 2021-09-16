---
id: create-workspace
title: Create a New Workspace
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import workspaceUi from './workspace-ui.png';
import { Image } from '@site/src/components/image';

The Bit [Workspace](/workspace/overview) is where components you build and compose components. You can use the `new` command to get started with with a new workspace template and some base components or [initialized on an existing project](/getting-started/start-from-existing-project/init-workspace-on-existing-project/general-purpose).

You can start with an empty project or a predefined template.  
To see a list of templates, run `bit templates`:

```bash
bit templates
```

Templates are used to quickly start a new project with base components and configuration. <!-- You can use one of these common templates, or find additional templates on the [bit.dev community](https://bit.dev/templates). -->

<Tabs
groupId="frameworks"
defaultValue="React"
values={[
{label: 'React', value: 'React'},
{label: 'Angular', value: 'Angular'},
]}>
<TabItem value="React">

```bash
bit new react my-workspace
```

  </TabItem>
  <TabItem value="Angular">

```bash
bit new ng-workspace my-workspace --aspect teambit.angular/angular-v12
```

  </TabItem>
</Tabs>

```bash
cd my-workspace
```

Bit creates a base [Bit Workspace](/workspace/overview) with a set of demo components, configuration and assortment of supporting files for your dev-experience.

```bash title="Demo Bit workspace"
├── .bitmap # File mapping components with their location in the workspace
├── .eslintrc.js
├── .prettierrc.js
├── .gitignore
├── demo # Directory tree a demo project for this guide
│   ├── envs # Customized component development environment
│   ├── pages
│   │   └── welcome
│   └── ui
│       ├── card
│       ├── heading
│       └── text
├── node_modules
├── pnpm-lock.yaml
├── README.md
├── tsconfig.json
├── types
└── workspace.jsonc # Main configuration file for the Workspace
```

:::info minimal footprint

Bit has a [minimal footprint](/workspace/initializing-workspaces#created-files) requirement for a [Workspace](/workspace/overview) with two configuration files:

- [`.bitmap`](/workspace/bitmap). Mapping of the location of Bit Components in the workspace.
- [`workspace.jsonc`](/workspace/workspace-json). Main configuration file for the Bit Workspace.

:::

## Workspace UI

All components are visible with their documentation, testing, visualization, changelogs and understand their dependency graphs and other features.  
Start the [Workspaces UI](/workspace/workspace-ui):

```bash title="Start workspace UI"
bit start
```

```bash title="Starting Bit's workspace UI"
Building UI assets for 'my-workspace' in target directory: public/bit. The first time we build the UI it may take a few minutes.

...

ENVIRONMENT NAME                                    URL                                                 STATUS
teambit.harmony/aspect on behalf                    http://localhost:3300                               RUNNING
of teambit.harmony/aspect, 
company.scope/envs/my-react


You can now view 'my-workspace' components in the browser.
Bit server is running on http://localhost:3000
```

The first page is a gallery showcasing all components and a sidebar listing them according to their name. The sidebar also shows each component's status, errors and other indicators.

<Image src={workspaceUi} />

:::info component status

In the component sidebar, notice that all components are marked with `N`. This means they are new components. Learn more about [workspace statuses](/workspace/workspace-status).

:::

:::tip quick search
Use `Ctrl-K` to open the Workspace UI quick search and navigate between components.
:::

## Directory Structure

Components should have clear organizational boundaries and ownership that describe their overarching business concern in your product, system or business requirements.  
The [default structure](/workspace/directory-structure) solidifies this by sorting components in top-level directories called [scopes](/scope/overview) according to their main business concern. Components can then be nested in a deeper directory trees as [namespaces](/components/namespaces). This default behavior aims to improve the discovery experience for components in your codebase and solidify boundaries and ownership.

```bash
└── demo # Directory tree a demo project for this guide
    ├── envs
    ├── pages # Namespace directory for sorting the pages in the demo
    │   └── welcome
    └── ui # Namespace directory for sorting the base ui components of the demo
        ├── card
        ├── heading
        └── text
```

:::tip scaling repository architecture

Workspaces in Bit are not rigid, they may grow and have more components or scopes and even split and distribute components to other workspaces. Learn more on [Repository Architecture](/understanding-bit/repository-architecture/overview).

:::

### Define Scope for Components

In most cases components from the same workspace will share scope. Set the `defaultScope` property in `teambit.workspace/workspace`:

```json title="workspace.jsonc"
"teambit.workspace/workspace": {
  "defaultScope": "bitorg.base-ui"
}
```

:::tip Pre-fix scopes with the `.` separator

For better control when distributing components use `.` as a delimiter between your organization name and scope name. This does not affect on the directory names in the workspace, but will be relevant when sharing components.  
**Note** - This is a requirement when using [bit.dev](https://bit.dev/) for hosting components.

:::

:::tip Good scope names are short and descriptive

- `base-ui` - basic UI elements and components for building web-ui.
- `inventory` - components relevant for inventory management in an e-commerce app.
- `authentication` - components for managing user authentication, login, etc.

:::

## Configure Workspace Name and Icon

To customize the dev experience and terminal outputs its recommended to set the workspace name and icon in `workspace.jsonc`:

```json
"teambit.workspace/workspace": {
  "name": "My first Bit Workspace",
  "icon": "https://static.bit.dev/bit-logo.svg",
}
```

## Git and Bit

When generating a new workspace Bit initialize a new Git repository and a pre-configured `.gitignore` file. You can skip this with the `--skip-git` flag.  
In case you choose to skip Git init, ensure to track changes for both `.bitmap` and `workspace.jsonc` files with your SCM.

## Debugging in the Workspace

[Base Templates](/generator/workspace-template) comes built in with an example `launch.json` for [VSCode Debugging Configuration](https://code.visualstudio.com/docs/editor/debugging). <!-- To learn more on IDE debugger configuration head here. -->

<!--TODO Webstorm to be added here.
 -->

## Configure Extensions in `workspace.jsonc`

`workspace.jsonc` is a compositions of different extensions and plugins for Bit called [Aspects](/aspect/overview). Each aspect is responsible for a different part of your workflow, feature or experience. You can add/remove any Aspect. The base template comes with an array of the basic Aspects required to get you started. [Learn more.](/workspace/workspace-json)  
Adding an aspect to your workspace is as easy as composing it directly to the `workspace.jsonc` file:

```json title="Adding Aspect to workspace.jsonc"
{
  // ...
  "owner.scope/some-aspect": {}
  // ...
}
```