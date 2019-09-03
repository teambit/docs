---
id: importing-component-dependencies
title: Sourcing Components with Dependencies
permalink: docs/importing-component-dependencies.html
layout: docs
category: Reference
prev: component-dependency-resolution.html
next: workspace-statuses.html
---

As there are different types of dependencies a component may have, there are two distinct flows that are available for them. You can choose to configure your preferred flow for your workspace.

This entire section is relevant only for the bit import action of sourcing a component. Components that are installed as node modules, using npm/yarn will work just like any other package you install to a project.

## Installing Component’s Package Dependencies

If a component has package dependencies, Bit will call your package manager and tell it to install the package dependencies. You can configure which package manager Bit will call in your [workspace’s bit config](/docs/conf-bit-json.html).

### Yarn Workspaces

If you are using Yarn, and Yarn Workspaces, you can configure it to Bit. Bit will then set each component as its workspace for Yarn.

### Installing Component Dependencies

There are two options available to install component’s component dependencies. Bit can install them as regular package dependencies, or source them as well.

#### Component Dependencies as Node Modules

This is the default option of installing component dependencies. Bit will try and use your package manager to install an imported component’s component dependencies. If later you choose to source (bit import) any of the component dependencies, to access their source code, Bit will create link files, to ensure that both sourced components are using each other, and not the installed packages.

For example, you have imported component A, which depends on component B. Component B was installed as a package, by npm, so component A uses the packaged component B. Now you use bit import again, but this time to source component B. Bit will add a link file in component A’s node_modules directory which directs it to the source file of component B. This is so that if you make any changes to component B, it will affect the functionality of component A, as they depend on each other.

#### Sourcing Dependencies to a Workspace

You can choose to import all component dependencies as components, thus sourcing them to your project as well. When you choose this route, Bit will import the source file of each dependency to your project, and install their package dependencies as node modules, using a package manager.
