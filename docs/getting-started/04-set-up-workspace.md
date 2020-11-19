---
id: set-up-workspace
title: Set Up a Workspace
---

A [Bit Workspace](/docs/workspace/overview) brings together the simplicity of a monolithic project with the endless possibilities offered by a distributed network of independent components. It lets you create and manage independent components in one single place by offering two essential features: 

1. __A workspace configuration file__ to set rules and policies for the workspace itself but also for each component managed by it. Configurations are set for components in a CSS-like cascading way, from the most universal selector (all components) to the very specific one (a single component). This allows you to configure dependencies, environments, scopes, and so on, for each component, in a clear and efficient manner.

2. [__A Workspace UI__](/docs/workspace-ui/overview), to assist you in developing and examining components as isolated and independent building blocks.
  

To get started, clone a simple ['getting-started'](https://github.com/teambit/getting-started-harmony) project and initialize a new Bit workspace inside it:

```shell
$ git clone https://github.com/teambit/getting-started-harmony.git
$ cd getting-started-harmony

$ bbit init --harmony
Initialized an empty Bit workspace
```
* Tip: Explore the ['end-result' branch](https://github.com/teambit/getting-started-harmony/tree/end-result) to see this workspace in its "final stage", after all steps in this tutorial have been followed.


You'll notice the following have been generated:

1. `workspace.jsonc` - The Workspace configuration file (mentioned above).
2. `.bitmap` - An auto-generated mapping between tracked components in the workspace and their physical location on the file system.
3. `.bit` (directory) - Your local scope, where all your 'tagged' (built & committed) components are stored


To run the [Workspace UI](/docs/workspace-ui/overview) (with no components to display), run the following command:

```shell
$ bbit start
```
This will open-up your browser on `localhost:3000` and display your workspace in its current status.

> At this stage, components inside your workspace will not be recognized as you have not started to track them yet. That's coming in the following steps.