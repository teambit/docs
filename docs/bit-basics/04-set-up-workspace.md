---
id: set-up-workspace
title: Set Up a Workspace
---

# Bit Workspace

A Bit workspace is a place where Bit can work its magic. Once you create a workspace, wherever you choose in your filesystem, you can start working with Bit. The directory you choose to set up your workspace in will become the workspace root, any code within which can now be managed by Bit.

In your Bit workspace you will track components, edit them, tag and export them. You will configure your development environment so that all components in the workspace are developed in a standardized environment, as well as manage dependency rules. A Bit Workspace enables you to configure a lot of the common configuration for your component development in one place (see the workspace.json below). This provides both productivity gains and heightened standardisation across the project.

We'll go through all of these steps in the coming pages.

# Set Up a Bit Workspace

Let's start. First choose a directory to be your workspace root, and then run the following command:

```sh
$ bit init --harmony
Initialized an empty Bit workspace
```

That's it, you've initialized your Bit workspace. You'll notice that you now have two files which are used to manage Bit components in the workspace.

1. Workspace configuration - `workspace.json`
1. Component map - `.bitmap`

The configuration json is where you'll manage general configurations for the workspace. E.g. default scope for exporting to, dependencies, environments, etc. (we'll cover all of those in the next few steps).

The component map is an auto-generated mapping between the Bit components your tracking in the workspace and their physical location on the file system. It's essentially how we disconnect the Bit component from its location in your repo.

# Workspace UI

A central aspect of your Bit Workspace is the [Workspace UI](/docs/workspace-ui/overview), which provides the local development UI for rendering the component along with a number of other useful features like Compositions and Test Viewer. For now let's just start up the Workspace UI and leave it running - it utilises the latest in hot loading so that when we add components to the workspace they will automatically update in the UI.

```sh
$ bit start
```

Go to [localhost:3000](http://localhost:3000/) and you'll see an empty UI, with just a title (the title is configured in the workspace.json).


> At this stage, even if there are files and components inside your workspace, they still won't be recognised by Bit as you haven't told Bit to track them yet. That's
> coming in the following steps.

Now let's start using the newly generated `workspace.json`.
