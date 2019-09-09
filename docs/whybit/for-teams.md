---
id: for-teams
title: Bit for Teams
---

**Bit helps your team easily publish and manage components at any scale to build better software faster**

Teams which scale code-sharing and code reuse enjoy faster development cycles and simpler maintenance for their codebase.

Bit is designed to help teams scale the sharing and management of components to hundreds and even thousands of components. In this philosophy, it takes care of the components' entire lifecycle from development to deployment so that your team can share and manage any number of components at any scale.

As such, it’s also a powerful tool for publishing multiple components from any shared library (component monorepo) while greatly increasing discoverability and adoption for shared components.

**Easily managing and publishing** hundreds of components from multiple libraries and apps with 0 overhead and no refactoring. [Learn more](#publishing-and-managing-components-at-any-scale-without-overhead)

**Gaining discoverability** for shared components so that every developer can easily find and choose the components they need. [Learn more](#increasing-discoverability-of-shared-components)

**Increasing the adoption** of shared components by removing the main barriers and encouraging collaboration. [Learn more](#increasing-adoption-and-usage-for-shared-components)

## Publishing and managing components at any scale without overhead

Bit is the most effective way to publish and manage multiple components from any library or project, with infinite scalability and zero overhead.

**Instantly publish components from any repository**

With Bit, you don't need to refactor anything to publish components from your library. No structure changes to your repository, no code changes. You can track and publish all of your library's components without refactoring your codebase and without adding extra maintenance overhead. Bit allows a component to be tracked in any path or using any convention in your repo. All you need to do is [let Bit seamlessly isolate](https://docs.bit.dev/docs/add-and-isolate-components.html) and pack the components. For the average library, Bit saves weeks if not months. If you have many libraries, the difference becomes that much more dramatic. 

**Automatic dependency definition & management**

In large-scale component libraries or apps, managing components dependencies can be a real pain. Bit makes dependency definition simple by automatically defining dependencies for each component (based on your import and require statements) while giving you an easy way out in case you need to override any of the defined dependencies. Bit will [automatically define and handle](https://docs.bit.dev/docs/add-and-isolate-components) all the dependencies for the components in the repository and will suggest to update them whenever a dependency changes. This means saving a lot of time and effort in the maintenance and development of the library using Bit.

**Component versioning**

Bit helps you easily get control, bump and manage versions for components on your dependency graph. By automatically detecting changes made to components, Bit allows to version only the components which changed and their dependents or version all of the components in the repo all together while providing tools to make the update safe. You can also review the changelog for each component.

**Granularity is unlimited**

A Bit component is basically a set of files. Since Bit doesn't require any overhead for publishing and managing components, everything can be a component, and larger components can be composed of smaller components. This means building faster and spending less time maintaining your codebase. 

**Component testing is part of the workflow**

Bit can isolate components, so it can also run their tests in isolation. You can know exactly which components pass which tests at any point, and make decisions based on this information.

## Increasing discoverability of shared components

Bit provides enhanced discoverability for the components you share. It's designed to help developers quickly find and choose the components they need through a universal hub with a rich, visual and interactive experience:

**Visual component collections with example previews**

When you share the components from the library they are organized in a visual collection with preview examples [example](https://bit.dev/grommet/grommet). Developers can explore this collection with their eyes and find the components they need and like to use.

**Designated component search**

Bit's search is designed and built for code components, so you can use it to quickly find components in the collection or in the community. The search factors in much more than just text, it factors in context and functionality to help developers find and choose components. 

**Interactive playground for every component**

Every component can be tried hands-on in a live playground. This tremendously helps developers decide if they want to adopt the component since they've already played with it hands-on. You can save examples, add new ones and show different use cases.

**Instant API docs for every component**

Bit extracts the API documentation from the React component's source code and presents it in the hub's UI for every component. This helps developers easily learn how the component works and how to use it once they consume in their code. Since the docs automatically update every time you update the component, you don't need to maintain them in any way other than writing and documenting the code itself. You can keep the official docs site of you have one, and use Bit to scale code-sharing without having to put tons of effort into documenting (and maintain docs) for everything you share.

**Component testing**

 When you have test files for a component, Bit uses them to test and component (in isolation) and presents the results in the component page. So, the tests become an indicator of the status and usage of the component. Knowing if tests pass can also be used to decide whether or not to update components when working with the CLI.

**Component labels**

When you share components with Bit they are automatically analyzed and attached with relevant labels which help developers quickly filter and focus their search through the components. Labels can also be added, removed and managed manually via Bit's UI.

## Increasing adoption and usage for shared components

Many teams building libraries find out that getting adoption for these libraries can be a challenge. Bit isn't built just for the maintainers of the library, It's built for the consumers of the components. It increases the adoption of shared components by eliminating the barriers that developers face in the usage of the components.

**Consumption of individual components**

Every component can be installed from Bit's registry as a package using the NPM or Yarn client. This means you don't have to install the whole library with all its weight in every app and can only use what you need.

**De-coupling component development from the library**

Bit enables a distributed and democratized development of components. A big issue that hurts the adoption of libraries is that the concern of developers who don't want to couple their own development to that of the library. This means that the consuming developer will have to work hard to make a PR to the library to change even a single code line and then depend on the maintainers to decide of they want to adopt the change. Even then, they might have to wait a long time for the maintainers to accept the change - if they will. Bit changes this picture altogether. Any developer can `bit import` any component into any project and develop it right these from that project. Changes can be kept locally, or easily published as a new component/new version. It's up to you what degree of freedom you want to give your consumers, but the choice is yours.
