---
id: what-is-bit
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

## Is Bit the same as?

### Is Bit the same as Git?

Git is a distributed version-control system for tracking changes in source code during software development. It can be used to track changes in any set of files. Git manages files contents without any reference to their structure of semantics.  

Bit augments Git to control the development of components inside a Git repository, and combines it with their building, testing, versioning and distribution process. Bit adds a layer on top of Git that understands the internal structure of the code as components and managing their internal relationships.

Bit does not require Git to exist in the project, but it can use Git's functionality to perform actions such as code merging. Bit should not replace Git in project development. The project's code should remain in Git. Also, Git should track changes made to components exported to Bit.  

### Is Bit the same as NPM or Yarn?

Package registries and tools like NPM and Yarn help to manage packages and dependencies that are built artifacts (assuming that the dependencies are explicitly defined using package.json files).

Bit supports the full life cycle of a component starting from the source code. As Bit stems from the source code itself and understands the semantics of each component, the full dependency tree is automatically generated. In addition, Bit supports the full life cycle of components: from code changes to building, testing and rendering components in isolation.  

Bit manages component dependencies in relation to each component’s dependency graph, in with awareness to code changes made to components. For example, you can update a single component inside a repository and only the components that depend on it, without having to update the entire repository’s package version or those of components unaffected by the changes.

Components built with Bit are published to the package registry in bit.dev. This means that NPM and Yarn can [install](#install) Bit components like any other package. The only requirement is that the .npmrc configuration has a reference to the @bit scope name. The registry configuration tells NPM and Yarn where to find Bit components.  

### Is Bit the same as Storybook?

Storybook is a fantastic aid tool for visually developing components in simulated isolation and creating visual documentation for components based on their stories.

Bit facilitates a shared component ecosystem, from the development and distribution of components from a repository to collaboration and management across different projects. It manages components at the source-code level through their entire lifecycle, including the encapsulation of components and their dependencies as standalone units, the building and testing of components in isolation, the versioning and publishing of components, paralleling the development of components across multiple repositories etc. Through bit.dev the actual components, as managed units of ready-to-run code, are also visualized and can be discovered through advanced features such as component search, labels, filters (bundle-size, dependencies etc) and more. Components can also be directly consumed.  

Storybook and Bit can live separately or side by side. For example, Bit can be used to isolate, build, test and publish multiple components from a repository. Storybook can provide the visual development environment for the component prototyping, to create examples which can also be leveraged as part of the component discovery experience in bit.dev.
