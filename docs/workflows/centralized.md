---
id: centralized
title: Centralized Library
---
![Centralized library workflow](https://storage.googleapis.com/static.bit.dev/docs/images/workflow-centralized.svg)
This workflow is suggested for organizations that have:

- A centralized repository for shared UI components already in place
- A dedicated team to manage shared UI components
- Multiple projects exist that use the shared components

## Challenge of centralized library

Introducing a design system inside an organization can bring tremendous value for reducing the amount of code and increasing the effectiveness of the development teams. However, these benefits come with a price tag that should be considered:  

### External Dependence

Dependence on other teams is, by far, the most crucial problem. Teams aim to be independent and deliver fast. Being dependent on the schedule and priorities of other teams can reduce this pace. If your deadline is on Thursday, but the infra team has other priorities than making this fix to your component, it is your problem.

### Usability

Writing good components is hard. As a developer, you are now the consumer of the infrastructure team. If the shared component exposes 30 mandatory parameters, when all you need is a simple button with no icon, you are likely to develop your own component and not rely on the shared one.  

### Granularity

Infrastructure teams tend to create a single package (e.g. npm package) that includes all components. It is easier for them to manage and deliver this way. While this can be useful at the beginning, it becomes a real burden when the project grows and the shared library contains components that are only used by some of the projects. The developers of the projects are forced to receive a new version of the library when a change is made on any component included in the bundle and the infrastructure team themselves are forced to create new versions of the entire library when only one component has changed.  

## Benefits

Bit simplifies the process of sharing components for both the library maintainers and the library consumers:

### For Maintainers

- Bit automates the packaging of each component with higher granularity without adding the overhead in maintaining separate packages
- Bit automatically versions components that were altered based on changes in their dependencies
- Building components locally without the project context shorten the feedback loop on the way components impact other projects
- Publishing components to bit.dev increases component adoption by making them visible to all teams
- This visibility also enables designers and product managers to monitor the end product and produce targeted feedback per component 
- Bit helps to control who is making changes to the components
  
### For Projects

Projects developers can benefit from retaining their existing workflow of using NPM for fetching components. Using smaller, discrete components that are required by each project is useful for:  

- Reducing the bundle size of the application. Only the components they need are included.
- This is a double (and often more) saving - the bundle will also only include the 3rd party libraries that are relevant to components actually used in the project, not those required by the entire component library.
- Increasing the project stability by reducing the frequency of changes received for the package. Smaller packages mean that the project only gets the changes that affect the components they use.
- Increasing control in the project. Consumers are not committed to a single version of all the components and instead can mix and match the versions they need of each component.
- Creating a smaller CI footprint as only projects that are affected by changes in the components may be built when a component has changed instead of the whole library.

## How does it work?

1. Library maintainers are publishing components from the shared library with documentation.
1. Projects developers access the collection on bit.dev to locate the components they need and install them using npm or yarn
1. If a change is required in a project, the project's developer is importing the component into their project.  
   1. The project developer is making a change in the component and tests it inside their project.
   1. If a new version of the component exists, the project developers get the changes on top of their local changes
1. Project's developer submit a request or an issue on the component to the library maintainer, with their suggested change
1. Library maintainer reviews the change, build and test the components locally.
1. Library maintainers embed the change into the component and publish a new version of the component and any components that depend on it.
1. Project developers upgrade the components in their projects as per their timelines and test their projects. You can use the bit.dev components changes [automatic creation of PRs](/docs/bit-dev#prs-for-component-changes) to keep all project in Github synced with the latest versions of components.
