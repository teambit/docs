---
id: projects
title: Ad-hoc Sharing
---
![workflow-projects](https://storage.googleapis.com/static.bit.dev/docs/images/workflow_projects.png)

This workflow is useful for teams that:

- Have several products with UI components.
- Need to keep consistent UI/UX across projects.
- Don't have the time/capacity to form a dedicated team to maintain components.

## Challenge with sharing components

It is typical for a company to grow from developing a single application to a stage where it needs to cater for multiple applications service different business needs or different customers’ segments. 
The introduction of new systems is likely to go as a rolling process, and the company does not always have the time to set up a designated design library. However, as the applications live in the same business domain, there will be similarities between them where code reuse is appropriate.  
The company is likely to assess one of the following options:  

### Option 1 - Copy the product-list source code

Copy-pasting code is the most naive option. Take the code and copy it into your project. Obviously, this is far from being the best possible option.
First, copying the code is not enough. You need to identify any dependencies the code has. The code may depend on 3rd party code (namely NPM packages) or internal code that you need to isolate from the project.
Also, the source code itself might not fit very well into your project. Maybe there is some plugin or transpiler used in the other project that does not exist in your project?
But worse of all, copied code is dead code. You do not receive any changes or bug fixes from the original project.

### Option 2 - Create a Package from a separate Repository

The standard way to share code in a maintainable manner is, of course, to publish it as a package. Packages do not come for free. There are some steps to take before you can share code as a package:

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

### Option 3 - Monorepo

Monorepo has emerged as a popular solution for sharing code between projects while skipping the need to maintain multiple repositories and retaining all the code in a single repo. Monorepos enforce that not only the shared components reside in a single repository, but also the projects that consume them.
The debate around mono repo is still happening. Matt Klein canonical post titled “monorepos, Please Don’t” details most of the downsides in monorepos.
In addition to everything described there, it is worth noting that unless you start a completely new venture, there are also transition costs from multiple repositories to a monorepo.

## Benefits

Bit lets teams gradually build a component collection by curating components from different projects and bringing them together. Bit lets many repositories to behave as if they are a mono-repo for sharing components across them. Bit introduces the following benefits:

- No need to go a lengthy process of building and maintaining a shared library for UI components.
- Share components that are already developed in existing projects.
- No need to create an additional repository or package for the shared components.
- Use bit.dev for a discovery portal for all components in collection, including a live playground and documentation.  
- Making changes to components code is possible from any project.
- Local modifications for components in consuming projects can be kept and still merged with incoming updates.
- Components can be installed using npm / yarn, so they fit the normal workflow of projects’ developers.

## How it Works

1. A developer form a project to identify components that are suitable for reuse
1. The project's developer track the local source code as a component
1. The component is published with a specific version
1. Any project that needs the component installs it just like any other npm package
1. A developer in any of the projects can import and make changes to the component
1. The developer publishes a new version of the component
1. Developers in other projects install the new version in their projects
