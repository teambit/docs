---
id: scope-ui
title: Scope UI
---

Scope UI is used as a showcase and discovery portal for the components stored in a remote scope. The scope UI has the same features as the [workspace UI](/docs/workspace/workspace-ui). Including the ability to browse and interact with all components and explore their documentation.

> TODO - screenshot

## View scope UI

To start the scope UI server run the following command:

```sh
$ bit start scope
# The server will start at `http://localhost:3000`.
```

> While this UI is most useful when running on a remote scope, because your local workspace has a scope as storage, you can run this command locally and see how your storage is managed.

## Rendering isolated components

The Bit scope UI is similar to how the workspace UI operates. It integrates with the component environment to render all component features. This means that everything you have been working on locally will work on the remote server.
