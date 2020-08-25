---
id: workspace-ui
title: Workspace UI
---

Bit's workspace comes with a user interface and playground for all components. Use this as your component development environment. The **workspace UI** enables you to build and maintain components and provide an interactive showcase with the documentation portal.

As Bit components are independent modules, you can build components in isolation without worrying about specific dependencies and requirements.

> TODO - Image

## Initializing the workspace UI

You can run the tool in any Bit workspace that has components. Open your terminal in the root directory of the workspace and run the following command:

```sh
$ bit start
```

The web application is served from `http://localhost:3000`.

## Component showcase

Discoverability is a crucial feature of Bit's workspace. When initialized, you are greeted with a gallery view of all components. This helps in understanding which components are available for you to use in your project.

Bit's showcase is dynamic and get's updated whenever a new component is added, or an existing component is modified. Each component is annotated according to [its state](TODO) and test results, so you get a clear indication for how your code modifications have affected the component.

## Component local dev-server

Each component has it's own local dev-server it renders when you browse it, the output of the local server is rendered in the workspace UI when you choose to view a specific component. The component's development server and features are part of the [component development environment](TODO). The workspace UI communicates with the **environments** to render information about the component.

> TODO - Diagram
>
> this should show that the right-panel is an iFrame that renders the selected component from the component-list.

* **Overview** - Renders a documentation page for each component. [Learn more](TODO).
* **Compositions** - All isolated rendering environment for the component used for testing the code in different compositions and scenarios. [Learn more](TODO).
* **History** - Complete version history and changelog for the component. [Learn more](TODO).
