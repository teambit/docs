---
id: overview
title: Overview
---

The Build Pipeline is a Bit aspect responsible for sequencing and executing each environment's 'build tasks'. The composed series of 'build tasks' result in a CI that is component-driven and environment-specific. 

For example, in a Bit workspace using two environments, 'Node' and 'React', the 'compile' build-task will go through each component using 'React', before it goes through each component using 'Node' (or vise versa). When that is done, the next build task will follow the same logic. In addition, each environment can use different compilation configurations (or different compilers), or even to completely omit this step from its build pipeline.
## Sequencing the build tasks
The Build Pipeline takes into consideration the following factors when deciding the order of which to execute each task:
* __Bit "core" tasks__: These are tasks that must exist at the start of the build process. One such task is creating isolated instances ('Bit capsules') of each component, in different directories in your local filesystem. These capsules serve the rest of the build process.
* __Location__: A task can be executed either at the start or end of the build pipeline. This can be explicitly [configured by the task itself](docs/build-pipeline/create-build-task#append-to-the-start-or-end-of-the-pipeline-in-relation-to-other-tasks).
* __Dependencies__: A task can depend on other tasks. That means, it will not get executed before its dependencies are executed successfully. This is [configured by the task itself](docs/build-pipeline/create-build-task#append-to-the-start-or-end-of-the-pipeline-in-relation-to-other-tasks).
* __An environment's list of build tasks__: This is the array of tasks as it is [defined by an environment](/docs/build-pipeline/create-build-task#override-the-build-pipeline-sequence).

## Executing the build pipeline
Commands that trigger the build pipeline: 
 * `bbit build` - will run the build pipeline. The output data will not persist. (most often used for testing and debugging the build process).
 * `bbit tag` - will run the build pipeline before registering the component as 'pending to be versioned'. The output data will not persist.
 * `bbit tag --persist` - will run the build pipeline before creating a new component release version. The output data will persist.

---

* To create a new task or override an environment default build pipeline [see here](/docs/build-pipeline/create-build-task).

* For more information regarding the '@teambit/builder' aspect, [see here](TODO)

* For an demonstration of the build pipeline being used as part of your remote CI workflow, [see here](/docs/getting-started/ci-cd).
