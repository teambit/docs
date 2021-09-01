---
id: welcome
title: Introduction to Bit
slug: /
---


Bit is an extensible, [open-source toolchain](https://github.com/teambit/bit) for building independent components, and composing them into high-performance and consistent modular and [component-driven apps](/component-driven-apps) at speed.

It makes it easy to develop modular software projects from independently versioned components, connected through a dependency graph and which can be owned by numerous autonomous teams, collaborating together to deliver modern apps at speed, consistency and scale. It is a simple, modular and efficient way to build a single web application, while allowing to scale to any amount on teams collaborating together.

Bit is designed to enable a component-first approach, where [Components](/components/overview) are built independently and composed into [Apps](/apps/overview). This approach highly increases the value of each [Component](/components/overview) by making it a decoupled, collaborative, discoverable and composable unit of source code, promoting [rapid app development](/), [consistency](/) and [cross team collaboration](/).

In Bit, each [Component](/components/overview) is independent and acts as a standalone versioned unit of source code, connected through [Dependencies](/dependencies/overview) to others. Each component can be independently developed, built and shipped to [Scopes](/scopes/overview) to ensure cross-team collaboration, consistency, resilience and performance at any scale.

While Bit is tech-agnostic, development environments for specific tech are automated through [Envs](/envs/overview) to provide a customizable, repeatable and standard dev experience for development of [Components](components/overview).  
Officially supported [Envs](/) exist for [Node](node/overview), [React](react/overview), [Angular](/angular/overview) and [more](/envs/official-envs). An [Env](/envs/env) can be composed of all the great tools the community offers like [TypeScript](/typescript/overview), [Babel](babel/overview), [Jest](/jest/overview), [ESLint](eslint/overview), [Webpack](webpack/overview) and dozens of others. Bit was designed to be fully compatible with community standards and therefore can easily be used with any standard tool throughout the JS ecosystem. 

You can build and extend Bit just like us. Bit is a composition of [Aspects](extending-bit/overview). It comes built in with a set of configured Aspects and can be extended by configuring new Aspects to it. Every [Aspect](/extending-bit/overview) is a feature in Bit. Main core features are: [Workspace](/workspace/overview), [Component](components/overview), [Envs](envs/overview) and [Scope](scope/overview). Moreover, Bit is composed from over [60 core Aspects](/aspects) available as APIs and variety of interfaces including [CLI](cli-reference), GraphQL APIs and UIs.

TODO: ADD VIDEO OF INTRO TO BIT.

## Get started

### Install Bit

Bit can be installed with [BVM](/bvm/overview), the Bit version manager.

```bash
npm i -g @teambit/bvm
bvm install
```

To learn more about [Installing Bit, click here](getting-started/install-bit).

### Create your first component development Workspace

[Workspaces](workspace/overview) can be easily generated from [Workspace Templates](workspace/templates) or [initiated on existing repositories](start-from-existing). For more Workspace Templates use the `bit templates` command or search [Bit.dev](https://bit.dev/templates). 

<Tabs
defaultValue="React"
values={[
{label: 'React', value: 'React'},
{label: 'Angular', value: 'Angular'},
{label: 'Node', value: 'Node'},
]}>
<TabItem value="React">

```bash
bit new react my-first-workspace
```

  </TabItem>
  <TabItem value="Angular">

```bash
bit new angular my-first-workspace
```

  </TabItem>
    <TabItem value="Angular">

```bash
bit new node my-first-workspace
```

  </TabItem>
</Tabs>

Head over to [Quick Start](quick-start) to learn on next steps.

## Common use cases for Bit

Building from [Components](components/overview) helps and solves numerous common pains and use cases. Either technical or structural issues where tech limits architecture.

- [Micro Frontends](mfe/overview)
- [Design system component libraries](component-lib/overview).
- [Monorepos](monorepos).
- [Modular server side development](server-side/overview).

You can learn of more [use cases for Bit here](/use-cases).

## Additional links

- To get started follow [this guide](/getting-started/installing-bit)
- Watch our short [videos](/resources/videos) to help you understand Bit better
- Read [next steps](getting-started/whats-next) to start learning how you can adopt and use Bit
- Learn [what is Bit](essentials/what-is-bit) to have a better understanding of its capabilities
- Dive deeper into how Bit works in [Building with Bit](/building-with-bit/manage-workspace)
- Extend and customize Bit in [Extending Bit](/extending-bit/adding-a-new-tab)
- Discover the Building blocks of Bit in our [Aspects](/aspects/aspects-overview) section

<iframe width="560" height="315" src="https://www.youtube.com/embed/7afMBwj5fR4" title="Let's Build with Bit" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Additional Resources and Support

- [Chat on Slack :beers:](https://join.slack.com/t/bit-dev-community/shared_invite/zt-o2tim18y-UzwOCFdTafmFKEqm2tXE4w)
- [Start a discussion or suggest a feature or a fix on GitHub :wrench:](https://github.com/teambit/bit/issues)
- Find more [resources](resources/conference-talks) and learn about Bit some more.

## Host Components on [bit.dev](https://bit.dev)

While Bit is a 100% open source platform where you can create your own Bit-server, [bit.dev](https://bit.dev) is a cloud service provided by Bit where you can quickly set an account to publish your components. [bit.dev](https://bit.dev) is free for open source components and projects.
