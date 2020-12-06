---
id: overview
title: Overview
---

A Bit Environment is a single component that takes care of the entire development setup needed to author and deliver independent components. It does so by configuring and "bundling" together different services for component development.

Environments are also used to ensure consistency by standardizing the environment setup for independent components, developed across different decoupled repositories. 

Bit provides a number of environments to choose from. Each environment is completely customizable and extendible. Once you've created your own custom environment, you can share it with others like any other component.

It's important to note that a single workspace may use multiple environments to handle different types of components.

Learn how to use one or more environments in your workspace, [here](/docs/environments/choose-an-environment)

## Services used by Environments
"Environment services" enable "foreign" tools and services to integrate into Bit's component life-cycle features. 

For example, the 'Tester' service enables the React environment (`@teambit.react/react`) to set 'Jest' as the default test runner for its components. That will, for example, make the `bbit test` command execute Jest, it will print out its results , save the generate logs and will even display them in the Workspace and Scope UIs. 
### Compiler, Tester and Linter
Three services that run the environment's selected compiler (e.g, TypeScript), test runner (r.g, Jest) and linter (e.g, ESLint) in a Bit workspace. That includes making them executable from Bit's CLI and various Bit processes (for example, 'tagging').
### Documentation
Sets the template for the auto-generated component documentation, as well as the API for customizing the docs.
### Build pipeline (CI)
Sets the sequence of build tasks to run before a component gets tagged with a new version.
### DevServer
Runs the bundler and sets its configurations for the live component previews in development (seen in the workspace UI).
### Preview
Runs the bundler and sets its configurations for component "production" previews for tagged versions (seen in the remote scope as well as in the workspace UI, for previous component versions).
### Package
Generates node module packages for components, with the properties set by the environment.
## Setting default dependencies for components
The environment also sets the default dependencies (as well as their version and type) for each component handled by it. That includes peer dependencies used for runtime (e.g, `react-dom`) and dev dependencies (e.g, `@types/react`).
## Environments CLI reference
```shell
// run the build pipeline
$ bbit build

// run the dev server
$ bbit start

// run all tests
$ bbit test

// compile all components
$ bbit compile

// get lint results
$ bbit lint
```