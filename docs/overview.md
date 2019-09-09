---
id: overview
title: What is Bit?
---

## What is Bit?

Bit’s [open-source CLI](https://github.com/teambit/bit) is a tool for multiple-components "monorepos" that enables the development and distribution of components throughout their entire lifecycle. It helps developers build, distribute and control multiple individual components across one or more repositories.

It automates the isolation components in any path in a repository, so each is encapsulated with all its dependencies. It lets you independently build, test, version, update and publish components in true isolation from the rest of the repository. It provides an instant and high-control “monorepo” experience for any repository containing components, so the developer assumes full control over the development and distribution of a single or multiple related components in the repository.

The [bit.dev collaboration platform](https://bit.dev) lets developers and teams manage and collaborate over shared components across projects, at any scale. Through the platform, developers and teams can organize and share components, make them discoverable to find and use, and collaborate to synchronize development, changes and updates to components across different projects.

Bit CLI can be used with or without bit.dev, as a remote Bit component hosting can be set on any server. However, the combined experience enhances and streamlines components sharing for multiple projects and teams, providing end-to-end tools for:

1) The full life-cycle of component development inside a repository:

- **Component isolation**: Isolating components in any path in the repository with all their dependencies.
- **Independent build and test**: Building and testing each component is true isolation with **zero build configurations**.
- **Contextual versioning**: Versioning each component and controlling each component’s dependency graph, so you can update related components together and avoid bumping versions to unrelated parts of the repository.
- **Distribute from any path**: Publish multiple components from any path in any the repository without refactoring it’s source code or structure.

2) The organization, consumption, collaboration, and discovery of components shared between different projects and teams:

- **Organizing all shared components** by team, context etc.
- **Visualizing components** with live rendering, preview examples etc.
- **Search and discovery of components** using semantic labels, advanced filters (bundle-size, dependencies etc), tests, examples etc.
- **Auto-extracting component API reference** and presenting for easy use.
- **Running each component’s CI** including Build and Tests in isolation.
- **Installing components** as packages using NPM or Yarn.
- **Importing component’s** source-code into different projects (“managed and versioned cloning”), so they can be **developed in parallel** from different repositories, while **code-changes can be merged and versions updated** across projects.

## Components in Bit  

