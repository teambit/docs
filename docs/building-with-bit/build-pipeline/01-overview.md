---
id: overview
title: Overview
---

**Bit builds components and their dependencies on the component graph**. As you make a change, Bit will build only the related components on the graph that are impacted by the change. This new paradigm of building only components unlocks powerful advantages in terms of **build performance**, **isolating each component's build**, **separation of releases**, and **safety of changes**. Bit also lets you parallel and sequence build tasks for an even more powerful workflow.

Bit's build process is an extensible CI for independent components. It validates a component is not dependent on its context (the workspace), tests it, and generates all artifacts necessary for it to be viewed and consumed as an independent module (its distributable code, bundled preview, etc.).

The Build Pipeline is an [Environment Service](/building-with-bit/environment/environment-services) responsible for sequencing and executing a component's Build Tasks. As mentioned earlier, these tasks are performed on a component only after it's been isolated from the rest of the workspace.

A component's default series of Build Tasks is composed of tasks set by Bit and by its [environment](/building-with-bit/environment/overview).

## Isolated builds

Components authored in a Bit workspace are created to be completely portable, and thus independent. To address that, the build process starts by creating a component 'capsule' which is an isolated instance of a component, generated in a separate directory in your filesystem.

As part of the capsule creation, all packages listed as dependencies of that component will be installed. This step is necessary to validate there are no dependency-graph issues (a component that is not totally isolated will be able to use packages installed in parent directories in your workspace, by other components. This will translate into a "false positive" result when testing for dependency-graph issues in a non-isolated location).

## Incremental builds

When a component "goes through" the build pipeline, all of its dependencies are built as well. If a dependency has not changed since its last build, the build process will use its artifacts from the previous build (and will not process it again). This optimization to the build process supplements the "innate optimization" that naturally comes from developing (and building) independent components instead of a single monolithic codebase.

## Parallel builds

The build pipeline processes multiple components in parallel to make use of multiple cores on your machine.

## Environment-specific builds

Each Bit environment determines its own build pipeline. That means, a single workspace that uses multiple environments will run a different set of build tasks on different components depending on their associated environment. This is another Bit feature that enables seamless transitioning between different development environments, all in the same workspace. It also makes it much easier to integrate the Build Pipeline in your (remote) CI, as it only requires executing the build step - all other per-component build configurations are already set by the various environments being used.

Since environments are extensible, so are the build pipelines configured by them. **To create your own Build Task or customize your environment's build pipeline, [see here](/building-with-bit/build-pipeline/create-build-task).**

## Sequencing the build tasks

The Build Pipeline takes into consideration the following factors when deciding the order of which to execute each task:

- **Location**: A task can be executed either at the start or end of the build pipeline. This can be explicitly [configured by the task itself](/building-with-bit/build-pipeline/create-build-task#append-to-the-start-or-end-of-the-pipeline-in-relation-to-other-tasks).
- **Dependencies**: A task can depend on other tasks. That means, it will not get executed before its dependencies are executed successfully. This is [configured by the task itself](/building-with-bit/build-pipeline/create-build-task#append-to-the-start-or-end-of-the-pipeline-in-relation-to-other-tasks).
- **An environment's list of build tasks**: This is the array of tasks as it is [defined by an environment](/building-with-bit/build-pipeline/create-build-task#override-the-build-pipeline-sequence).

## Executing the build pipeline

Commands that trigger the build pipeline:

- `bit build` - will run the build pipeline on your local machine, for the entire workspace. The output data will not persist. - That is most often used for testing and debugging the build process.
- `bit tag` - will run the build pipeline on your local machine, before creating a new component release version. The output data will persist.
