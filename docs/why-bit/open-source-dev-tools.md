---
id: open-source-dev-tools
title: Open Source Development Tools
---

## Open Source Development Tools

A rich and fully extendable toolset for modular application development.

### Lego-Like Component Workspace

* **Dynamically add, import, and export components**
* **Personalize your workspace and work only what you need**
* **Auto-define and manage all component dependencies**
* **Abstract away all painful configurations with the simple ‘workspace.json’**
* **Enjoy a smooth and holistic dev experience**

Bit’s workspace turns your project into a smart “monorepo” where components are fully decoupled from each other during every step of their development, build, test, and publish process. Bit will ensure each component is completely independent, while helping you manage and synchronize all components in your project with an effortless and holistic developer experience. It is a bedrock for truly modular and harmonized development.

![Component-monorepo-workspace](https://storage.googleapis.com/static.bit.dev/harmony-docs/monorepo-components-bit.png)

### Modular Component Dev Environments

* **Use or create modular per-component dev environments**
* **Easily apply different environments to components**
* **Develop, build, test, lint etc each component individually**
* **Reuse environments across components and projects**

A Bit Environment is a component that configures and “bundles” together different services needed throughout the life-cycle of an independent component. These services include compiling, bundling, testing, linting, documenting, and more. A single workspace can maintain several types of development environment (Angular, React, Vue, etc) for different types of components, without requiring that you manage multiple processes.

Bit environments make it possible to build and deliver independent components without the overhead of setting up a development environment to support that. Environments are also used to ensure consistency by standardizing the environment setup for independent components, developed across various projects by different teams.

![component-dev-environments](https://storage.googleapis.com/static.bit.dev/harmony-docs/Screen%20Shot%202020-11-10%20at%202.56.23%20PM.png)

### Visual Development UI

* **Spawn a visual UI with a powerful dev server and hot reloading**
* **Render and visualize your components in isolation**
* **View and edit beautiful component documentations**
* **Run and view component build and tests results as you code**
* **Visualize and manage your component dependency graph**
* **Quickly browse versions and changelogs**
* **Explore your project’s beautiful component gallery**

Bit makes sure that not only you get an A+ dev experience for modular projects, but also that you enjoy it visually. Open Bit’s powerful UI to visually develop, build, test, manage and render the components in your project with instant feedback as you code.

And, the entire Bit UI is made of components too, so you can customize and extend the UI to include any feature or look any way you like. We do it all the time!

![component-dev-server](https://storage.googleapis.com/static.bit.dev/harmony-docs/Workspace-Grid%20(1).png)  

### Reusable Docs Templates

Make documentation an integral part of how you build components, using customizable and reusable templates that turn your code into beautiful docs. And, render and add visual compositions of components to see and learn how it works in different contexts and with its different dependencies or dependants. All with live hot reloading. When done, place your docs on [Bit.dev](https://bit.dev/) for everyone else to discover and enjoy!

![docs-and-compositions](https://storage.googleapis.com/static.bit.dev/harmony-docs/Compositions%20(1).png)

### Component Dependency Graphs

Bit is smart, it tracks and “knows” about the relationships between all components in your workspace. When you make a change, Bit “knows” which other components are impacted by the change, and helps you safely propagate the change to all impacted components while making sure they will still pass their build and tests. You can easily view and manage each component’s dependency graph, or the entire graph of your project, right in your local development UI.

![component-dependencies](https://storage.googleapis.com/static.bit.dev/harmony-docs/Dependencies%20(1).png)

### Component Versions and History

Each component is versioned individually and has its own changelog so you can keep track of changes easily and quickly. View each component’s history, travel between versions, to easily learn what changed, by who, and when.

![component-history](https://storage.googleapis.com/static.bit.dev/harmony-docs/History.png)

### Isolated Component Builds and Testing

Build and test each component in complete isolation using predefined and customizable test environments, which can also be added into your pipelines. See builds and tests running live on every change as you code, to create bulletproof independent components that run anywhere.

![component-tests](https://storage.googleapis.com/static.bit.dev/harmony-docs/Tests.png)

#### Component Build Pipelines

Build helps you standardize the build pipeline of all your components. Define jobs in a pipeline according to your best standards and make sure that all components are released through the same steps. Bit will even help you automate these workflows so that all components will go through these pipeline every time their builds will run.

![component-builds](https://storage.googleapis.com/static.bit.dev/harmony-docs/component-builds.png)

#### Incrementally Propagating Builds

 When you make a change in your project, Bit “knows” exactly which components are impacted by that change. It uses this information to rebuild and retest only the components impacted by the change, and infinitely propagates this process to all impacted dependents. The result? X30 (!) faster build times and surgical ability to pin-poin the impact of changes on the graph.

### Independent Component Publishing
 
Enjoy 100% reusability for all components as a seamless side effect of your development workflow. Publish independent components in your workspace as individual packages without having to split your project, define complex configurations, or do anything else but simply developing your components in Bit’s workspace.

![component-builds](https://storage.googleapis.com/static.bit.dev/harmony-docs/yarn%20and%20npm.png)

### Scopes

A “Scope” is a lightweight component server that provides a rich API for accessing, persisting and versioning components. Scopes host and organize your components so that they can be easily managed, exposed, and integrated into new environments.

> To learn more about Bit’s core concepts such as Workspace, Scope, Environment, or Compositions, feel free to explore the docs and learn more. Or, try the Hello World! 5 min tutorial to get started hands-on.

