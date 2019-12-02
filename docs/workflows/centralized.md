---
id: centralized
title: Centralized Library
---
![Centralized library workflow](https://storage.googleapis.com/static.bit.dev/docs/images/workflow_central.png)
This workflow is suggested for organizations that have:

- A centralized repository for shared UI components already in place
- A dedicated team to manage shared UI components
- Multiple projects exist that use the shared components

## Challenges

Teams that already use a shared library of UI components enjoy its tremendous value. They reduce the amount fo code written while increasing the effectiveness of the development teams. Those benefits come with a price tag that should be considered:

### Dependability

Dependability is, by far, the most crucial problem. Teams aim to be independent and deliver fast. Being dependent on the schedule and priorities of other teams can reduce this pace. If your deadline is on Thursday, but the infra team has different priorities than making this fix to your component, it is your problem.

### Usability

Writing good components is hard. As a developer, you are now the consumer of the infrastructure team. If the shared component exposes 30 mandatory parameters, when all you need is a simple button with no icon, you are likely to develop your own component and not rely on the shared one.

### Granularity

Infrastructure teams tend to create a single package (e.g., npm package)  that includes all components. It is easier for them to manage and deliver this way. While this can be useful at the beginning, it becomes a real burden when the project grows, and the shared library contains components that are only used by some of the projects. The developers of the projects are forced to receive a new version of the library when a change is made on any component included in the bundle.

## Benefits

If you already have a shared library of UI components, you can use Bit to mitigate these challenges. The benefits of using Bit on top of a centralized UI components repository are:

### For Maintainers

- Can still support and maintain the previous workflow of publishing a single library as a package.
- Break the library to individual components without the overhead of maintaining a package for each component.
- Bit automatically version components that were altered based on changes in their dependencies
- Publishing components to bit.dev increase components adoption by making them visible to all teams.
- Bit helps to control who is making changes to the components.
- No need to drastically alter the project structure.
  
### For Projects

Project developers can benefit from retaining their existing workflow of using NPM for getting components. Getting smaller discrete components that are required by each project is useful for:  

- Keep using their package manager and learn to use Bit in a later stage.
- Install only the components they need.
- Increasing the project stability by reducing the frequency of changes received for the package.
- Not committed to a single version of all the components and instead can mix and match the versions they need.
- Keep local modifications of components.

## Process

The process of using Bit to publish individual components from a centralized library is focused around setting up Bit around the current development workflow of the already implemented library. There are some inherent benefits that the library consumers will by using Bit. Still, generally they can keep using npm/yarn to install individual components other than the whole library.

### Track components from a shared library

Clone your shared library of UI components and track each individual component with `bit add`. It is highly recommended to split the components to meaningful namespaces such as styles (for styles only components), layout components, and action components according to their types. This is equivalent to separating different components to different folders in the library itself.

> **Component dependencies**
>
> Components that rely on shared utilities and helpers can only be shared if the utilities are shared as components as well. In these cases, you should add the utilities and helpers as components as well, and share them alongside the UI components.

### Package and Version

When you tag components, Bit packages each of them individually. This means that while initially all components are aligned to a single version, it is likely that eventually, they will diverge.
Having each component versioned separately lets your library consumers follow the changes that occur in each component. Bit versioning is semver based, and it is recommended that you use the semver rules to communicate changes (patches, fixes, breaking changes).

### Publishing

Publish all components to a single collection, so it is easier for consumers to see all your components. The component maintainers should have write permissions to the collection. Consumers of the components can have only read access to the collection.  
You can publish the components from the workspace into the collection in one of two ways:

- Tag and export components from your local workspace.
- Tag and export components from your CI.

Both options are valid. If you are publishing from the CI, make sure it happens under certain conditions (e.g., when pushing to the master branch, or with special commit message).
When exporting from CI, it is important to commit the changes made in the components map (`.bitmap` file) back to your repository, so the repository is in sync with the collection.

### Component consumers

There is not much difference in consumers utilize the shared UI components. The only thing to take note is that now they can install only their required components.

> For backward compatibility, you can still publish the library itself, thus making the transition to using individual components gradually.

#### Install Components

In any project that wants to consume the component, install it using NPM or Yarn. Use the component by importing it like any other library.  
Run `npm update` (or `yarn upgrade`) to update components to their latest versions. Only components that are changed are being upgraded to newer versions.

#### Make Local changes

Bit is extremely useful if you need to make local changes to the component. This might be due to an urgent fix that you need to perform in your component, and you do not want to wait for a new version.
To do that, use the `bit import` command to get the sources of the component into your local workspace. You do not need to make any changes in the requiring files, as Bit takes care of redirecting the imports to the source code.

The imported components should reside in a folder that is separated from the project folder, e.g., not under your `src` folder. That is because of the configuration of the component may differ from the rest of the project configuration. Bit saves for each component the configuration that was defined by the library maintainers.

#### Suggest Changes

If you made a change to the component, it could be pushed back to the library maintainers. For the time being, Bit does not have a PR-like flow to suggest changes to the component. There are a few options on how to bypass this change:

- Build a separate collection for staged components. Component consumers can suggest changes to components in this collection. The shared library maintainers will merge the changes from the staging collection into the components on their local workspace, review the difference, and reject or submit them back to the primary collection.
- Make the changes in the local workspace and generate a patch file with the changes or manually perform the adjustment and submit it to the shared library's repository.
