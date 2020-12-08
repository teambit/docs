---
id: overview
title: Overview
---

A Bit environment is a complete development environment encapsulated in a single Bit component. That means, linting, testing, compiling, documenting, and other services needed in the lifecycle of an independent component, are all provided by one component.

Having just a single component to set up the entire development environment means no time gets wasted on laborious configurations. In addition, a sharable environment makes it easier to maintain consistency in development across multiple decoupled Bit workspaces.

A single workspace may use multiple environments to "service" different groups of components. For example, the following configuration sets two different environments, React and Node, on two sets of components:

```json
{
  "teambit.workspace/variants": {
      "components/ui": {
        "teambit.react/react": {}
      },
      "components/utils": {
        "teambit.harmony/node"
      }
  }
}
```

Bit provides [a number of environments to choose from](/docs/environments/choose-an-environment). Each environment is completely [customizable and extendible](/docs/environments/build-environment). Once you've created your own custom environment, you can share it with others, as you would with any other Bit component.
## Services used by Environments
To become a "one-stop-shop" for components, an environment "bundles" together different 'environment services`, provided by various Bit aspects. These 'environment services' enable other Bit aspects to integrate into Bit's component life-cycle features. 

For example, the 'Tester' service (`@teambit.defender/tester`) enables the React environment (`@teambit.react/react`) to set 'Jest' (`teambit.defender/jest`) as the default test runner for its components. This will enable Jest to get executed on the `bbit test` command, to run before a component is tagged, to output results using Bit's logger, and even to display the generated logs in the Workspace and Scope UIs (just to name a few examples).

![React env using setting using Jest with the tester service](/img/react_env_ex.png)
### Compiler, Tester and Linter
Three services that run the environment's selected compiler (for example, TypeScript), test runner (for example, Jest) and linter (for example, ESLint) in a Bit workspace. That includes making them executable from Bit's CLI and various Bit processes (for example, the 'tagging' process).
### Documentation
Sets the template for the auto-generated component documentation, as well as the API for customizing the docs.
### Build pipeline (CI)
Sets the sequence of build tasks to run before a component gets tagged with a new version.
### DevServer
Bundles all components and runs a server to display them, live (using "hot reloading") in the workspace UI. That includes the 'compositions' as well as the documentation shown in the 'Overview' tab.

> Even though different types of components run on different servers (one for each environment) the workspace is explored and navigated through as if it where a single server.
### Preview
Runs the bundler and sets its configurations for component "production" previews for tagged versions (seen in the remote scope as well as in the workspace UI, for previous component versions). That includes the 'compositions' as well as the documentation shown in the 'Overview' tab.
### Package
Generates node module packages for components, with properties set by the environment.
## Setting default dependencies for components
The environment also sets the default dependencies (as well as their version and type) for each component handled by it. That includes peer dependencies used for runtime (for example, `react-dom`) and dev dependencies (for example, `@types/react`).
## Environments CLI reference
As mentioned above, Bit environments make use of Bit's CLI to execute their different services. That means, `bbit test`, for example, may execute different test runners, depending on the environment in use.

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