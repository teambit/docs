---
id: popular-use-cases
title: Popular Use Cases
---

## Popular Use Cases

Developer teams will enjoy a shared infrastructure that lets them scale web development together. It increases the speed of delivery, allows teams to easily integrate and collaborate with each other, while keeping them autonomous to constantly build and deliver new features.

> * Bit components can be anything from UI components to Hooks, Widgets, Pages, Features or even Node Modules. You decide what should be componentized first.
> * Bit only lives in build time. It does not add runtime dependencies to your code, and does not affect how you implement components.

### Micro Frontends

#### Read -> “[How We Build Micro Frontends](https://blog.bitsrc.io/how-we-build-micro-front-ends-d3eeeac0acfc)”

![Micro Frontends](https://i.ibb.co/fn8krfn/homepage-components-micro-frontends.png)

*Micro frontends* are a philosophy of how software should be built, and how teams and organizations should work together. Bit is the most production-ready and scalable way to build Micro Frontends, driven by modern components.

* **Decoupled Codebases** - Each team can develop components in their own codebase, which is decoupled in every way during development from all other teams’ codebases.
* **Team API ownerships** - Autonomous teams can own and expose components and features as APIs to all other teams, via Bit’s cloud, so that everyone can continuously integrate.
* **Build-time integrations** - Teams can easily discover and install each other’s components in their own components, and compose components together to release modular applications.
* **Incremental upgrades** - Each team can constantly release updates to specific components and easily make sure all impacted components, teams, and applications will get all and only the updates they need, and that incremental builds and test allow the safe release of upgrades.
* **Independent releases** - Teams no longer have to fight over master or step on each other’s toes, as each component can be built using its own build environments and even build pipelines. All teams can constantly deliver innovation safely and independently to production.
Need an example? Take a look at how the [homepage of Bit.dev](https://bit.dev) is composed of components built by different teams, in different codebases, released independently, and smoothly integrated together.

### UI Design System

#### Read -> “[How We Build Our Design System](https://blog.bitsrc.io/how-we-build-our-design-system-15713a1f1833)”

![Design system](https://storage.googleapis.com/static.bit.dev/harmony-docs/bit-design-system.jpeg)

*Design systems* are how great teams keep their UI consistent across multiple pages and applications. Modern design systems are built with components, which are used as shared building blocks to ensure consistency. Bit is a perfect way for teams to distribute, discover, use, and collaborate on their component-driven design system. And, it’s also a great way for developers to include more people, like designers, in their web development process.

* **Collaborative component ecosystem** - Bit is how teams work together to build a thriving, collaborative, and beautiful component ecosystem for all developers. Everyone can develop components in their own applications, share components with each other via the component cloud, discover and use other people’s components, easily suggest feedback and changes, and enjoy an harmonic balance between innovation, delivery, and consistency.
* **Ensure consistency in design and code** - Bit helps you standardize the development of components and visualize all UI changes in real time to help you ensure every component and every change will meet both your team’s design and development release criteria.
* **Universal hub for components** - All your components are hosted, shared, and exposed on the component cloud. Every team can own and expose its own components, while easily finding and consuming components exposed by other teams, all in one secured and manageable place.
* **Develop independent components** - Bit provides the richest and most powerful component development toolset available in the world, to help your build independent reusable components which can be quickly integrated and used in new projects and new environments.
* **Distribute independent components** - Bit makes it easy to export many components from any project, as independently versioned packages. Don’t install (or be forced to update) entire libraries just to gain access to a few APIs.
* **Incremental component updates** - With Bit you only get updates to components you actually use, and don’t have to update a whole library for no reason. And, Bit auto-detects which components are impacted by every change, so it helps you easily and safely adopt changes into your project without breaking anything. Staying updated made simple and painless.
* **Component usage analytics** - In the component cloud you can learn which projects and which teams adopted which updates to what components. Learn the exact status of every component in every app, and gain actionable insights on your entire UI development.
* **Scalable discovery and documentation** - Bit turns documentation into a native and almost seamless part of creating components. It combines auto-generated API reference, MDX and other formats, visual examples, rendered compositions and many other doc features to create the richest and most simple to consume docs for every component. When you publish to the component cloud, all these docs are hosted in the cloud as a part of every component. **No extra tools or websites required**.
* **Automated GitHub updates** - Bit.dev offers a GitHub integration, so that when a new component version is released, Bit automates the creation of pull-requests in every impacted GitHub repository, with all relevant information such as build results etc already included in the PR. And, at any moment, you can view who merged which PRs into which projects.
* **Automated Slack updates** - Bit.dev offers a GitHub integration, so that when a new component version is released, Slack notifications will be sent to all relevant people whose projects are impacted by the change. Nudging is now automated!
* **Developer-designer handshake** - Bit visualizes the code of your UI component to designers, and helps them learn exactly how every component looks and behaves as seen by users, at any given moment in time, and in every version. When a new version is released, simply ask designers to review the change - they will be able to see exactly what components are impacted by the change, how each of them will look, and give feedback. You can even [automate this process](https://blog.bitsrc.io/introducing-bit-dev-webhooks-78dade77c6da) to create tasks for designers to review every component change before its published.

#### Component Monorepo

Bit helps you build a modular and scalable multi-component monorepo. It provides a fully decoupled and modular way to develop, built, test, lint, publish etc many components in one project, while keeping a simple and holistic developer experience.

![Component-monorepo-2](https://storage.googleapis.com/static.bit.dev/harmony-docs/component-monorepo.png)

Bit covers all aspects of building a multi-project monorepo, and even provides a beautiful UI where you can easily master and navigate the development of your modular project.

Key features include:

* **Seperated, reusable, customizable dev environments** - Reusable and customizable modules that configures and “bundles” together different services needed throughout the life-cycle of an independent component such as compiling, bundling, testing, linting, documenting, and more.
* **Mastery of the component graph**  -  Bit defines, manages, and helps you leverage the relationship between all components in your project. At any time, you can visit the dependencies tab in Bit’s UI to learn exactly which components depend on other components. It uses this information to allow incremental propagating builds and tests, bulk publishing based on automated change detection, and more powerful features.
* **Decoupled, incremental, propagating builds** - Bit only build changes to impacted components on the graph. Each change propagates infinitely to all impacted components on the graph. Nothing else but the impacted components is built. Every impacted component is built in isolation to ensure its fully safe to deploy changes.
* **Auto detecting changes and bumping impacted components** - When you make a change to a component, Bit automatically detects which other components depend on the changed component, and “knows” to build only the impacted graph of dependent components - with infinite propagation. Building changes across many components in your project becomes a blazing fast yet surprisingly simple task that is mostly automated.
* **Isolated incremental component testing** - Each component is tested in isolation using a test environment which is also a reusable module. As you code you can view the test results reload in Bit’s UI, to know exactly if the component breaks or not. As you test the component, via ‘bit test’ or by releasing a new version etc, Bit will detect and test all impacted components up the dpandats graph, to make sure your changes will not break any other component.
* **Component symlinking** lets ‘bit install’ build components that depend on other components that did not yet been tagged with a matching version.
* **Modular bulk publishing** - Every component developed in a Bit monorepo is, by design, ready to be published as a standalone package. Bit strips aways all the overhead of configuring each component’s ‘package.json’ and other setup files. All you have to do is run ‘bit tag’ so that Bit will auto tag all changed components with a version bump (supporting semver rules), and then bulk publish changes to all impacted components. Each component published to the bit.dev cloud platform will be available to find and install, with every part of the local UI view available on the cloud as auto-updating documentation, including API reference, examples, compositions, dependency graphs, test results, code and more.
* **Component changelogs and history** - Every component has its own changelog and version history so it’s very easy to view and learn about changes in Bit’s UI or on the cloud.
* **Component docs and examples** - Every component is documented using reusable and customizable templates, and Bit automates much of the work for you. Working with MDX? No problem, Bit supports almost any format you’d like to use to create beautiful docs.
* **Compositions rendered in isolation** - Every component is rendered in full isolation, literally outside of the project, and these visuals (which hot-reload as you code) become a part of each component’s documentation when developing locally, and in the cloud.
* **Component build pipelines** - You can pipe build jobs in a reusable pipeline that can be applied to all components in a project or in all of your team’s projects, in order to easily standardize the development and release process of your web applications. For example, company “Acme” can define “Acme Release Pipeline” with specific configurations which will standardize how all components in Acme will be tested, built and released.
* **Extend, replace, or customize anything** - Bit is 100% modular. Every part of Bit is a reusable, extendable, and customizable module. Including everything - dev environments, build environments, the UI, docs templates, the workspace, build pipelines, everything. You can easily and quickly change, remove, add, or replace any part of Bit, your toolchain, or workflow. You can even add features to the workspace UI to enrich your experience. It’s just a matter of composing a few components.

### Developer Designer Collaboration

Bit is a very effective way to bridge the gap between design and development. Unlike legacy tools, it helps developers include designers (and other people) in the development process.

![Developer Designer Collaboration](https://storage.googleapis.com/static.bit.dev/harmony-docs/Overview-bitdev.png)

* **Visualize all components for designers and everyone else** - Bit brings everyone in the team together directly over components. All components implemented by developers become visually available to designers, product managers, marketers and everyone else.
* **Notify designers and visualize all component changes and new versions** - All changes and new versions to components to components are available to designers to see and track, so they can easily compare changes and ensure a beautiful consistent design.
* **Preview and visualize all released changes to components in all projects** - *Ripple CI* lets teams release component changes to all impacted projects. Each change on each impacted component is **visualized in a live preview** during the build process, so that designers can learn exactly how releases impact the visual design of every screen and application.
* **Integrate Zeplin, Figma and other tools for UI creation utopia** - Imagine all your design components on Figma and Zeplin connected to the actual component implemented by developers and to the code that runs in production. Every change is updated and compared in code and design. This can be done with Bit, to achieve UI development utopia where designers and developers build together, for real.
* **Let designers actively actively participate by editing and saving visual changes** - *Coming soon!*: Enjoy visual editing features to help designers instantly give feedback, suggest changes, and ultimately release changes to code components right from the component cloud.

### Development Scale and Speed

* **Reuse 100% of your components to greatly speed up development** - Each component reused is hours or days of work saved by a developer. Taking components to the cloud will save organizations up to 50% of development time and resources, and focus them on innovation.
* **Eliminate bugs, mistakes, and inconsistencies in web projects** - Customize, standardize, and reuse development environments, documentation templates, and build pipelines to eliminate up to 90%(!) of all component inconsistencies, bugs, and mistakes in production.
* **Save 90% time and overhead on integrations between teams and projects** - Every component is available to everyone in the organization on the component cloud. All components can be quickly introduced into different projects by simply importing them into the project’s workspace and integrating them to other components in the workspace. Teams report Bit to save roughly 40% of time spent on their cross-team integrations.
* **Shorten the feedback loop between developers, designers, and everyone** - Save A LOT of time on designer and developer collaboration through [developer and designer collaboration](###developer-designer-collaboration). Visualize all components, let designers view all components, versions, and changes, and integrate your favorite design tools. Shorten product and feature feedback loops by up to 50% and greatly improve outcome quality.
* **Ripple CI: Hyper fast modular builds without fighting over master** - Unlike legacy tools, *Ripple CI* does not build an entire monolithic application. Instead, it only builds propagating changes to impacted components making it A LOT faster than anything you’ve known. It incrementally builds changes to components on the graph, so each team can independently and rapidly release changes to their components without stepping on other team’s toes.
* **Reduce time and overhead and remove external tools from your toolchain** - No more external documentation websites, monorep development tools, publishing tools, or different dev and build tools used by different teams for no reason. Bit will let you choose, reuse, and standardize the best tools, and remove any extra tools to build with components.

![Autonomous-Teams](https://storage.googleapis.com/static.bit.dev/harmony-docs/Screen%20Shot%202020-08-10%20at%205.22.04%20PM.png)

### Collaborating and Sharing Components

Bit is a very effective way to share and reuse code between teams.

With Bit, each team can easily create and publish components from their own independent codebase. Via the component cloud, all teams can share and discover each other’s components, and quickly integrate them into different projects. Advanced features make this process more collaborative, so it becomes very easy to suggest feedback and changes to shared code, build together, and stay in sync.

The ease of publishing alongside the ease of discovery and reuse make Bit a highly scalable solution for sharing code between teams. Bit can be used to share UI components, but also any other form of reusable code units like Hooks or even Node modules, util functions, serverless functions and more.

