---
id: overview
title: Overview
---

Bit makes the most out of your automated testing to help you maintain code in a distributed network of independent components. It does so by running tests on the modified component itself but also, on all components dependent on it, in and across scopes. This ripple effect of unit tests running on all dependent components essentially translates into multiple integration tests for multiple applications.

Bit's Tester is an [Environment Service](/environments/environment-services). The type of test runner (Jest, Mocha, etc.) as well as its configurations, are set by the various [environments](/environments/overview) that use it as a service. That means, a single workspace may run different test runners for different components, each according to its own environment.

To customize an environment's tester, [see here](/environments/environment-services).

For a demo of tests authored and executed for a component, [see here](/getting-started/test)

## Executing the tester manually

To manually run the tester on a specific component use its [component ID](/bit-components/overview#component-id):

```shell
$ bit test <component-id>
```

For example:

```shell
$ bit test ui-primitives/button
```

To manually run the tester on the entire workspace:

```shell
$ bit test
```

### Options

#### `--watch` `-w`

Starts the tester in 'watch mode' (re-tests when changes are made to a component).

```shell
$ bit test --watch
```

#### `--debug` `-d`

Starts the tester in 'debug mode'.

```shell
$ bit test --debug
```

#### `--env` `-e`

Tests all components that use a specific environment.

```shell
$ bit test --env <component-id>

// For example
$ bit test --env teambit.react/react
```

#### `--scope` `-s`

Tests all components in a specific scope.

```shell
$ bit test --scope <scope-name>

// For example
$ bit test --scope my-org.react-design-system
```

## Bit processes that use the tester

### Local dev server

Bit's local dev server (which also runs the Workspace UI) re-tests components on each modification. This happens whenever a file is 'saved'.

```shell
$ bit start
ENVIRONMENT NAME        URL                      STATUS
react              http://localhost:3101         Running
node               http://localhost:3102         Running

You can now view bad-jokes components in the browser
Main UI server is running on http://localhost:3000

Waiting for component changes... (10:17:20)
```

### Tests in `watch` mode

Alongside the local dev server, Bit features a watch mode that runs different operations for modified components. Component testing is one of these tasks.

```sh
$ bit watch
```

### Tests in the Build Pipeline

Testing is also part of a component's build pipeline. As with any other Build Task, the testing task also happens in a 'component capsule', which is an isolated instance of a component. When executed as a Build Task, the tester runs tests for all new or changed dependencies of that component.

When a component's build pipeline is run as part of the tagging of a new release version, the tests output is stored in the component's new version.

## Tester workspace configurations

The Tester can be configured in the `workspace.jsonc` configuration file.

### watchOnStart

Determines whether to run the Tester in 'watch mode' when the running the development server.

For example:

```json
{
  "$schema": "https://static.bit.dev/teambit/schemas/schema.json",
  "teambit.workspace/workspace": {
    "name": "my-workspace-name",
    "icon": "https://static.bit.dev/bit-logo.svg",
    "defaultScope": "my-org.my-scope"
  },
  "teambit.defender/tester": {
    "watchOnStart": false
  }
}
```

### patterns

Determines the file extensions for test files.

For example:

```json
{
  "$schema": "https://static.bit.dev/teambit/schemas/schema.json",
  "teambit.workspace/workspace": {
    "name": "my-workspace-name",
    "icon": "https://static.bit.dev/bit-logo.svg",
    "defaultScope": "my-org.my-scope"
  },
  "teambit.defender/tester": {
    "patterns": ["*.spec.ts", "*.another-extension.ts"]
  }
}
```
{"mode":"full","isActive":false}