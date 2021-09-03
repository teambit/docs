---
id: open-source
title: Open Source
---

At Bit, we build everything with Bit.

- Bit was built from 1000s of components including UI, modules, and backend services.

- Composing a variety of different CLI app, web app and microservices.

- Bit is 100% consistent without a single duplicated line of code.

- It is the most extendable product ever built.

Every feature or service we build is a **scope of components**. Each scope of components contains everything the team needs to deliver this feature: UI components, data-connected components, React hooks, Node modules, and even serverless functions. Our teams expose and share their components to each other and continuously integrate to build products.

Our entire workflow for building bit goes through Bit: Component development, compilation, testing, packaging, linting and so on. We use 100% of bit's APIs to isolate, compile, test, install dependencies, and so on.

There’s not a single feature implemented in Bit which was developed in a "mono repo" (i.e. with a package.json, npm and other tools) - everything is modular components.

**We aim to open-source as much code as possible**. Thanks to Bit, it becomes easier than ever to open-source specific components or even entire features, even if they live inside a private application. As of today we havשׂe **over 40 open-source scopes with over 500 open-source components** available to the community.

## Our open source scopes

<a href="https://bit.dev/teambit/~collections">
    <img src="https://storage.googleapis.com/static.bit.dev/harmony-docs/teambit-org.png"></img>
</a>
9:51

Here are some of the open source scopes we build:

- [Evangelist (Marketing)](https://bit.dev/teambit/evangelist) - Our marketing team scope which is responsible for our marketing site and all marketing related pages and components on Bit.dev. It empowers the marketing team to ship new updates to production autonomously as well as provide services to other teams who can use these components to create better and faster marketing for their products. The marketing team gets to ensure a single and consistent tone and visual language across all experiences and products.

- [Documenter](https://bit.dev/teambit/documenter) - Our component documentation team’s scope is responsible for the component documentation product on Bit.dev. This scope contains all documentation related components on Bit.dev. It empowers them to ship updates and component documentation services to the rest of our team internally and to the community.

- [MDX Integration Scope](https://bit.dev/teambit/mdx) - A standalone service extending Bit to support the MDX file format from all ends (UI, modules, extensions, etc.) and acts as a service for other teams to consume and build new services and features on top. Thanks to this Scope you can use MDX to create awesome documentation for your components in Bit.

- [Harmony](https://bit.dev/teambit/documenter) - The minimal core engine for executing and orchestrating Bit extensions with nearly 20 components.

- [Component](https://bit.dev/teambit/component) - Everything Bit needs to isolate, version, and analyze Bit components including the definition of each components’ dependency graphs.

- [Workspace](https://bit.dev/teambit/workspace) - The modular Bit workspace and the components that set up and run the workspace including the core workspace aspect and useful features like variants and load preview.

- [Scope](https://bit.dev/teambit/workspace) - This scope is responsible for handling and displaying scopes in Bit. It contains all features required to export, host, manage and display components in scopes.

- [Code explorer](https://bit.dev/teambit/code) - Components that provide the exploration of any component’s code in the UI of the local Bit workspace or Bit.dev.

- [Compositions](https://bit.dev/teambit/compositions) - Components that implement the "Compositions" feature that renders components in the context of their dependants and usage instances.

- [Preview](https://bit.dev/teambit/preview) - The features that handle the bundling and rendering of component compositions and documentation, both in the local workspace UI and on Bit.dev

- [Bit React](https://bit.dev/teambit/react) - The ingredients and features of Bit’s development environment for React projects, including React native!

- [Defender](https://bit.dev/teambit/defender) - Components that test, lint, and validate the code of other components using extensions like Jest and ESLint.

- [PKG](https://bit.dev/teambit/pkg) - Generates, packs and publishes component packages.

- [Pipelines](https://bit.dev/teambit/pipelines) - Reusable features to run sequenced tasks on components in a workspace. Use pipelines to customize, speed up, and standardize development and release processes across web projects and teams.

- [TypeScript](https://bit.dev/teambit/typescript) -Components to integrate Bit with TypeScript and enable the usage of TS in Bit components.
- [Envs](https://bit.dev/teambit/envs) - Components responsible for managing development environments and environmental services.

- [Dependencies](https://bit.dev/teambit/dependencies) - A scope of components responsible for defining and managing dependencies for components, including the Dependency Resolver which auto-generates the dependency graph for components and configures and installs dependencies for components in a Bit workspace. The scope also includes integrations for common package managers like Yarn and pnpm.

#### [Check out our OSS and learn how we work ->](https://bit.dev/teambit)

We also build proprietary features in scopes too! Here are a few examples of the private scopes we build for the Bit.dev platform:

Search
Ripple CI
Users
Organizations
Authentication
Storage
Security
SEO
Social

Stay tuned to see and learn more about all that in one of our talks soon… just [sign up to bit.dev](https://bit.dev/) to get the newsletter.

### Contribute

We **welcome contributions** from the community in all shapes and sizes.

Bit makes it much easier to contribute to open source for two reasons: First, because it’s much easier to get into the code of a small focused component than to a large project. Scond, because anyone can create new components to extend Bit using over 600 APIs and introduce new features and extensions to develop, build, test, render, or enhance the experience in any way and to enrich any tool from the local workspace to the cloud platform itself.

There are a few ways to contribute to Bit and its community:

Just create any new component and export it to bit.dev under any open-source license, making it public to the community to discover and use.

Import any component from the platform and locally modify or extend it in any way, then export a new version for the component or a brand new component.

Contribute pull-requests to Bit and its community on GitHub.

Have a cool feature idea and want to check if our team wants to collaborate on it? [Let us know](https://bit.dev/support).

### Bit on GitHub

- [Teambit/Bit](https://github.com/teambit/bit)

PRs welcome!
