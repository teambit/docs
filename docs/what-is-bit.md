---
id: what-is-bit
title: What is Bit?
---

## Bit is a components collaboration tool

Bit lets javascript developers share code between projects and repositories with ease.  
Bit automates the creation of packages that wrap components and makes any repository part of a virtual mono-repo. We call it a **components poly-repo**.  

Bit simplifies the process of making packages that wrap a single component by:  

- Automatic management of dependencies
- Attaching build and test utilities at the component level with relevant configuration
- Version each component independently

Bit is an [open-source tool](https://github.com/teambit/bit). You can share components using your server or use The [bit.dev collaboration platform](https://bit.dev) for sharing components with advanced features.  

## Philosophy  

Components are the building blocks of modern web architectures. [Encapsulated and reusable components](https://addyosmani.com/first/) with focused and well-defined APIs let developers build more robust software applications more quickly.

The major frontend frameworks--[React](https://reactjs.org), [Vue](https://vuejs.org/), and [Angular](https://angular.io)--all share the concept of using component-based architecture to compose state-of-the-art applications. Even browsers themselves are backing components as an inherent feature by supporting the [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) standard.

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
- Track components that changed as a result of a modification in their dependencies.  
- Control access to each group of components
- Showcase your components
- Reduce CI time by building and testing only components that changed.  

## Share components with [bit.dev](https://bit.dev)

The bit.dev provides you a robust cloud based components' hub to share components. bit.dev can be used to host shared components. When using bit.dev, you also get:  

- Organizing components in collections with access control
- Build and test CI for each component
- Components installation using NPM and Yarn
- Components show case with multiple examples per component
- Advanced components search capabilities

## Is Bit the same as?

### Is Bit the same as Git?

Git is a distributed version-control system for tracking changes in source code during software development. Git manages changes in files' contents without any reference to their structure of semantics.

Bit augments Git to control the development of components inside a Git repository and combines it with the components' building, testing, versioning, and distribution process. Bit adds a layer on top of Git that understands the internal structure of the code as components and managing their internal relationships.

Bit does not require Git to exist in the project, but it can use Git's functionality to perform actions such as code merging. Bit should not replace Git in project development. The project's code should remain in Git.  

### Is Bit the same as NPM or Yarn?

Package registries and tools like NPM and Yarn help to manage distributable artifacts. NPM and Yarn manage the dependencies for each package, according to the explicit definition in the package.json files.

Bit augments this functionality by automatically generating the package dependency tree for each component, based on the analysis of the code itself. Any change in the source codereflected in the package. Also, Bit is aware of any change in the full component's tree and not just at the top level.

A component packaged with Bit is a valid NPM package and can be installed using NPM or Yarn.  

### Is Bit the same as Storybook?

Storybook is a fantastic aid tool for visually developing components in simulated isolation and creating visual documentation for components based on their stories.

Bit facilitates a full lifecycle of components development. Bit tracks changes to the components, package them for distribution, merge code changes, track versions, and showcase them on a cloud hub.  

Through bit.dev, the components are not only put on display but can also be directly consumed.  

Storybook and Bit can live separately or side by side. For example, Bit can be used to isolate, build, test, and publish multiple components from a repository. Storybook can provide the visual development environment for the component prototyping to create examples that leverage the component discovery experience in bit.dev.
