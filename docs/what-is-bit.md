---
id: what-is-bit
title: What is Bit?
---

## Bit lets you easily build, distribute and collaborate over reusable components across projects and teams

*Bit makes it easy to share and manage components between projects and apps at any scale*. [Bit's CLI](https://github.com/teambit/bit) tool is an open-source tool that departs components from their repositories and lets you build and use them independently anywhere. The [bit.dev platform](https://bit.dev) lets teams organize, manage and collaborate over shared components without limits.

Key features:

It lets you **isolate components** from existing projects with **0 refactoring**, with **fully-automated dependancy definition/resolution** that seamlessly wraps any component as a standalone reusable unit. 

It lets you **build and test components in isolation** from their project, with **zero build configurations** required. Each component can be built on its own and run out-of-the-box in any other project's environment.

It lets you **version individual components (separately or together**) in the repository, and **publish each of them as a standalone package** to be **installed with npm/yarn** in any other project.

It lets you **import and make changes to components right from any consuming project**, then suggest updates to these components without having to context switch or dive into the component's parent repository.

It lets you **control the entire dependency graph** of your components, inside and outside the repository, so you can **easily update components along with all their dependants**- and nothing else. You can learn exactly how each change affects other components before you make it, so you can safely update multiple components at once.

Through the **bit.dev platform**, Bit provides **teams with a unified hub where they can host, discover, manage and collaborate over their components across projects and teams at any scale**.

*Bit is a [collaborative open source project](https://github.com/teambit/bit), actively developed and maintained by a venture-backed team and used by more teams and communities every day*.  

## Why?

**Modern components** are the building blocks of our software applications.
Their **reusable nature** can be leveraged to **standardize and speed development**, while building a better **consistent UX/UI** across different projects and teams. However, the ecosystem built around repositories can be limiting in the workflow around building with smaller components.  **Bit unleashes your components from the barriers of repositories** so that different teams and projects can easily build, share and sync components between them.

## Popular use-cases

### Instantly share and sync components between applications

*No repo-splitting, refactoring, boilerplating or code changes needed.*

* Watch a [**5 minutes demo with React**](https://www.youtube.com/watch?v=E5lgoz6-nfs)

[![Bit Component](https://storage.googleapis.com/bit-docs/reuse-react-components.jpeg)](https://www.youtube.com/watch?v=E5lgoz6-nfs)

Small teams and solo developers are often building more than one application. Through Bit, they can easily reuse their components in multiple applications, make changes from any end, and keep changes synced between them. Bit kills the overhead so that reuse becomes a simple choice and they can focus on building their apps.

Bit liberates components from the boundaries of repositories, so you can use it in any repo-architecture you like. No need to split or refactor anything. 

### Component design systems made of real code

*Let everyone see and use what you really build, to bring design and development together**.

![Bit Component](https://storage.googleapis.com/bit-docs/discover-components-aug19-gif.gif)

Building a component design system is a great way to unify the UX/UI you are building for your users.
With Bit you don't need to add more tools that widen the gap between design and development. Instead, **your actual code implementation is your design system**. What you see is really what you get.

Developers share components to bit.dev, where the code is rendered and visualized in a live editable playground that lets designers and everyone else instantly learn how it looks and suggests changes right from the web. When a developer changes a component, that designer can easily learn about it and make sure it keeps with the design system.

![Bit Component](https://storage.googleapis.com/bit-docs/component-page-chart-bit-gif.gif)

Discoverability is enhanced through advanced features like a smart semantic component search, context labels, filters for key parameters bundle-size and dependencies, and more. Screenshots of the components make it simple to visually explore the design system. When you bring development and design together, your user experience becomes that much better now and over time.

Since all your components are visualized and sandboxed in bit.dev, designers and developers can collaborate over a single unified platform and make sure that what you design is what your users really get. Everywhere, and always.  

#### You can build your design system gradually!

Since Bit makes it easy and seamless to collect components from different projects into your collection, you don't have to build your library first- you can just organize the components you already have, standardize your design, and there you go, everybody is now using the same code with the same design!

#### Enhance component libraries

*Build with a modular monorepo experience like never before, and distribute components that people actually adopt*.

![Bit Component](https://storage.googleapis.com/bit-docs/UI%20library%20monorepo.jpg)

Component libraries help to consolidate the implementation of a design system into a unified project.
Great companies like Uber, Airbnb and others are implementing their design systems as component libraries.

But, a component library can be challenging from both ends:

- **Library maintainers** have to develop multiple logically-separated components in one repository, and manage the relationships between them. They also want to make it easy for app developers to adopt their components.
- **Component consumers** (often app developers in the same organization) don't want to add (and update) heavy libraries to their projects, and are worried about coupling their own development to that of the library.

Bit changes the game by bringing the two closer together than ever before.

It helps library developers build multiple components in one repository by letting them easily isolate, build, test, version, update and publish components in the library. For example, they can update a single component, learn which other components are affected too, see that all the unit-tests pass even after the update, and safely update all components at once. They can also get developers to adopt their components by not forcing them to install the whole library, by letting them get updates only to the components they use, and by letting them modify the components right from their own apps and easily suggest updates. It's better to regulate and standardize than to not get true adoption.

It helps component consumers and app developers easily find, modify and install specific components they need, and adopt them without heaving to worry about coupling their own development to the library project. They can develop component shared from the library right from their own projects, without having to context-switch of dive into the whole project. They can learn about the bundle-size, dependencies and environment of every component before using it. They can communicate their needs to the library maintainers.

### Shared-component economy with the organization: get true adoption

![Bit Component](https://storage.googleapis.com/bit-docs/shared-components.png)

building a shared-component economy throughout larger organizations is a game-changer. It speeds developments, standardizes your stack, simplifies development and makes sure your brand and UI stays consistent everywhere.

But... it can be easier said than done. Getting developers to adopt your libraries can be hard, as they have to couple themselves and their apps to your large project and its development.  

Through Bit, your organization's component-economy becomes a collaborative and unified ecosystem build around components and not projects. Everyone can share components, discover components, and suggest updates right from their own projects. After all, regulation and legalization is better than enforcement right? Well, at least if you want to get adoption.

## Philosophy  

Components are the building blocks of modern web architectures. [Encapsulated and reusable components](https://addyosmani.com/first/) with focused and well-defined APIs let developers build more robust software applications more quickly.

The major frontend frameworks - [React](https://reactjs.org), [Vue](https://vuejs.org/), and [Angular](https://angular.io) - all share the concept of using component-based architecture to compose state-of-the-art applications. Even browsers themselves are backing components as an inherent feature by supporting the [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) standard.

At the same time, Version Control Systems (VCS) and package managers are still revolving around the concept of projects. Each project is a single VCS repository and requires a substantial overhead. As a result, organizations are aggregating multiple components, and sometimes multiple projects, into a single VCS repository.  

Bit adds a semantic layer on top of repositories that maps files into components. This extra layer provides Bit with robust capabilities in managing components: tracking code changes, verifying dependencies completeness or isolating and executing each component.  

### Component Files

Inside of a repository, all files are considered equal. There is no semantic definition of a component aside from conventions of directories and filenames.  

Bit adds the mapping between the component as a logical unit with a defined and specific functionality and the files that comprise this functionality.  

![Bit Component](https://storage.googleapis.com/static.bit.dev/docs/images/component.png)

### Component Dependencies

Components do not exist in a vacuum. Components depend on each other by using functionality from other components. This creates a graph of component dependencies. Understanding the relationships between components is crucial when there are tens and hundreds of components.

Bit provides the tooling for managing this dependency graph. Bit not only knows what the code for each component is but also analyzes the source code to understand the components' dependencies.  

Once a dependency graph exists for each component, its management becomes simpler. If you want to transfer a component from one project to another, Bit knows exactly which additional components should go with it. If a change occurs in a component, Bit can identify which components are impacted by it and notify consumers that a version update is available.  

### Component Packaging  

The specific content of a bit component varies according to the specific framework. It may hold a single plain javascript file with a single function, React Component, Vue component, Angular module, or a web component.  

The modern frameworks require that components go through a build process to be usable. Good software practices also suggest unit testing each component to validate its functionality.  

Bit manages the full lifecycle of the component. In addition to the source code and the dependency graph, Bit retains information about the tools and configurations needed for building and testing the component.  

## What can I do with Bit?  

### Without shared UI library

If your organization does not have shared libraries, you can use Bit to:  

- Share components between different repositories with different configuration
- Collaborate on components across projects
- Gradually start building a shared component library
- Provide a centralized showcase for components in different projects

### With shared UI library

If your organization has a shared UI library (with or without a design system), you can find Bit useful when you want to:  

- Distribute discrete components when the library is growing
- Manage versions per component
- Track components that changed as a result of a modifying their dependencies.  
- Control access to group of components
- Showcase for components in the library
- Reduce CI time by building and testing only components that changed.  

## Share components with [bit.dev](https://bit.dev)

The bit.dev provides you a robust cloud based components' hub to share components. bit.dev can be used to host shared components. When using bit.dev, you also get:  

- Organizing components in collections with access control
- Build and test CI for each component
- Components installation using NPM and Yarn
- Components display with multiple examples per component
- Advanced components search capabilities

## Is Bit the same as?

### Is Bit the same as Git?

Git is a distributed version-control system for tracking changes in source code during software development. Git manages changes in files' contents without any reference to their structure or semantics.

Bit augments Git to control the development of components inside a Git repository and combines it with the components' building, testing, versioning, and distribution process. Bit adds a layer on top of Git that understands the internal structure of the code as components and managing their internal relationships.

Bit does not require Git to exist in the project, but it can use Git's functionality to perform actions such as code merging. Bit should not replace Git in project development. The project's code should remain in Git.  

### Is Bit the same as NPM or Yarn?

A component packaged with Bit is a valid NPM package and can be installed using NPM or Yarn.  

Package registries and tools like NPM and Yarn help to manage distributable artifacts. NPM and Yarn manage the dependencies for each package, according to the explicit definition in the package.json files.

Bit automates this functionality and generate the package dependency tree for each component, based on the analysis of the code itself. Any change in the source code reflected in the package dependencies.  

At the same time, Bit is not limited to generating built artifacts, but can easily switch between the built artifacts and the source code. Making changes in an NPM package is a lengthy process that require cloning the source code, local linking to the package and re-publish of the package. With Bit, this process is mostly automated and simplified.  

### Is Bit the same as Storybook?

Storybook is a fantastic aid tool for visually developing components in simulated isolation and creating visual documentation for components based on their stories.

Bit facilitates a full lifecycle of components development. Bit tracks changes to the components, package them for distribution, merge code changes, track versions, and showcase them on a cloud hub.  

Through bit.dev, the components are not only put on display but can also be directly consumed.  

Storybook and Bit can live separately or side by side. For example, Bit can be used to isolate, build, test, and publish multiple components from a repository. Storybook can provide the visual development environment for the component prototyping to create examples that leverage the component discovery experience in bit.dev.
