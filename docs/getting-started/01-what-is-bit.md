---
id: what-is-bit
title: What is Bit?
---

### Build modular applications in a fast, scalable, and consistent way. 

Bit is a rich and extensible toolset for building independent components and composing component-driven applications. It is a standard infrastructure for components, that helps you easily scale to many teams building consistent and performant applications together. 

*How?*

Bit’s workspace turns any project into a powerful multi-component monorepo. It helps developers build projects in a modular way, so each component is independently developed, tested, built, rendered, limited, documented, versioned, and published. All components and dependencies are managed in a simple harmonic “monolith-like” developer experience with smooth control over all changes to your code or your development environment.

Bit’s cloud platform helps teams collaborate on components and build together. Organizations can distribute web development into autonomous teams that build apps/features in decoupled codebases. All teams can easily share components, collaborate, and integrate with each other. Each team can develop and release components autonomously, and get tools to standardize and manage components across teams and projects.  

**Bit is used by thousands of teams**, including some of the world’s best tech organizations whose products you use every day. Join us to build better web applications faster together too.  


**What can Bit do for you?**:  

* **[Design Systems & Shared Components](#ui-design-system)**  
* **[Component Monorepo](#component-monorepo)**
* **[Micro Front-Ends](#micro-frontends)**  
* **[Developer Designer Collaboration](#developer-designer-collaboration)**
* **[Sharing Code Between Teams](#sharing-code-between-teams)**
* **[Infinite Component Reuse](#component-reuse)**  
* **[Standardization and Consistency](#standardization-and-consistency)**  
* **[Autonomous Teams, Independent Delivery](#autonomous-teams-and-independent-delivery)**
* **[Scaling Web Development](#scaling-web-development)**   

**Core features**:  

* **[Extensible Dev Tools](#extensible-development-tools)**
* **[Component Cloud Platform](#cloud-platform-key-features)**  


> **Tip 1**: Bit components can be anything from UI components to Hooks, Widgets, Pages, Features or even Node Modules. You decide what should be componentized first.

> **Tip 2**: Bit is 100% modular and extensible. In fact, Bit is built 100% out of Bit components. This means you can extend, change, replace or customize it to do anything you like.

## Popular Use Cases

Developer teams will enjoy a shared infrastructure that lets them scale web development together. It increases the speed of delivery, allows teams to easily integrate and collaborate with each other, while keeping them autonomous to constantly build and deliver new features.  

### UI Design System  

#### Read -> “[How We Build Our Design System](https://blog.bitsrc.io/how-we-build-our-design-system-15713a1f1833)”  

![Design system](https://storage.googleapis.com/static.bit.dev/harmony-docs/bit-design-system.jpeg)  


*Design systems* are how great teams keep their UI consistent across multiple pages and applications. Modern design systems are built with components, which are used as shared building blocks to ensure consistency. Bit is a perfect way for teams to distribute, discover, use, and collaborate on their component-driven design system. And, it’s also a great way for developers to include more people, like designers, in their web development process.  

* **Collaborative component ecosystem** - Bit is how teams work together to build a thriving, collaborative, and beautiful component ecosystem for all developers. Everyone can develop components in their own applications, share components with each other via the component cloud, discover and use other people’s components, easily suggest feedback and changes, and enjoy an harmonic balance between innovation, delivery, and consistency.  

* **Ensure consistency in design and code** - Bit helps you standardize the development of components and visualize all UI changes in real time to help you ensure every component and every change will meet both your team’s design and development release criteria.  

* **Universal hub for components** - All your components are hosted, shared, and exposed on the component cloud. Every team can own and expose its own components, while easily finding and consuming components exposed by other teams, all in one secured and manageable place.  

* **Develop independent components** - Bit provides the richest and most powerful component development toolset available in the world, to help your build independent reusable components which can be quickly integrated and used in new projects and new environments.  

* **Distribute independent components** - Bit makes it easy to publish many components from any project, as independently versioned packages. Don’t install (or be forced to update) entire libraries just to gain access to a few APIs.  


* **Incremental component updates** - With Bit you only get updates to components you actually use, and don’t have to update a whole library for no reason. And, Bit auto-detects which components are impacted by every change, so it helps you easily and safely adopt changes into your project without breaking anything. Staying updated made simple and painless.

* **Component usage analytics** - In the component cloud you can learn which projects and which teams  adopted which updates to what components. Learn the exact status of every component in every app, and gain actionable insights on your entire UI development.  

* **Scalable discovery and documentation** - Bit turns documentation into a native and almost seamless part of creating components. It combines auto-generated API reference, MDX and other formats, visual examples, rendered compositions and many other doc features to create the richest and most simple to consume docs for every component. When you publish to the component cloud, all these docs are hosted in the cloud as a part of every component. **No extra tools or websites required**.

* **Automated GitHub updates** - Bit.dev offers a GitHub integration, so that when a new component version is released, Bit automates the creation of pull-requests in every impacted GitHub repository, with all relevant information such as build results etc already included in the PR. And, at any moment, you can view who merged which PRs into which projects.

* **Automated Slack updates** - Bit.dev offers a GitHub integration, so that when a new component version is released, Slack notifications will be sent to all relevant people whose projects are impacted by the change. Nudging is now automated!

* **Developer-designer handshake** - Bit visualizes the code of your UI component to designers, and helps them learn exactly how every component looks and behaves as seen by users, at any given moment in time, and in every version. When a new version is released, simply ask designers to review the change - they will be able to see exactly what components are impacted by the change, how each of them will look, and give feedback. You can even [automate this process](https://blog.bitsrc.io/introducing-bit-dev-webhooks-78dade77c6da) to create tasks for designers to review every component change before its published. 


### Component Monorepo

Bit helps you build a modular and scalable multi-component monorepo. It provides a fully decoupled and modular way to develop, built, test, lint, publish etc many components in one project, while keeping a simple and holistic developer experience.  

![Component-monorepo-2](https://storage.googleapis.com/static.bit.dev/harmony-docs/component-monorepo.png)  


Bit covers all aspects of building a multi-project monorepo, and even provides a beautiful UI where you can easily master and navigate the development of your modular project. 


Key features include:

* **Seperated, reusable, customizable dev environments** -  Reusable and customizable modules that configures and “bundles” together different services needed throughout the life-cycle of an independent component such as compiling, bundling, testing, linting, documenting, and more.  

* **Mastery of the component graph**  -  Bit defines, manages, and helps you leverage the relationship between all components in your project. At any time, you can visit the dependencies tab in Bit’s UI to learn exactly which components depend on other components. It uses this information to allow incremental propagating builds and tests, bulk publishing based on automated change detection, and more powerful features.

* **Decoupled, incremental, propagating builds** - Bit only build changes to impacted components on the graph. Each change propagates infinitely to all impacted components on the graph. Nothing else but the impacted components is built. Every impacted component is built in isolation to ensure its fully safe to deploy changes.  

* **Auto detecting changes and bumping impacted components** - When you make a change to a component,  Bit automatically detects which other components depend on the changed component, and “knows” to build only the impacted graph of dependent components - with infinite propagation. Building changes across many components in your project becomes a blazing fast yet surprisingly simple task that is mostly automated.  

* **Isolated incremental component testing** - Each component is tested in isolation using a test environment which is also a reusable module. As you code you can view the test results reload in Bit’s UI, to know exactly if the component breaks or not. As you test the component, via ‘bit test’ or by releasing a new version etc, Bit will detect and test all impacted components up the dpandats graph, to make sure your changes will not break any other component.  

* **Component symlinking** lets ‘bit install’ build components that depend on other components that did not yet been tagged with a matching version.  

* **Modular bulk publishing** - Every component developed in a Bit monorepo is, by design, ready to be published as a standalone package. Bit strips aways all the overhead of configuring each component’s ‘package.json’ and other setup files. All you have to do is run ‘bit tag’ so that Bit will auto tag all changed components with a version bump (supporting semver rules), and then bulk publish changes to all impacted components. Each component published to the bit.dev cloud platform will be available to find and install, with every part of the local UI view available on the cloud as auto-updating documentation, including API reference, examples, compositions, dependency graphs, test results, code and more. 

* **Component changelogs and history** - Every component has its own changelog and version history so it’s very easy to view and learn about changes in Bit’s UI or on the cloud.

* **Component docs and examples** - Every component is documented using reusable and customizable templates, and Bit automates much of the work for you. Working with MDX? No problem, Bit supports almost any format you’d like to use to create beautiful docs.

* **Compositions rendered in isolation** - Every component is rendered in full isolation, literally outside of the project, and these visuals (which hot-reload as you code) become a part of each component’s documentation when developing locally, and in the cloud.

* **Component build pipelines** - You can pipe build jobs in a reusable pipeline that can be applied to all components in a project or in all of your team’s projects, in order to easily standardize the development and release process of your web applications. For example, company “Acme” can define “Acme Release Pipeline” with specific configurations which will standardize how all components in Acme will be tested, built and released. 

* **Extend, replace, or customize anything** - Bit is 100% modular. Every part of Bit is a reusable, extensible, and customizable module. Including everything - dev environments, build environments, the UI, docs templates, the workspace, build pipelines, everything. You can easily and quickly change, remove, add, or replace any part of Bit, your toolchain, or workflow. You can even add features to the workspace UI to enrich your experience. It’s just a matter of composing a few components.


### Micro Frontends  

#### Read -> “[How We Build Micro Frontends](https://blog.bitsrc.io/how-we-build-micro-front-ends-d3eeeac0acfc)”  

![Micro Frontends](https://i.ibb.co/fn8krfn/homepage-components-micro-frontends.png)

*Micro frontends* are a philosophy of how software should be built, and how teams and organizations should work together. Bit is the most production-ready and scalable way to build Micro Frontends, driven by modern components.   

* **Decoupled Codebases** -  Each team can develop components in their own codebase, which is decoupled in every way during development from all other teams’ codebases.  

* **Team API ownerships** - Autonomous teams can own and expose components and features as APIs to all other teams, via Bit’s cloud, so that everyone can continuously integrate.  

* **Build-time integrations** - Teams can easily discover and install each other’s components in their own components, and compose components together to release modular applications.  

* **Incremental upgrades** - Each team can constantly release updates to specific components and easily make sure all impacted components, teams, and applications will get all and only the updates they need, and that incremental builds and test allow the safe release of upgrades.  

* **Independent releases** - Teams no longer have to fight over master or step on each other’s toes, as each component can be built using its own build environments and even build pipelines. All teams can constantly deliver innovation safely and independently to production.  

Need an example? Take a look at how the [homepage of Bit.dev](https://bit.dev) is composed of components built by different teams, in different codebases, released independently, and smoothly integrated together.



### Developer Designer Collaboration

Bit is a very effective way to bridge the gap between design and development. Unlike legacy tools, it helps developers include designers (and other people) in the development process.  

![Developer Designer Collaboration](https://storage.googleapis.com/static.bit.dev/harmony-docs/Overview-bitdev.png)

Bit makes it easy for developers to include designers, product managers, and business stakeholders in the development process of web applications. Everyone can easily discover, see, and collaborate on components in a visual way, together, and directly over code.

Bit makes it easy to document components in a visual way, while rendering the isolated visual of every component’s version with different examples and compositions. 

When a developer implements a component, the designer can instantly see how it looks in the code and what will the user get in production. When there’s a change to a component, the designer can easily monitor and ensure that all visual changes are according to design guidelines. And, designers can play with all components hands-on, try different things, save examples for developers to implement, and become active partners in the development process. 

Bit also plays beautifully with tools like Zeplin and components designed in tools like Figma or Sketch. Together, it brings designers and developers closer than ever before possible.

### Sharing Code Between Teams

Bit is a very effective way to share code between teams.  

With Bit, each team can easily create and publish components from their own independent codebase. Via the component cloud, all teams can share and discover each other’s components, and quickly integrate them into different projects. Advanced features make this process more collaborative, so it becomes very easy to suggest feedback and changes to shared code, build together, and stay in sync.

The ease of publishing alongside the ease of discovery and reuse make Bit a highly scalable solution for sharing code between teams. Bit can be used to share UI components, but also any other form of reusable code units like Hooks or even Node modules, util functions, serverless functions and more. 


### Standardization and Consistency  

*Web development standardization and consistency* means that all components will follow the same design patterns, will be developed using the same development environments, tested and built using the same pipelines, and will be documented and published using the same templates. This way an organization can ensure consistency in the development process, and deliver higher quality applications which are more resilient and performant. Bit is the most powerful yet flexible way to achieve standardization for components. It provides features such as customizable and reusable development environments, which ensure all teams create components the same way, yet living room for unavoidable changes when necessary. Customizable and reusable build pipelines ensure all components are built and tested the same way by predefined standards. Fully customizable docs templates ensure all components can easily be published and used by other developers and teams.  And, since Bit is 100% extensible, this is just where your imagination starts.


### Autonomous Teams and Independent Delivery

Independent components and decoupled codebases means independent teams and autonomous team delivery.

Conway’s law suggests a clear symmetry between a codebase architectural style and the way that codebase is built by people working together. Building applications with independent components means developers create and deliver features independently. It means they are completely decoupled from anything that has the potential to become a blocker to their own progress. That naturally translates to faster delivery but that also reduces frustration, as each developer enjoys complete autonomy and full mastery over their own scope.

![Autonomous-Teams](https://storage.googleapis.com/static.bit.dev/harmony-docs/Screen%20Shot%202020-08-10%20at%205.22.04%20PM.png)  


### Scaling Web Development

As developers we are tasked with building innovative solutions for our products. When we don't have an efficient way of isolating and sharing code we've already implemented we are locked in an endless cycle of re-implementing the same functionality we built before and then maintaining it in multiple code bases. With the introduction of component-based frameworks like React, Angular and Vue our code has become more modular and the components we design can work in multiple apps and use cases. However they are implemented in rigid code repositories that don't allow us to easily reuse an already implemented piece of code.

Bit solves the problem of sharing and managing components between different projects so you can focus on building new, exciting and innovative solutions for your product or products. When utilizing Bit you can quickly share each component as a separate module from your project. Other developers can then take your component and use it as part of their components, like they would any other npm/yarn package, to drastically speed up their delivery. Moreover, they can then share their components for you to use.

Bit connects frontend teams by using components as services in a similar way to how microservices architecture has done so for backend teams.


### Component Reuse  

*Component reuse* is a great way to speed software delivery, reduce effort on redundant code and maintenance, eliminate bugs and mistakes, and make sure more resources are focused on innovation. Components are by design modular, and therefor can and should be reused. Bit turns 100% of your components reusable as a seamless part of your workflow! Every single component you create becomes a fully reusable asset that can be very easily published, documented, and reused in new projects. No repository splitting, no complex configs, no overhead. Thanks to Bit.dev, code reuse can be infinitely scaled while making sure everything is always easily discoverable, and can be found and used one click away. And, using advanced features like ‘bit import’, it becomes easier than ever to quickly evolve and adjust components right from any new context.


## Core Features

[Bit](https://github.com/teambit/bit) is a rich and extendable open-source toolset for modular development including a component workspace, customizable reusable component dev environments, standard build pipelines, dependency-graph resolutions, and more.

The [Bit.dev cloud platform](https://bit.dev/) is an enterprise-grade solution for developers to share and collaborate on components, continuously integrate with changes with each other, and make sure that all applications are always up to date with the latest versions.

## Extensible Development Tools

A rich and fully extensible toolset for modular application development.

### Component Workspace

Bit’s workspace turns your project into a smart “monorepo” where components are fully decoupled from each other during every step of their development, build, test, and publish process. Bit will ensure each component is completely independent, while helping you manage and synchronize all components in your project with an effortless and holistic developer experience. It is a bedrock for truly modular and harmonized development.

![Component-monorepo-workspace](https://storage.googleapis.com/static.bit.dev/harmony-docs/monorepo-components-bit.png)  


### Component Development Server  

Bit comes with a powerful dev server for components, that lets you render, test and document each component on its own server. A single workspace can maintain several types of development environment (Angular, React, Vue, etc) for different types of components, without requiring that you manage multiple processes.  

![component-dev-server](https://storage.googleapis.com/static.bit.dev/harmony-docs/Workspace-Grid%20(1).png)  


### Component Dev Environments

A Bit Environment is a component that configures and “bundles” together different services needed throughout the life-cycle of an independent component. These services include compiling, bundling, testing, linting, documenting, and more.

Bit environments make it possible to build and deliver independent components without the overhead of setting up a development environment to support that. Environments are also used to ensure consistency by standardizing the environment setup for independent components, developed across various (decoupled) projects.

Bit provides a number of environments to choose from. Each environment is completely customizable and extendible (once you create your own custom environment, it can be shared with others like any other component). 



![component-dev-environments](https://storage.googleapis.com/static.bit.dev/harmony-docs/Screen%20Shot%202020-11-10%20at%202.56.23%20PM.png)  


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

![component-builds](https://storage.googleapis.com/static.bit.dev/harmony-docs/Screen%20Shot%202020-08-10%20at%205.03.29%20PM.png)  


### Independent Component Publishing
 
Enjoy 100% reusability for all components as a seamless side effect of your development workflow. Publish independent components in your workspace as individual packages without having to split your project, define complex configurations, or do anything else but simply developing your components in Bit’s workspace.  

![component-builds](https://storage.googleapis.com/static.bit.dev/harmony-docs/yarn%20and%20npm.png)  


### Scopes 

A “Scope” is a lightweight component server that provides a rich API for accessing, persisting and versioning components. Scopes host and organize your components so that they can be easily managed, exposed, and integrated into new environments.  


> To learn more about Bit’s core concepts such as [Workspace](), [Scope](), [Environment](), or [Compositions](), feel free to explore the docs and learn more. Or, try the [Hello World!]() 5 min tutorial to get started hands-on.


## Cloud Platform Key Features

![component-discovery](https://storage.googleapis.com/static.bit.dev/harmony-docs/Scope-bitdev.png) 

Bit.dev is your collaborative ecosystem to share components as a team and build applications together while keeping all components in perfect sync.

Enjoy a secured enterprise-grade cloud platform to easily scale development to multiple projects and teams, with a single hub to share, collaborate, and integrate components with each other.

### Secured Cloud Hosting for Components

Host all your components on Bit’s cloud platform to allow streamlined collaboration and integration between different teams and projects.

Host your component Scopes on the cloud, to enjoy advanced features such as role-based permissions, component search, and a built-in package registry to install your components. Have all your components in one place, available for your entire team to share together.


### Documentation and Discovery

No more creating and maintaining additional documentation websites. As Bit makes it easy for many developers to share and collaborate on many components.

As you create components, Bit helps you create stunning customized documentation which can be uploaded to the cloud for everyone to discover and enjoy. Advanced features like *component search* or *context filters* help you easily find the best and right components in seconds and introduce them into any new project.

![component-discovery](https://storage.googleapis.com/static.bit.dev/harmony-docs/Screen%20Shot%202020-08-11%20at%204.02.54%20PM.png)  


### Team Management  

Easily manage and scale your organization on Bit.div with advanced features like assigning team ownerships over scopes, roll-based permissions, SSO and more. The platform is trusted by global teams that build together at first-class scale.  


### Built-in Package Registry  

Every component can be independently installed as a package via a built-in registry 
that supports installation via the npm, pnpm, and yarn clients. This means you now have your components hosted, documented and ready to install - all in one place.


### Managed Updates and Automated GitHub/GitLab PRs  

Bit.dev manages updates for all components hosted on the platform. Everyone can easily collaborate on shared components, suggest updates right from their local projects, and create a thriving ecosystem of shared components in your organization. Bit.dev even integrates to GitHub/GitLab so it “knows” exactly which components are used in which projects, to send automated PRs that help make sure all projects and teams will get all relevant updates. And, it integrates with Slack and more tools to help your team smoothly work together. 

![bitdev-integrations-slack-github](https://storage.googleapis.com/static.bit.dev/harmony-docs/Screen%20Shot%202020-11-10%20at%204.43.00%20PM.png)  

### RIPPLE CI (*Coming Soon*) - Component-Driven Builds

Unlike legacy tools built for monolithic applications, **Ripple CI is 100% component-driven**. It only builds changes to specific components and propagates them up the dependency graph of all impacted components, across all impacted applications. It lets teams decouple their releases from each other, and enjoy a X50 faster and much safer continuous integration for independent and paced releases to production. No more fighting over master, no more waiting for versions to bloat, no more breaking applications in production without knowing in advance exactly what’s going to break. Want to join some of the world’s best teams on the Beta list? [Let us know](https://bit.dev/contact-sales).
