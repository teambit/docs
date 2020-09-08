---
id: workflows
title: Bit Workflows
---

A Bit Workflow is a recommendation for how to use Bit to accomplish work in a consistent and productive manner. However, not every organization is the same or works in the same way. Bit offers flexibility in managing components by enabling different workflows that can fit many organizations.  

Some questions worth asking when selecting the Bit workflow:

- How many projects need component sharing?  
- How similar are the projects that need to share components? e.g. are they all based on the same CLI with the same configuration?
- Is there a centralized repository for shared components?  
- Is there a dedicated team that builds the shared components?  
- Is Continuous Integration (CI) in place for the projects and the shared components?  
- What GIT workflow is in place on the projects' repositories and the shared components' repository?  

The workflows below are provided as suggested examples. Each team should understand the principles behind Bit and adopt the flow that fits its needs.  

## Shared Libraries

![Centralized library workflow](https://storage.googleapis.com/static.bit.dev/docs/images/workflow_central.png)

This workflow is for organizations that have a design system or a shared components library and need fine control over its distribution. The assumption is that a dedicated project or repository exists with the components that are shared within the organization.  

### Benefits

Organizations that use Bit for sharing discrete components of their shared library expect to benefit from:

- Fine control over the distribution of components while removing the overhead in maintaining separate packages.
- Automatic versioning of components based on their dependencies.
- Reduced bundle size in the consuming projects as they can consume only the specific components they need and not the whole bundle.
- Smaller CI footprint. Only projects that are affected by changes in the components may be built when a component has changed.
- Access control to specific components using collection privileges. Limit the users who can make changes to components.
- Build and test CI for each component separately on bit.dev
- Component installation using NPM and Yarn
- Component showcase with multiple examples per component and search capabilities.

### Steps

**Define Components:**

- Track the components in the project that contains the shared library. Use namespaces to separate components by their types (similar to the folder structure in the project)
- Attach a compiler to the components
- Tag and export the component from the shared library project

**Consume the Components:**

- In any project that wants to consume the component, install it using NPM or Yarn.
- Run npm update (or yarn upgrade) to update components to their latest versions.
  
The consumed components are included in the consuming project as if they were installed using NPM (i.e. in vendor bundle).  

**Change the component in the original project:**

- Modify the code.
- Tag and export the component. Components that depend on the changed component also get a new version.  

For the time being, Bit does not have a PR-like flow to suggest changes to the component. You can bypass this limitation by:  

- Building a separate collection for staged components. Component consumers can suggest changes to components in this collection. The shared library maintainers will merge the changes from the staging collection into the components on their local workspace, review the difference, and reject or submit them back to the primary collection.  
- Making the changes in the local workspace and generate a patch file with the changes or manually perform the adjustment and submit it to the shared library's repository.

> We are aware that this is a sub-optimal flow, and we are working on a new feature for supporting changes to components.

### Versioning Components

The two main options on managing versions for shared libraries are:  

- Retain all components on a single release. The version is updated if any component changed.  
- Version each component individually, and only update when a component changed. Semver standards can be used to denote the type of change made (fix, feature or breaking change)

Bit enables managing versions for each component, and this is the recommended way. Read more about Bit components [versioning](/docs/tag-component-version).

### Publishing

You can publish the components from the workspace into the collection in one of two ways:

- Tag and export components from your local workspace.
- Tag and export components from your CI. This should happen under certain conditions (e.g., when pushing to the master branch, or with special commit message). When exporting from CI, it is important to commit the changes made in the [components map](/docs/workspace#components-map) (`bitmap` file) back to your repository, so the repository is in sync with the collection.  

The evaluation of these options highly depends on the organizational support, as well as the test coverage available for the components and impact of errors.  

## Sharing Code between Projects

![workflow-projects](https://storage.googleapis.com/static.bit.dev/docs/images/workflow_projects.png)

This workflow is useful when no library of shared components exists, and still, you want to share functionality between your projects. Without Bit, you would extract shared functionality to a separate repo, or use a mono-repo, and publish it as an NPM package to a package registry. Then, the projects consume the package using NPM (or Yarn). Bit simplifies the process.

### Benefits

The benefits you can get from this workflow:

- Share components without the need to build dedicated packages by hand
- Share components between different repositories with different configurations
- Collaborate and modify components from any project
- Gradually start building a shared component library
- Use bit.dev to provide a centralized showcase for components in different projects

### Steps

**Define Components:**

- Track a component in any of your projects
- Attach a compiler to the component so that the compiler can build the component
- Tag and export the component from the original project

**Consume the Components:**  

- In any project that wants to consume the component, install it using NPM or Yarn
- If any version was changed, install the latest version (e.g. run npm update)
- The consumed components are included in the consuming project as if they were installed using NPM (i.e. in vendor bundle)

**Change the component in the original project:**

- Modify the code
- Tag and export a new version of the component

**Change the component in a consuming project:**

- Init a bit workspace in the consuming project
- Import the component to the project
- Make the changes in the component
- Tag and export back to the collection all the components that contain changes that are valid for other consumers
- Eject the component to remove the source code from a project and replace it with a node module
- If the changes are not applicable, you can stay with the modified component and still receive updates from the original component

### Managing Components in Projects

Bit differs how [authored components](/docs/workspace#authored-components) and [imported components](/docs/workspace#imported-components) are used in projects. If you want all the projects to be on par with regards to the way the components are used (i.e., used as import from a package and not from a relative source file), you can [eject](/docs/export#ejecting-components) the component in the original project. Now, the component is visible in exactly the same way in all the projects.
