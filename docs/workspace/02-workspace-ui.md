---
id: workspace-ui
title: Workspace UI
---

Bit's workspace comes with a feature-rich interface which we call **workspace UI**. We're constantly adding features (and if you want to invest in it you can even add features yourself), but the basic features are component Overview with documentation and examples playground, testing view, and compositions. Each has their own section in these docs, so here we'll just say that the place you'll actually see all of those features' outputs is the workspace UI.

This UI exists both locally, so that you can use it as your local development and debugging portal, and also on the server. What you see locally is 1:1 what you'll see when you export the components so you can focus your efforts on local development and be sure that the final product will be exactly what you see in your dev environment.

> TODO - Image

## Initializing the workspace UI

You can run the workspace UI in any Bit workspace that has components. Open your terminal in the root directory of the workspace and run the following command:

```sh
$ bit start
```

The web application is served from `http://localhost:3000` (if port 3000 is unavailable the terminal will show what port is being used).

## Component showcase

Discoverability is a crucial feature of Bit's workspace. When the workspace UI is initialized, you are greeted with a gallery view of all components. 

> If a component doesnt appear here, it means that even though its code maybe in the directory, you havent told bit to track it yet - i.e. you havent run `Bit add <component-name>` for that component.

This showcase is dynamic and gets updated whenever a new component is added, or an existing component is modified. Each component is annotated according to [its state](/docs/workspace/statuses) and test results, so you get a clear indication of how your code modifications have affected the component, in near real time.

## Component local dev-server

Each component has it's own local dev-server it renders when you browse it, the output of the local server is rendered in the workspace UI when you choose to view a specific component. The component's development server and features are part of the [component development environment](/docs/environment/overview). The workspace UI communicates with the **environments** to render information about the component.

> TODO - Diagram
>
> this should show that the right-panel is an iFrame that renders the selected component from the component-list.

* **Overview** - Renders a documentation page for each component. [Learn more](/docs/documentation/automated-docs).
* **Compositions** - An isolated rendering environment for the component used for testing the code in different compositions and scenarios. [Learn more](/docs/compositions/develop-in-isolation).
* **History** - Complete version history and changelog for the component. [Learn more](/docs/versioning/overview#building-component-history).
* **Testing** - List of all the tests written for the component, including results and their logs. [Learn more](/docs/testing/correct-link-here)
* **Configuration** - Configuration of the environment that the component was developed under [Learn more](/docs/testing/correct-link-here)

