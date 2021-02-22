---
id: version
title: Version Components
---

The tagging process creates a locked version of a component that includes its source code as well as its generated artifacts (distributable code, bundled documentation , etc.).

Once a component version has been tagged it reaches full independency and is ready to be exported.

In Bit, each component gets its own versions. Component versions meet the same [semantic versioning](https://semver.org) guidelines that are adhered to in packages.

## Tag a Component

version (tag) our [previously-created 'Button'](/docs/getting-started/add-components) component by running the following:

To version (tag) all our components at once, we'll run the following:

```shell
bbit tag --persist --all 1.0.0 --message "initial version"
```

:::note
The `--persist` option creates a new release version in your local machine. It is best to avoid it when collaborating with others on a component.
Learn more about it [here](/docs/getting-started/ci-cd).
:::

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
bbit list
```

### Workspace Versioning Features

There may be many components to version in a workspace, where components may depend on each other. By default Bit will `auto-tag` all dependents. Below are additional examples for versioning many components.

```sh
$ bbit tag --persist --all --minor # Version all modified components with a minor semver bump
$ bbit tag --persist component/* # Version all modified components that fit a pattern with a default (patch) semver bump
$ bbit tag --persist # Version all modified components with a default (path) semver bump
```

## Untag a component

To untag a component run the following:

```shell
$ bbit untag <component-id> # completely remove a version from the local scope
```
