---
id: overview
title: Overview
---

Tagging a component creates an immutable version of the component. This version can then be [exported](/docs/exporting/organizing-components).  
A version contain the source code, configuration and all dependencies required to make a component usable. It is set according to the semantic versioning specs (MAJOR.MINOR.PATCH). By default, tagging a component without specifying a version bumps a patch version.

When tagging Bit performs the actions for each component:

- Locking dependencies versions for the components.
- Running component's build pipeline.
- Setting a version of the component.
- Automatically tag other components in the workspace that depend on that component.

## Versioning and CI

We recommend tagging new versions after a proper PR flow for a code change via Git. Then, when a new code is merged, run the `tag` operation as part of your workspace CI automation.  
Read more about versioning during CI [here](TODO).

## Building component history

Bit stores all versions in the [scope](/docs/scope/overview) and links them to the component, essentially chaining together all versions to create a changelog.

![Component history](https://storage.googleapis.com/static.bit.dev/docs/images/component.svg)

You can view the history created for each component in the workspace UI by opening the history tab for a component, or run the `bit log <component>` command.

> TODO - IMAGE

### Checkout version to workspace

You can checkout a past version of a component to the workspace using the `bit checkout` command. This is possible because Bit stores configuration and dependency graph for each component, so it can get all information back to the workspace and apply it as part of the component implementation.  
When you checkout a different version, all other components that depend on it will use the newly checked-out version.

## Advantages of by-component versioning

Versioning single components is a key step towards moving frontend development into a microservice-like decoupled development. It provides granular control over the composition of UI applications. It gives application builders the freedom to introduce shared components, continuously update partitioned parts of their UI without conflict, and retain their team independence.

### Small, rapid incremental updates

Versioning single components makes it possible to incrementally upgrade parts of a UI application. When versioning single components, adopters can get updates to components they use, to incrementally introduce scoped upgrades.

### Avoiding redundant dependency conflicts

Developing internal components in as application and at the same time adding a third-party library, creates dependency versions conflicts.  
For example, an application can have an internal `Scroller` component, which has `Scroll-JS` as a dependency on version `3.0.1`. A third-party library is added in order to introduce its “Button” component into the application. However, the library also has a `Scroller` component, which depends on `Scroll-JS` on version `2.0.2`. In this common case, conflicts can emerge.  
Yet, if the application adopts only the `Button` component from the library, without the `Scroller` component, the conflict is avoided altogether.

### Continuous releases, hotfixes, and rollbacks

Versioned components give the distributor the ability to release incremental updates per-component.  If there’s a new major version to `Slider`, it can be released without a major version for an entire library library.  
Consumers also know that every dependency update they get is relevant for their components.

### Mix and match UI composition

SemVer’ing components is useful for adopting a set of shared components and combining them with ad-hoc versions, as needed.  
For example, it’s possible to adopt a set of shared components versioned at `1.0.0` and ad-hoc update only `Slider` with a patch fix to version `1.0.1` — without conflict.

### Retaining team independence

Versioning by component “legalizes” the adoption and modifications of components. By letting teams introduce single components in their applications, and giving them the freedom to mix and update with their own versions, it’s possible to adopt components and still retain independence.

### Performance, stability, and dev velocity

Versioning single components enable greater development velocity and improve on the performance of the application built.

- **Performance** — When an application only adds and uses the components it really needs, it reduces bundle-size. As a result, less code is parsed in the browser and execution time improves.
- **Stability** — A single-versioned library forces adopting teams to constantly introduce wide changes to their application. SemVer’ed components increase stability by safely introducing incremental updates scoped to specific UIs.
- **Dev velocity** — Team speed is increased when adopting shared components. When there’s an update needed, they can choose to ask for it.
