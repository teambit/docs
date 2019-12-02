---
id: projects
title: Ad-hoc Sharing
---
![workflow-projects](https://storage.googleapis.com/static.bit.dev/docs/images/workflow_projects.png)

This workflow is useful for teams that:

- Have several products with UI components.
- Need to keep consistent UI/UX across projects.
- Don't have the time/capacity to form a dedicated team to maintain components.

## Challenges

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

As you can see, the previous options have quite a few limitations. This is where Bit comes to play - filling this gap. Bit lets many repositories to behave as if they are a mono-repo for sharing components across them. In the cloud era, it only makes sense to have a cloud-based solution. Users can build a package from their existing repository and share it with others over the cloud.
Bit introduces the following benefits:  

- Components can be shared from any project. There is no need to set a specific project as the component originator.  
- Components can be extracted from within a project. No need to create an additional repository or package.  
- Components are built with their own configuration, so there is no need to adjust the receiving project to have the same configuration as the originator
Components can be installed using npm / yarn, so they fit the normal workflow of projects’ developers*.  
- A components documentation site is built over time* curating the components from all projects so they are easy to find.
- Developers in receiving projects can make local changes to the components and still get the changes made in the component in the original project
- Developers in receiving projects can make changes to the component in their project and send it back.
- Shared components serve as a knowledge base that suggests methodologies of writing good components with proper tests and documentation
- Shared components can be used as a basis for building a full-blown design system.

* Functionality provided by bit.dev.

## Process

### Track a Component

Inside your project identify a component that is suitable for reuse. Here are some tips on things to notice when trying to reuse a component:  

- Make sure framework and tools libraries, such as React, Angular, Storybook, etc. are defined as peer dependencies, so they are not included inside the components.
- Review the inputs and outputs of the component to make sure they are useful and concise.
- Note and document any global styles such as colors and breakpoints that the component relies on so the receiving project is aware of them.  
- Check out any dependencies on state managers (Redux, Mobx, Vuex, etc.). Check if it makes sense for a receiving project to have the same state, or does it make sense to only extract the stateless part of the component.  
- Note and document any globals that the component assumes. If possible - create defaults. If the component is aimed for both client and server-side rendering, make sure you mask the window access.  
- Provide good tests to verify the component’s functionality
- Components that rely on shared utilities can only be shared if the utilities are shared as components as well, so it is worth considering sharing the tools first.  
- Make sure all the files of the component are combined into a single component, that includes code, styles, tests, and documentation.  
- Tag the component with a version number and export it.  

If you want the component to be the same in all projects, you can `bit eject`(/docs/export#ejecting-components) the component from the local project. The component is now installed as a node_modules package.  

### Consume components

Unless you need to change components, prefer installing components using package managers. This simplifies a project's structure by fetching the code and build files.  
Packages that are installed are located under the `node_modules` folder, and you can find them under `@bit`. The component includes a `pacakge.json` that was automatically generated. The installed component also includes all the other `@bit` components it requires.  
Treating components as any other external package simplifies a project's build process as well.
If you are using CI to build a project that is using shared components, and your components are stored in private collections, you need to set up the [CI configuration](/docs/ci) to provide a token. 
You can track changes in the component by using standard npm / yarn tools. Run `npm outdated` or `yarn outdated` to see components that have a new version publish.  

### Modify components

You can make changes to the code of the component in the original project, or in any of the projects that consumed it.  
In a consuming project, or in the local project, if the component was ejected, [import the source code](/docs/sourcing-components) of the component into your project using the `bit import` command.  
Make the changes needed for the component and build and test it.  
If the changes are relevant to other projects, tag a new version and export it to the collection. Then, eject the component from the project.  
If the changes are not applicable to other projects, you can stay with the modified component and still receive updates from the original component.
Receive Updates
If the component is installed locally as a node_modules package, you can check on updates by running `npm outdated` or `npm update` to see if a new version exists.  
If the component is imported into the workspace, running `bit import` will get all the changes, and you can check out new versions or merge the incoming changes with the local version.