Components are the building blocks of Modern web architectures. [Encapsulated and reusable components](https://addyosmani.com/first/) with focused and well defined APIs, components let developers build software applications better and faster.

The major frontend frameworks, [React](https://reactjs.org), [Vue](https://vuejs.org/), and [Angular](https://angular.io) all share the concept of using components based architecture to compose state-of-the-art applications. Even the browsers themselves are now backing components as an inherent feature by supporting the [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) standards.  

At the same time, Version Control Systems (VCS) and package managers are still revolving around the concept of projects. Each project is a single VCS repository and requires a substantial overhead. As a result, organizations are aggregating multiple components, and sometimes multiple projects, into a single VCS repository.  

A typical example of a single repository holding multiple components are shared libraries such as Bootstrap or Material UI. Similarly, organizations manage their design systems in a single code repository.  

The result is a complete discrepancy between producers and consumers. The components producer is storing all the components in a single repository and a single package. The consumer of the components only needs a subset of the package.  

Bit bridges this gap. Bit adds a layer on top of existing tools for destructing repositories into discrete components and supports their lifecycle.  

## Components and Files

Inside a repository, all files are made equal. There is no semantic definition of a component, aside from conventions of directories and files names.  

Bit adds the mapping between the component as a logical unit with a defined and specific functionality and the files that comprise this functionality.  

![Bit Component](https://storage.googleapis.com/static.bit.dev/docs/images/component.png)

### Components Dependencies

Components do not exist in a vacuum. Components depend on each other by using functionality from other components. This creates a graph of components dependencies. Understanding the relationships between components is crucial when there are tens and hundreds of components.  

Bit provides the tooling for managing this dependency graph. Bit does not only know what is the code for each component, but also analyzes the source code to understand the components' dependencies.  

Once a dependencies graph exist for each component, its management becomes simpler. If you want to transfer a component from one project to another, Bit knows exactly what are the additional components that should go with it. If a change occur in a component, Bit can identify what components are impacted by it, and notify on a version update that is needed on it.  

### Components Packaging  

The specific content of a bit component varies according to the specific framework. It may hold a single plain javascript file with a single function, React Component, Vue component, Angular module or a web component.  

The modern frameworks require that components go through a build process to be usable. Good software practices also suggest unit testing for each component to validate its functionality.  

Bit manages the full life cycle of the component. In addition to the source code, and the dependency graph, Bit retains information about the tools and configurations needed for building and testing the component.  

## Working With Components

Referencing components as functional units and not just a set of files enables developers to move components around. The component's isolation layer segregates it from its original project and makes it usable even if the structure of the receiving project is different from the original one.  

![Bit Workflow](https://storage.googleapis.com/static.bit.dev/docs/images/workflow.png)

### Add

An add command initiates a Bit component's lifecycle. Bit components' index is now tracking the files that comprise the component.  

At this point, Bit can verify the completeness of the graph dependency of the component. Bit can also associate the component with utilities - compiler and tester - and start building and testing the component.  

### Tag

When a component is ready to be shared with others, the developer tags it with a version number following the [semver](https://semver.org/) conventions.  

Bit stores the snapshot of the component's source code and can now notify on any changes that were made to it.  

### Export

The developer can export a tagged version of the component to a centralized server. Organizations can have their central server or use bit.dev server for storing components.  

A component exported to bit.dev also has a playground where the user can see a live version of the component and interact with it.  

The component is now available for consumption by other developers in one of two ways: [install](#install) or [import](#import).

### Install

Npm or Yarn installs the component, like any other package. The installed component resides in the node_modules folder.  

Bit compiler built the component and generated the distribution files (e.g., the dist folder). The installed component is ready for consumption.  

### Import

Developers may want to modify the component source code, for fixing a bug or changing the functionality. Developers may import the component to their project and apply their changes.  

An important feature of Bit is, that even if the component is imported and changed inside the project, it still receives all the modifications made to the original component.  

The updated component can now be tagged and re-exported so, the other component's consumers get the updates.  

## Is Bit the same as?

### Is Bit the same as Git?

Git is a distributed version-control system for tracking changes in source code during software development. It can be used to track changes in any set of files. Git manages files contents without any reference to their structure of semantics.  

Bit augments Git to control the development of components inside a Git repository, and combines it with their build, testing, versioning and distribution process. Bit adds a layer on top of Git that understands the internal structure of the code as components and managing their internal relationships.

Bit does not require Git to exist in the project, but it can use Git's functionality to perform actions such as code merging. Bit should not replace Git in project development. The project's code should remain in Git. Also, Git should track changes made to components exported to Bit.  

### Is Bit the same as NPM or Yarn?

Package registries and tools like NPM and Yarn help to manage packages and dependencies that are built artifacts (assuming that the dependencies are explicitly defined using package.json files).

Bit supports the full life cycle of a component starting from the source code. As Bit stems from the source code itself and understands the semantics of each component, the full dependency tree is automatically generated. In addition, Bit supports the full life cycle of components: from code changes to building, testing and rendering components in isolation.  

Bit manages component dependencies in relation to each component’s dependency graph, in with awareness to code changes made to components. For example, you can update a single component inside a repository and only the components that depend on it, without having to update the entire repository’s package version or those of components unaffected by the changes.

Components built with Bit are published to the package registry in bit.dev. This means that NPM and Yarn can [install](#install) Bit components like any other package. The only requirement is that the .npmrc configuration has a reference to the @bit scope name. The registry configuration tells NPM and Yarn where to find Bit components.  

### Is Bit the same as Storybook?

Storybook is a fantastic aid tool for visually developing components in simulated isolation and creating visual documentation for components based on their stories.

Bit facilitates a shared component ecosystem, from the development and distribution of components from a repository to collaboration and management across different projects. It manages components at the source-code level through their entire lifecycle, including the encapsulation of components and their dependencies as standalone units, the building and testing of components in isolation, the versioning and publishing of components, paralleling the development of components across multiple repositories etc. Through bit.dev the actual components, as managed units of ready-to-run code, are also visualized and can be discovered through advanced features such as component search, labels, filters (bundle-size, dependencies etc) and more. Components can also be directly consumed 

Storybook and Bit can live separately or side by side. For example, Bit can be used to isolate, build, test and publish multiple components from a repository. Storybook can provide the visual development environment for the component prototyping, to create examples which can also be leveraged as part of the component discovery experience in bit.dev.
