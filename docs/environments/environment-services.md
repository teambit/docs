---
id: environment-services
title: Environment Services
---

To become a "one-stop-shop" for components, an environment "bundles" together different 'environment services` provided by various Bit aspects. These 'environment services' enable other Bit aspects to integrate into Bit's component life-cycle features. 

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
### Dependencies
Sets the default dependencies (as well as their version and type) for each component handled by it. That includes peer dependencies used for runtime (for example, `react-dom`) and dev dependencies (for example, `@types/react`).
### Icon
Sets an icon for components handled by the environment. This icon will appear next to the component name in the workspace UI navigation.