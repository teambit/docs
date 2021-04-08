---
id: working-with-bit
title: Working with Bit
---

Bit simplifies the process of collaborating on UI components. Team members can share, maintain, and synchronize components from different projects.
This allows teams to:

- Increase code reusability
- Increase design and development efficiency
- Retain UI and UX consistency
- A stepping stone for establishing a [micro frontends architecture](https://martinfowler.com/articles/micro-frontends.html)

## How can teams work with Bit?

Bit is a collaboration tool that spans across people and projects. As any code-collaboration tool, the key to use Bit successfully is to have a clear and concise workflow. The distributed nature of Bit allows for far more flexible in how developers collaborate on components so you can adjust it to fit your team's structure and requirements.

## Benefits of using a Bit workflow

Some structures are common for organizations that develop UI applications:

![workflow teams](https://storage.googleapis.com/static.bit.dev/docs/images/workflow-teams.svg)

1. A single frontend team exists, working on a single product. This structure is common for businesses in their initial stage.
1. The company is growing and develop a set of separate products. Multiple teams exist, each one responsible for its own product.
1. Teams want to remain independent, but standardize on their UIs and UX across the projects, and create a centralized team providing a centralized UI component library shared between all application.
1. Organizations that still revolve on a single application that is growing in complexity may want to break the monolith application and employ a micro frontends architecture.

Bit can help teams that grew to work on separate projects but still need to have a consistent UI/UX and also for teams that face some of the issues of working with a centralized UI component library. It is also possible to use Bit when working on a single project, as it helps to decouple all UI components from the business logic and set up the team to scale itself.

## Designing a Bit Workflow

You can utilize Bit however you want, depending on the state of your team. So when designing a workflow, there are some key aspects to take into consideration:

- How many projects need component sharing?
- How similar are the projects that need to share components? e.g., are they all based on the same CLI with the same configuration?
- Is there a centralized repository for shared components?
- Is there a dedicated team that builds the shared components?
- Are teams split according to functional or business domains?
- Is Continuous Integration (CI) in place for the projects, micro-frontends and the shared components?
- What is Git workflow in place on the projects' repositories and the shared components' repository?

## Suggested Workflows

There are three main workflows you can use to share UI components with Bit:

- A workflow to use when multiple projects would like to share a [**centralized component library**](#centralized-workflow).
- A workflow for [**ad-hoc components sharing**](#ad-hoc-components-sharing) between projects, which helps gradually build a component library.
- A workflow for teams that employ [**micro frontends components sharing**](#microfrontends).

You can mix and match specific features from each workflow or design your own.

## Centralized Workflow

![Centralized library workflow](https://storage.googleapis.com/static.bit.dev/docs/images/workflow-centralized.svg)
This workflow is suggested for organizations that have:

- A centralized repository for shared UI components already in place
- A dedicated team to manage shared UI components
- Multiple projects exist that use the shared components

### Challenge of centralized library

Introducing a design system inside an organization can bring tremendous value for reducing the amount of code and increasing the effectiveness of the development teams. However, these benefits come with a price tag that should be considered:

#### External Dependence

Dependence on other teams is, by far, the most crucial problem. Teams aim to be independent and deliver fast. Being dependent on the schedule and priorities of other teams can reduce this pace. If your deadline is on Thursday, but the infra team has other priorities than making this fix to your component, it is your problem.

#### Usability

Writing good components is hard. As a developer, you are now the consumer of the infrastructure team. If the shared component exposes 30 mandatory parameters, when all you need is a simple button with no icon, you are likely to develop your own component and not rely on the shared one.

#### Granularity

Infrastructure teams tend to create a single package (e.g. npm package) that includes all components. It is easier for them to manage and deliver this way. While this can be useful at the beginning, it becomes a real burden when the project grows and the shared library contains components that are only used by some of the projects. The developers of the projects are forced to receive a new version of the library when a change is made on any component included in the bundle and the infrastructure team themselves are forced to create new versions of the entire library when only one component has changed.

### Benefits

Bit simplifies the process of sharing components for both the library maintainers and the library consumers:

#### For Maintainers

- Bit automates the packaging of each component with higher granularity without adding the overhead in maintaining separate packages
- Bit automatically versions components that were altered based on changes in their dependencies
- Building components locally without the project context shorten the feedback loop on the way components impact other projects
- Publishing components to bit.dev increases component adoption by making them visible to all teams
- This visibility also enables designers and product managers to monitor the end product and produce targeted feedback per component
- Bit helps to control who is making changes to the components

#### For Projects

Projects developers can benefit from retaining their existing workflow of using NPM for fetching components. Using smaller, discrete components that are required by each project is useful for:

- Reducing the bundle size of the application. Only the components they need are included.
- This is a double (and often more) saving - the bundle will also only include the 3rd party libraries that are relevant to components actually used in the project, not those required by the entire component library.
- Increasing the project stability by reducing the frequency of changes received for the package. Smaller packages mean that the project only gets the changes that affect the components they use.
- Increasing control in the project. Consumers are not committed to a single version of all the components and instead can mix and match the versions they need of each component.
- Creating a smaller CI footprint as only projects that are affected by changes in the components may be built when a component has changed instead of the whole library.

### How does it work?

1. Library maintainers are publishing components from the shared library with documentation.
1. Projects developers access the collection on bit.dev to locate the components they need and install them using npm or yarn
1. If a change is required in a project, the project's developer is importing the component into their project.
   1. The project developer is making a change in the component and tests it inside their project.
   1. If a new version of the component exists, the project developers get the changes on top of their local changes
1. Project's developer submit a request or an issue on the component to the library maintainer, with their suggested change
1. Library maintainer reviews the change, build and test the components locally.
1. Library maintainers embed the change into the component and publish a new version of the component and any components that depend on it.
1. Project developers upgrade the components in their projects as per their timelines and test their projects.

## Ad-hoc Components Sharing

![workflow-projects](https://storage.googleapis.com/static.bit.dev/docs/images/workflow-projects.svg)

This workflow is useful for teams that:

- Have several products with UI components.
- Need to keep consistent UI/UX across projects.
- Don't have the time/capacity to form a dedicated team to maintain components.

### Challenge with sharing components

It is typical for a company to grow from developing a single application to a stage where it needs to cater for multiple applications service different business needs or different customers’ segments.  
The introduction of new systems is likely to go as a rolling process, and the company does not always have the time to set up a designated design library. However, as the applications live in the same business domain, there will be similarities between them where code reuse is appropriate.  
The company is likely to assess one of the following options:

#### Option 1 - Copy the product-list source code

Copy-pasting code is the most naive option. Take the code and copy it into your project. Obviously, this is far from being the best possible option.
First, copying the code is not enough. You need to identify any dependencies the code has. The code may depend on 3rd party code (namely NPM packages) or internal code that you need to isolate from the project.
Also, the source code itself might not fit very well into your project. Some plugin or transpiler used in the other project that does not exist in your project?
But worse of all, copied code is dead code. You do not receive any changes or bug fixes from the original project.

#### Option 2 - Create a Package from a separate Repository

The standard way to share code in a maintainable manner is, of course, to publish it as a package. Packages do not come for free. Some steps to take before sharing code as a package are:

- Extract the code it to its own repository
- Configure the build tools
- Construct a publish chain

While building the repository is mostly a one-time effort, the higher costs hide when the component is changed. Here are the typical steps when you need to make a change to a shared component:

- Clone the shared component repo
- Switch to the repo and install
- Code and test the shared component
- Link the project code to the shared repo
- Check the component in the code
- Push the code to the original repo
- Publish the package from the original project
- Install the package and unlink the local project

This is definitely too many steps to do for every change.

#### Option 3 - Monorepo

Monorepo has emerged as a popular solution for sharing code between projects while skipping the need to maintain multiple repositories and retaining all the code in a single repo. Monorepos enforce that not only the shared components reside in a single repository, but also the projects that consume them.
The debate around mono repo is still happening. Matt Klein canonical post titled “monorepos, Please Don’t” details most of the downsides in monorepos.
In addition to everything described there, it is worth noting that unless you start a completely new venture, there are also transition costs from multiple repositories to a monorepo.

### Benefits

Bit lets teams gradually build a component collection by curating components from different projects and bringing them together. Bit lets many repositories to behave as if they are a mono-repo for sharing components across them. Bit introduces the following benefits:

- No need to go a lengthy process of building and maintaining a shared library for UI components.
- Share components that are already developed in existing projects.
- No need to create an additional repository or package for the shared components.
- Use bit.dev for a discovery portal for all components in collection, including a live playground and documentation.
- Making changes to components code is possible from any project.
- Local modifications for components in consuming projects can be kept and still merged with incoming updates.
- Components can be installed using npm / yarn, so they fit the normal workflow of projects’ developers.

### How does it Work?

1. A developer from a project to identify components that are suitable for reuse
1. The project's developer track the local source code as a component
1. The component is published with a specific version
1. Any project that needs the component installs it just like any other npm package
1. A developer in any of the projects can import and make changes to the component
1. The developer publishes a new version of the component
1. Developers in other projects install the new version in their projects

## MicroFrontends

![Micro frontends workflow](https://storage.googleapis.com/static.bit.dev/docs/images/workflow-microfrontends.svg)

This workflow is beneficial for teams that:

- Deploy their applications as micro-frontends.
- Have dedicated teams for each micro-frontend.
- Are autonomous and have specialized business domain expertise.

### Challenges of Micro Frontends

Micro-frontends architecture is defined as "An architectural style where independently deliverable frontend applications are composed into a greater whole."
Employing a micro-frontends architecture lets multiple teams decompose a large monolithic frontend application into smaller and simpler units. The teams develop each application independently and deploy them separately. Each team is focused on a specific business concern.
Deploying a complete micro-frontend for a piece of the application can be very useful. Still, the problem arises when the teams want to share smaller pieces of code between said applications.
As an example, the _User Management Team_ wants to share a `userAvatar` component showing some information (such as if the user is online), so other teams can use the `userAvatar` inside the different parts of their applications.  
One possible solution is to implement `userAvatar` as a separate project and package it as a dedicated NPM package published to a registry. This option is useful for a small number of medium-sized components but can incur high costs for a large amount of smaller components shared by each team.

### Benefits

Micro-frontend business-oriented teams can use Bit to deploy components that are business-specific and encompass the dedicated business logic.

- Bit let teams hide the complexity of their business logic by only exposing APIs that are consumed by other teams.
- Small components can still be exposed but without the overhead of the deployment process.
- Components are available for all teams to consume.
- Explicit components' APIs retain separation between micro-frontends.
- Separately packaging small components allows consumers to integrate only the functionality they need.
- Bit automates the packaging and versioning of each component to reduce the shared component's maintenance overhead.
- Versioning components allow teams to communicate the level of changes performed in the component using semver.
- Previous versions are available so that teams can upgrade at their own pace.
- Dedicated collections for each team let them control who can make changes to the components.
- The shared component's code stays in the team's repository making it easier to keep their functionality up to date.

### How does it work?

This process assumes each micro-frontend team already has their code repository and deployment processes to manage their micro-frontend.

1. The team creates a collection of components for publishing their components.
1. Micro-frontends teams can use components from other teams' collections and embed them into their frontend applciation.
1. Teams can link their code repositories to the specific collection in bit.dev, so they are aware of new versions of the components used in the applications.
1. Once a component was changed, consumers can build and deploy a new version for their micro-frontend, as needed.

Bit.dev offers three methods for getting notification on updated components:

- Link the GitHub repository that consumes the components. With each new vesion, Bit.dev creates a PR for updating the component version.
- Receive a notification on a slack channel, and perform the update manually
- Bit.dev triggers a webhook with the information on the modified component. Use the webhook to create an automation for updating the repository.
