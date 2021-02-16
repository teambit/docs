---
id: version
title: Independent Versioning
---

Tagging a component creates a locked version of the component using the `bbit tag` command. This version can then be exported. Component versions are immutable. I.e., they contain the source code and all dependencies required to make a component usable.

In Bit each component get its own versions. Component versions meet the [semantic versioning](https://semver.org) guidelines, like a package.

## Tag a Component

We'll version (tag) our [previously-created 'Button'](/docs/getting-started/add-components) component by running the following:

```shell
$ bbit tag --persist button 1.0.0 --message "initial version" # Version a specific component with a specific semver
1 components tagged | 1 added, 0 changed, 0 auto-tagged
added components:  react/button@1.0.0
```

This toturial does not include collaboration workflow for component versioning, so we use the `--persist` option. To learn more about how to collaborate on publishing component versions follow [this link](/docs/getting-started/ci-cd).

You can run the `bbit status` command to see that the component is now staged to be exported.

```sh
$ bbit status
staged components
(use "bit export <remote_scope> to push these components to a remote scope")

     > react/button. versions: 0.0.1 ... ok
```

### Versioning process

The process of versioning a single component is comprised of several stages:

#### Execute Build Pipeline

To stadndardize component build and release pipeline each Environment defines a set of tasks to run when Bit needs to build each component. The default React environment used in this toturial has several tasks. If any of these tasks fail, Bit will fail the build process.

1. Compile.
2. Test.
3. Bundle documentation site (the "overview" tab)

> As with any other service provided by the environment, the '[build pipeline](/docs/react/extending-react#overridebuildpipe)' can too be extended and customized.

#### Create Immutable Version

Each version of a component is immutable and contains the component's implementation, dependency graph, configuration (which Environment is applied) and the build artifacts. When a component is sucessfuly built Bit takes all artifacts and saves them alondside the component's state at that time, sets a semantic version and keeps it in Bit's data store.

#### Auto-tag Dependents

Bit run the tagging process on all dependents of a tagged component. It build and versions all components, and their depends recursively.

## List Versioned Components

Versioned components are components Bit set an immutable versions for and staged them to be exported. To list them, run the following:

```shell
$ bbit list
┌────────────────────┬─────────┬─────────┐
│ component ID       │ local   │ used    │
│                    │ version │ version │
├────────────────────┼─────────┼─────────┤
│ button             │ 1.0.0   │ 1.0.0   │
└────────────────────┴─────────┴─────────┘
```

### Workspace Versioning Features

There may be many components to version in a workspace, where components may depend on each other. By default Bit will `auto-tag` all dependents. Below are additional examples for versioning many components.

```sh
$ bbit tag --persist --all --minor # Version all modified components with a minor semver bump
$ bbit tag --persist component/* # Version all modified components that fit a pattern with a default (patch) semver bump
$ bbit tag --persist # Version all modified components with a default (path) semver bump
```

## Untag a component

To untag our 'Button' component we'll run the following:

```shell
$ bbit untag --persisted button # completely remove a version from the local scope
```
