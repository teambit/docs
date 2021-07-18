---
id: workspace-ui
title: Workspace UI
---

Bit enhances your development experience with a rich visual UI for components (i.e. "Workspace UI").  
This visual interface is how you can view and manage every part of your component development workflow in real time.

Through this UI you can can track the exact status of every component in your project at any given moment, in a visual way.  
While you develop your components, Bit's UI will provide an exact picture of every part of your components' development:

- **Explore and browse all components in your project**

- **Explore the applied environments and configurations** for every component

- **Browse each component's version history** and see its changelog

- **View each component's documentation** which can be later shared to the cloud

- **View live (hot-reloading) visual examples** for each component

- **View and control each component's dependency graph** (both dependencies and dependents)

- **Run and view the tests** of each component in isolation, and see the results change live as you code!

- **Run and view the build** process for each component

- Publish and install the component from Bit.dev or a different package registry

Bit's workspace UI is 100% modular and composed of Bit components (extensions etc).  
As such, you can extend, add, remove or replace any part of the UI to fit your development needs.  
Yes, this means you can fully customize and create your own ultimate component development experience!

This UI exists both locally, so that you can use it as your local development and debugging portal, and also on the server. What you see locally is 1:1 what you'll see when you export the components to Bit.dev, so you can focus your efforts on local development and be sure that the final product will be exactly what you see in your dev environment.

## Initializing the workspace UI

You can run the workspace UI in any Bit workspace that has components. Open your terminal in the root directory of the workspace and run the following command:

```sh
$ bit start
```

The web application is served from `http://localhost:3000` (if port 3000 is unavailable the terminal will show what port is being used).

## Component showcase

Discoverability is a crucial feature of Bit's workspace. When the workspace UI is initialized, you are greeted with a gallery view of all components.

> If a component doesn't appear here, it means that even though its code maybe in the directory, you haven't told bit to track it yet - i.e. you haven run `Bit add <component-name>` for that component.

This showcase is dynamic and gets updated whenever a new component is added, or an existing component is modified. Each component is annotated according to [its state](/workspace/statuses) and test results, so you get a clear indication of how your code modifications have affected the component, in near real time.

## Local component dev-server

Each component has it's own local dev-server it renders when you browse it, the output of the local server is rendered in the workspace UI when you choose to view a specific component. The component's development server and features are part of the [component development environment](/environment/overview). The workspace UI communicates with the **environments** to render information about the component.

- **Overview** - Renders a documentation page for each component. [Learn more](/documentation/automated-docs).
- **Compositions** - An isolated rendering environment for the component used for testing the code in different compositions and scenarios. [Learn more](/compositions/develop-in-isolation).
- **History** - Complete version history and changelog for the component. [Learn more](/versioning/overview#building-component-history).
- **Testing** - List of all the tests written for the component, including results and their logs. [Learn more](/testing/correct-link-here)
- **Configuration** - Configuration of the environment that the component was developed under [Learn more](/testing/correct-link-here)