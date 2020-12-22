---
id: overview
title: Overview
---
The Build Pipeline is responsible for sequencing and executing the Build Tasks set for a component. A component's series of Build Tasks is composed of tasks set by Bit and by its [environment](/docs/environments/overview). It consists of tasks for testing it and generating the needed artifacts for it to become an independent building block (its distributable code, `package.json`, [component preview](todo), etc.)

The build process runs before a component gets a new release version and serves as a prerequisite of it. If any task in the build process fails, the tagging process is aborted.
## Isolated builds
Components authored in a Bit workspace are created to be completely independent. To address that, the build process starts by creating a component 'capsule' which is an isolated instance of a component, generated in a separate directory in your filesystem. 

As part of the capsule creation, all packages listed as dependencies of that component will be installed. This step is necessary to validate there are no dependency-graph issues (a component that is not isolated will be able to use packages installed in parent directories, by other components. This will translate into a "false positive" result when testing for dependency-graph issues).
## Incremental builds
When a component "goes through" the build pipeline, all of its dependencies are built as well. If a dependency has not changed since its last build, the build process will use its artifacts from the previous build (and will not process it again). This optimization to the build process supplements the "innate optimization" that naturally comes when developing (and building) independent components instead of a single monolithic codebase.

## Parallel builds
The build pipeline processes multiple components in parallel to make use of multiple cores in your machine.

## Environment-specific builds
Each Bit environment determines its own build pipeline. That means, a single workspace that uses multiple environments, will run a different set of build tasks on different components. This is another Bit feature that allows for seamless transitioning between different development environments, all in the same workspace. It also makes it much easier to [integrate the Build Pipeline in your (remote) CI](/docs/getting-started/ci-cd), as it only requires executing it - all other configurations are already set by the different environments.

Since environments are extensible, so are the build pipelines configured by them. __To create your own Build Task or customize your environment's build pipeline, [see here](/docs/build-pipeline/create-build-task).__
## Sequencing the build tasks
The Build Pipeline takes into consideration the following factors when deciding the order of which to execute each task:
* __Bit "core" tasks__: These are tasks that must exist at the start of the build process. One such task is creating isolated instances ('Bit capsules') of each component.
* __Location__: A task can be executed either at the start or end of the build pipeline. This can be explicitly [configured by the task itself](docs/build-pipeline/create-build-task#append-to-the-start-or-end-of-the-pipeline-in-relation-to-other-tasks).
* __Dependencies__: A task can depend on other tasks. That means, it will not get executed before its dependencies are executed successfully. This is [configured by the task itself](docs/build-pipeline/create-build-task#append-to-the-start-or-end-of-the-pipeline-in-relation-to-other-tasks).
* __An environment's list of build tasks__: This is the array of tasks as it is [defined by an environment](/docs/build-pipeline/create-build-task#override-the-build-pipeline-sequence).

## Executing the build pipeline
Commands that trigger the build pipeline: 
 * `bbit build` - will run the build pipeline for the entire workspace. The output data will not persist. (most often used for testing and debugging the build process).
 * `bbit tag` - will run the build pipeline for the component, before registering the component as 'pending to be versioned'. The output data will not persist.
 * `bbit tag --persist` - will run the build pipeline for the component, before creating a new component release version. The output data will persist.