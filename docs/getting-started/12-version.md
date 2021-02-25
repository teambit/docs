---
id: version
title: Version Components
---

With Bit, each component gets its own versions. Component versions meet the same [semantic versioning rules](https://semver.org) used in Node packages. This provides [many advanatges](https://blog.bitsrc.io/versioning-independent-ui-components-why-and-how-7ea60d8be5f2) as different components can be incrementally added, upgraded, and replaced.

The tagging process creates a locked version of a component that includes its source code as well as its generated artifacts (distributable code, bundled documentation , etc.).

Once a component version has been tagged it reaches full independency and is ready to be exported.

## Tag a Component

To version (tag) all our components at once, we'll run the following:

```shell
bbit tag --persist --all 1.0.0 --message "initial version"
```

:::info the 'persist' option
The `--persist` option creates a new release version in your local machine. It is best to avoid it when collaborating with others.
Learn more about it [here](/docs/getting-started/ci-cd).
:::

### Versioning process

#### 1. Execute Build Pipeline

To standardize component build and release pipeline each Environment defines a set of tasks to run when Bit needs to build each component.
The default React environment used in this tutorial has several tasks. If any of these tasks fail, the build process will be aborted.
Learn more about the build pipeline [here](http://localhost:3003/docs/build-pipeline/overview).

1. Compile.
2. Test.
3. Bundle the documentation and compositions.

:::info isolated builds
Components authored in a Bit workspace are created to be completely context-agnostic.
To address that, the build process starts by creating a component 'capsule' which is an isolated instance
of a component, generated in a separate directory in your filesystem.

As part of the capsule creation, all packages listed as dependencies of that component will be installed.
This step is necessary to validate there are no dependency-graph issues (a component that is not totally
isolated will be able to use packages installed in parent directories in your workspace, by other components.
This will translate into a "false positive" result when testing for dependency-graph issues in a non-isolated location)
:::

#### 2. Create Immutable Version

Each version of a component is immutable and contains the component's implementation, dependency graph, configuration (which Environment is applied) and the build artifacts. When a component is sucessfuly built Bit takes all artifacts and saves them alondside the component's state at that time, sets a semantic version and keeps it in Bit's data store.

#### 3. Auto-tag Dependents

Bit run the tagging process on all dependents of a tagged component. It build and versions all components, and their depends recursively.

## List Versioned Components

Versioned components are components Bit set an immutable versions for and staged them to be exported. To list them, run the following:

```shell
bbit list
```
