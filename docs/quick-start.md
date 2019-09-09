---
id: quick-start
title: Quick Start
---

Learn the basics of Bit and how to share components between projects as a team.

In this tutorial, you will learn the basics of Bit, and how to leverage it to share components between your team’s projects and applications.  
You will learn how to isolate components in a repository, letting Bit do the heavy lifting for packing the components while automating the management of their dependencies and versioning. No refactoring, code changes or package configurations are required.  
Then, learn how to export the components to a reusable collection ([example](https://bit.dev/mui-org/material-ui)) you can share and reuse across your projects and applications. When done, you will have your component collection to share.

**Let’s get started**

## Install bit

```bash
npm install bit-bin -g
```

See more [installation methods](/docs/installation.html).

## Init Bit for your project

Choose an existing repository containing components you’d like to share and reuse, and [Initialize a Bit workspace](/docs/initializing-bit.html) in the project’s directory.

```bash
$ cd project-directory
$ bit init
```

## Track components

Use Bit to [track components](/docs/add-and-isolate-components.html) in the repository, which you would like to reuse in other projects.  
To track components, use the `bit add` command. Using a glob pattern, you can add all the components in a certain path or directory (learn how to [track specific files as components](/docs/add-and-isolate-components.html#track-a-component)).

**Example**: Track all the components in the repository's `src/components` directory.

```bash
bit add src/components/*
```

Bit traverses the tracked files looking for `import` and `require` statements to define and generate a dependency graph for every component, saving the need to define and manage a `package.json` file for every component manually

> **Tip**
>
> Use [bit status](/docs/cli-status.html) to view useful information at any step. Try using it to verify that each component's dependency graph has been successfully resolved.

**Example**: Tracking components

Let's track the components `button`, `login` and `logo` in the following project's directory structure.

```bash
$ tree
.
├── App.js
├── App.test.js
├── favicon.ico
├── index.js
└── src
└── components
├── button
│├── Button.js
│├── Button.spec.js
│└── index.js
├── login
│├── Login.js
│├── Login.spec.js
│└── index.js
└── logo
├── Logo.js
├── Logo.spec.js
└── index.js
​
5 directories, 13 files
```

All 3 components are in `src/components/*`. Let’s use `bit add` to track them:

```bash
$ bit add src/components/*
tracking 3 new components
```

**Optional**: You can [track test files](/docs/add-and-isolate-components.html#track-a-component-with-testspec-files) as part of your components by appending the `--tests` flag. Bit can run these tests and present you with the results.

## Defining a compiler

Bit lets you define a compiler for the components in your repository.  
To define a compiler, run the `bit import` command:

```bash
$ bit import bit.envs/compilers/babel --compiler
the following component environments were installed
- bit.envs/compilers/babel@0.0.7
```

You can choose a compiler from [this pre-made collection](https://bit.dev/bit/envs), or implement [your own compiler configurations](/docs/ext-developing-extensions.html).  

#### Defining a testing framework

If you [track test files](/docs/add-and-isolate-components.html#track-a-component-with-testspec-files) for your components, you can define a testing framework Bit will use to run them.
To define a testing framework, run the `bit import` command:

```bash
$ bit import bit.envs/testers/mocha --tester
the following component environments were installed
- bit.envs/testers/mocha@0.0.7
```

You can choose a testing framework from [this pre-made collection](https://bit.dev/bit/envs), or implement [your own testing configurations](/docs/ext-developing-extensions.html).

## Tagging component versions

To set a version for your components use the `bit tag` command.  
Bit locks the state of every component’s dependency graph, making its version immutable.
When tagging components, Bit first runs the build and test tasks for the components.  
You can use the `--all` flag to tag all the components in the workspace.

```bash
$ bit tag --all 1.0.0
3 components tagged | 3 added, 0 changed, 0 auto-tagged
added components: components/button@1.0.0, components/login@1.0.0, components/logo@1.0.0
```

## Export the components

Now that our components are tracked and versioned, export (publish) them to a remote collection. Collections host and organize your components. Each component can be quickly discovered and consumed in any other project and application.  
First, head over to [bit.dev](https://bit.dev) and [create a free account](https://bit.dev/signup) (if you don’t already have one). Then, create a private or public collection.  
Return to your CLI and authenticate Bit to your [bit.dev](https://bit.dev) account.
​Use `bit login` to open a login page in the browser and authenticate.

```bash
$ bit login
Your browser has been opened to visit: http://bit.dev/bit-login?redirect_uri=http://localhost:8085...
```

Now you’re all set to [publish the components](/docs/cli-export.html).  
Use the `bit export` command to publish the components from your workspace to [bit.dev](https://bit.dev).

```bash
$ bit export user-name.collection-name
exported 3 components to collection user-name.collection-name
```

Head over to your bit.dev collection and take a look…  
All the components have been exported. Try creating and saving examples for your components, which Bit will also show as previews in the collection’s page.

## Consume components

Bit components can be consumed in a variety of methods.  
To [install components with package managers](/docs/installing-components.html) like **NPM** and **Yarn**, configure Bit as a scoped registry:

```bash
npm config set '@bit:registry' https://node.bit.dev
```

Then simply install components with your favorite package manager using the install command in the component’s page. [Example](https://bit.dev/mui-org/material-ui/button):

```bash
npm i @bit/mui-org.material-ui.button
```

## Modify Component

As Bit isolates components and decouples them from the repository, Bit components can be developed from any repository in your codebase.  
To [develop a component from the consuming repository](/docs/sourcing-components.html) use the `bit import` command. [Example](https://bit.dev/mui-org/material-ui/button):

```bash
bit import mui-org.material-ui/button
 ```

This new workflow increases the adoption and usage of components, as developers can [import] and develop Bit components right from their different projects.

**Tip**: Use the `eject` [command](/docs/cli-eject.html) to remove components from the local workspace and install them by the NPM client.

## Publish component changes

Changes made to imported components can be updated in the collection and synced across projects.  
When you’re done making changes, you can update them as a new version of the component in the collection (given permission). Alternatively, the changed component can be exported as a new component.  
When a component was updated with a new version in the collection, you can [update the changes](/docs/updating-sourced-components.html) for the component in every repository it lives in.

**Tip**: Use the `bit checkout` [command](/docs/updating-sourced-components.html#checkout-a-component-version-to-the-workspace) to update component versions in the workspace, including their dependency trees.

## Merge changes

[Bit extends Git](/docs/merge-changes.html) to allow the merging of changes for components, including the [handling of marge-conflicts](/docs/merge-changes.html#handle-merge-conflicts). This workflow helps your team sync changes when developing components from different projects.

**Well done**

Awesome! You’ve learned the basics of Bit’s workflow.  
There’re are many more features to Bit, from automatic component API docs to the live example playground, but let’s leave that for later.  
Now will be a great time to jump in and [start sharing components with your team](https://bit.dev)! You can also hang around and [explore components]( in the community.
​
**Need help? Have a feature request? Want to talk over a beer?** don’t hesitate to [reach out](https://bit.dev/support) or chat with the team on [Slack](https://join.slack.com/t/bit-dev-community/shared_invite/enQtNzM2NzQ3MTQzMTg3LWI2YmFmZjQwMTkxNmFmNTVkYzU2MGI2YjgwMmJlZDdkNWVhOGIzZDFlYjg4MGRmOTM4ODAxNTIxMTMwNWVhMzg).

Happy coding!
