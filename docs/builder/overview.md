---
id: overview
title: Overview
---

## Background

Bit's build process is an extensible CI for independent components. It validates a component is not dependent on its context (the workspace), tests it, and generates all artifacts necessary for it to be viewed and consumed as an independent module (its distributable code, bundled preview, etc.).

The Build Pipeline is an Environment Service responsible for sequencing and executing a component's Build Tasks. As mentioned earlier, these tasks are performed on a component only after it's been isolated from the rest of the workspace.

A component's default series of Build Tasks is composed of tasks set by Bit and by its environment.

## Isolated builds

Components authored in a Bit workspace are created to be independent.
To address that, the build process starts by creating a component ‘capsule’ which is an isolated instance of a component, generated in a separate directory in your filesystem.
Running the build in an isolated environment validates that a component is not coupled, in any way, to its workspace (a component that is not isolated may be able to use files and packages in the workspace.
For example, we may get false-positive results when testing for dependency-graph issues).

## Incremental builds

When a component "goes through" the build pipeline, all of its dependencies are built as well. If a dependency has not changed since its last build, the build process will use its artifacts from the previous build (and will not process it again). This optimization to the build process supplements the "innate optimization" that naturally comes from developing (and building) independent components instead of a single monolithic codebase.

## Environment-specific builds

Each Bit environment determines its own build pipeline. That means, a single workspace that uses multiple environments will run a different set of build tasks on different components depending on their associated environment. This is another Bit feature that enables seamless transitioning between different development environments, all in the same workspace. It also makes it much easier to integrate the Build Pipeline in your (remote) CI, as it only requires executing the build step - all other per-component build configurations are already set by the various environments being used.

Since environments are extensible, so are the build pipelines configured by them.

## Build task

An example of a build-task is `compile`, it's written in the compiler aspect and is running on each one of the capsules created by the build process. build-tasks in many cases generate artifacts, in this case, the compiler generates `dists` files and write them on the isolated capsules. There artifacts files are used later for example when creating packages.
