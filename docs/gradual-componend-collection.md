---
id: workflows
title: Gradually Build Component Collection
---

[DIAGRAM] + gist

This workflow is useful for teams that:

- Have several products with UI components.
- Need to keep consistent UI/UX across projects.
- Don't have the time/capacity to form a dedicated team to maintain components.
- Use unified UI framework across projects.

## Benefits

When a team maintains several projects that share the same UI/UX, most often than not they tend to copy-paste, or reimplement components. This is where Bit comes to play - filling this gap. Bit lets teams to gradually build their component collection by curating components from different projects and bringing them together.

- No need to set up a lengthy process of building and maintaining a shared library for UI components.
- Share components that are already in use.
- No need to create an additional repository or package.
- Bit creates a discovery portal for all components in collection, including a live playground and documentation.
- Easy to keep local modifications for components in consuming projects and merge them with incoming updated.
- Make changes to component's implementation from any project and publish newer versions.
- Components can be installed using npm / yarn, so they fit the normal workflow of projects’ developers*.

## Process

The process of gradually building a component collection Bit with is an on-going, pragmatic progress in which you can start by sharing components ad-hoc, according to your needs. This reduces the burden and cost of setting up a project for shared-code, and instead lets you focus in getting things done.

### Find component candidates

Inside your project identify a component that is suitable for reuse, or are needed/reimplemented in another project. This can be a simple button, or a more complicated card with many options. When you have find the right candidate, use [bit add](/docs/tracking...) to track the component with Bit. Make sure all the files of the component are combined into a single component, that includes code, styles, tests, and documentation.

### Isolate component

When implementing a UI component in a project it tends to be coupled to the project itself, thus making it very hard to reuse in other project. There are few things to note when you want to refactor a component for reusability:

- Review the inputs and outputs of the component to make sure they are useful.
- Check out any dependencies on state managers (Redux, Mobx, Vuex, etc.). Does it make sense for a receiving project to have the same state, or should you share the stateless part of the component?
- Note and document any globals that the component assumes. If possible - create defaults.
- If the component is aimed for both client and server-side rendering, make sure you mask the window access.
- Note and document any global styles such as colors and breakpoints that the component relies on. See if its possible to eliminate them or document, so the consumer will be aware of them.
- Provide good tests to verify the component’s functionality.

Refactoring a component for reusability requires a quick feedback loop. Bit enables this functionality by running the component's build and test pipelines in an isolated, temporary workspace for the component. Use this to understand how the component will behave when not in its original project.

> **Component dependencies**
>
> Components that rely on shared utilities and helpers can only be shared if the utilities are shared as components as well. In these cases you should add the utilities and helpers as components as well, and share them alongside the UI components.

### Publish to a collection

When you have successfully isolated a component from a project, its time to share the component to a remote collection. The remote collection is the de-facto source of truth of the component, as all projects should sync with it to get the latest updates and upgrades. It is important to keep correct semver for published components, as other projects will rely on them for receiving modifications.

> **Setting up CI automation**
>
> Its possible to automate the process of publishing changes to components during the project's build time. TODO

### Consume components

The component collection implements the commonjs APIs for a node package registry, so you can use any package manager (npm/yarn) to install components in any project. This simplifies a project's structure by fetching the code and build files. Treating components as any other external package simplifies a project's build process as well.

> **Setting up CI automation**
>
> To install components from a private collection set up the [CI configuration](/docs/ci) to provide a token. You can track changes in the component by using standard npm / yarn tools. Run `npm outdated` or `yarn outdated` to see components that have a new version publish.

### Modify a component

Utilize the fact that the component collection is the source of truth for the component implementation to publish modifications and fixes to it from any project. You can use [bit import](/docs/importing....) to get all the source files and configurations of a component to any project and modify it directly from the consuming project. Using this capability you don't need to do any context switch when facing an issue in the implementation of any component. Moreover, you get to stay in the project that requires the modifications so its easier to know exactly what needs to be fixed/added.

#### Validate component modifications

As part of the `bit import` process, Bit creates the same isolated environment for the component, outside of the consuming project, so that whenever you modify it you get the same feedback loop of running all component tests and build pipelines in isolation. So if by mistake during the fix, an unwanted coupling has introduced between the component and the consuming project, you get a quick feedback and able to resolve it on the spot.  
Use this capability to ensure that all past tests are still passing and that the modification will not cause any breaking change for other projects that already consume it.

### Publish updated component

When you have successfully modified, tested and tagged a new version for a component you should export it back to the component collection so other consumers will be aware of the update and consume it. Before you do that, it is important to get your code reviewed by a colleague, as the component is likely to be updated in several projects. To do that use the pre-existing Pull-Request workflow implemented by Git. To so this you need to commit the component and all modifications to the repository.  
After the review process is done, create a new version for the component and export it back to the remote collection. Use the `--eject` flag of the `bit export` command to the imported component from the project and have the component `npm install`ed in the project.

> **Keeping local modifications**
>
> There are cases where a component modification can't be exported back to the collection because it contains a very specific change that is only relevant for the specific project. You can keep that modification committed to the project and still use `bit import` to fetch and merge changes from the remote collection on-top of the local modifications.
