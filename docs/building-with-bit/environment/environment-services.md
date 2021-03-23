---
id: environment-services
title: Environment Services
---

To become a "one-stop-shop" for components, an environment "bundles" together different Environment Services provided by various Bit aspect components. These Environment Services enable other Bit aspects to integrate into Bit's component life-cycle features.

For example, the 'Tester' service (`@teambit.defender/tester`) enables the React environment (`@teambit.react/react`) to set 'Jest' (`teambit.defender/jest`) as the default test runner for its components. This will enable Jest to be executed on the `bit test` command, to be run as a pre-tag check, to output results using Bit's logger, and even to display the generated logs in the Workspace and Scope UIs (to name just a few examples).

![React env using Jest with the tester service](/img/react_env_ex.png)

### Compiler

Runs the environment's selected compiler (for example, TypeScript).

### Tester

Runs the environment's selected test runner (for example, Jest)

### Linter

Runs the environment's selected linter (for example, ESLint)

### Documentation

Sets the template for the auto-generated component documentation, as well as the API for customizing component docs.

### Build pipeline (CI)

Sets the sequence of build tasks to run before a component is tagged with a new version.

### DevServer

Bundles all components and runs a server to display them, live (using "hot reloading") in the workspace UI. This includes rendering the 'compositions' as well as the documentation shown in the 'Overview' tab.

> Even though different types of components, e.g. React and Node components, run on different servers (one for each environment) the workspace is explored and navigated through as if it where a single server.

### Package

Generates the node module package for components, with properties set by the environment.

### Dependencies

Sets the default dependencies (as well as their version and type) for each component handled by the environment. That includes peer dependencies used for runtime (for example, `react-dom`) and dev dependencies (for example, `@types/react`).

### Bundler

Bundles components (compositions, docs, etc.) using the environment's bundler and bundling configurations. The generated assets are use both in development (when running the development server) and when exploring component's tagged releases (for example, in the scope UI).
