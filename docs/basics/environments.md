---
id: environments
title: Environments
---

Component Environments define all operations on components and baseline standards. It is very beneficial for you to use environments as a method to standardize component development in the company. For example, how components are structured, their runtime framework versions, tests and lint rules.

Environments are a type of a Bit Extension that implements as set of interfaces. Using these interfaces Bit can help you manage all components in a workspace as if you where managing a single project rather than a list of connected components.

## Environment services

Environment perform different services on the components and are responsible for managing each service configuration.

### Component creation

A basic requirement for standardizing development processes is the ability to quickly create new components with predefined practices and configurations like the file structure, tests and more. An environment can define a set of component-templates for developers to use in their projects.

### Set runtime dependencies

Components can be implemented using a verity of frameworks like React, Angular or Vue. Each of these frameworks has has different runtime requirements. It's the job of the environment to define all runtime requirements for components and let you override and configure it to your needs.

For example, a React environment would define `react` and `react-dom` as `peerDependencies`, and if you decide to use TypeScript it would add `@types/react` and `types/react-dom`. All this according to your pre-selected version of React.

### Build, test, lint and bundle services

An environment exposes a set of APIs to run tasks on components to streamline the development experience. This way developers don't need to worry about figuring out the company best practices for building, testing and linit rules. Everything is a part of their Environment. When using environments developers don't need to fuss around with npm scripts that vary between projects, so it's easy to jump in to the component's implementation and use standards for running operations.

Each of these tasks abstracts the current tools in the eco-system. For example, a **test** service may abstract **jest** or **mocha**, depending on the company's preferences.

### Documentation

Environments simplify the tedious process of documenting components. No more handling of static markdown files. Environments help you create documentation for components using several features:

- **Description**: Provide a short description for your component.
- **Labels**: Set a list of labels defining the component's functionality.
- **Examples**: Have a rendered live examples of the component in various use cases.
- **Compositions**: Different compositions a component supports. Use it to test various use cases for a component.
- **Freeform text**: Add your own text and describe the component in more details.
- **Property table**: Bit automatically parses all properties of your components and renders them in a table.
- **APIs**: Bit automatically parses all APIs the component exposes and adds them to the documentation.

> **Storybook**
>
> If you are using Storybook you can integrate it to your component documentation.

[learn more about component documentation](TODO).

## Configuring environments

A component can have a single environment defined for it. Use the `workspace.json` file to set the environments for components in your workspace. Bit then takes the configuration from the workspace and set it for each component.

Environments can expose a configuration object for developers to use in their project. This allows infrastructure teams give flexibility for their company where required.

## Environments in a Workspace

During development, when you use Bit's local server (`bit start`) it takes care of running `build`, `test` and other tasks on each modification. The local server communicates with the environments that are installed for the workspace, as each environments keeps a list of the components using it. These processes happen in-memory to give you the best performance possible, so you will not have to wait to see how your changes affect your components.

## Component publishing

When publishing isolated components its crucial to ensure they are isolated from their environment. To facilitate this ability, when you are versioning and publishing components the component environment support running a dedicated pipeline of tasks in a [Capsule](TODO). In a nutshell, a Capsule creates a "project" from a component on a temporary directory on your machine and runs your predefined release pipeline in a completely separated location.  
This process is more time and resource consuming than running the environment tasks as part of the local development server, so Bit runs it when components are set to be published, enforcing more restrictions on the component and making sure it is truly isolated.
This way Bit validates that the component is truly isolated from the project.

## Compared to Monorepo

Bit makes it easy to have many Environments in each workspace. As it manages this complexity for you by communicating with all Environments available in the workspace for you.  
This means that Bit run operation on all components, regardless of the number of environments - through a single process. Bit hides the complexity of managing a process for each project, keeping changes in sync across components and frameworks, aggregating all outputs and a single UI for managing the multi-environment workspace.
