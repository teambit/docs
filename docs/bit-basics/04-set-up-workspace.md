---
id: set-up-workspace
title: Set Up a Workspace
---

# Set up a Bit Workspace

A Bit workspace is a place where you want Bit to work its magic. Once you create a workspace, wherever you choose in your filesystem, you can start working with Bit. The directory you choose to set up your workspace will become the workspace root, any code within which can now be managed by Bit.

Let's start. First choose a directory to be your workspace root, and then run the following command:

```sh
$ bit init
Initialized an empty Bit workspace
```

That's it, you've initialized your Bit workspace. You'll notice that you now have two files which are used to manage Bit components in the workspace.

1. Workspace configuration - `workspace.json`
1. Component map - `.bitmap`

The configuration json is where you'll manage general configurations for the workspace. E.g. default scope for exporting to, dependencies, environments, etc. (we'll cover all of those in the next few steps).

The component map is an auto-generated mapping between the Bit components your tracking in the workspace and their physical location on the file system. It's essentially how we disconnect the Bit component from its location in your repo.

> At this stage, even if there are files and components inside your workspace, they still won't be recognised by Bit as you haven't told Bit to track them yet. That's
> coming in the following steps.

Now let's start using the newly generated `workspace.json`.