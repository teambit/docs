---
id: workflows
title: Centralized Component Library
---

[DIAGRAM] + gist

This workflow is useful for teams that have (or want to form):

- A centralized repository for shared UI components.
- A dedicated team to manage shared UI components.
- A published library containing all UI components.

## Benefits

There are several benefits of using Bit to manage a Centralized Component Library, both for the maintainers and consumers. These benefits tackle the issues that a team faces when building and distributing all components in a single package. With Bit you can publish each component separately without the use of monorepo tools such as Lerna.

### For maintainers

- Can still support and maintain previous workflow of publishing a single library as a package.
- Break the library to individual components without the overhead of maintaining a package for each component.
- Bit automatically version components that were altered based on changes in their dependencies
- Publishing components to bit.dev increase components adoption by making them visible to all teams.
- Bit helps to control who is making changes to the components.
- No need to drastically alter the project structure.

### For consumers

- Keep using their package manager and learn to use Bit in a later stage.
- Install only the components they need.
- Increasing the project stability by reducing the frequency of changes received for the package.
- Not committed to a single version of all the components and instead can mix and match the versions they need.
- Keep local modifications of components.

## Process

The process of using Bit to publish individual components from a centralized library is focused around setting up Bit around the current development workflow of the already implemented library. There are some inherent benefits that the library consumers will by from using Bit, but generally they can keep using npm/yarn to install individual components other then the whole library.

### Track components from a shared library

Clone your shared library of UI components and track each individual component with [bit add](/docs/tracking...). It is highly recommended to split the components to meaningful namespaces such as styles (for styles only components), layout components and action components according to their types. This is equivalent to separating different components to different folders in the library itself.

> **Component dependencies**
>
> Components that rely on shared utilities and helpers can only be shared if the utilities are shared as components as well. In these cases you should add the utilities and helpers as components as well, and share them alongside the UI components.

#### Package and Version

When you tag components, Bit packages each of them individually. This means that while initially all components are aligned to a single version, it is likely that eventually they will diverge.
Having each component versioned separately lets your library consumers follow the changes that occur in each component. Bit versioning is semver based, and it is recommended that you use the semver rules to communicate changes (patches, fixes, breaking changes).

#### Publishing

Publish all components to a single collection, so it is easier for consumers to see all your components. The component maintainers should have write permissions to the collection. Consumers of the components can have only read access to the collection.  
You can publish the components from the workspace into the collection in one of two ways:

- Tag and export components from your local workspace.
- Tag and export components from your CI.

Both options are valid. If you are publishing from the CI, make sure it happens under certain conditions (e.g., when pushing to the master branch, or with special commit message).
When exporting from CI, it is important to commit the changes made in the components map(bitmap file) back to your repository, so the repository is in sync with the collection.
The evaluation of these options highly depends on the organizational support, as well as the test coverage available for the components and impact of errors.
Make sure all your components contain proper documentation and add examples on bit.dev to show multiple use cases of the component.

### Component consumers

#### Install Components

In any project that wants to consume the component, install it using NPM or Yarn. Use the component by importing it like any other library.  
Run `npm update` (or `yarn upgrade`) to update components to their latest versions. Only components that are changed are being upgraded to newer versions.

#### Make Local changes

Bit is extremely useful if you need to make local changes to the component. This might be due to an urgent fix that you need to perform in your component and you do not want to wait for a new version.
To do that use the `bit import` command to get the sources of the component into your local workspace. You do not need to make any changes in the requiring files, as Bit takes care of redirecting the imports to the source code.

The imported components should reside in a folder that is separated from the project folder, e.g., not under your `src` folder. That is because of the configuration of the component may differ from the rest of the project configuration. Bit saves for each component the configuration that was defined by the library maintainers.

#### Suggest Changes

If you made a change to the component, it can be pushed back to the library maintainers. For the time being, Bit does not have a PR-like flow to suggest changes to the component. There are a few options on how to bypass this change:

- Build a separate collection for staged components. Component consumers can suggest changes to components in this collection. The shared library maintainers will merge the changes from the staging collection into the components on their local workspace, review the difference, and reject or submit them back to the primary collection.
- Make the changes in the local workspace and generate a patch file with the changes or manually perform the adjustment and submit it to the shared library's repository.
