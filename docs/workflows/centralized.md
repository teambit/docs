---
id: centralized
title: Centralized Library
---
![Centralized library workflow](https://storage.googleapis.com/static.bit.dev/docs/images/workflow_central.png)
This workflow is suggested for organizations that have:

- A centralized repository for shared UI components already in place
- A dedicated team to manage shared UI components
- Multiple projects exist that use the shared components

## Challenge of centralized library

Introducing a design system inside an organization can bring tremendous value for reducing the amount of code and increasing the effectiveness of the development teams. However, those benefits come with a price tag that should be considered:  

### Dependability

Dependability is, by far, the most crucial problem. Teams aim to be independent and deliver fast. Being dependent on the schedule and priorities of other teams can reduce this pace. If your deadline is on Thursday, but the infra team has other priorities than making this fix to your component, it is your problem.

### Usability

Writing good components is hard. As a developer, you are now the consumer of the infrastructure team. If the shared component exposes 30 mandatory parameters, when all you need is a simple button with no icon, you are likely to develop your own component and not rely on the shared one. 

### Granularity

Infrastructure teams tend to create a single package (e.g. npm package)  that includes all components. It is easier for them to manage and deliver this way. While this can be useful at the beginning, it becomes a real burden when the project grows and the shared library contains components that are only used by some of the projects. The developers of the projects are forced to receive a new version of the library when a change is made on any component included in the bundle. 

## Benefits

Bit simplifies the process of sharing components for both the library maintainers and the library consumers: 

### For Maintainers

- Bit automates the packaging of each component with higher granularity without adding the overhead in maintaining separate packages.
- Bit automatically version components that were altered based on changes in their dependencies
- Building components locally without the project context shorten the feedback loop on the way components behave on other projects.
- Publishing components to bit.dev increase components adoption by making them visible to all teams
- Bit helps to control who is making changes to the components
  
### For Projects

Projects developers can benefit from retaining their existing workflow of using NPM for getting components. Getting smaller discrete components that are required by each project is useful for:  

- Reducing the bundle size of the application. Only the components they need are included.
- Reducing the bundle size and build time by Including only 3rd party libraries that are relevant to components actually used in the project.
- Increasing the project stability by reducing the frequency of changes received for the package. Smaller packages mean that the project only gets the changes that affect the components they use.
- Increasing control in the project. Consumers are not committed to a single version of all the components and instead can mix and match the versions they need of each component.
- Creating a smaller CI footprint as only projects that are affected by changes in the components may be built when a component has changed instead of the whole library.

## Process

The workflow is happening in two parallel processes:  

**Library maintainers develop, package and publish**

- Develop a library in a dedicated repository
- Package and version
- Publish components and relevant documentation

**Projects developers consume and collaborate**

- Install the components required by the project
- Make local changes if needed
- Suggest changes to components

## Library Maintainers

### Develop a Library

Set up a dedicated repository for all the components with CI and testing.
Build each component to be as isolated as possible, so people can consume only the components they want.  
Take special care for the styling approach you are taking, to make sure it suits as many projects as possible. For example,CSS Modules in React requires that the target project is building with the correct configuration component.  
Track the components in the project. It is highly recommended to split the components to meaningful namespaces such as styles (for styles only components), layout components and action components according to their types. This is equivalent to separating different components to different folders in the library itself.  
Track each component separately, and attach a compiler that can build the files as well as testers to run your tests.  
Add documentation to the components. If you are using bit.dev as the server, create usage examples that can be used as a reference on how to use the components.  
Make sure you the packages in the components project are correctly categorized:  

- Platform packages such as Vue, React or Angular, are defined as peerDependencies with a version range adequate for all your projects. This makes sure that the project that gets the component can use the component with their specific version of the platform, without creating duplications. 
- Separate runtime and development packages to dependencies and devDependencies respectively.

### Package and Version

With Bit you can publish each component separately without the use of monorepo tools such as Lerna. 
For each shareable component, Bit generates a package.json file for each component and packages its content. 
Tag and export the components. Each component gets its own version that lets library consumers follow the changes that occur in each component. Bit versioning is semver based, and it is recommended that you use the semver rules to communicate changes (patches, fixes, breaking changes). 

### Publishing

Publish all components to a single collection, so it is easier for consumers to see all your components. The component maintainers should have write permissions to the collection. Consumers of the components can have only read access to the collection.  
You can publish the components from the workspace into the collection in one of two ways:

- Tag and export components from your local workspace.
- Tag and export components from your CI.

Both options are valid. If you are publishing from the CI, make sure it happens under certain conditions (e.g., when pushing to the master branch, or with special commit message).  
When exporting from CI, it is important to commit the changes made in the components map(bitmap file) back to your repository, so the repository is in sync with the collection.
The evaluation of these options highly depends on the organizational support, as well as the test coverage available for the components and impact of errors.
Make sure all your components contain proper documentation and add examples on bit.dev to show multiple use cases of the component.  

## Projects Developers

### Install Components

In any project that wants to consume the component, install it using NPM or Yarn. Use the component by importing it like any other library.  
Run npm update (or yarn upgrade) to update components to their latest versions. Only components that are changed are being upgraded to newer versions.  

### Make Local changes

Bit is extremely useful if you need to make local changes to the component. This might be due to an urgent fix that you need to perform in your component and you do not want to wait for a new version.  
To do that use the `bit import` command to get the sources of the component into your local workspace. You do not need to make any changes in the requiring files, as Bit takes care of redirecting the imports to the source code.  
The imported components should reside in a folder that is separated from the project folder, e.g., not under your `src` folder. That is because of the configuration of the component may differ from the rest of the project configuration. Bit saves for each component the configuration that was defined by the library maintainers.  

### Suggest Changes

If you made a change to the component, it can be pushed back to the library maintainers. For the time being, Bit does not have a PR-like flow to suggest changes to the component. There are a few options on how to bypass this change:
Build a separate collection for staged components. Component consumers can suggest changes to components in this collection. The shared library maintainers will merge the changes from the staging collection into the components on their local workspace, review the difference, and reject or submit them back to the primary collection.
Make the changes in the local workspace and generate a patch file with the changes or manually perform the adjustment and submit it to the shared library's repository.

> We are aware that this is a sub-optimal flow, and we are working on a new feature of supporting changes to components.
