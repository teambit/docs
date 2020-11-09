---
id: Why Bit?
title: Why Bit?
---

Bit is the **component platform for the modern web**.  

With Bit, you can *speed up and improve the process of web development*, while building more performant, consistent and resilient web applications.  

Bit allows you to build fully distributed and modular applications, while enjoying a simple yet powerful monolithic development experience. Each component of the application is independently developed, built, tested, versioned, published, and released to production.  

Every single component written in a Bit-enhanced project can be instantly exported, shared, and integrated into new applications built by other teams using different technology stacks.  

All the different components and all relationships between components are managed in Bit’s workspace, creating a smooth and harmonized experience that enhances every step of the development workflow and allows the composition of highly scalable and performant projects.  

Bit helps teams *scale their web development process together*. Different product teams can become autonomous to develop and ship features in their own codebases and decoupled pipelines, while everyone can share and integrate up to 100% of their components with others. Building web applications together becomes an efficient, fast, and well standardized process.  

*Bit is used by thousands of teams*, including some of the world’s best tech organizations whose products you use every day. Join us to build better web applications faster together too. 

Popular use-cases for Bit are:

- **[UI Design Systems](#ui-design-system)**  
- **[Micro Front-Ends](#micro-frontends)**  
- **[App Standardization and Consistency](#standardization-and-consistency)**  
- **[Scaling Web Development](#scaling-web-development)**  
- **[Core Reuse](#code-reuse)**

> **Tip 1**: Bit components can be anything from UI components to Hooks, Widgets, Pages, Features or even Node Modules. You decide what should be componentized first.

> **Tip 2**: Bit is 100% modular and extensible. In fact, Bit is built 100% out of Bit components. This means you can extend, change, replace or customize it to do anything you like. No limits.


## Core Features  

Bit consist of *two core ingredients*:  

*An [open source tool]*(https://github.com/teambit/bit) that enhances your project with a workspace that allows you to enjoy a simple monolith-like development experience, while building a fully distributed and modular application where every component is developed, documented, published, and released in a fully decoupled way.  

*A secured enterprise-grade cloud platform* where developers can collaborate on components, host scopes, share and integrate each other’s components, manage updates, and build together.  

Among Bit’s key features you will find:  

- **Component workspace:** In a single workspace Bit manages all components as separate modules. Each component has its own dev env, history, configurations, builds, test, and more.  

- **Individual component publishing:** Publish each component separately so your consumers can use the specific components they need instead of a large library of components.  

- **Smart dependency graph:** Inside a Bit repository all components are connected using a single dependency graph. This means that whenever you modify a single component you can see the propagating downstream effects without publishing or running any scripts. And though the Bit.dev cloud, you can scale this process to all impacted applications in your organization.

- **Development server for your components:** Render, test or document each component on its own development server. A single workspace can maintain several types of development environment (Angular, React, Vue, etc) per type of component, without requiring that you manage multiple processes.  

- **Fast and incremental builds:** Bit builds your project according to your dependency graph. So if you only work on a few components, only the relevant parts of the graph are actually built, reducing up to 95% on build time and resources.Yes, it’s a better way to build the modern web.

- **Standardize component development:** From scaffolding new components to setting lint, build and test configurations - use Bit to set base configurations for all your components.  

- **Component changelog:** Each component is versioned individually and has its own changelog so you can keep track of changes easily and quickly.


To learn more about Bit’s core concepts such as [Workspace](), [Scope](), [Environment](), or [Compositions](), feel free to explore the docs and learn more. Or, try the [Hello World!]() 5 min tutorial to get started hands-on.


## Popular Use-Cases 

Developer teams will enjoy a shared infrastructure that lets them scale web development together. It increases the speed of delivery, allows teams to easily integrate and collaborate with each other, while keeping them autonomous to constantly build and deliver new features.  

#### UI Design system  

![Design system](https://i.ibb.co/XDwLKrw/Scope-bitdev.png)

*Design systems* are how great teams keep their UI consistent across multiple pages and applications. Modern design systems are built with components, which are used as shared building blocks to ensure consistency. Bit is a perfect way to construct a design system from independent components which are developed, built, and published by custom regulated standards. Bit.dev is the most effective platform for teams to distribute, discover, use, and collaborate on their component-driven design system. Instead of a cumbersome monolithic and often irrelevant library, Bit provides a collaborative and scalable ecosystem where everyone can share and discover components, get and suggest changes, ensure consistency, and build together. For example, whenever there’s a new version of a component, a single push of a button can send the update as an automated PR to every impacted repository in the organization. And, a developer that uses one of your components in their own application, can suggest changes back to you without having to dive into your repository or making a complex PR to your project. Super cool, right? And, it’s also a great way for developers to include more people, like designers, in their web development process - directly over code, and in a visual way. Try it out for yourself.

#### Micro frontends  

![Micro Frontends](https://i.ibb.co/fn8krfn/homepage-components-micro-frontends.png)

*Micro frontends* are a philosophy of how software should be built, and how teams and organizations should work together. Bit is the most production-ready and scalable way to build Micro Frontends, driven by modern components. Each team can autonomously build features in their own codebase, compose their components into any application, constantly release incremental upgrades through their own independent build pipeline, and at the same time easily expose 100% of their components for everyone else in the organization to discover and integrate into new projects. Need an example? Take a look at how the [homepage of Bit.dev](https://bit.dev) is composed of components built in different repos, by different teams who own different scopes, and all integrated together to create every page on the website. To learn more how we build component-driven Micro Frontends read this post: “[How We Build Micro Frontends](https://blog.bitsrc.io/how-we-build-micro-front-ends-d3eeeac0acfc)”.

#### Standardization and consistency  

*Web development standardization and consistency* means that all components will follow the same design patterns, will be developed using the same development environments, tested and built using the same pipelines, and will be documented and published using the same templates. This way an organization can ensure consistency in the development process, and deliver higher quality applications which are more resilient and performant. Bit is the most powerful yet flexible way to achieve standardization for components. It provides features such as customizable and reusable development environments, which ensure all teams create components the same way, yet living room for unavoidable changes when necessary. Customizable and reusable build pipelines ensure all components are built and tested the same way by predefined standards. Fully customizable docs templates ensure all components can easily be published and used by other developers and teams.  And, since Bit is 100% extensible, this is just where your imagination starts.

#### Autonomous teams and independent delivery

Independent components and decoupled codebases means independent teams and autonomous team delivery.

Conway’s law suggests a clear symmetry between a codebase architectural style and the way that codebase is built by people working together. Building applications with independent components means developers create and deliver features independently. It means they are completely decoupled from anything that has the potential to become a blocker to their own progress. That naturally translates to faster delivery but that also reduces frustration, as each developer enjoys complete autonomy and full mastery over their own scope.

#### Scaling web development

As developers we are tasked with building innovative solutions for our products. When we don't have an efficient way of isolating and sharing code we've already implemented we are locked in an endless cycle of re-implementing the same functionality we built before and then maintaining it in multiple code bases. With the introduction of component-based frameworks like React, Angular and Vue our code has become more modular and the components we design can work in multiple apps and use cases. However they are implemented in rigid code repositories that don't allow us to easily reuse an already implemented piece of code.

Bit solves the problem of sharing and managing components between different projects so you can focus on building new, exciting and innovative solutions for your product or products. When utilizing Bit you can quickly share each component as a separate module from your project. Other developers can then take your component and use it as part of their components, like they would any other npm/yarn package, to drastically speed up their delivery. Moreover, they can then share their components for you to use.

Bit connects frontend teams by using components as services in a similar way to how microservices architecture has done so for backend teams.


#### Code reuse  

*Code reuse* is a great way to speed software delivery, reduce effort on redundant code and maintenance, eliminate bugs and mistakes, and make sure more resources are focused on innovation. Components are by design modular, and therefor can and should be reused. Bit turns 100% of your components reusable as a seamless part of your workflow! Every single component you create becomes a fully reusable asset that can be very easily published, documented, and reused in new projects. No repository splitting, no complex configs, no overhead. Thanks to Bit.dev, code reuse can be infinitely scaled while making sure everything is always easily discoverable, and can be found and used one click away. And, using advanced features like ‘bit import’, it becomes easier than ever to quickly evolve and adjust components right from any new context.
